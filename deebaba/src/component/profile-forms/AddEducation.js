import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addEducation } from "../../store";
import { useNavigate } from "react-router-dom";
import Alert from "../layout/alert";

function AddEducation() {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducation({ formData, navigate }));
  };
  return (
    <Fragment>
      <div className='container'>
        <Alert />
        <h1 className='large text-primary'>Add your Education</h1>
        <p className='lead'>
          <FontAwesomeIcon icon={faCodeBranch} />
          Add any school or bootcamp that you have attended
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* School or Bootcamp'
              name='school'
              value={school}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              value={degree}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field of Study'
              name='fieldofstudy'
              value={fieldofstudy}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              value={from}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{" "}
              Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              value={to}
              onChange={handleChange}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Program Description'
              value={description}
              onChange={handleChange}></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <div className='btn btn-light my-1' onClick={() => navigate(-1)}>
            Go Back
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default AddEducation;
