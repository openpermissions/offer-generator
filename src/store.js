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
 *
 */
'use strict';

const Immutable = require('immutable'),
      Bacon = require('baconjs'),
      OfferTemplate = require('./template');


function setOffer(prev, template) {
  return prev.set('template', Immutable.fromJS(template));
}

function offerGenerated(prev, jsonld) {
  return prev.setIn(['template', 'jsonld'], Immutable.fromJS(jsonld))
}


 /*
 * The data in the object is fetched from multiple end points, so is built
 * up as responses are received.
 *
 * @constructor
 * @param {Action} actions an instance of actions/Actions
 * @param {object} routes a mapping of paths to page components
 * @name {Store}
 * @property {Bacon.Property} app application state, property returns Immutable.Map instances
 * @property {Bacon.EventStream} errors stream of error strings
 */
function Store(actions) {
  let template = new OfferTemplate();
  actions.template = template;
  // Create a Bacon.Property that updates in response to our event streams
  this.app = Bacon.update(Immutable.Map({template: Immutable.fromJS(template.toJS())}),
    actions.offerJSON, setOffer,
    actions.generatedOffer, offerGenerated
  );

  // Not currently storing the error messages - assume they will be discarded
  // whenever the app renders.
  const errors = this.app.errors().mapError(function (error) {
    if (error.hasOwnProperty('response')) {
      return error.response.body.errors;
    } else {
      return [error.message];
    }
  });
  this.errors = Bacon.mergeAll(errors);
}

module.exports = Store;
