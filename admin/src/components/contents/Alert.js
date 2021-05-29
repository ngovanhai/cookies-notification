import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Toast } from "@shopify/polaris";
const Alert = ({ alerts }) => {
  return (
    <div>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert, index) => <Toast key={index} content={alert.msg} />)}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  reviews: state.reviews,
});

export default connect(mapStateToProps)(Alert);
