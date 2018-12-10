import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

  componentDidMount = () => {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>님 하염
            </p>
            <ProfileActions />
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            
            <div style={{ marginBottom: '60px'}}>
              <button onClick={this.onDeleteClick}
              className="btn btn-danger">
                프로필 계정 삭제
              </button>
            </div>
          </div>
        );
      } else {
        // user has not profile yet
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.name} </p>
            <p> 아직 프로필이 없습니다. 새 프로필을 등록해보세요.</p>
            <Link to='/create-profile' className='btn btn-lg btn-primary'>
              프로필 생성
            </Link>
          </div>
        );
      }
    }

    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='dispay-4'>Dashboard</h1>
              { dashboardContent }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount },
)(Dashboard);
