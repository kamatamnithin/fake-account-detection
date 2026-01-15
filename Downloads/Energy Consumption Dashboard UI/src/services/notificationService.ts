/**
 * Notification Service
 * Manages system notifications, alerts, and real-time updates
 */

import { toast } from 'sonner';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  timestamp: Date;
  read: boolean;
  category: 'anomaly' | 'prediction' | 'system' | 'performance' | 'alert';
  action?: {
    label: string;
    callback: () => void;
  };
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: Array<(notifications: Notification[]) => void> = [];
  private maxNotifications = 100;

  constructor() {
    // Load notifications from localStorage
    this.loadNotifications();
  }

  /**
   * Show a success toast notification
   */
  success(message: string, duration: number = 3000): void {
    toast.success(message, { duration });
  }

  /**
   * Show an error toast notification
   */
  error(message: string, duration: number = 5000): void {
    toast.error(message, { duration });
  }

  /**
   * Show a warning toast notification
   */
  warning(message: string, duration: number = 4000): void {
    toast.warning(message, { duration });
  }

  /**
   * Show an info toast notification
   */
  info(message: string, duration: number = 3000): void {
    toast.info(message, { duration });
  }

  /**
   * Show a loading toast notification
   */
  loading(message: string): string | number {
    return toast.loading(message);
  }

  /**
   * Dismiss a specific toast
   */
  dismiss(toastId: string | number): void {
    toast.dismiss(toastId);
  }

  /**
   * Add a persistent notification
   */
  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };

    this.notifications.unshift(newNotification);

    // Keep only last maxNotifications
    if (this.notifications.length > this.maxNotifications) {
      this.notifications = this.notifications.slice(0, this.maxNotifications);
    }

    this.saveNotifications();
    this.notifyListeners();

    // Show toast based on priority
    this.showToastForNotification(newNotification);

    return newNotification;
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
      this.notifyListeners();
    }
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
    this.saveNotifications();
    this.notifyListeners();
  }

  /**
   * Delete a notification
   */
  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== notificationId);
    this.saveNotifications();
    this.notifyListeners();
  }

  /**
   * Clear all notifications
   */
  clearAll(): void {
    this.notifications = [];
    this.saveNotifications();
    this.notifyListeners();
  }

  /**
   * Get all notifications
   */
  getNotifications(): Notification[] {
    return this.notifications;
  }

  /**
   * Get unread notifications
   */
  getUnreadNotifications(): Notification[] {
    return this.notifications.filter((n) => !n.read);
  }

  /**
   * Get unread count
   */
  getUnreadCount(): number {
    return this.getUnreadNotifications().length;
  }

  /**
   * Subscribe to notification updates
   */
  subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Show anomaly alert
   */
  alertAnomaly(location: string, value: number, expected: number, severity: 'high' | 'critical'): void {
    const deviation = Math.abs(((value - expected) / expected) * 100).toFixed(1);
    
    this.addNotification({
      title: '⚠️ Anomaly Detected',
      message: `${location}: ${value.toFixed(1)} kW (${deviation}% deviation from expected ${expected.toFixed(1)} kW)`,
      priority: severity === 'critical' ? 'critical' : 'high',
      category: 'anomaly',
    });
  }

  /**
   * Show prediction alert
   */
  alertPrediction(message: string, priority: NotificationPriority = 'medium'): void {
    this.addNotification({
      title: '📊 Prediction Update',
      message,
      priority,
      category: 'prediction',
    });
  }

  /**
   * Show system alert
   */
  alertSystem(message: string, priority: NotificationPriority = 'high'): void {
    this.addNotification({
      title: '🔧 System Alert',
      message,
      priority,
      category: 'system',
    });
  }

  /**
   * Show performance benchmark notification
   */
  alertPerformance(metric: string, value: string, status: 'good' | 'warning' | 'critical'): void {
    const icons = { good: '✅', warning: '⚠️', critical: '🔴' };
    const priorities: Record<string, NotificationPriority> = {
      good: 'low',
      warning: 'medium',
      critical: 'high',
    };

    this.addNotification({
      title: `${icons[status]} Performance: ${metric}`,
      message: `Current value: ${value}`,
      priority: priorities[status],
      category: 'performance',
    });
  }

  /**
   * Private: Show toast for notification based on priority
   */
  private showToastForNotification(notification: Notification): void {
    const message = `${notification.title}\n${notification.message}`;

    switch (notification.priority) {
      case 'critical':
        this.error(message, 10000);
        break;
      case 'high':
        this.warning(message, 6000);
        break;
      case 'medium':
        this.info(message, 4000);
        break;
      case 'low':
        this.info(message, 3000);
        break;
    }
  }

  /**
   * Private: Notify all listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.notifications));
  }

  /**
   * Private: Save to localStorage
   */
  private saveNotifications(): void {
    try {
      localStorage.setItem('smartenergy_notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.warn('Failed to save notifications:', error);
    }
  }

  /**
   * Private: Load from localStorage
   */
  private loadNotifications(): void {
    try {
      const saved = localStorage.getItem('smartenergy_notifications');
      if (saved) {
        this.notifications = JSON.parse(saved).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
      }
    } catch (error) {
      console.warn('Failed to load notifications:', error);
      this.notifications = [];
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
