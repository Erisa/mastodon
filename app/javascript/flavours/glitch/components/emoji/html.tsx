import { useMemo } from 'react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

import classNames from 'classnames';

import type { CustomEmojiMapArg } from '@/flavours/glitch/features/emoji/types';
import { isModernEmojiEnabled } from '@/flavours/glitch/utils/environment';
import { htmlStringToComponents } from '@/flavours/glitch/utils/html';

import { AnimateEmojiProvider, CustomEmojiProvider } from './context';
import { textToEmojis } from './index';

type EmojiHTMLProps<Element extends ElementType = 'div'> = Omit<
  ComponentPropsWithoutRef<Element>,
  'dangerouslySetInnerHTML' | 'className'
> & {
  htmlString: string;
  extraEmojis?: CustomEmojiMapArg;
  as?: Element;
  className?: string;
};

export const ModernEmojiHTML = ({
  extraEmojis,
  htmlString,
  as: asProp = 'div', // Rename for syntax highlighting
  shallow,
  className = '',
  ...props
}: EmojiHTMLProps<ElementType>) => {
  const contents = useMemo(
    () => htmlStringToComponents(htmlString, { onText: textToEmojis }),
    [htmlString],
  );

  return (
    <CustomEmojiProvider emojis={extraEmojis}>
      <AnimateEmojiProvider {...props} as={asProp} className={className}>
        {contents}
      </AnimateEmojiProvider>
    </CustomEmojiProvider>
  );
};

export const LegacyEmojiHTML = <Element extends ElementType>(
  props: EmojiHTMLProps<Element>,
) => {
  const { as: asElement, htmlString, extraEmojis, className, ...rest } = props;
  const Wrapper = asElement ?? 'div';
  return (
    <Wrapper
      {...rest}
      dangerouslySetInnerHTML={{ __html: htmlString }}
      className={classNames(className, 'animate-parent')}
    />
  );
};

export const EmojiHTML = isModernEmojiEnabled()
  ? ModernEmojiHTML
  : LegacyEmojiHTML;
