import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Spinner() {
  return (
    <div className='container'>
      <FontAwesomeIcon icon={faSpinner} size='2xl' spin />
    </div>
  );
}

export default Spinner;
