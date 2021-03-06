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

const React = require('react'),
      _ = require('lodash'),
      actions = require('../util').actions,
      units = require('../util').units,
      operators = require('../util').operators,
      spatial = require('../util').spatial,
      host = require('../util').host;

function TextInput(attributes) {
  attributes.className = 'form-control';
  return React.createElement('input', attributes);
}

function IntegerInput(attributes) {
  attributes.className = 'form-control';
  attributes.type = 'number';
  attributes.step = '1';
  return React.createElement('input', attributes);
}

function NonNegativeIntegerInput(attributes) {
  attributes.className = 'form-control';
  attributes.type = 'number';
  attributes.step = '1';
  attributes.min = '0';
  return React.createElement('input', attributes);
}

function DecimalInput(attributes) {
  attributes.className = 'form-control';
  attributes.type = 'number';
  attributes.step = '0.01';
  return React.createElement('input', attributes);
}

function DatetimeInput(attributes) {
  attributes.className = 'form-control';
  attributes.type = 'date';
  return React.createElement('input', attributes);
}

function TextArea(attributes) {
  attributes.className = 'form-control';
  if (attributes.value === undefined) {
    attributes.value = ''
  };
  return React.createElement('textarea', attributes);
}

function OdrlList(attributes) {
  attributes.className = 'form-control';
  const OdrlList = require('./odrl-list');
  return React.createElement(OdrlList, attributes);
}

function Assigner(attributes) {
  attributes.className = 'form-control';
  const Assigner = require('./assigner');
  return React.createElement(Assigner, attributes);
}

function Rule(attributes) {
  attributes.className = 'form-control';
  const Rule = require('./rule');
  return React.createElement(Rule, attributes);
}

function Constraint(attributes) {
  attributes.className = 'form-control';
  const Constraint = require('./constraint');
  return React.createElement(Constraint, attributes);
}

function ActionDropdown(attributes){
  attributes.className = 'form-control';
  let sortedActions = _.sortBy(actions, a => a[1]);
  const children = sortedActions.map( a => React.createElement('option', {key:a[0], value: a[0]}, a[1]));
  children.unshift(React.createElement('option', {key:'', value: '', disabled:true}, '-- Select an Action --'));
  attributes['defaultValue'] = '';
  return React.createElement('select', attributes, children)
}

function OperatorDropdown(attributes){
  attributes.className = 'form-control';
  let sortedOperators = _.sortBy(operators, a => a[1]);
  const children = sortedOperators.map( a => React.createElement('option', {key:a[0], value: a[0]}, a[1]));
  children.unshift(React.createElement('option', {key:'', value: '', disabled:true}, '-- Select an Operator --'));
  attributes['defaultValue'] = '';
  return React.createElement('select', attributes, children)
}

function UnitDropdown(attributes){
  attributes.className = 'form-control';
  let sortedUnits = _.sortBy(units, a => a[1]);
  const children = sortedUnits.map( a => React.createElement('option', {key:a[0], value: a[0]}, a[1]));
  children.unshift(React.createElement('option', {key:'', value: '', disabled:true}, '-- Select a Unit --'));
  attributes['defaultValue'] = '';
  return React.createElement('select', attributes, children)
}

function SpatialDropdown(attributes){
  attributes.className = 'form-control';
  let sortedSpatial = _.sortBy(spatial, a => a[1]);
  const children = sortedSpatial.map( a => React.createElement('option', {key:a[0], value: a[0]}, a[1]));
  children.unshift(React.createElement('option', {key:'', value: '', disabled:true}, '-- Select a Geographic Area --'));
  attributes['defaultValue'] = '';
  return React.createElement('select', attributes, children)
}

function HostDropdown(attributes){
  attributes.className = 'form-control';
  let sortedHost = _.sortBy(host, a => a[1]);
  const children = sortedHost.map( a => React.createElement('option', {key:a[0], value: a[0]}, a[1]));
  children.unshift(React.createElement('option', {key:'', value: '', disabled:true}, '-- Select a Host --'));
  attributes['defaultValue'] = '';
  return React.createElement('select', attributes, children)
}


const componentMap = {
  'text-input': TextInput,
  'integer-input': IntegerInput,
  'non-negative-integer-input': NonNegativeIntegerInput,
  'decimal-input': DecimalInput,
  'datetime-input': DatetimeInput,
  'text-area': TextArea,
  'odrl-list': OdrlList,
  'assigner': Assigner,
  'rule': Rule,
  'constraint': Constraint,
  'target': Rule,
  'action-dropdown': ActionDropdown,
  'operator-dropdown': OperatorDropdown,
  'unit-dropdown': UnitDropdown,
  'spatial-dropdown': SpatialDropdown,
  'host-dropdown': HostDropdown
};


module.exports = componentMap;
