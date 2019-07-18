import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import { ReCaptcha } from 'react-recaptcha-google';

class SurveyFormReview extends React.Component {
  state = { token: '' };

  reviewFields() {
    const { formValues } = this.props;
    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  onChange = value => {
    this.setState({ token: value });
  };

  onSubmit(formValues, history) {
    this.props.submitSurvey(formValues, this.state.token, history);
  }

  render() {
    const { onCancel, formValues, history } = this.props;

    const key = process.env.REACT_APP_RECAPTCHA_KEY;

    return (
      <div>
        <div className="row valign-wrapper">
          <div className="col s8">
            <h5>Please confirm your survey</h5>
            {this.reviewFields()}
          </div>
          <div className="col s4">
            <ReCaptcha sitekey={key} verifyCallback={this.onChange} />
          </div>
        </div>
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button
          onClick={() => this.onSubmit(formValues, history)}
          className="green btn-flat right white-text"
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

function maspStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(
  maspStateToProps,
  actions
)(withRouter(SurveyFormReview));
