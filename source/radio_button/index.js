import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

export default class RadioButten extends React.PureComponent {

    render() {
        const {
            isActive,
            handleСhange
        } = this.props;

        return(
            <div className={isActive ? 'radio-butten active' : 'radio-butten'}
                onClick={handleСhange}
            />
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
