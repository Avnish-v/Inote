import React from "react";

import PropTypes from "prop-types";

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Alert = props => {
	return (
		<div className="alert alert-primary" role="alert">
			{props.msg}
		</div>
	);
};
 
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
// #endregion

export default Alert;
