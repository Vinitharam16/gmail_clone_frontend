// import { applyMiddleware, combineReducers, compose, configureStore, legacy_createStore as createStore } from '@reduxjs/toolkit';
// import { emailReducer } from './Reducers/EmailReducer';
// import { thunk } from 'redux-thunk';
// import { AuthReducer } from './Reducers/AuthReducer';


// const allReducers = configureStore({
//     reducer: {
//         authReducer: AuthReducer,
//         emailreducer: emailReducer

//     }
// });

// export const store = createStore(allReducers, 
//     compose(applyMiddleware(thunk))
// );




// correct one

// import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import {thunk} from 'redux-thunk';
// import {logger} from 'redux-logger';
// import { AuthReducer } from './Reducers/AuthReducer';
// import { emailReducer } from './Reducers/EmailReducer';


// const allReducers = combineReducers({
//   AuthReducer,
//   emailReducer,
// });

// export const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk, logger)));



// import {applyMiddleware, legacy_createStore as createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './Reducers/combineReducers';
// import { thunk } from 'redux-thunk';

// const store = configureStore(
//     rootReducer,
//     applyMiddleware(thunk)
// );

// export default store;





import {configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './Reducers/AuthReducer';
import { EmailServiceReducer } from './Reducers/EmailServiceReducer';

const store = configureStore({
    reducer: {
        authreducer: AuthReducer,
        emailreducer: EmailServiceReducer
        
        // emailreducer: emailReducer
    },
});

export default store;