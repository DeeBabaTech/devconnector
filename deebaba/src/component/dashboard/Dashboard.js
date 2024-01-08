import React, { Fragment, useEffect } from "react";
import { deleteAccount, getCurrentProfile } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Alert from "../layout/alert";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const { loading, profile } = useSelector((state) => {
    return state.profile;
  });

  const { user } = useSelector((state) => {
    return state.auth;
  });

  return loading && profile === null ? (
    <div className='my-spinner'>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <div className='container'>
        <Alert />
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <FontAwesomeIcon icon={faUser} /> Welcome {user && user.name}
        </p>
        {profile ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className='my-2'>
              <button
                className='btn btn-danger'
                onClick={() => dispatch(deleteAccount())}>
                <FontAwesomeIcon icon={faUserMinus} /> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default Dashboard;
