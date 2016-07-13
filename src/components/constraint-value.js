/**
 * Component to display and edit ODRL constraint
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
      _ = require('lodash'),
      PureRenderMixin = require('react-addons-pure-render-mixin'),
      LinkedStateMixin = require('react-addons-linked-state-mixin'),
      componentMap = require('./component-map'),
      PropTypes = require('../prop-types'),
      constraints = require('../util').constraints,
      {FormGroup} = require('react-bootstrap');


const ConstraintValue = React.createClass({
  displayName: 'Constraint Value',

  mixins: [ LinkedStateMixin ],

  propTypes: {
    template: PropTypes.Immutable.Map.isRequired,
    constraint: React.PropTypes.object,
    updateConstraint: React.PropTypes.func.isRequired
  },


  getInitialState: function () {
    let allConstraints = {};
    constraints.map(c => {allConstraints[c[0]] = c});
    return {
      allConstraints: allConstraints
    }
  },

  /**
   * Update constraint type based on value of change event
   *
   * @param id - id of constraint
   * @private
   */
  _updateConstraintType: function(id) {
    return event => {
      const value = event.target.value;
      this.props.updateConstraint({id: id, key: value, value: undefined});
    }
  },

  /**
   * Update constraint value based on value of change event
   *
   * @param id - id of constraint
   * @param key - constraint type
   * @private
   */
  _updateConstraintValue: function(id, key) {
    return event => {
      let value = event.target.value;
      let type = event.target.type;
      this.props.updateConstraint({id: id, key: key, attrType: type, value: value});
    }
  },

  /**
   * Render the constraint value
   *
   * @returns {object}
   */
  render: function() {
    let id = this.props.constraint.data['@id'];
    let key = _.find(Object.keys(this.props.constraint.data), key => Object.keys(this.state.allConstraints).indexOf(key) != -1);
    let value = this.props.constraint.data[key];
    if (value) {
      value = value[0]['@value'] || value[0]['@id'];
    }

    let sortedConstraints = _.sortBy(constraints, a => a[1]);
    const children = sortedConstraints.map( a => React.createElement('option', {key:a[0], value: a[0], label: a[1]}));
    children.unshift(React.createElement('option', {key:'', value: '', label: '-- Select a constraint --', disabled:true}));
    let keyItem = React.createElement('select', {required: true, className: 'form-control', defaultValue: '', value: key, onChange: this._updateConstraintType(id)}, children);
    let valueItem = '';

    if (key) {
      let uiClass = this.state.allConstraints[key][2];
      valueItem = componentMap[uiClass]( {required: true, value: value, onChange: this._updateConstraintValue(id, key)})
    }

    return (
      <div>
        <FormGroup className='col col-xs-12 cb'>
          {keyItem}
        </FormGroup>
        <FormGroup className='col col-xs-12 cb'>
          {valueItem}
        </FormGroup>
      </div>
    );
  }
});

module.exports = ConstraintValue;