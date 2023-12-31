import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Spinner from "./Spinner";

function Landing() {
  const { loading, isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
