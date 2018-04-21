import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

export default class RadioButten extends React.PureComponent {

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

RadioButten.defaultProps = {
    isActive: false
};

RadioButten.propTypes = {
    isActive: PropTypes.bool,
    handleСhange: PropTypes.func
}
