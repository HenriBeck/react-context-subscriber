// @flow

import React, {
  type ComponentType,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';

type Options = { propName?: string };
type Props = { innerRef?: Ref<ComponentType<{}>> };

export default function subscribeToContext(
  Consumer: ComponentType<Object>,
  { propName = 'context' }: Options = {},
) {
  return (Component: ComponentType<Object>) => {
    function Subscriber({
      innerRef,
      ...props
    }: Props, forwardedRef: Ref<typeof Component>) {
      const ref = React.forwardRef ? forwardedRef : innerRef;

      console.log(forwardedRef, ref);

      return (
        <Consumer>
          {(context) => {
            const addProps = { [propName]: context };

            return (
              <Component
                ref={ref}
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

    return React.forwardRef ? React.forwardRef(Subscriber) : Subscriber;
  };
}
