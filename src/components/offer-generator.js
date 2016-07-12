/**
 * Main page for Offer generator
 *
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

const React = require('react'),
      Immutable = require('immutable'),
      PureRenderMixin = require('react-addons-pure-render-mixin'),
      LinkedStateMixin = require('react-addons-linked-state-mixin'),
      _ = require('lodash'),
      actions = require('../actions/index'),
      PropTypes = require('../prop-types'),
      OfferComponent = require('../components/offer');


const OfferGenerator = React.createClass({
  displayName: 'Offer Generator Page',

  mixins: [ PureRenderMixin, LinkedStateMixin ],

  propTypes: {
    template: React.PropTypes.object,
    validationErrors: PropTypes.object
  },


  getInitialState: function() {
    return {
      errors: {}
    }
  },

  /**
   * Save offer to repository
   * @param event
   * @private
   */
  _generateOffer: function(event) {
    event.preventDefault();
    actions.generateOffer.push();
  },


  /**
   * Generate react div displaying created offer information
   * @returns React Element
   * @private
   */
  _getJsonLD: function() {
    let jsonld = this.props.template.get('jsonld');
    if (jsonld) {
      jsonld = <pre><code>{JSON.stringify(JSON.parse(jsonld), null, 2)}</code></pre>
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Generated Offer</div>
        <div className="panel-body">
          {jsonld}
        </div>
      </div>
    );
  },

  /**
   * Generate react element displaying offer generator
   * @returns React Element
   * @private
   */
  _getOfferGenerator: function() {
    if (this.props.template) {
      return(
        <div>
          <form className='OfferForm form row' onSubmit={this._generateOffer}>
            <OfferComponent
              template={this.props.template}
            />
            <div className='form-group col col-xs-12 cb'>
              <button className='btn btn-primary' type="submit">Generate Offer</button>
            </div>
          </form>
        </div>
      );
    }
  },

  /**
   * Render the offer generator
   *
   * @returns {object}
   */
  render: function () {
    let offerGenerator = this._getOfferGenerator();
    let jsonLD = this._getJsonLD();

    return (
      <div className='offer container m-t-30'>
        {offerGenerator}
        {jsonLD}
      </div>
    );
  }
});

module.exports = OfferGenerator;
