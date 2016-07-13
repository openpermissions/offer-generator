const {combineReducers} = require('redux'),
      OfferTemplate = require('../template'),
      Immutable = require('immutable');

const _template = new OfferTemplate();

const jsonld = (state=null, action) => {
  switch (action.type) {
    case 'GENERATE_OFFER':
      let newState = JSON.parse(_template.constructOffer());
      return Immutable.fromJS(newState);

    default:
      return state;
  }
};

const template = (state, action) => {
  switch (action.type) {
    case 'GENERATE_OFFER':
      return state;

    case 'UPDATE_ATTRIBUTE':
      _template.updateAttribute(action.attrType, action.key, action.value);
      return Immutable.fromJS(_template.toJS());

    case 'ADD_ENTITY':
      _template.addEntity(action.parent, action.attrType, action.key, action.id);
      return Immutable.fromJS(_template.toJS());

    case 'REMOVE_ENTITY':
      _template.removeEntity(action.parent, action.key, action.id);
      return Immutable.fromJS(_template.toJS());

    case 'UPDATE_CONSTRAINT':
      _template.updateConstraint(action.id, action.key, action.attrType, action.value);
      return Immutable.fromJS(_template.toJS());

    default:
      return Immutable.fromJS(_template.toJS());
  }
};


const app = combineReducers({
  template,
  jsonld
});

export default app