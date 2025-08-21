import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class MySQLConnection {
  private static instance: MySQLConnection;
  private pool: Pool;

  private constructor() {
    const config: PoolOptions = {
      host: process.env.JAKPRO_DB_HOST,
      user: process.env.JAKPRO_DB_USER,
      password: process.env.JAKPRO_DB_PASSWORD,
      database: process.env.JAKPRO_DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    this.pool = mysql.createPool(config);
  }

  public static getInstance(): MySQLConnection {
    if (!MySQLConnection.instance) {
      MySQLConnection.instance = new MySQLConnection();
    }
    return MySQLConnection.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export default MySQLConnection;
