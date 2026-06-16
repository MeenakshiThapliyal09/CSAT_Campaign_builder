import { useState, type ReactNode } from 'react';
import { defaultCampaignConfig } from '../data/defaultCampaignConfig';
import type { CampaignConfig } from '../types/campaign';
import { CampaignContext } from './CampaignContextValue';

interface CampaignProviderProps {
  children: ReactNode;
}

export function CampaignProvider({ children }: CampaignProviderProps) {
  const [campaign, setCampaign] = useState<CampaignConfig>(defaultCampaignConfig);

  return (
    <CampaignContext.Provider value={{ campaign, setCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
}
