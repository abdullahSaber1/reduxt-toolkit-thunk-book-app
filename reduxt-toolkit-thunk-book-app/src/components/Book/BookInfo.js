import React, {Fragment} from 'react';

const BookInfo = ({bookInfo}) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      {Object.keys(bookInfo).length > 0 ? (
        <div>
          <p className='fw-bold'>Title: {bookInfo.title}</p>
          <p className='fw-light'>Description:{bookInfo.description}</p>
          <p className='fst-italic'>Price:{bookInfo.price}</p>
          {bookInfo.userName && (
            <p className='fst-italic'>inserted By : {bookInfo.userName}</p>
          )}
        </div>
      ) : (
        <div className='alert alert-secondary' role='alert'>
          There is no post selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
