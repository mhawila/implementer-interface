import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { PropertyEditor } from 'form-builder/components/PropertyEditor';
import sinon from 'sinon';

chai.use(chaiEnzyme());

describe('Property Editor', () => {
  let wrapper;
  let metadata;
  let attributes;

  function controlDescriptor(attr) {
    return {
      metadata: {
        attributes: [
          { name: 'label', type: 'text', defaultValue: 'someLabel' },
          {
            name: 'properties',
            type: 'complex',
            attributes: attr,
          },
        ],
      },
    };
  }

  beforeEach(() => {
    window.componentStore = {
      getDesignerComponent: () => controlDescriptor(),
    };

    const properties = {
      allowDecimal: true,
      somethingElse: true,
    };

    metadata = {
      type: 'text',
      properties,
    };

    attributes = [
      {
        name: 'mandatory',
        dataType: 'boolean',
        defaultValue: false,
      },
      {
        name: 'allowDecimal',
        dataType: 'boolean',
        defaultValue: false,
      },
    ];
  });

  afterEach(() => {
    delete window.componentStore;
  });

  it('should render Property if present', () => {
    window.componentStore.getDesignerComponent = () => controlDescriptor(attributes);
    wrapper = shallow(<PropertyEditor metadata={metadata} onPropertyUpdate={() => {}} />);
    expect(wrapper).to.have.exactly(2).descendants('Property');
  });

  it('should render Property with default value when not present in metadata', () => {
    window.componentStore.getDesignerComponent = () => controlDescriptor(attributes);
    wrapper = shallow(<PropertyEditor metadata={metadata} onPropertyUpdate={() => {}} />);

    expect(wrapper.find('Property').at(0).props().name).to.eql('mandatory');
    expect(wrapper.find('Property').at(0).props().value).to.eql(false);
  });

  it('should render Property with value from metadata if present', () => {
    window.componentStore.getDesignerComponent = () => controlDescriptor(attributes);
    wrapper = shallow(<PropertyEditor metadata={metadata} onPropertyUpdate={() => {}} />);

    expect(wrapper.find('Property').at(1).props().name).to.eql('allowDecimal');
    expect(wrapper.find('Property').at(1).props().value).to.eql(true);
  });

  it('should not render Property if there are no property attributes', () => {
    window.componentStore.getDesignerComponent = () => controlDescriptor([]);
    wrapper = shallow(<PropertyEditor metadata={metadata} onPropertyUpdate={() => {}} />);
    expect(wrapper).to.be.blank();
  });

  it('should update property in metadata if changed', () => {
    const spy = sinon.spy();
    window.componentStore.getDesignerComponent = () => controlDescriptor(attributes);

    wrapper = shallow(<PropertyEditor metadata={metadata} onPropertyUpdate={spy} />);
    wrapper.find('Property').at(1).props().onPropertyUpdate({ allowDecimal: true });

    sinon.assert.calledWith(spy, { allowDecimal: true });
  });
});
