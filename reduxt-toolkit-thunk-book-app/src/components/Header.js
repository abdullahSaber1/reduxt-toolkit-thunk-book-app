import React from 'react';

import {useSelector, useDispatch} from 'react-redux';

import {logInOut} from '../store/authSlice';

const Header = () => {
  const {error} = useSelector((state) => state.books);
  const {isLoggedIn} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      {error && <div className='alert alert-danger mb-0'>{error}</div>}
      <nav className='navbar navbar-dark bg-dark'>
        <span className='navbar-brand mb-0 h1'>My Books</span>

        <button
          className='btn btn-outline-primary'
          onClick={() => dispatch(logInOut())}
          type='submit'>
          {!isLoggedIn ? 'Log In' : 'log Out'}
        </button>
      </nav>
    </>
  );
};

export default Header;
