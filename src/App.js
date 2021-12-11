import Cookies from 'universal-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, withRouter } from 'react-router';
import { Header } from './components/Header/Header'
import { Login } from './components/Login/Login';
import { Movies } from './components/Movies/Movies';
import { User } from './components/User/User';
import { API_KEY3, instance as axios } from './api/api';
import { MovieWithRouter } from './components/Movies/MovieDetail/MovieDetail';
import { Person } from './components/Person/Person';
import { PersonDetailWithRoute } from './components/Person/PersonDetails/PersonDetail';

const cookies = new Cookies();
function App() {
  const [state, setState] = useState({
    filters: {
      sortBy: 'popularity.desc',
      year : '',
      genres : []
    },
    page: 1,
    user: null,
    session_id : null,
    loading : true
  })
  const updateUser = (user) => {
    setState({
      ...state,
      user
    })
  }

  const updateSessionId = (session_id) => {
    cookies.set('session_id',session_id,{
      path : '/',
      maxAge: 2592000
    })
    setState({
      ...state,
      session_id
    });
    
  }

  // FILTERS FUNCTION
  const onGenresChange = (value,checked) => {
    if(checked){
      setState({
        ...state,
        filters : {
          ...state.filters,
          genres : [...state.filters.genres,value]
        }
      })
    }else{
    
      setState({
        ...state,
        filters : {
          ...state.filters,
          genres : state.filters.genres.filter(el => el !== value)
        }
      })
    }
  }

  const onYearChange = (year) => {
    setState({
      ...state,
      filters : {
        ...state.filters,
        year
      }
    })
  }

  const changeSort = useCallback((sortBy) => {
    const filters = { ...state.filters };
    filters.sortBy = sortBy;
    setState({
      ...state,
      filters
    })
    // eslint-disable-next-line
  }, [])


  // PAGINATION

  const onPaginated = (value) => {

    setState({
      ...state,
      page: value
    })
  }
  const onLogout = async() => {
    
    try{
      const response = await axios.delete(`/authentication/session?api_key=${API_KEY3}`,{session_id : state.session_id});
      console.log(response);
    }catch(e){

    }
    cookies.remove('session_id');
    setState({
      ...state,
      session_id : null,
      user : null
    })
  }
  useEffect(() => {
    const session_id = cookies.get('session_id');
    
    if(session_id){
      const getUser = async() => {
        try{
          const response = await axios.get(`/account?api_key=${API_KEY3}&session_id=${session_id}`);
          updateUser(response.data);
        }catch(e){

        }
      }
      getUser();
    }
    // eslint-disable-next-line
  },[]);
  console.log(state.filters.genres);
  return (
    <>
      <Header isLogged={!!state.user} />

      <Route exact path="/" render={
        () => <Movies
                onPaginated={onPaginated}
                page={state.page}
                onGenresChange = {onGenresChange}
                changeSort={changeSort}
                onYearChange = {onYearChange}
                genres = {state.filters.genres}
                year = {state.filters.year}
                sortBy={state.filters.sortBy} 
      />} />

      <Route exact path="/login" render={
        () => <Login 
                isLogged = {!!state.user} 
                updateUser={updateUser}
                updateSessionId = {updateSessionId}
      />} />

      <Route 
      exact path = "/person" render={
        () => <Person />
      }/>

      <Route 
      exact path = "/person/:id" render = {
        () => <PersonDetailWithRoute />
      }
      />

      <Route exact path="/user" render={
        () => <User 
                user = {state.user}
                onLogout = {onLogout}
      />} />

      <Route exact path = "/movie/:id" render = {() => <MovieWithRouter />} />
    </>
  );
}

export default withRouter(App);
