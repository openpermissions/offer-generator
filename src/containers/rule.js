const React = require('react'),
      {connect} = require('react-redux'),
      Rule  = require('../components/rule'),
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
const RuleContainer = connect(
  null,
  mapDispatchToProps
)(Rule);

export default RuleContainer