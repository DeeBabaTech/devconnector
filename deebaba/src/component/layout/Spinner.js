import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Spinner() {
  return (
      <FontAwesomeIcon icon={faSpinner} size='2xl' spin />
  );
}

export default Spinner;
