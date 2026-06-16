import type { ChangeEvent } from 'react';
import { useCampaign } from '../hooks/useCampaign';

function ContentPage() {
  const { campaign, setCampaign } = useCampaign();
  const { title, subtitle } = campaign.initialFeedback;

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

  return (
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
  );
}

export default ContentPage;
