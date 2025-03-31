import mysql2 from 'mysql2/promise';

class Connection {
    constructor(){
        this.pool = null
    }

    async connect() {
        if (this.pool) return;
        
        this.pool = mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            waitForConnections: true,
            connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
            queueLimit: 0
        });

        // Verificar la conexión

        try {
            const connection = await this.pool.getConnection();
            console.log('Database connected successfully');
            connection.release();
        } catch (error) {
            console.log('Unable connection to the Database');
            throw error;
        }
    }

    getPool(){
    if(!this.pool) {
        throw new Error('Database connection not estaablished. Call connect() first.')
        }
        return this.pool
        
    }   
    
    async close() {
        if (this.pool) {
            await this.pool.end();
            this.pool = null;
            console.log('Database connection closed');
        }
    }


} // End Class

export default new Connection;