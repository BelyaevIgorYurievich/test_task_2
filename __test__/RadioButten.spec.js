import React from 'react';
import { shallow } from 'enzyme'

import RadioButton from '../source/radio_button/index.js'

describe('RadioButton', () => {
    const component =  shallow(<RadioButton />);

    it('Должен корректно отрисовывать компонент', () => {
        
        expect(component).toMatchSnapshot();
    });

    it('Должен корректно отображать точку' , () => {
        
        expect(component.children().find('.circle')).toHaveLength(0);

        component.setProps({ isActive: true });

        expect(component.children().find('.circle')).toHaveLength(1);
    });

    it('Должен корректно отображать название', () => {
        const text = 'Какой-то текст';

        component.setProps({ fieldName: text });
       
        expect(component.children().find('.field-name').text()).toEqual(text);
    })
})