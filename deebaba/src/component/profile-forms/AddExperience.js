import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addExperience } from "../../store";
import { useNavigate } from "react-router-dom";
import Alert from "../layout/alert";

function AddExperience() {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience({ formData, navigate }));
  };
  return (
    <Fragment>
      <div className='container'>
        <Alert />
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <FontAwesomeIcon icon={faCodeBranch} /> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              value={company}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
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
              placeholder='Job Description'
              value={description}
              onChange={handleChange}></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <a className='btn btn-light my-1' href='dashboard.html'>
            Go Back
          </a>
        </form>
      </div>
    </Fragment>
  );
}

export default AddExperience;
