const React = require('react'),
      {connect} = require('react-redux'),
      Constraint  = require('../components/constraint'),
      {mapDispatchToProps} = require('../util');

const ConstraintContainer = connect(
  null,
  mapDispatchToProps
)(Constraint);

export default ConstraintContainer