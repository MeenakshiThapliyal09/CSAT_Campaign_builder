import { useState, type CSSProperties } from 'react';
import { useCampaign } from '../../hooks/useCampaign';

type PreviewScreen = 'initial' | 'feedback' | 'thankYou';

function MobilePreview() {
  const { campaign } = useCampaign();
  const [activeScreen, setActiveScreen] = useState<PreviewScreen>('initial');
  const styles = campaign.styles;

  // Local interactive state for the preview only
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');

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
    const isSelected = selectedRating !== null ? rating <= selectedRating : false;

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
            <button
              key={rating}
              type="button"
              className="preview-rating__number"
              style={{ ...getRatingStyle(rating), cursor: 'pointer' }}
              onClick={() => setSelectedRating(rating)}
              aria-pressed={selectedRating === rating}
            >
              {rating}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="preview-rating" aria-label="Rating options">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            className="preview-rating__star"
            style={{ ...getRatingStyle(rating), cursor: 'pointer' }}
            onClick={() => setSelectedRating(rating)}
            aria-pressed={selectedRating === rating}
          >
            {'\u2605'}
          </button>
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
            {campaign.feedback.options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`preview-option${isSelected ? ' selected' : ''}`}
                  onClick={() =>
                    setSelectedOptions((prev) =>
                      prev.includes(option.id) ? prev.filter((id) => id !== option.id) : [...prev, option.id]
                    )
                  }
                  style={{
                    borderRadius: styles.borderRadius,
                    color: isSelected ? styles.buttonTextColor : styles.subtitleColor,
                    fontSize: styles.fontSize - 2,
                    fontWeight: styles.fontWeight,
                    backgroundColor: isSelected ? styles.buttonColor : 'transparent',
                    borderColor: isSelected ? styles.buttonColor : undefined,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {campaign.feedback.allowAdditionalComment && (
            <textarea
              className="preview-comment"
              placeholder="Add a comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                borderRadius: styles.borderRadius,
                color: styles.subtitleColor,
                fontSize: styles.fontSize - 2,
                fontWeight: styles.fontWeight,
              }}
            />
          )}

          <button
            className="preview-button"
            type="button"
            style={buttonStyle}
            onClick={() => setActiveScreen('thankYou')}
          >
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
          <button
            className="preview-button"
            type="button"
            style={buttonStyle}
            onClick={() => {
              // reset local preview state and go back to initial
              setSelectedRating(null);
              setSelectedOptions([]);
              setComment('');
              setActiveScreen('initial');
            }}
          >
            {campaign.thankYou.buttonText}
          </button>
        </div>
      );
    }

    return (
        <div className="preview-content">
          <h2 style={titleStyle}>{campaign.initialFeedback.title}</h2>
          <p style={subtitleStyle}>{campaign.initialFeedback.subtitle}</p>
          <button
            className="preview-button"
            type="button"
            style={buttonStyle}
            onClick={() => setActiveScreen('feedback')}
          >
            Continue
          </button>
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
          <div className="preview-screen" key={activeScreen}>
            {renderScreen()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobilePreview;
