import React from "react";
import { useSelector } from "react-redux";

function Alert() {
  const { data } = useSelector((state) => {
    return state.alert;
  });

  const alerts = data.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.res.alertType}`}>
      {alert.res.msg}
    </div>
  ));

  return <div>{data !== null && data.length > 0 && alerts}</div>;
}

export default Alert;
