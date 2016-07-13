const OfferTemplate = require('../template'),
      Immutable = require('immutable');

const _template = new OfferTemplate();
const template = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ATTRIBUTE':
      _template.updateAttribute(action.attrType, action.key, action.value);
      return Immutable.fromJS(Object.assign({}, _template.toJS()));
    case 'ADD_ENTITY':
      _template.addEntity(action.parent, action.attrType, action.key, action.id);
      return Immutable.fromJS(Object.assign({}, _template.toJS()));
    case 'REMOVE_ENTITY':
      _template.removeEntity(action.parent, action.key, action.id);
      return Immutable.fromJS(Object.assign({}, _template.toJS()));
    case 'UPDATE_CONSTRAINT':
      _template.updateConstraint(action.id, action.key, action.attrType, action.value);
      return Immutable.fromJS(Object.assign({}, _template.toJS()));
    case 'GENERATE_OFFER':
      let newState = Object.assign({}, state.toJS(), {jsonld: JSON.parse(_template.constructOffer())});
      return Immutable.fromJS(newState);
    default:
      return Immutable.fromJS(_template.toJS())
  }
};

export default template