import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import { NewspaperIcon } from '@phosphor-icons/react';

import { showAnnouncements } from '@/flavours/glitch/actions/announcements';
import { closeModal } from '@/flavours/glitch/actions/modal';
import { Button } from '@/flavours/glitch/components/button/redesign';
import { useAppDispatch } from '@/flavours/glitch/store';
import { isRedesignEnabled } from '@/flavours/glitch/utils/environment';

import { useHasAnnouncements } from '../../announcements/hooks';

export const ShowAnnouncementsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hasAnnouncements, shouldShowAnnouncements } = useHasAnnouncements({
    fetch: false,
  });

  const handleClick = useCallback(() => {
    dispatch(showAnnouncements());
    dispatch(
      closeModal({ modalType: 'NOTIFICATION_SETTINGS', ignoreFocus: false }),
    );
  }, [dispatch]);

  if (!isRedesignEnabled() || !hasAnnouncements || shouldShowAnnouncements) {
    return null;
  }

  return (
    <Button
      size='sm'
      leadingIcon={NewspaperIcon}
      variant='ghost'
      onClick={handleClick}
    >
      <FormattedMessage
        id='notifications.show_server_announcements'
        defaultMessage='Show server announcements'
      />
    </Button>
  );
};
