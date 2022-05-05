import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {addReport} from './reportSlice';

//part1
//getbooks -> createAsyncThunk -> create3type of actions
//pending = createAction('book/getBooks/pending', (payload)=>{return payload}
//fulfilled=  createAction('book/getBooks/fulfilled', (payload)=> (return payload))
//rejected = createAction('book/getBooks/rejected', (payload)=> (return payload))

export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;

  try {
    //part2

    // dispatch({type:'book/getBooks/pending',payload:undefined})
    const response = await fetch('http://localhost:3005/books');
    const data = await response.json();
    return data;
    // dispatch({type:'book/getBooks/fulfilled',payload:data})
  } catch (error) {
    return rejectWithValue(error.message);
    // dispatch({type:'book/getBooks/rejected',payload:error})
  }
});

// insert book

export const insertBook = createAsyncThunk(
  'book/insertBook',
  async (bookData, thunkAPI) => {
    const {rejectWithValue, getState, dispatch} = thunkAPI;

    try {
      bookData.userName = getState().auth.name;
      const response = await fetch('http://localhost:3005/books', {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      dispatch(addReport({data}));

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// deleteBook

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (book, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
      await fetch(`http://localhost:3005/books/${book.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return book;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get book byId

export const getBook = createAsyncThunk('book/getBook', async (id, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  try {
    const response = await fetch(`http://localhost:3005/books/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

//================= bookSlice===========================

const bookSlice = createSlice({
  name: 'book',
  initialState: {books: [], isloading: false, error: null, bookInfo: {}},
  reducers: {},
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isloading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      console.log(action);
    },

    // insert a new book

    [insertBook.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isloading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    // Delete book
    [deleteBook.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isloading = false;
      state.books = state.books.filter((book) => book.id !== action.payload.id);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    // getBook byId
    [getBook.pending]: (state, action) => {
      state.isloading = true;
      state.error = null;
    },
    [getBook.fulfilled]: (state, action) => {
      state.isloading = false;
      state.bookInfo = action.payload;
    },
    [getBook.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
