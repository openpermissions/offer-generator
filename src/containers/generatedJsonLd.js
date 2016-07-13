const React = require('react'),
      {connect} = require('react-redux'),
      Offer  = require('../components/offer'),
      {Panel} = require('react-bootstrap');

const mapStateToProps = (state) => {
  return {
    jsonld: state.jsonld
  }
};


const jsonld = React.createClass({
  displayName: 'Generated Offer',

  propTypes: {
    jsonld: React.PropTypes.object
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

const GeneratedJsonLD = connect(
  mapStateToProps,
)(jsonld);

export default GeneratedJsonLD