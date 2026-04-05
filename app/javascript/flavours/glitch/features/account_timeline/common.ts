import type { AccountFieldShape } from '@/flavours/glitch/models/account';

export interface AccountField extends AccountFieldShape {
  nameHasEmojis: boolean;
  value_plain: string;
  valueHasEmojis: boolean;
}
