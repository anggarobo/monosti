// src/db/query.ts
import { ResultSetHeader } from 'mysql2';
import MySQLConnection from './connection';

export async function query<T extends ResultSetHeader = any>(sql: string, params?: any[]): Promise<T[]> {
  const pool = MySQLConnection.getInstance().getPool();
  const [rows] = await pool.execute<T[]>(sql, params);
  return rows;
}
