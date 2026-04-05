import { isServerFeatureEnabled } from '@/flavours/glitch/utils/environment';

export function areCollectionsEnabled() {
  return isServerFeatureEnabled('collections');
}
