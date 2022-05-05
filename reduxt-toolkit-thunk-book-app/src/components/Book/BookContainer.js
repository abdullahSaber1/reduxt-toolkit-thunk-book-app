import React, {Fragment, useEffect} from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';

import {getBooks, deleteBook, getBook} from '../../store/bookSlice';

import {useDispatch, useSelector} from 'react-redux';

import './book.css';

const PostContainer = () => {
  const dispatch = useDispatch();
  const {isloading, books, bookInfo} = useSelector((state) => state.books);

  // console.log(bookInfo);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList
            isloading={isloading}
            books={books}
            dispatch={dispatch}
            deleteBook={deleteBook}
            getBook={getBook}
          />
        </div>
        <div className='col side-line'>
          <BookInfo bookInfo={bookInfo} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
