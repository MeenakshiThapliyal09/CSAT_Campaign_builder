import { useState, type CSSProperties } from 'react';
import { useCampaign } from '../../hooks/useCampaign';

type PreviewScreen = 'initial' | 'feedback' | 'thankYou';

function MobilePreview() {
  const { campaign } = useCampaign();
  const [activeScreen, setActiveScreen] = useState<PreviewScreen>('initial');
  const styles = campaign.styles;
  const selectedRatingCount = 3;

  const screenStyle: CSSProperties = {
    backgroundColor: styles.backgroundColor,
    borderRadius: styles.borderRadius,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
  };

  const titleStyle: CSSProperties = {
    color: styles.titleColor,
    fontSize: styles.fontSize + 6,
    fontWeight: styles.fontWeight,
  };

  const subtitleStyle: CSSProperties = {
    color: styles.subtitleColor,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
  };

  const buttonStyle: CSSProperties = {
    backgroundColor: styles.buttonColor,
    borderRadius: styles.borderRadius,
    color: styles.buttonTextColor,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
    height: styles.buttonHeight,
    width: styles.buttonWidth,
  };

  function getRatingStyle(rating: number): CSSProperties {
    const isSelected = rating <= selectedRatingCount;

    if (campaign.feedback.ratingType === 'numbers') {
      return {
        backgroundColor: isSelected ? styles.ratingSelectedColor : 'transparent',
        borderColor: isSelected ? styles.ratingSelectedColor : styles.ratingUnselectedColor,
        color: isSelected ? styles.buttonTextColor : styles.ratingUnselectedColor,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
      };
    }

    return {
      borderColor: styles.ratingUnselectedColor,
      color: isSelected ? styles.ratingSelectedColor : styles.ratingUnselectedColor,
      fontSize: styles.fontSize + 2,
      fontWeight: styles.fontWeight,
    };
  }

  function renderRating() {
    if (campaign.feedback.ratingType === 'numbers') {
      return (
        <div className="preview-rating" aria-label="Rating options">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span className="preview-rating__number" key={rating} style={getRatingStyle(rating)}>
              {rating}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="preview-rating" aria-label="Rating options">
        {[1, 2, 3, 4, 5].map((rating) => (
          <span className="preview-rating__star" key={rating} style={getRatingStyle(rating)}>
            {'\u2605'}
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
              <div
                className="preview-option"
                key={option.id}
                style={{
                  borderRadius: styles.borderRadius,
                  color: styles.subtitleColor,
                  fontSize: styles.fontSize - 2,
                  fontWeight: styles.fontWeight,
                }}
              >
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
              style={{
                borderRadius: styles.borderRadius,
                color: styles.subtitleColor,
                fontSize: styles.fontSize - 2,
                fontWeight: styles.fontWeight,
              }}
            />
          )}

          <button className="preview-button" type="button" style={buttonStyle}>
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
              style={{ borderRadius: styles.borderRadius }}
            />
          )}
          <h2 style={titleStyle}>{campaign.thankYou.title}</h2>
          <p style={subtitleStyle}>{campaign.thankYou.subtitle}</p>
          <button className="preview-button" type="button" style={buttonStyle}>
            {campaign.thankYou.buttonText}
          </button>
        </div>
      );
    }

    return (
      <div className="preview-content">
        <h2 style={titleStyle}>{campaign.initialFeedback.title}</h2>
        <p style={subtitleStyle}>{campaign.initialFeedback.subtitle}</p>
      </div>
    );
  }

  return (
    <section className="mobile-preview" aria-label="Mobile preview">
      <div className="mobile-preview__selector" aria-label="Preview screen selector">
        <button
          className={
            activeScreen === 'initial'
              ? 'mobile-preview__selector-button active'
              : 'mobile-preview__selector-button'
          }
          type="button"
          onClick={() => setActiveScreen('initial')}
        >
          Initial Feedback
        </button>
        <button
          className={
            activeScreen === 'feedback'
              ? 'mobile-preview__selector-button active'
              : 'mobile-preview__selector-button'
          }
          type="button"
          onClick={() => setActiveScreen('feedback')}
        >
          Feedback
        </button>
        <button
          className={
            activeScreen === 'thankYou'
              ? 'mobile-preview__selector-button active'
              : 'mobile-preview__selector-button'
          }
          type="button"
          onClick={() => setActiveScreen('thankYou')}
        >
          Thank You
        </button>
      </div>

      <div className="mobile-preview__device">
        <div className="mobile-preview__screen" style={screenStyle}>
          {renderScreen()}
        </div>
      </div>
    </section>
  );
}

export default MobilePreview;
