import React,{ Fragment , useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/authUser';
import {loadCompany } from './actions/authCompany';
import DashboardCompany from './components/dashboard/DashboardCompany';
import DashboardUser from './components/dashboard/DashbordUser';
import PrivateRouteU from './components/routing/PrivateRouteU';
import PrivateRouteC from './components/routing/PrivateRouteC';
import CreateProfileC from './components/profile-form/CreateProfileC';
import CreateProfileU from './components/profile-form/CreateProfileU';
import EditProfileU from './components/profile-form/EditProfileU';
import EditProfileC from './components/profile-form/EditProfileC';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import CreatePost from './components/profile-form/CreatePost';
import Posts from './components/Posts/Posts';
import Post from './components/post/Post';
import FavoriteP from './components/profile-form/FavoriteP';
import ProfileU from './components/ProfileUser/ProfileUser';
import ProfileC from './components/ProfileCompany/ProfileCompany';
import Search from './components/profile-form/Search';


//Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{
  useEffect(()=>{
    store.dispatch(loadUser());
    store.dispatch(loadCompany());
  },[]);
  return(
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing} />
      {/* //<Route exact path='/' component={Footer} /> */}
      <section className= "container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
         
          <PrivateRouteU exact path="/dashboardCondidate" component={DashboardUser} />
          <PrivateRouteC exact path="/dashboardCompany" component={DashboardCompany} />
          <PrivateRouteC exact path="/create-profileC" component={CreateProfileC} />
          <PrivateRouteC exact path="/create-profileU" component={CreateProfileU} />
          <PrivateRouteC exact path="/edit-profileU" component={EditProfileU} />
          <PrivateRouteC exact path="/edit-profileC" component={EditProfileC} />
          <PrivateRouteC exact path="/add-experience" component={AddExperience} />
          <PrivateRouteC exact path="/add-education" component={AddEducation} />
          <PrivateRouteC exact path="/create-post" component={CreatePost} />
          <PrivateRouteC exact path="/posts" component={Posts} />
          <PrivateRouteC exact path="/posts/:id" component={Post} />
          <PrivateRouteC exact path="/post-favoris" component={FavoriteP} />
          <PrivateRouteC exact path="/profileUser/:id" component={ProfileU} />
          <PrivateRouteC exact path="/profileCompany/:id" component={ProfileC} />
          <PrivateRouteC exact path="/Search/:tag" component={Search} />


          
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
  )};
export default App;
