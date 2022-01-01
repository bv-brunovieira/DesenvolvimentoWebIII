const { Pool } = require('pg');

/**
 * Conexão local - via pool de conexões
 */
const pool = new Pool({
    user: 'user-ned',
    host: 'localhost',
    database: 'ned',
    password: 'user-ned',
    port: 5432
})

/**
 * Conexão heroku - via pool de conexões
 */
/* const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}) */

module.exports = pool;