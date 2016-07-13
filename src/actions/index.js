
module.exports = {
  generateOffer: () => {
    return {
      type: 'GENERATE_OFFER'
    }
  },
  updateAttribute: (attrs) => {
    attrs.type = 'UPDATE_ATTRIBUTE';
    return attrs;
  },
  addEntity: (attrs) => {
    attrs.type = 'ADD_ENTITY';
    return attrs;
  },
  removeEntity: (attrs) => {
    attrs.type = 'REMOVE_ENTITY';
    return attrs;
  },
  updateConstraint: (attrs) => {
    attrs.type = 'UPDATE_CONSTRAINT';
    return attrs;
  }
};