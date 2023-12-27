import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser, store } from "./store";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/PrivateRoute";
import CreateProfile from "./component/profile-forms/CreateProfile";
import EditProfile from "./component/profile-forms/EditProfile";
import AddExperience from "./component/profile-forms/AddExperience";
import AddEducation from "./component/profile-forms/AddEducation";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import Posts from "./component/posts/Posts";
import Post from "./component/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profiles' element={<Profiles />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/create-profile'
              element={
                <PrivateRoute>
                  <CreateProfile path='/create-profile' />
                </PrivateRoute>
              }
            />
            <Route
              path='/edit-profile'
              element={
                <PrivateRoute>
                  <EditProfile path='/edit-profile' />
                </PrivateRoute>
              }
            />
            <Route
              path='/add-experience'
              element={
                <PrivateRoute>
                  <AddExperience path='/add-experience' />
                </PrivateRoute>
              }
            />
            <Route
              path='/add-education'
              element={
                <PrivateRoute>
                  <AddEducation path='/add-education' />
                </PrivateRoute>
              }
            />
            <Route
              path='/posts'
              element={
                <PrivateRoute>
                  <Posts path='/posts' />
                </PrivateRoute>
              }
            />
            <Route
              path='/posts/:id'
              element={
                <PrivateRoute>
                  <Post path='/posts/:id' />
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
