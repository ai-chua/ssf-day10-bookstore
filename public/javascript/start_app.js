const mysql = require('mysql2/promise')

module.exports = async (app, pool) => {
  try {
    // Acquire a connection from the connection pool
    const conn = await pool.getConnection();
    console.info('Pinging DB')
    await conn.ping()
    // release the connection
    console.info('Ping DB successful, releasing connection')
    conn.release()
    // Start express
    app.listen(process.env.PORT, () => { // first parameter = port number
      console.log(`Application started on port ${process.env.PORT} at ${new Date()}`)
    })
  } catch(e) {
    console.error('Error:', e)
  }
}