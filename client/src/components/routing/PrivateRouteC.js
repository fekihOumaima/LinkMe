import React from 'react'
import { Route , Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRouteC = ({ 
    component: Component, 
    authCompany:{ isAuthenticatedC,loading},
     ...rest}) => (
    <Route { ...rest} render={ props =>!isAuthenticatedC && !loading ? (<Redirect to='/login'/>) : ( <Component {...props} /> )} />
)
    

PrivateRouteC.propTypes = {
   authCompany : PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    authCompany: state.authCompany
})

export default connect (mapStateToProps)(PrivateRouteC)
