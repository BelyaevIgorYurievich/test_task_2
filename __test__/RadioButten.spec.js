import React from 'react';
import { shallow } from 'enzyme'

import RadioButton from '../source/radio_button/index.js'

describe('RadioButton', () => {
    it('отображается корректно', () => {
        const renderedValue = shallow(<RadioButton />);
        
        expect(renderedValue).toMatchSnapshot();
    });
})