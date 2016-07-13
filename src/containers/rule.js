const React = require('react'),
      {connect} = require('react-redux'),
      Rule  = require('../components/rule'),
      {mapDispatchToProps} = require('../util');

const RuleContainer = connect(
  null,
  mapDispatchToProps
)(Rule);

export default RuleContainer