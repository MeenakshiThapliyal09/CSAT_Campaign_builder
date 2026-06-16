import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { CampaignConfig } from '../types/campaign';

export interface CampaignContextValue {
  campaign: CampaignConfig;
  setCampaign: Dispatch<SetStateAction<CampaignConfig>>;
}

export const CampaignContext = createContext<CampaignContextValue | undefined>(undefined);
