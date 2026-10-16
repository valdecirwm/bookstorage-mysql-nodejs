require('dotenv').config()
const mysql = require('mysql')

// Configuração do Connection Pool para alta performance e reaproveitamento de conexões
const pool = mysql.createPool({
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nodemysql',
    waitForConnections: true,
    queueLimit: 0
})

module.exports = pool