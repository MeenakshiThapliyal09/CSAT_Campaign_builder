import { useState } from 'react';
import { useCampaign } from '../../hooks/useCampaign';

type PreviewScreen = 'initial' | 'feedback' | 'thankYou';

function MobilePreview() {
  const { campaign } = useCampaign();
  const [activeScreen, setActiveScreen] = useState<PreviewScreen>('initial');

  function renderRating() {
    if (campaign.feedback.ratingType === 'numbers') {
      return (
        <div className="preview-rating" aria-label="Rating options">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span className="preview-rating__number" key={rating}>
              {rating}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="preview-rating" aria-label="Rating options">
        {[1, 2, 3, 4, 5].map((rating) => (
          <span className="preview-rating__star" key={rating}>
            ★
          </span>
        ))}
      </div>
    );
  }

  function renderScreen() {
    if (activeScreen === 'feedback') {
      return (
        <div className="preview-content">
          {renderRating()}

          <div className="preview-options">
            {campaign.feedback.options.map((option) => (
              <div className="preview-option" key={option.id}>
                {option.label}
              </div>
            ))}
          </div>

          {campaign.feedback.allowAdditionalComment && (
            <textarea
              className="preview-comment"
              placeholder="Add a comment"
              readOnly
              rows={3}
            />
          )}

          <button className="preview-button" type="button">
            {campaign.feedback.submitButtonText}
          </button>
        </div>
      );
    }

    if (activeScreen === 'thankYou') {
      return (
        <div className="preview-content">
          {campaign.thankYou.mediaUrl && (
            <img
              className="preview-media"
              src={campaign.thankYou.mediaUrl}
              alt={campaign.thankYou.mediaName || 'Thank you media'}
            />
          )}
          <h2>{campaign.thankYou.title}</h2>
          <p>{campaign.thankYou.subtitle}</p>
          <button className="preview-button" type="button">
            {campaign.thankYou.buttonText}
          </button>
        </div>
      );
    }

    return (
      <div className="preview-content">
        <h2>{campaign.initialFeedback.title}</h2>
        <p>{campaign.initialFeedback.subtitle}</p>
      </div>
    );
  }

  return (
    <section className="mobile-preview" aria-label="Mobile preview">
      <div className="mobile-preview__selector" aria-label="Preview screen selector">
        <button
          className={activeScreen === 'initial' ? 'mobile-preview__selector-button active' : 'mobile-preview__selector-button'}
          type="button"
          onClick={() => setActiveScreen('initial')}
        >
          Initial Feedback
        </button>
        <button
          className={activeScreen === 'feedback' ? 'mobile-preview__selector-button active' : 'mobile-preview__selector-button'}
          type="button"
          onClick={() => setActiveScreen('feedback')}
        >
          Feedback
        </button>
        <button
          className={activeScreen === 'thankYou' ? 'mobile-preview__selector-button active' : 'mobile-preview__selector-button'}
          type="button"
          onClick={() => setActiveScreen('thankYou')}
        >
          Thank You
        </button>
      </div>

      <div className="mobile-preview__device">
        <div className="mobile-preview__screen">{renderScreen()}</div>
      </div>
    </section>
  );
}

export default MobilePreview;
