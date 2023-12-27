import React, { useEffect, Fragment } from "react";
import Spinner from "../layout/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import ProfileItem from "./ProfileItem";

function Profiles() {
  const { profiles, loading } = useSelector((state) => {
    return state.profile;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);
  return (
    <div className='container'>
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {" "}
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
              <FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect
              with developers
            </p>
            <div className='profiles'>
              {profiles ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
}

export default Profiles;
