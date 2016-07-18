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

const React = require('react'),
      Offer = require('./containers/offer'),
      {Provider} = require('react-redux'),
      {createStore} = require('redux'),
      app = require('./reducers');


const App = React.createClass({
  displayName: 'Offer Generator',
  store: undefined,

  propTypes: {
    onCreate: React.PropTypes.func.isRequired,
    buttonText: React.PropTypes.string,
    assigner: React.PropTypes.string
  },


  componentWillMount(){
    this.store = createStore(app(this.props.assigner));
  },

  /**
   * Render the offer generator
   *
   * @returns {object}
   */
  render: function () {
    return (
      <Provider store={this.store}>
        <Offer
          onCreate={this.props.onCreate}
          buttonText={this.props.buttonText}
        />
      </Provider>
    );
  }
});

export default App;
