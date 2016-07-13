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
      ConstraintValue = require('./constraint-value'),
      {FormGroup, Button} = require('react-bootstrap'),
      {connect} = require('react-redux'),
      {mapDispatchToProps} = require('../util');


const ConstraintComponent = React.createClass({
  displayName: 'Constraint Component',

  mixins: [ PureRenderMixin, LinkedStateMixin ],

  propTypes: {
    template: PropTypes.Immutable.Map.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.object,
    parent: React.PropTypes.object,
    updateAttribute: React.PropTypes.func.isRequired, 
    removeEntity: React.PropTypes.func.isRequired
  },


  /**
   * Update attribute of constraint based on value of event
   * @param id - id of constraint
   * @param key - attribute key
   * @private
   */
  _updateAttribute: function(id, key) {
    return event => {
      const value = event.target.value;
      this.props.updateAttribute({attrType: [this.props.type, id], key: key, value: value});
    }
  },

  /**
   * Construct component of constraint
   * @param id - id of constraint
   * @param attributes - attributes of component
   * @param data - constraint data
   * @private
   */
  _constructComponent: function(id, attributes, data) {
    if (attributes['mutable']) {
      attributes['_key'] = attributes.key;
      attributes['onChange'] = this._updateAttribute(id, attributes.key);
      attributes['value'] = _.get(data, attributes.key);
      attributes['template'] = this.props.template;
      attributes['parent'] = {id: id, type: this.props.type};
      return componentMap[attributes.uiClass](attributes)
    }
    return _.get(data, attributes.key)
  },

  /**
   * Remove constraint from parent
   * @param id - id of constraint
   * @private
   */
  _remove(id) {
    this.props.removeEntity({parent: this.props.parent, key: this.props['_key'], id: id})
  },

  /**
   * Render constraint
   *
   * @returns {object}
   */
  render: function () {
    let constraint = this.props.value;

    let id = constraint.data['@id'];
    let items = [
      <ConstraintValue
        template={this.props.template}
        constraint={constraint}
        key={'Field:' + id}
      />
    ];

    items = items.concat(constraint.fields.map((attr, index) => <FormGroup
      key={'Field:'+id+':'+index} className='col col-xs-12 cb'><label className='label--big'>{attr.title}</label> {this._constructComponent(id, attr, constraint.data)} </FormGroup>));

    items.push(
      <FormGroup key='Constraint Remove Button' className='col col-xs-12 cb text-right'>
        <Button bsStyle="danger" onClick={this._remove.bind(this, id)} key={'delete:'+id}>
          Remove {_.capitalize(this.props.type)}
        </Button>
      </FormGroup>
    );

    return (
      <div className='constraint row'>
        <div className='col col-sm-offset-1'>
          {items}
        </div>
      </div>
    );
  }
});

const Constraint = connect(
  null,
  mapDispatchToProps
)(ConstraintComponent);

module.exports = Constraint;
