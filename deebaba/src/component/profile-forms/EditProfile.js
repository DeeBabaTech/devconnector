import React, { Fragment, useEffect, useState } from "react";
import Alert from "./../layout/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProfile, getCurrentProfile } from "../../store";

function EditProfile() {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const { profile, loading } = useSelector((state) => {
    return state.profile;
  });

  const [displaySocials, setDisplaySocials] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());

    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.twitter,
      facebook: loading || !profile.social ? "" : profile.facebook,
      linkedin: loading || !profile.social ? "" : profile.linkedin,
      youtube: loading || !profile.social ? "" : profile.youtube,
      instagram: loading || !profile.social ? "" : profile.instagram,
    });
    // eslint-disable-next-line
  }, []);

  const handleDisplaySocials = () => {
    setDisplaySocials(!displaySocials);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const edit = true;
    dispatch(createProfile({ formData, navigate, edit }));
  };

  return (
    <Fragment>
      <div className='container'>
        <Alert />
        <h1 className='large text-primary'>Create Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <select name='status' value={status} onChange={handleChange}>
              <option value='0'>* Select Professional Status</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              value={company}
              onChange={handleChange}
            />
            <small className='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={handleChange}
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={handleChange}
            />
            <small className='form-text'>
              City & state suggested (e.g. Boston, MA)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Skills'
              name='skills'
              value={skills}
              onChange={handleChange}
            />
            <small className='form-text'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Github Username'
              name='githubusername'
              value={githubusername}
              onChange={handleChange}
            />
            <small className='form-text'>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={handleChange}></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>

          <div className='my-2'>
            <button
              type='button'
              className='btn btn-light'
              onClick={handleDisplaySocials}>
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocials && (
            <Fragment>
              <div className='form-group social-input'>
                <FontAwesomeIcon icon={faTwitter} size='2xl' />
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group social-input'>
                <FontAwesomeIcon icon={faFacebook} size='2xl' />
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group social-input'>
                <FontAwesomeIcon icon={faYoutube} size='2xl' />
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group social-input'>
                <FontAwesomeIcon icon={faLinkedin} size='2xl' />
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group social-input'>
                <FontAwesomeIcon icon={faInstagram} size='2xl' />
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={handleChange}
                />
              </div>
            </Fragment>
          )}
          <input type='submit' className='btn btn-primary my-1' />
          <div
            onClick={() => navigate(-1)}
            className='btn btn-light my-1'
            href='dashboard.html'>
            Go Back
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default EditProfile;
