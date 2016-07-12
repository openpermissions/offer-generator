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

const Bacon = require('baconjs'),
      _ = require('lodash'),
      valuesFor = require('../util').valuesFor,
      OfferTemplate = require('../template');

/**
 * Constructor for an object with instances of Bacon.Bus and Bacon.EventStream
 * used for triggering state changes in the application
 *
 * @constructor
 * @name {Action}
 * @property {Bacon.Bus} navigate path to navigate to
 * @property {Bacon.Bus} newOffer -> offer
 * @property {Bacon.Bus} loadOffer -> offer
 * @property {Bacon.Bus} saveOffer -> offerJSONLD
 * @property {Bacon.Bus} updateAttribute -> offer
 * @property {Bacon.Bus} addOdrlEntity -> offer
 * @property {Bacon.Bus} removeOdrlEntity -> offer
 * @property {Bacon.Bus} updateConstraint -> offer
 */
function Actions() {
  // Bacon.Bus instances that the views can use to send data
  _.each([
    'newOffer',
    'generateOffer',
    'updateAttribute',
    'addOdrlEntity',
    'removeOdrlEntity',
    'updateConstraint'
  ], (a) => this[a] = new Bacon.Bus(), this);

  // Bacon.EventStreams that transform data from the buses
  const newOffer = this.newOffer
                       .map(args => {this.template = new OfferTemplate()})
                       .map(() => this.template.toJS());

  const updatedOffer = this.updateAttribute
                           .map(valuesFor(['type', 'key', 'value']))
                           .map(args => this.template.updateAttribute(...args))
                           .map(args => this.template.toJS());

  const addedRule = this.addOdrlEntity
                        .map(valuesFor(['parent', 'type', 'key', 'id']))
                        .map(args => this.template.addEntity(...args))
                        .map(() => this.template.toJS());

  const removedRule = this.removeOdrlEntity
                          .map(valuesFor(['parent', 'key', 'id']))
                          .map(args => this.template.removeEntity(...args))
                          .map(() => this.template.toJS());

  const updatedConstraint = this.updateConstraint
                                .map(valuesFor(['id', 'key', 'type', 'value']))
                                .map(args => this.template.updateConstraint(...args))
                                .map(() => this.template.toJS());


  this.offerJSON = Bacon.mergeAll(newOffer, updatedOffer, addedRule, removedRule, updatedConstraint);

  this.generatedOffer = this.generateOffer
                         .map( args => this.template.constructOffer())
}

module.exports = Actions;
