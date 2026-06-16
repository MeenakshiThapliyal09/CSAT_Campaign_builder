import type { ChangeEvent } from 'react';
import { useCampaign } from '../hooks/useCampaign';

function ContentPage() {
  const { campaign, setCampaign } = useCampaign();
  const { title, subtitle } = campaign.initialFeedback;
  const { ratingType, options, allowAdditionalComment, submitButtonText } = campaign.feedback;

  function handleInitialFeedbackChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      initialFeedback: {
        ...currentCampaign.initialFeedback,
        [name]: value,
      },
    }));
  }

  function handleRatingTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    const ratingType = event.target.value as 'numbers' | 'stars';

    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      feedback: {
        ...currentCampaign.feedback,
        ratingType,
      },
    }));
  }

  function handleSubmitButtonTextChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      feedback: {
        ...currentCampaign.feedback,
        submitButtonText: value,
      },
    }));
  }

  function handleAdditionalCommentChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      feedback: {
        ...currentCampaign.feedback,
        allowAdditionalComment: checked,
      },
    }));
  }

  function handleOptionChange(optionId: string, value: string) {
    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      feedback: {
        ...currentCampaign.feedback,
        options: currentCampaign.feedback.options.map((option) =>
          option.id === optionId ? { ...option, label: value } : option,
        ),
      },
    }));
  }

  function handleAddOption() {
    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      feedback: {
        ...currentCampaign.feedback,
        options: [
          ...currentCampaign.feedback.options,
          {
            id: `feedback-option-${Date.now()}`,
            label: 'New option',
          },
        ],
      },
    }));
  }

  function handleDeleteOption(optionId: string) {
    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      feedback: {
        ...currentCampaign.feedback,
        options: currentCampaign.feedback.options.filter((option) => option.id !== optionId),
      },
    }));
  }

  return (
    <div className="content-page">
      <section className="content-section">
        <h2>Initial Feedback</h2>

        <div className="field-group">
          <label htmlFor="initial-title">Title</label>
          <input
            id="initial-title"
            name="title"
            type="text"
            value={title}
            onChange={handleInitialFeedbackChange}
          />
        </div>

        <div className="field-group">
          <label htmlFor="initial-subtitle">Subtitle</label>
          <textarea
            id="initial-subtitle"
            name="subtitle"
            value={subtitle}
            onChange={handleInitialFeedbackChange}
            rows={3}
          />
        </div>
      </section>

      <section className="content-section">
        <h2>Feedback Configuration</h2>

        <div className="field-group">
          <label htmlFor="rating-type">Rating Type</label>
          <select id="rating-type" value={ratingType} onChange={handleRatingTypeChange}>
            <option value="numbers">Numbers (1-5)</option>
            <option value="stars">Stars</option>
          </select>
        </div>

        <div className="field-group">
          <div className="section-header">
            <label>Feedback Options</label>
            <button type="button" onClick={handleAddOption}>
              Add option
            </button>
          </div>

          <div className="options-list">
            {options.map((option) => (
              <div className="option-row" key={option.id}>
                <input
                  aria-label="Feedback option"
                  type="text"
                  value={option.label}
                  onChange={(event) => handleOptionChange(option.id, event.target.value)}
                />
                <button type="button" onClick={() => handleDeleteOption(option.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="checkbox-field" htmlFor="allow-additional-comment">
          <input
            id="allow-additional-comment"
            type="checkbox"
            checked={allowAdditionalComment}
            onChange={handleAdditionalCommentChange}
          />
          Allow additional comment
        </label>

        <div className="field-group">
          <label htmlFor="submit-button-text">Submit Button Text</label>
          <input
            id="submit-button-text"
            type="text"
            value={submitButtonText}
            onChange={handleSubmitButtonTextChange}
          />
        </div>
      </section>
    </div>
  );
}

export default ContentPage;
