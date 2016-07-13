const React = require('react'),
      {connect} = require('react-redux'),
      OfferComponent  = require('../components/offer'),
      {generateOffer, updateAttribute} = require('../actions'),
      {Button, FormGroup} = require('react-bootstrap');

const mapStateToProps = (state) => {
  return {
    template: state.template
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitClick: () => {
      dispatch(generateOffer()) },
    updateAttribute: (attrs) => {
      dispatch(updateAttribute(attrs))
    }
  }
};

const OfferContainer = React.createClass({
  displayName: 'Offer Generator App',

  propTypes: {
    template: React.PropTypes.object.isRequired,
    jsonld: React.PropTypes.object,
    onSubmitClick: React.PropTypes.func.isRequired,
    updateAttribute: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <form className='OfferForm form row' onSubmit={event => {
        event.preventDefault();
        this.props.onSubmitClick();
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