import React from 'react'
import { Route , Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRouteU = ({ 
    component: Component, 
    authUser:{ isAuthenticated,loading},
     ...rest}) => (
    <Route { ...rest} render={ props =>!isAuthenticated && !loading ? (<Redirect to='/login'/>) : ( <Component {...props} /> )} />
)
    

PrivateRouteU.propTypes = {
   authUser : PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    authUser: state.authUser
})

export default connect (mapStateToProps)(PrivateRouteU)
