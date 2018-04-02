// @flow

import test from 'ava';
import React from 'react';

import withContext from './';

const defaultContextValue = 'context';
const { Consumer } = React.createContext(defaultContextValue);

test('withContext should return a function', (t) => {
  t.deepEqual(typeof withContext(Consumer), 'function');
});
