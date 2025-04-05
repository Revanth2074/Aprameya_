import { thirdPartyDb } from './thirdPartyDb';
import { log } from './vite';

/**
 * Example service that connects to an external database for third-party integrations.
 * This demonstrates how to isolate external services from the main application storage.
 */
export class ExternalAnalyticsService {
  /**
   * Tracks a user event to the external analytics database
   */
  async trackEvent(userId: number, eventType: string, eventData: any): Promise<boolean> {
    try {
      // Check if the database is available
      const isDbAvailable = await thirdPartyDb.isAvailable();
      
      if (!isDbAvailable) {
        // Gracefully handle unavailable database - log only, don't disrupt user experience
        log('Analytics database unavailable, event not tracked', 'analytics');
        return false;
      }
      
      // Insert event into the external database
      await thirdPartyDb.query(
        `INSERT INTO analytics_events (user_id, event_type, event_data, created_at) 
         VALUES ($1, $2, $3, NOW())`,
        [userId, eventType, JSON.stringify(eventData)]
      );
      
      return true;
    } catch (error) {
      log(`Error tracking analytics event: ${error}`, 'analytics');
      // Don't disrupt the main application flow if analytics fails
      return false;
    }
  }
  
  /**
   * Retrieves user activity data from the analytics database
   */
  async getUserActivity(userId: number, limit = 100): Promise<any[]> {
    try {
      const isDbAvailable = await thirdPartyDb.isAvailable();
      
      if (!isDbAvailable) {
        log('Analytics database unavailable, cannot retrieve activity', 'analytics');
        return [];
      }
      
      return await thirdPartyDb.query(
        `SELECT event_type, event_data, created_at 
         FROM analytics_events 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [userId, limit]
      );
    } catch (error) {
      log(`Error retrieving user activity: ${error}`, 'analytics');
      return [];
    }
  }
}

// Create a singleton instance
export const analyticsService = new ExternalAnalyticsService();

/**
 * Example service for integration with external notification systems
 */
export class NotificationService {
  /**
   * Sends a notification to a user via the external notification service
   */
  async sendNotification(userId: number, title: string, message: string): Promise<boolean> {
    try {
      const isDbAvailable = await thirdPartyDb.isAvailable();
      
      if (!isDbAvailable) {
        log('Notification database unavailable, cannot send notification', 'notifications');
        return false;
      }
      
      // Queue the notification in the external database
      await thirdPartyDb.query(
        `INSERT INTO notification_queue (user_id, title, message, status, created_at) 
         VALUES ($1, $2, $3, 'pending', NOW())`,
        [userId, title, message]
      );
      
      return true;
    } catch (error) {
      log(`Error sending notification: ${error}`, 'notifications');
      return false;
    }
  }
  
  /**
   * Retrieves notifications for a user
   */
  async getUserNotifications(userId: number, limit = 10): Promise<any[]> {
    try {
      const isDbAvailable = await thirdPartyDb.isAvailable();
      
      if (!isDbAvailable) {
        log('Notification database unavailable, cannot retrieve notifications', 'notifications');
        return [];
      }
      
      return await thirdPartyDb.query(
        `SELECT id, title, message, status, created_at 
         FROM notifications 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [userId, limit]
      );
    } catch (error) {
      log(`Error retrieving notifications: ${error}`, 'notifications');
      return [];
    }
  }
}

// Create a singleton instance
export const notificationService = new NotificationService();