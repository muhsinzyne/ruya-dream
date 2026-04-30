import pool from './db';

export async function checkLimit(device_id: string): Promise<boolean> {
  // Allow bypassing rate limit for testing/development
  if (process.env.DISABLE_RATE_LIMIT === 'true') {
    return true;
  }

  // Use local time offset for today's date simply
  const dateObj = new Date();
  const today = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[0];
  
  try {
    // Check existing limit for today
    const [rows]: any = await pool.query(
      'SELECT request_count FROM request_limits WHERE device_id = ? AND request_date = ?',
      [device_id, today]
    );
    
    if (rows.length > 0) {
      const count = rows[0].request_count;
      
      if (count >= 2) {
        return false;
      }
      
      // Increment count
      await pool.query(
        'UPDATE request_limits SET request_count = request_count + 1 WHERE device_id = ? AND request_date = ?',
        [device_id, today]
      );
    } else {
      // Create new limit entry for today
      await pool.query(
        'INSERT INTO request_limits (device_id, request_date, request_count) VALUES (?, ?, 1)',
        [device_id, today]
      );
    }
    
    return true;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    // In case of DB error, you may want to allow the request or fail safely.
    // For MVP, we'll fail to prevent abuse if DB is down.
    throw error;
  }
}
