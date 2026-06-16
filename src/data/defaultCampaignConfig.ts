import type { CampaignConfig } from '../types/campaign';

export const defaultCampaignConfig: CampaignConfig = {
  initialFeedback: {
    title: 'How was your experience?',
    subtitle: 'Your feedback helps us improve our service.',
  },
  feedback: {
    ratingType: 'stars',
    options: [
      { id: 'slow-service', label: 'Slow service' },
      { id: 'hard-to-use', label: 'Hard to use' },
      { id: 'great-support', label: 'Great support' },
    ],
    isAdditionalCommentEnabled: true,
    submitButtonText: 'Submit Feedback',
  },
  thankYou: {
    mediaUrl: '',
    mediaName: '',
    title: 'Thank you for your feedback!',
    subtitle: 'We appreciate you taking the time to share your experience.',
    buttonText: 'Close',
  },
  styles: {
    backgroundColor: '#ffffff',
    titleColor: '#111827',
    subtitleColor: '#6b7280',
    buttonColor: '#2563eb',
    buttonTextColor: '#ffffff',
    fontSize: 16,
    fontWeight: 500,
    borderRadius: 12,
    buttonWidth: 220,
    buttonHeight: 44,
    ratingSelectedColor: '#f59e0b',
    ratingUnselectedColor: '#d1d5db',
  },
};
