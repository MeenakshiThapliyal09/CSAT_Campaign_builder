export interface FeedbackOption {
  id: string;
  label: string;
}

export interface InitialFeedbackConfig {
  title: string;
  subtitle: string;
}

export interface FeedbackConfig {
  ratingType: 'stars' | 'numbers';
  options: FeedbackOption[];
  isAdditionalCommentEnabled: boolean;
  submitButtonText: string;
}

export interface ThankYouConfig {
  mediaUrl: string;
  mediaName: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface StyleConfig {
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontSize: number;
  fontWeight: number;
  borderRadius: number;
  buttonWidth: number;
  buttonHeight: number;
  ratingSelectedColor: string;
  ratingUnselectedColor: string;
}

export interface CampaignConfig {
  initialFeedback: InitialFeedbackConfig;
  feedback: FeedbackConfig;
  thankYou: ThankYouConfig;
  styles: StyleConfig;
}
