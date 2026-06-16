import type { ChangeEvent } from 'react';
import { useCampaign } from '../hooks/useCampaign';
import type { StyleConfig } from '../types/campaign';

type ColorStyleField =
  | 'backgroundColor'
  | 'titleColor'
  | 'subtitleColor'
  | 'buttonColor'
  | 'buttonTextColor'
  | 'ratingSelectedColor'
  | 'ratingUnselectedColor';

type NumericStyleField =
  | 'fontSize'
  | 'fontWeight'
  | 'borderRadius'
  | 'buttonWidth'
  | 'buttonHeight';

function StylingPage() {
  const { campaign, setCampaign } = useCampaign();
  const styles = campaign.styles;

  function updateStyleField<Key extends keyof StyleConfig>(field: Key, value: StyleConfig[Key]) {
    setCampaign((currentCampaign) => ({
      ...currentCampaign,
      styles: {
        ...currentCampaign.styles,
        [field]: value,
      },
    }));
  }

  function handleColorChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    updateStyleField(name as ColorStyleField, value);
  }

  function handleNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    updateStyleField(name as NumericStyleField, Number(value));
  }

  function handleFontWeightChange(event: ChangeEvent<HTMLSelectElement>) {
    updateStyleField('fontWeight', Number(event.target.value));
  }

  return (
    <div className="content-page">
      <section className="content-section">
        <h2>Colors</h2>

        <div className="style-grid">
          <div className="field-group">
            <label htmlFor="background-color">Background Color</label>
            <input
              id="background-color"
              name="backgroundColor"
              type="color"
              value={styles.backgroundColor}
              onChange={handleColorChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="title-color">Title Color</label>
            <input
              id="title-color"
              name="titleColor"
              type="color"
              value={styles.titleColor}
              onChange={handleColorChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="subtitle-color">Subtitle Color</label>
            <input
              id="subtitle-color"
              name="subtitleColor"
              type="color"
              value={styles.subtitleColor}
              onChange={handleColorChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="button-color">Button Color</label>
            <input
              id="button-color"
              name="buttonColor"
              type="color"
              value={styles.buttonColor}
              onChange={handleColorChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="button-text-color">Button Text Color</label>
            <input
              id="button-text-color"
              name="buttonTextColor"
              type="color"
              value={styles.buttonTextColor}
              onChange={handleColorChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="rating-selected-color">Rating Selected Color</label>
            <input
              id="rating-selected-color"
              name="ratingSelectedColor"
              type="color"
              value={styles.ratingSelectedColor}
              onChange={handleColorChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="rating-unselected-color">Rating Unselected Color</label>
            <input
              id="rating-unselected-color"
              name="ratingUnselectedColor"
              type="color"
              value={styles.ratingUnselectedColor}
              onChange={handleColorChange}
            />
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2>Typography</h2>

        <div className="style-grid">
          <div className="field-group">
            <label htmlFor="font-size">Font Size</label>
            <input
              id="font-size"
              name="fontSize"
              type="number"
              min="12"
              max="32"
              value={styles.fontSize}
              onChange={handleNumberChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="font-weight">Font Weight</label>
            <select
              id="font-weight"
              value={styles.fontWeight}
              onChange={handleFontWeightChange}
            >
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2>Layout</h2>

        <div className="style-grid">
          <div className="field-group">
            <label htmlFor="border-radius">Border Radius</label>
            <input
              id="border-radius"
              name="borderRadius"
              type="number"
              min="0"
              max="40"
              value={styles.borderRadius}
              onChange={handleNumberChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="button-width">Button Width</label>
            <input
              id="button-width"
              name="buttonWidth"
              type="number"
              min="120"
              max="280"
              value={styles.buttonWidth}
              onChange={handleNumberChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="button-height">Button Height</label>
            <input
              id="button-height"
              name="buttonHeight"
              type="number"
              min="36"
              max="72"
              value={styles.buttonHeight}
              onChange={handleNumberChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default StylingPage;
