// @flow

import React, { // eslint-disable-line filenames/match-exported
  type ComponentType,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

type Props<C> = { innerRef?: Ref<C> | null };
type ConsumerComponent<Context> = ComponentType<{ children: (context: Context) => Node }>;

function forwardRef(Subscriber) {
  // $FlowFixMe: Need to wait for Flow to add support for React 16.3
  return React.forwardRef
    ? React.forwardRef((props, ref) => (
      <Subscriber
        innerRef={ref}
        {...props}
      />
    ))
    : Subscriber;
}

export default function subscribeToContext<ContextType>(
  Consumer: ConsumerComponent<ContextType>,
  propName: string = 'context'
) {
  // eslint-disable-next-line flowtype/no-weak-types
  return function HoC<C: ComponentType<Object>>(Component: C) {
    function Subscriber(props: Props<C>) {
      return (
        <Consumer>
          {(context) => {
            const addProps = { [propName]: context };

            return (
              <Component
                ref={props.innerRef}
                {...addProps}
                {...props}
              />
            );
          }}
        </Consumer>
      );
    }

    Subscriber.propTypes = { innerRef: PropTypes.func };
    Subscriber.defaultProps = { innerRef: null };
    Subscriber.displayName = `ContextSubscriber(${getDisplayName(Component)})`;

    // $FlowFixMe: Need to wait for Flow to add support for React 16.3
    return forwardRef(Subscriber);
  };
}
