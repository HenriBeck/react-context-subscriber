// @flow

import React, { // eslint-disable-line filenames/match-exported
  type ComponentType,
  type Ref,
  type ElementProps,
} from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';
import hoistNonReactStatics from 'hoist-non-react-statics';

type Props<C> = ElementProps<C> & { innerRef?: Ref<C> | null };
type ConsumerComponent<Context> = ComponentType<{ children: (context: Context) => Node }>;

function forwardRef(Component) {
  // $FlowFixMe: Need to wait for Flow to add support for React 16.3
  return React.forwardRef
    ? React.forwardRef((props, ref) => (
      <Component
        innerRef={ref}
        {...props}
      />
    ))
    : Component;
}

function createSubscriber<P, C: ComponentType<P>>(propName, Consumer, WrappedComponent: C) {
  return function Subscriber(props: Props<C>) {
    return (
      <Consumer>
        {(context) => {
          const addProps = { [propName]: context };

          return (
            <WrappedComponent
              ref={props.innerRef}
              {...props}
              {...addProps}
            />
          );
        }}
      </Consumer>
    );
  };
}

export default function subscribeToContext<ContextType>(
  Consumer: ConsumerComponent<ContextType>,
  propName: string = 'context'
) {
  return function HoC<P, C: ComponentType<P>>(WrappedComponent: C) {
    const Subscriber = createSubscriber(propName, Consumer, WrappedComponent);

    hoistNonReactStatics(Subscriber, WrappedComponent);

    Subscriber.propTypes = { innerRef: PropTypes.func };
    Subscriber.defaultProps = { innerRef: null };
    Subscriber.displayName = `ContextSubscriber(${getDisplayName(WrappedComponent)})`;

    return forwardRef(Subscriber);
  };
}
