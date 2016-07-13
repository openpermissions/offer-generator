const React = require('react'),
      {connect} = require('react-redux'),
      ConstraintValue  = require('../components/constraint-value'),
      {updateConstraint} = require('../actions');


const mapDispatchToProps = (dispatch) => {
  return {
    updateConstraint: (attrs) => {
      dispatch(updateConstraint(attrs))
    }
  }
};
const ConstraintContainer = connect(
  null,
  mapDispatchToProps
)(ConstraintValue);

export default ConstraintContainer