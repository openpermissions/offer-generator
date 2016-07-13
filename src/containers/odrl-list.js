const React = require('react'),
      {connect} = require('react-redux'),
      OdrlList  = require('../components/odrl-list'),
      {mapDispatchToProps} = require('../util');

const ListContainer = connect(
  null,
  mapDispatchToProps
)(OdrlList);

export default ListContainer