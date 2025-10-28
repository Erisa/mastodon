import { useCallback, useMemo } from 'react';

import { useHistory } from 'react-router-dom';

import type { List } from 'immutable';

import type { History } from 'history';

import type { ApiMentionJSON } from '@/flavours/glitch/api_types/statuses';
import { EmojiHTML } from '@/flavours/glitch/components/emoji/html';
import { useElementHandledLink } from '@/flavours/glitch/components/status/handled_link';
import type { Status } from '@/flavours/glitch/models/status';
import { isModernEmojiEnabled } from '@/flavours/glitch/utils/environment';

import type { Mention } from './embedded_status';

const handleMentionClick = (
  history: History,
  mention: ApiMentionJSON,
  e: MouseEvent,
) => {
  if (e.button === 0 && !(e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    history.push(`/@${mention.acct}`);
  }
};

const handleHashtagClick = (
  history: History,
  hashtag: string,
  e: MouseEvent,
) => {
  if (e.button === 0 && !(e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    history.push(`/tags/${hashtag.replace(/^#/, '')}`);
  }
};

export const EmbeddedStatusContent: React.FC<{
  status: Status;
  className?: string;
}> = ({ status, className }) => {
  const history = useHistory();

  const mentions = useMemo(
    () => (status.get('mentions') as List<Mention>).toJS(),
    [status],
  );
  const hrefToMention = useCallback(
    (href: string) => {
      return mentions.find((item) => item.url === href);
    },
    [mentions],
  );
  const htmlHandlers = useElementHandledLink({
    hashtagAccountId: status.get('account') as string | undefined,
    hrefToMention,
  });

  const handleContentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || isModernEmojiEnabled()) {
        return;
      }

      const links = node.querySelectorAll<HTMLAnchorElement>('a');

      for (const link of links) {
        if (link.classList.contains('status-link')) {
          continue;
        }

        link.classList.add('status-link');

        const mention = mentions.find((item) => link.href === item.url);

        if (mention) {
          link.addEventListener(
            'click',
            handleMentionClick.bind(null, history, mention),
            false,
          );
          link.setAttribute('title', `@${mention.acct}`);
          link.setAttribute('href', `/@${mention.acct}`);
        } else if (
          link.textContent.startsWith('#') ||
          link.previousSibling?.textContent?.endsWith('#')
        ) {
          link.addEventListener(
            'click',
            handleHashtagClick.bind(null, history, link.text),
            false,
          );
          link.setAttribute('href', `/tags/${link.text.replace(/^#/, '')}`);
        } else {
          link.setAttribute('title', link.href);
          link.classList.add('unhandled-link');
        }
      }
    },
    [mentions, history],
  );

  return (
    <EmojiHTML
      {...htmlHandlers}
      className={className}
      ref={handleContentRef}
      lang={status.get('language') as string}
      htmlString={status.get('contentHtml') as string}
    />
  );
};
