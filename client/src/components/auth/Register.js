import React , {Fragment , useState} from 'react';
import { Link , Redirect} from 'react-router-dom';
import { setAlert} from '../../actions/alert';
import { registerUser} from '../../actions/authUser';
import { registerCompany} from '../../actions/authCompany';
import PropTypes from 'prop-types';
import { connect , useSelector} from 'react-redux';

const Register = ({ setAlert , registerUser ,registerCompany }) => {
    const [formData, setFormData]= useState({
        name : '',
        email: '',
        password: '',
        password2: ''
    });
    const { name,email,password,password2,myRadioInput} = formData;
    
    const onChange= e => {
      setFormData({...formData, [e.target.name]:e.target.value})
    

    };
        
    const onSubmit =async  e =>{
        e.preventDefault();
        if(password !== password2){
            setAlert('Password do not match','danger');
        }else if(myRadioInput==="condidate"){
            registerUser({ name , email , password });
            console.log(myRadioInput);
      
        }else if (myRadioInput==="recruiter"){
          registerCompany({ name , email , password });
          console.log(myRadioInput);
       
      }
    };
    
    const {isAuthenticated} = useSelector(state=> state.authUser);
    const {isAuthenticatedC} = useSelector(state=> state.authCompany);


    //Redirect if logged in
  if((isAuthenticated) && (myRadioInput==="condidate") ){
    return<Redirect to="/dashboardCondidate" />;

  }else if ((isAuthenticatedC) && (myRadioInput==="recruiter")){
    return<Redirect to="/dashboardCompany" />;
  }
      

    return (
        <Fragment>
          <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={ e => onChange(e)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={ e => onChange(e)}  />
        
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={ e => onChange(e)} required

          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} 
            onChange={ e => onChange(e)} required

          />
        </div>
        <div className="form-group">
          <p className="lead2">
          Choose the type of your profile </p> 
          
          <label>
            <input type="radio" name="myRadioInput" value="condidate"  onChange={ e => onChange(e)}/>
            <label className="form-text2"> Condidate </label>
          </label>
          <br></br>
          <label>
            <input type="radio" name="myRadioInput" value="recruiter"  onChange={ e => onChange(e)}/>
            <label className="form-text2"  > Recruiter </label>
          </label>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p> 
        </Fragment>

        
      );
      
 
};

Register.propTypes ={
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  registerCompany:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
  isAuthenticatedC:PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  isAuthenticatedC: state.isAuthenticatedC,
})


export default connect(
  mapStateToProps,
  { setAlert , registerUser,registerCompany}
)(Register);