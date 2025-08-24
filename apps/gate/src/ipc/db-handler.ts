// src/ipc/db-handler.ts
import { ipcMain } from 'electron';
import { query } from '../utils/database/query';

ipcMain.handle('db:query', async (_event, sql: string, params?: any[]) => {
  try {
    const result = await query(sql, params);
    return { success: true, data: result };
  } catch (error) {
    console.error('DB Query Error:', error);
    return { success: false, error: (error as Error).message };
  }
});
