/**
 * Copyright 2016 Open Permissions Platform Coalition
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const {combineReducers} = require('redux'),
      OfferTemplate = require('../template'),
      Immutable = require('immutable');

function reducer(_template) {
  return (state, action) => {
    switch (action.type) {
      case 'GENERATE_OFFER':
        let offer = JSON.parse(_template.constructOffer());
        action.onCreate(offer);
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
  }
}

const templateReducer = (assigner, initialOffer) => {
  const _template = new OfferTemplate(assigner);
  if (initialOffer) {
    return _template.loadOffer(initialOffer).then(() => Promise.resolve(reducer(_template)))
  } else {
    return Promise.resolve(reducer(_template))
  }
};


const app = (assigner, initialOffer) => {
  return templateReducer(assigner, initialOffer).then(template => {
    return Promise.resolve(combineReducers({
      template
    }));
  });
};

export default app