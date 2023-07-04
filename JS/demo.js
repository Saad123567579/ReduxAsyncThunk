//index.js
//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import logger from 'redux-logger';
// import reducer from "./redux/reducers";
import { Provider } from 'react-redux';
// const store = createStore(reducer, applyMiddleware(logger));
import accountReducer from "./slices/accountSlice";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer:{account:accountReducer}
  

})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
      
    
  </React.StrictMode>
);

reportWebVitals();







//accountSlice.js

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
    'accounts/getuser',
    async (id, thunkAPI) => {
        const response = await fetch(`http://localhost:8080/accounts/${id}`);
        const data = await response.json();
        return data.amount ;
    }
  )

const initialState = {
  amount: 10,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    increment: (state) => {
      state.amount += 1;
    },
    increment10: (state) => {
      state.amount += 10;
    },
    decrement: (state) => {
      state.amount -= 1;
    },
    decrement10: (state) => {
      state.amount -= 10;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("State is :",state);
      console.log("Action is :",action);
      state.amount = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, increment10,decrement10} = accountSlice.actions;

export default accountSlice.reducer;
