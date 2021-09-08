import React, { Component } from 'react';
import DefaultComponent from 'components/Component/DefaultComponent';

const WrappedComponent = (importComponent) => {
  const Defaultcomponent = DefaultComponent;
  class ContainerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent().catch(() => ({
        default: DefaultComponent(),
      }));
    }

    componentWillUnmount() {}

    render() {
      const { component: C } = this.state;

      // eslint-disable-next-line react/jsx-props-no-spreading
      return C ? <C {...this.props} /> : null;
    }
  }
};

export default WrappedComponent;
