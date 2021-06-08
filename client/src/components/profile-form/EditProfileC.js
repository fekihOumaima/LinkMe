import React , { Fragment, useState , useEffect}from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link , withRouter } from 'react-router-dom';
import { createProfileC , getCurrentProfile } from '../../actions/profileCompany' 


const EditProfileC = ({ profileCompany: {profileCompany, loading},createProfileC, history , getCurrentProfile}) => {
    
    const [formData, setFormData] = useState({
           image: null,
           website: '',
           location: '',
           bio: '',
           facebook: '',
           instagram : ''
    }); 
    
    // formData.append("website",'');
    // formData.append("location",'');
    // formData.append("bio",'');
    // formData.append("facebook",'');
    // formData.append("instagram",'');
    // formData.append("image",'');

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    
    useEffect(()=>{
        getCurrentProfile();

        setFormData({
            image: loading || !profileCompany.image ? '' : profileCompany.image,
            website: loading || !profileCompany.website ? '' : profileCompany.website,
            location: loading || !profileCompany.location ? '' : profileCompany.location,
            bio: loading || !profileCompany.bio ? '' : profileCompany.bio,
            facebook: loading || !profileCompany.social ? '' : profileCompany.social.facebook,
            instagram: loading || !profileCompany.social ? '' : profileCompany.social.instagram

        })
    }, [loading,getCurrentProfile]);
    
    
    
    const {
           image,
           website,
           location,
           bio,
           facebook,
           instagram 
    }= formData;

  
    // formData.append("website",website);
    // formData.append("location",location);
    // formData.append("bio",bio);
    // formData.append("facebook",facebook);
    // formData.append("instagram",instagram);
    // formData.append("image",image);

    const onChange = e =>{
     
      setFormData({ ...formData, [e.target.name]: e.target.value });
      }

    const  handlefileChange =e=>{
      const img=e.target.files[0];
      console.log(img);
      setFormData({ ...formData,image:img})
      

    }



    const onSubmit = e => {
      e.preventDefault();
      const data = new FormData();
    data.append("website",formData.website);
    data.append("location",formData.location);
    data.append("bio",formData.bio);
    data.append("facebook",formData.facebook);
    data.append("instagram",formData.instagram);
    data.append("image",formData.image);

       
        createProfileC(data, history,true);
      console.log(data)

      };

    return (
        <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <form className="form"  onSubmit={onSubmit} encType="multipart/form-data" method='post' >
        
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
            website of your company
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
        <Link className="btn btn-light my-1" to="dashboardCompany">
          Go Back
        </Link>
      </form>
    </Fragment>
    )
}

EditProfileC.propTypes = {
  createProfileC: PropTypes.func.isRequired,
  profileCompany: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profileCompany: state.profileCompany
})

export default connect (mapStateToProps, { createProfileC , getCurrentProfile})(withRouter(EditProfileC))
