import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false,
    };
  }

componentWillReceiveProps = nextProps => {
  if(nextProps.errors) {
    this.setState({ errors: nextProps.errors })
  }
}

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');

    const expData = { 
      company: this.state.company,
      title: this.state.title, 
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    this.props.addExperience(expData, this.props.history);
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };

  render() {
    const {errors} = this.state;
    // const errors = this.state.errors;

    return (
      <div className='add-experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add experience</h1>
              <p className='lead text-center'>
                현재 혹은 이전 직장(직무)을 등록할 수 있습니다.
              </p>
              <small className='d-block pb3'>* = 필수 항목입니다.</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info='Could be your own company or one you work for'
                />
                <TextFieldGroup
                  placeholder='Job title'
                  name='title'
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder='Job location'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>from date</h6>
                <TextFieldGroup
                  name='from'
                  type='date'
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>to date</h6>
                <TextFieldGroup
                  name='to'
                  type='date'
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className='form-check mb-4'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='current'
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id='current'
                  />
                  <label htmlFor='current' className='form-check label'>
                    ~ 재직 중
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder='Job description'
                  name='description'
                  type='date'
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info='tell us about your position'
                />
                <input
                  type='submit'
                  value='submit'
                  className='btn btn-primary btn-block'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
