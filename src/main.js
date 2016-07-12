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

var React = require('react'),
    ReactDOM = require('react-dom'),
    Store = require('./store'),
    actions = require('./actions'),
    PureRenderMixin = require('react-addons-pure-render-mixin'),
    _ = require('lodash'),
    ErrorMessages = require('./components/error-messages'),
    OfferGenerator = require('./components/offer-generator');

var store = new Store(actions);

var Wrapper = React.createClass({
  displayName: 'Offer Generator Wrapper',
  propTypes: {
    errors: React.PropTypes.object.isRequired, // Bacon.EventStream
    app: React.PropTypes.object.isRequired     // Bacon.Property
  },
  mixins: [PureRenderMixin],

  /**
   * Set listeners on the store & errors properties
   */
  componentWillMount: function () {
    this.props.errors.onValue(this._onError);
    this.props.app.onValue(this._onStoreChange);
  },

  getInitialState: function () {
    return {
      validationErrors: {}
    };
  },

  /**
   * Set state after the app store property changes
   *
   * Errors are cleared when the store is updated.
   *
   * @param {Immutable.Map} data
   */
  _onStoreChange: function (data) {
    this.setState({
      validationErrors: {},
      errors: null,
      template: data.get('template')
    });
  },

  /**
   * Set an error message when the error property changes
   */
  _onError: function (errors) {
    var validationErrors = _.transform(errors, (result, e) => {
      if (!e.message) { return; }
      if (e.field) {
        if (typeof result[e.field] !== 'undefined' ) {
          result[e.field].append(e.message);
        } else {
          result[e.field] = [e.message];
        }
      } else {
        if (typeof result.msgs !== 'undefined') {
          result.msgs.append(e.message);
        } else {
          result.msgs = [e.message];
        }
      }
    }, {});

    this.setState({
      errors: _.map(_.filter(errors, e => !e.field && e.message), e => e.message),
      validationErrors: validationErrors
    });
  },

  /**
   * Render offer generator and error message (if any)
   *
   * @return {object}
   */
  render: function () {
    return (
      <div>
        <main role="main">
          <OfferGenerator
            validationErrors={this.state.validationErrors}
            template={this.state.template}
          />
          <div id="error_message">
            {this.state.errors && <ErrorMessages errors={this.state.errors} />}
          </div>
        </main>
      </div>
    );
  }
});

ReactDOM.render(React.createElement(Wrapper, store),
                document.getElementById('app'));
