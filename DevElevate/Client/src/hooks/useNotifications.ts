import { useNotificationContext } from '../contexts/NotificationContext';

export const useNotifications = () => {
  const { addNotification } = useNotificationContext();

  const notifyAchievement = (title: string, message: string, category: string = 'Learning') => {
    addNotification({
      type: 'achievement',
      title,
      message,
      priority: 'high',
      category,
    });
  };

  const notifyReminder = (title: string, message: string, actionUrl?: string) => {
    addNotification({
      type: 'reminder',
      title,
      message,
      priority: 'medium',
      category: 'Goals',
      actionUrl,
    });
  };

  const notifyUpdate = (title: string, message: string, actionUrl?: string) => {
    addNotification({
      type: 'update',
      title,
      message,
      priority: 'medium',
      category: 'Features',
      actionUrl,
    });
  };

  const notifySystem = (title: string, message: string, priority: 'low' | 'medium' | 'high' = 'low') => {
    addNotification({
      type: 'system',
      title,
      message,
      priority,
      category: 'System',
    });
  };

  const notifySocial = (title: string, message: string) => {
    addNotification({
      type: 'social',
      title,
      message,
      priority: 'low',
      category: 'Community',
    });
  };

  return {
    notifyAchievement,
    notifyReminder,
    notifyUpdate,
    notifySystem,
    notifySocial,
  };
};