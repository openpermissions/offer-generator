const React = require('react'),
      {connect} = require('react-redux'),
      OfferComponent  = require('../components/offer'),
      {Button, FormGroup} = require('react-bootstrap'),
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
    jsonld: React.PropTypes.object,
    generateOffer: React.PropTypes.func.isRequired,
    updateAttribute: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <form className='OfferForm form row' onSubmit={event => {
        event.preventDefault();
        this.props.generateOffer();
      }}>
        <OfferComponent
          template={this.props.template}
          updateAttribute={this.props.updateAttribute}
        />

        <FormGroup className='col col-xs-12 cb'>
          <Button bsStyle="success" type="submit">Generate Offer</Button>
        </FormGroup>
      </form>
    )
  }
});

const Offer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferContainer);

export default Offer