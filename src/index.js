// @flow

import React, { // eslint-disable-line filenames/match-exported
  type ComponentType,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

type ContextType = mixed;
type ConsumerType = ComponentType<{ children: (value: ContextType) => Node }>;

export default function subscribeToContext(Consumer: ConsumerType, propName: string = 'context') {
  // eslint-disable-next-line flowtype/no-weak-types
  return function HoC<C: ComponentType<Object>>(Component: C) {
    function Subscriber({
      innerRef,
      ...props
    }: { innerRef?: Ref<C> | null }) {
      return (
        <Consumer>
          {(context: ContextType) => {
            const addProps = { [propName]: context };

            return (
              <Component
                ref={innerRef}
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
    return React.forwardRef
      ? React.forwardRef((props, ref) => (
        <Subscriber
          innerRef={ref}
          {...props}
        />
      ))
      : Subscriber;
  };
}
