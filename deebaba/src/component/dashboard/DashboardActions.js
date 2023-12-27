import { faBlackTie } from "@fortawesome/free-brands-svg-icons";
import {
  faGraduationCap,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function DashboardActions() {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <FontAwesomeIcon icon={faUserCircle} className='text-primary' /> Edit
        Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <FontAwesomeIcon icon={faBlackTie} className='text-primary' /> Add
        Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <FontAwesomeIcon icon={faGraduationCap} className='text-primary' /> Add
        Education
      </Link>
    </div>
  );
}

export default DashboardActions;
