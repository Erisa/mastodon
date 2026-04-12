import { useId } from 'react';

import classNames from 'classnames';

import { Article } from 'flavours/glitch/components/scrollable_list/components';
import type { CollectionLockupProps } from 'flavours/glitch/features/collections/components/collection_lockup';
import { CollectionLockup } from 'flavours/glitch/features/collections/components/collection_lockup';
import { CollectionMenu } from 'flavours/glitch/features/collections/components/collection_menu';

import classes from './collection_list_item.module.scss';

interface CollectionListItemProps extends CollectionLockupProps {
  withoutBorder?: boolean;
  positionInList: number;
  listSize: number;
}

export const CollectionListItem: React.FC<CollectionListItemProps> = ({
  collection,
  withoutBorder,
  positionInList,
  listSize,
  ...otherProps
}) => {
  const uniqueId = useId();
  const linkId = `${uniqueId}-link`;
  const infoId = `${uniqueId}-info`;

  return (
    <Article
      focusable
      className={classNames(
        classes.wrapper,
        withoutBorder && classes.wrapperWithoutBorder,
      )}
      aria-labelledby={linkId}
      aria-describedby={infoId}
      aria-posinset={positionInList}
      aria-setsize={listSize}
    >
      <CollectionLockup collection={collection} {...otherProps} />

      <CollectionMenu
        context='list'
        collection={collection}
        className={classes.menuButton}
      />
    </Article>
  );
};
