import React from 'react';
import {useSelector} from 'react-redux';

const BooksList = ({isloading, books, dispatch, deleteBook, getBook}) => {
  const {isLoggedIn} = useSelector((state) => state.auth);
  const bookList =
    books.length > 0 ? (
      books.map((book) => (
        <li
          className='list-group-item d-flex  justify-content-between align-items-center'
          key={book.id}>
          <div>{book.title}</div>
          <div className='btn-group' role='group'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={!isLoggedIn}
              onClick={() => dispatch(getBook(book.id))}>
              Read
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={async () => {
                try {
                  const originalPromiseResult = await dispatch(
                    deleteBook(book)
                  ).unwrap();

                  console.log(originalPromiseResult);
                } catch (rejectedValueOrSerializedError) {
                  console.log(rejectedValueOrSerializedError);
                }
              }}
              disabled={!isLoggedIn}>
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <div className='alert alert-danger'>No Books to show </div>
    );

  return (
    <div>
      <h2>Books List</h2>
      {isloading ? 'loading...' : <ul className='list-group'>{bookList}</ul>}
    </div>
  );
};

export default BooksList;
