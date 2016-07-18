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
      {connect} = require('react-redux'),
      OfferComponent  = require('../components/offer'),
      {Button, FormGroup, Panel} = require('react-bootstrap'),
      {mapDispatchToProps} = require('../util')

const mapStateToProps = (state) => {
  return {
    template: state.template
  }
};

const OfferContainer = React.createClass({
  displayName: 'Offer Generator App',

  propTypes: {
    template: React.PropTypes.object.isRequired,
    generateOffer: React.PropTypes.func.isRequired,
    updateAttribute: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func.isRequired,
    buttonText: React.PropTypes.string
  },

  render: function () {
    return (
      <Panel>
        <form className='OfferForm form row' onSubmit={event => {
          event.preventDefault();
          this.props.generateOffer(this.props.onCreate);
        }}>
          <OfferComponent
            template={this.props.template}
            updateAttribute={this.props.updateAttribute}
          />

          <FormGroup className='col col-xs-12 cb'>
            <Button bsStyle="success" type="submit">{this.props.buttonText || 'Generate Offer'}</Button>
          </FormGroup>
        </form>
    </Panel>
    )
  }
});

const Offer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferContainer);

export default Offer