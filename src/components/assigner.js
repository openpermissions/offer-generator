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
      _ = require('lodash'),
      PureRenderMixin = require('react-addons-pure-render-mixin'),
      LinkedStateMixin = require('react-addons-linked-state-mixin'),
      componentMap = require('./component-map'),
      PropTypes = require('../prop-types'),
      {FormGroup} = require('react-bootstrap'),
      {connect} = require('react-redux'),
      {mapDispatchToProps} = require('../util');


const AssignerComponent = React.createClass({
  displayName: 'Assigner',

  mixins: [ PureRenderMixin, LinkedStateMixin ],

  propTypes: {
    template: PropTypes.Immutable.Map.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.array,
    parent: React.PropTypes.object,
    addEntity: React.PropTypes.func.isRequired,
    updateAttribute: React.PropTypes.func.isRequired
  },

/**
   * Update attribute value of assigner
   * @param id - id of assigner
   * @param key - key of attribute
   * @private
   */
  _updateAttribute: function(id, key) {
    return event => {
      let value = event.target.value;
      let type = event.target.type;

      if (type == 'number') {
        value = Number(value);
      }

      this.props.updateAttribute({attrType: [this.props.type, id], key: key, value: value});
    }
  },

  /**
   * Construct component of assigner
   * @param id - id of assigner
   * @param attributes - attributes of component
   * @param data - assigner data
   * @private
   */
  _constructComponent: function(id, attributes, data) {
    attributes['_key'] = attributes.key;
    attributes['onChange'] = this._updateAttribute(id, attributes.key);
    attributes['value'] = _.get(data, attributes.key);
    attributes['template'] = this.props.template;
    attributes['parent'] = {id: id, type: this.props.type};
    attributes['placeholder'] = attributes.title;

    if (!attributes['mutable']) {
      attributes['readOnly'] = true;
    }

    return componentMap[attributes.uiClass](attributes)
  },

  /**
   * Render list of odrl elements
   *
   * @returns {object}
   */
  render: function () {
    let ids = [];
    if (this.props.value) {
      ids = this.props.value.map(obj => obj['@id']);
    }

    let entities = this.props.template.get(this.props.type).toJS();
    let existingEntities = _.where(entities, obj => ids.indexOf(obj.data['@id']) == -1);

    if (existingEntities.length == 0){
      this.props.addEntity({parent: this.props.parent, attrType: this.props.type, key: this.props['_key']});
      return <div/>
    } else {
      let assigner = existingEntities[0];
      let id = assigner.data['@id'];
      let items = assigner.fields.map((attr, index) => <FormGroup style={{'marginTop':'-15px'}}
        key={'Field:'+id+':'+index}><label className='label--big'>{attr.title}</label>{this._constructComponent(id, attr, assigner.data)} </FormGroup>);
      
      return (
        <div>
          {items}
        </div>
      );
    }
  }
});

const Assigner = connect(
  null,
  mapDispatchToProps
)(AssignerComponent);

module.exports = Assigner;
