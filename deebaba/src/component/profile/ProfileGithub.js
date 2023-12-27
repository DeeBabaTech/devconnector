import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos } from "../../store";
import Spinner from "../layout/Spinner";

function ProfileGithub({ username }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [dispatch, username]);
  const { repos } = useSelector((state) => {
    return state.profile;
  });
  return (
    <div className='text-primary my-1'>
      <h2 className='text-primary my-1'>Github repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noreferrer'>
                  {" "}
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-primary'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileGithub;
