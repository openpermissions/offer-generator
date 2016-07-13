const React = require('react'),
      {connect} = require('react-redux'),
      ConstraintValue  = require('../components/constraint-value'),
      {mapDispatchToProps} = require('../util');

const ConstraintValueContainer = connect(
  null,
  mapDispatchToProps
)(ConstraintValue);

export default ConstraintValueContainer