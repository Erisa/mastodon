import type { FC } from 'react';

import { IconLogo } from '@/flavours/glitch/components/logo';

import { AnnualReport } from './index';
import classes from './share.module.css';

export const WrapstodonShare: FC = () => {
  return (
    <main className={classes.wrapper}>
      <AnnualReport share={false} />
      <footer className={classes.footer}>
        <IconLogo className={classes.logo} />
        Generated with ♥ by the Mastodon team
      </footer>
    </main>
  );
};
