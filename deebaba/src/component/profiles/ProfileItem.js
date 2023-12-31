import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
// import Spinner from '../layout/Spinner'

function ProfileItem({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div className=''>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company} </span>}
        </p>
        <p className='my-1'>{location && <span> {location} </span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 3).map((skill, index) => {
          return (
            <li key={index} className="text-primary">
              {" "}
              <FontAwesomeIcon icon={faCheck} /> {skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProfileItem;
