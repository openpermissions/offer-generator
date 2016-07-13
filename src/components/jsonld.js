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
      {Panel} = require('react-bootstrap');

const JsonLd = React.createClass({
  displayName: 'Generated JSON-LD Offer',

  propTypes: {
    jsonld: React.PropTypes.array
  },

  render: function () {
    let jsonld = this.props.jsonld;
    if (jsonld) {
        jsonld = <pre><code>{JSON.stringify(jsonld, null, 2)}</code></pre>
    }
    return (

      <Panel header="Generated Offer">
        {jsonld}
      </Panel>
    );
  }
});

export default JsonLd
