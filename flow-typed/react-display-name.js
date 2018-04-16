// @flow

import { type ComponentType } from 'react';

declare module 'react-display-name' {
  // eslint-disable-next-line flowtype/no-weak-types
  declare function getDisplayName(comp: ComponentType<Object>): string;

  declare export default typeof getDisplayName;
}
