import { useNotificationContext } from '../contexts/NotificationContext';

export const useNotificationService = () => {
  const { addNotification } = useNotificationContext();

  const notifyStreakMilestone = (days: number) => {
    try {
      addNotification({
        type: 'achievement',
        title: `🎉 ${days}-Day Streak Milestone!`,
        message: `Congratulations! You've maintained a ${days}-day learning streak. Keep it up!`,
        priority: 'high',
        category: 'Learning'
      });
    } catch (error) {
      console.error('Error adding streak milestone notification:', error);
    }
  };

  const notifyDailyGoalReminder = (pendingGoals: number) => {
    try {
      addNotification({
        type: 'reminder',
        title: '📚 Daily Goal Reminder',
        message: `You have ${pendingGoals} pending goals for today. Complete them to maintain your streak!`,
        priority: 'medium',
        category: 'Goals',
        actionUrl: '/'
      });
    } catch (error) {
      console.error('Error adding daily goal reminder notification:', error);
    }
  };

  const notifyModuleCompletion = (moduleName: string) => {
    try {
      addNotification({
        type: 'achievement',
        title: '⭐ Module Completed!',
        message: `You've successfully completed "${moduleName}" module. Great job!`,
        priority: 'high',
        category: 'Learning'
      });
    } catch (error) {
      console.error('Error adding module completion notification:', error);
    }
  };

  const notifyNewFeature = (featureName: string, description: string, actionUrl?: string) => {
    addNotification({
      type: 'update',
      title: `🚀 New Feature: ${featureName}`,
      message: description,
      priority: 'medium',
      category: 'Features',
      actionUrl
    });
  };

  const notifyStudyGroupInvite = (groupName: string) => {
    addNotification({
      type: 'social',
      title: '👥 Study Group Invitation',
      message: `You've been invited to join the "${groupName}" study group.`,
      priority: 'low',
      category: 'Community'
    });
  };

  const notifyAchievement = (title: string, message: string, category: string = 'Learning') => {
    try {
      addNotification({
        type: 'achievement',
        title,
        message,
        priority: 'high',
        category,
      });
    } catch (error) {
      console.error('Error adding achievement notification:', error);
    }
  };

  return {
    notifyStreakMilestone,
    notifyDailyGoalReminder,
    notifyModuleCompletion,
    notifyNewFeature,
    notifyStudyGroupInvite,
    notifyAchievement
  };
};

