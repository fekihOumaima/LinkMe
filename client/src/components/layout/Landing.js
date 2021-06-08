import React from 'react'
import { Link, Redirect} from 'react-router-dom';
import { connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types'

export const Landing = () => {

  const {isAuthenticated} = useSelector(state=> state.authUser);
  const {isAuthenticatedC} = useSelector(state=> state.authCompany);

  if(isAuthenticatedC){
    return <Redirect to='/dashboardCompany'/>
  }
    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">LinkMe</h1>
          <p className="lead">
          Linking of interferences in 
the labour market: employers, candidates and training centres.
          </p>
          <div className="buttons">
            <Link to="/Register" className="btn btn-primary">Sign Up</Link>
            <Link to="/Login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.prototype ={
  isAuthenticated: PropTypes.bool,
  isAuthenticatedC: PropTypes.bool,
}


const mapStateToProps = state =>({
  isAuthenticated: state.authUser.isAuthenticated,
  isAuthenticated: state.authCompany.isAuthenticatedC
})

export default connect (mapStateToProps) (Landing);
