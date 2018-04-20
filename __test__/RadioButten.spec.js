import React from 'react';
import { shallow } from 'enzyme'

import RadioButten from '../source/radio_button/index.js'

describe('RadioButten', () => {
    it('отображается корректно', () => {
        const renderedValue = shallow(<RadioButten />);
        
        expect(renderedValue).toMatchSnapshot();
    });
})