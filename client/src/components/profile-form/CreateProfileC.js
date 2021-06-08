import React , { Fragment, useState }from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link , withRouter } from 'react-router-dom';
import { createProfileC } from '../../actions/profileCompany' 


const CreateProfileC = ({createProfileC, history}) => {
    
    const [formData, setFormData] = useState({
           image: '',
           website: '',
           location: '',
           bio: '',
           facebook: '',
           instagram : ''
    }); 
    // const formData = new FormData();
    // formData.append("website",'');
    // formData.append("location",'');
    // formData.append("bio",'');
    // formData.append("facebook",'');
    // formData.append("instagram",'');
    // formData.append("image",'');

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const {
           image,
           website,
           location,
           bio,
           facebook,
           instagram 
    }=formData;
    
    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const  handlefileChange =e=>{
      const img=e.target.files[0];
      setFormData({ ...formData, image:img});
    }


    const onSubmit = e => {
      const data = new FormData();
    data.append("website",formData.website);
    data.append("location",formData.location);
    data.append("bio",formData.bio);
    data.append("facebook",formData.facebook);
    data.append("instagram",formData.instagram);
    data.append("image",formData.image);

        e.preventDefault();
        console.log(data);
        createProfileC(data, history);
      };

    return (
        <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <form className="form" onSubmit={onSubmit} encType="multipart/form-data" method='post'>
        
        <div className="form-group">
        <small className="form-text">
            Choose your image
          </small>
          
          <input
            type="file"
            placeholder="image"
            name="image"
            onChange={handlefileChange}
          />
          
        </div>
        <div className="form-group">
        <small className="form-text">
            Website of your company
          </small>
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <small className="form-text">
            City & state suggested 
          </small>

          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          
        </div>

        <div className="form-group">
        <small className="form-text">Description of recruiter </small>
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          
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
        <Link className="btn btn-light my-1" to="/dashboardCompany">
          Go Back
        </Link>
      </form>
    </Fragment>
    )
}

CreateProfileC.propTypes = {
  createProfileC: PropTypes.func.isRequired,
}

export default connect (null, { createProfileC})(withRouter(CreateProfileC))
