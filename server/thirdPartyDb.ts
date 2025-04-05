import { Pool, PoolClient } from 'pg';
import { log } from './vite';

/**
 * A utility class for connecting to third-party services databases
 * independently from our main authentication system.
 */
export class ThirdPartyDatabaseService {
  private pool: Pool;
  private connectionAttempted = false;
  private isConnected = false;

  constructor(connectionString?: string) {
    // Use provided connection string or fall back to environment variable
    const dbUrl = connectionString || process.env.THIRD_PARTY_DATABASE_URL || process.env.DATABASE_URL;
    
    if (!dbUrl) {
      log('No database connection string provided for third-party service', 'db');
      this.pool = null as any;
      return;
    }
    
    try {
      this.pool = new Pool({ connectionString: dbUrl });
      log('Third-party database pool initialized', 'db');
    } catch (error) {
      log(`Failed to initialize third-party database pool: ${error}`, 'db');
      this.pool = null as any;
    }
  }

  /**
   * Check if database connection is available
   */
  async isAvailable(): Promise<boolean> {
    if (!this.pool) return false;
    if (this.connectionAttempted) return this.isConnected;
    
    try {
      const client = await this.pool.connect();
      await client.query('SELECT 1');
      client.release();
      this.isConnected = true;
      log('Successfully connected to third-party database', 'db');
    } catch (error) {
      this.isConnected = false;
      log(`Failed to connect to third-party database: ${error}`, 'db');
    }
    
    this.connectionAttempted = true;
    return this.isConnected;
  }

  /**
   * Execute a database query with a client from the pool
   */
  async query<T>(
    queryText: string,
    params: any[] = []
  ): Promise<T[]> {
    if (!await this.isAvailable()) {
      log('Cannot execute query: third-party database unavailable', 'db');
      return [];
    }
    
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();
      const result = await client.query(queryText, params);
      return result.rows as T[];
    } catch (error) {
      log(`Query error on third-party database: ${error}`, 'db');
      throw error;
    } finally {
      if (client) client.release();
    }
  }

  /**
   * Close the database pool when the server shuts down
   */
  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      log('Third-party database pool closed', 'db');
    }
  }
}

// Create a singleton instance that can be imported throughout the application
export const thirdPartyDb = new ThirdPartyDatabaseService();