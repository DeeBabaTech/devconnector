import React, { Fragment, useEffect } from "react";
import { getProfileById } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);

  const { profile, loading } = useSelector((state) => {
    return state.profile;
  });

  const auth = useSelector((state) => {
    return state.auth;
  });
  return (
    <div className='container'>
      <Fragment>
        {profile === null || loading ? (
          <div className='my-spinner'>
            <Spinner />
          </div>
        ) : (
          <Fragment>
            <Link to='/profiles' className='btn btn-light'>
              Back to Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                  Edit Profile
                </Link>
              )}
            <div className='profile-grid my-1'>
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => {
                      return (
                        <ProfileExperience
                          key={experience._id}
                          experience={experience}
                        />
                      );
                    })}
                  </Fragment>
                ) : (
                  <h2> No experience credenials </h2>
                )}
              </div>
              <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => {
                      return (
                        <ProfileEducation
                          key={education._id}
                          education={education}
                        />
                      );
                    })}
                  </Fragment>
                ) : (
                  <h2> No education credentials</h2>
                )}
              </div>
              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
}

export default Profile;
