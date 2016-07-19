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
      app = require('./reducers'),
      _ = require('lodash');


const App = React.createClass({
  displayName: 'Offer Generator',

  propTypes: {
    onCreate: React.PropTypes.func.isRequired,
    buttonText: React.PropTypes.string,
    assigner: React.PropTypes.string,
    initialOffer: React.PropTypes.object
  },

  getInitialState() {
    return {
      store: undefined
    }
  },

  componentWillMount(){
    app(this.props.assigner, this.props.initialOffer).then( reducer => {
      this.setState({store: createStore(reducer)});
    });
  },
  
  componentWillUpdate(newProps) {
    if (!(_.isEqual(newProps.initialOffer, this.props.initialOffer)) ||
       !(_.isEqual(newProps.assigner, this.props.assigner))) {
      app(newProps.assigner, newProps.initialOffer).then( reducer => {
        this.state.store.replaceReducer(reducer);
      });
    }
  },

  /**
   * Render the offer generator
   *
   * @returns {object}
   */
  render: function () {
    if (!this.state.store) {
      return (
        <div>
          <h1> Loading...</h1>
        </div>
      )
    }
    return (
      <Provider store={this.state.store}>
        <Offer
          onCreate={this.props.onCreate}
          buttonText={this.props.buttonText}
        />
      </Provider>
    );
  }
});

export default App;
