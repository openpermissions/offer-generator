const React = require('react'),
      {connect} = require('react-redux'),
      OdrlList  = require('../components/odrl-list'),
      {addEntity} = require('../actions');

const mapDispatchToProps = (dispatch) => {
  return {
    addEntity: (attrs) => {
      dispatch(addEntity(attrs))
    }
  }
};

const ListContainer = connect(
  null,
  mapDispatchToProps
)(OdrlList);

export default ListContainer