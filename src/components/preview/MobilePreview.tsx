import { useCampaign } from '../../hooks/useCampaign';

function MobilePreview() {
  const { campaign } = useCampaign();
  const { title, subtitle } = campaign.initialFeedback;

  return (
    <section className="mobile-preview" aria-label="Mobile preview">
      <div className="mobile-preview__device">
        <div className="mobile-preview__screen">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export default MobilePreview;
