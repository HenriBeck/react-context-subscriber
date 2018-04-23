# react-context-subscriber

[![npm](https://img.shields.io/npm/v/react-context-subscriber.svg)](https://www.npmjs.com/package/react-context-subscriber) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![npm](https://img.shields.io/npm/l/react-context-subscriber.svg) ![David](https://img.shields.io/david/HenriBeck/react-context-subscriber.svg) [![CircleCI](https://circleci.com/gh/HenriBeck/react-context-subscriber.svg?style=svg)](https://circleci.com/gh/HenriBeck/react-context-subscriber) [![Greenkeeper badge](https://badges.greenkeeper.io/HenriBeck/react-context-subscriber.svg)](https://greenkeeper.io/)

A Higher-order-Component for subscribing to the new React Context.
This will make the context available in the lifecycle methods etc.

### Installation

```sh
yarn add react-context-subscriber
```
### Usage

> This doesn't actual need to be the new React Context.
> It will work with any Consumer that accepts a function as it's child.
> For example this will work with [react-create-context](https://github.com/jamiebuilds/create-react-context) too.

```js
import React from 'react';
import subscribeToContext from 'react-context-subscriber';

// Again, this doesn't need to be the new React Context
const Context = React.createContext('context');

class Component extends React.Component {
  render() {
    return this.props.context;
  }
}

export default subscribeToContext(Context.Consumer)(Component);
```

#### Change the prop name of the context

Simply pass to the HoC a string as the second argument.
The default prop name is `context`.

```js
import React from 'react';
import subscribeToContext from 'react-context-subscriber';

// Again, this doesn't need to be the new React Context
const Context = React.createContext('context');

class Component extends React.Component {
  render() {
    return this.props.context;
  }
}

export default subscribeToContext(Context.Consumer, 'propName')(Component);
```

### License

MIT
