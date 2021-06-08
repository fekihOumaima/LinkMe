import React , {Fragment , useState} from 'react';
import { Link , Redirect} from 'react-router-dom';
import { connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authUser';
import { loginCompany } from '../../actions/authCompany';




const Login = ({loginCompany , loginUser }) => {
  const [formData, setFormData]= useState({
    email: '',
    password: ''
  });

  

  const { email,password,myRadioInput} = formData;
    
  const onChange= e => setFormData({...formData, [e.target.name]:e.target.value});
       
  
    
  const onSubmit =async  e =>{
  
    e.preventDefault();
    if(myRadioInput==="condidate"){
      loginUser(email,password);
      console.log(email,password);
    }else if(myRadioInput==="recruiter"){
      loginCompany(email,password);
      console.log(myRadioInput);
    }
  };

  const {isAuthenticated} = useSelector(state=> state.authUser);
  const {isAuthenticatedC} = useSelector(state=> state.authCompany);

  //Redirect if logged in
  console.log(isAuthenticated,isAuthenticatedC,myRadioInput);
  if((isAuthenticated) && (myRadioInput==="condidate") ){
    return <Redirect to="/dashboardCondidate" />

  }else if ((isAuthenticatedC) && (myRadioInput==="recruiter")){
    return <Redirect to="/dashboardCompany" />
  }

  return (
        <Fragment>
          <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i>Sign into Your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={ e => onChange(e)} required />
        
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>  
        </Fragment>
    );
};

Login.propTypes ={
  loginUser: PropTypes.func.isRequired,
  loginCompany:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAuthenticatedC: PropTypes.bool
}

const mapStateToProps = state => ({
   isAuthenticated: state.isAuthenticated,
   isAuthenticatedC: state.isAuthenticated
})

export default connect ( 
  mapStateToProps ,
 {loginUser , loginCompany}
 )
(Login);