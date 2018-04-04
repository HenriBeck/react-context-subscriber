// @flow

import React, {
  type ComponentType,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';

type Options = { propName?: string };
type Props = { innerRef?: Ref<ComponentType<{}>> };

const getDisplayName = (comp: ComponentType<{}>): string => comp.displayName || comp.name || 'Component';

export default function subscribeToContext(
  Consumer: ComponentType<Object>,
  { propName = 'context' }: Options = {},
) {
  return (Component: ComponentType<Object>) => {
    function Subscriber({
      innerRef,
      ...props
    }: Props) {
      return (
        <Consumer>
          {(context) => {
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

    const displayName = `ContextSubscriber(${getDisplayName(Component)})`;

    Subscriber.propTypes = { innerRef: PropTypes.func };
    Subscriber.defaultProps = { innerRef: null };
    Subscriber.displayName = displayName;

    function forwardRef(props: {}, ref: Ref<ComponentType<{}>>) {
      return (
        <Subscriber
          innerRef={ref}
          {...props}
        />
      );
    }

    forwardRef.displayName = displayName;

    return React.forwardRef ? React.forwardRef(forwardRef) : Subscriber;
  };
}
