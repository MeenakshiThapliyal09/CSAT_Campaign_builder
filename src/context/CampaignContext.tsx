import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { defaultCampaignConfig } from '../data/defaultCampaignConfig';
import type { CampaignConfig } from '../types/campaign';

interface CampaignContextValue {
  campaign: CampaignConfig;
  setCampaign: Dispatch<SetStateAction<CampaignConfig>>;
}

export const CampaignContext = createContext<CampaignContextValue | undefined>(undefined);

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
