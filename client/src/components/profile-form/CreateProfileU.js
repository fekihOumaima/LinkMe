import React , { Fragment, useState }from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link , withRouter } from 'react-router-dom';
import { createProfileU } from '../../actions/profileUser' 

const CreateProfileU = ({createProfileU, history}) => {

    const [formData, setFormData] = useState({
            image :"",
            cv :"",
            location :"",
            status :"",
            bio :"",
            linkedin :"",
            facebook :"",
            instagram :"",
            githubusername :"",
            skills :"" 
 }); 

 const [displaySocialInputs, toggleSocialInputs] = useState(false);


 const {
    image,
    cv,
    location,
    status,
    bio,
    linkedin,
    facebook,
    instagram,
    githubusername,
    skills 
 }= formData;
    
 const onChange = e =>
 setFormData({ ...formData, [e.target.name]: e.target.value });

 const  handlefileChange =e=>{
  const img=e.target.files[0];
  setFormData({ ...formData, image:img})
}

const  handlefile =e=>{
  const cvv=e.target.files[0];
  console.log(cvv);
 
  setFormData({ ...formData, cv:cvv})
}
 const onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
  data.append("status",formData.status);
  data.append("location",formData.location);
  data.append("bio",formData.bio);
  data.append("linkedin",formData.linkedin);
  data.append("githubusername",formData.githubusername);
  data.append("skills",formData.skills);
  data.append("cv",formData.cv);
  data.append("facebook",formData.facebook);
  data.append("instagram",formData.instagram);
  data.append("image",formData.image);
  data.append("cv",formData.cv);
    createProfileU(data, history);
  };


    return (
        <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <form className="form" onSubmit={onSubmit} encType="multipart/form-data" method='post'>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="file"
            placeholder="image"
            name="image"
            onChange={handlefileChange}
          />
          <small className="form-text">
           choose your image
          </small>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City & state suggested (eg. sousse, tunis)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
          <small className="form-text">
            include your username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        </div>
        <div className="form-group">
          <input
            type="file"
            placeholder="cv"
            name="cv"
            onChange={handlefile}
          />
          <small className="form-text">
            your cv
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
    )
}

CreateProfileU.propTypes = {
    createProfileU: PropTypes.func.isRequired,
}

export default connect (null, { createProfileU})(withRouter(CreateProfileU))
