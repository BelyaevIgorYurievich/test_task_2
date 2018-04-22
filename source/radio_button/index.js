import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

export default class RadioButton extends React.PureComponent {

    render() {
        const {
            isActive,
            handleСhange,
            fieldName
        } = this.props;

        return(
            <div className='radio-butten'onClick={handleСhange}>
                {isActive && <div className='circle'/>}
                <span className='field-name'>{fieldName}</span>
            </div>
        )
    }
}

RadioButton.defaultProps = {
    isActive: false
};

RadioButton.propTypes = {
    isActive: PropTypes.bool,
    handleСhange: PropTypes.func
}
