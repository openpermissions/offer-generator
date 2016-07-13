const React = require('react'),
      {connect} = require('react-redux'),
      Constraint  = require('../components/constraint'),
      {updateAttribute, removeEntity} = require('../actions');


const mapDispatchToProps = (dispatch) => {
  return {
    updateAttribute: (attrs) => {
      dispatch(updateAttribute(attrs))
    },
    removeEntity: (attrs) => {
      dispatch(removeEntity(attrs))
    }
  }
};
const ConstraintContainer = connect(
  null,
  mapDispatchToProps
)(Constraint);

export default ConstraintContainer