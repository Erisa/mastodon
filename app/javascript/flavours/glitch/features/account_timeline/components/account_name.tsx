import type { FC } from 'react';

import { useIntl } from 'react-intl';

import { DisplayName } from '@/flavours/glitch/components/display_name';
import { Icon } from '@/flavours/glitch/components/icon';
import { useAccount } from '@/flavours/glitch/hooks/useAccount';
import { useAppSelector } from '@/flavours/glitch/store';
import HelpIcon from '@/material-icons/400-24px/help.svg?react';
import LockIcon from '@/material-icons/400-24px/lock.svg?react';

import { DomainPill } from '../../account/components/domain_pill';
import { isRedesignEnabled } from '../common';

import classes from './redesign.module.scss';

export const AccountName: FC<{ accountId: string }> = ({ accountId }) => {
  const intl = useIntl();
  const account = useAccount(accountId);
  const me = useAppSelector((state) => state.meta.get('me') as string);
  const localDomain = useAppSelector(
    (state) => state.meta.get('domain') as string,
  );

  if (!account) {
    return null;
  }

  const [username = '', domain = localDomain] = account.acct.split('@');

  if (!isRedesignEnabled()) {
    return (
      <h1>
        <DisplayName account={account} variant='simple' />
        <small>
          <span>
            @{username}
            <span className='invisible'>@{domain}</span>
          </span>
          <DomainPill
            username={username}
            domain={domain}
            isSelf={me === account.id}
          />
          {account.locked && (
            <Icon
              id='lock'
              icon={LockIcon}
              aria-label={intl.formatMessage({
                id: 'account.locked_info',
                defaultMessage:
                  'This account privacy status is set to locked. The owner manually reviews who can follow them.',
              })}
            />
          )}
        </small>
      </h1>
    );
  }

  return (
    <div className={classes.name}>
      <h1>
        <DisplayName account={account} variant='simple' />
      </h1>
      <p className={classes.username}>
        @{username}@{domain}
        <DomainPill
          username={username}
          domain={domain}
          isSelf={me === account.id}
          className={classes.domainPill}
        >
          <Icon id='help' icon={HelpIcon} />
        </DomainPill>
      </p>
    </div>
  );
};
