import { createAction } from '@reduxjs/toolkit';

import type { ApiNotificationJSON } from 'flavours/glitch/api_types/notifications';

export const notificationsUpdate = createAction(
  'notifications/update',
  ({
    playSound,
    ...args
  }: {
    notification: ApiNotificationJSON;
    playSound: boolean;
  }) => ({
    payload: args,
    meta: { sound: playSound ? 'boop' : undefined },
  }),
);
