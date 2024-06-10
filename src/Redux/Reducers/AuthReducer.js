import { CLEAR_ERRORS, FETCH_USER_ERROR, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants";


const initialState = {
    isLoading: false,
    isLoggedIn: false,
    token: window.localStorage.getItem('token'),
    user: {},
    error: '',
};


export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_ERRORS:
            return {
                ...state,
                error: '',
            };

        case LOGOUT:
            window.localStorage.setItem('token', '');
            console.log('Token removed from local storage');
            return initialState;


        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case FETCH_USER_REQUEST:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: { email: action.payload },
                error: '',
            }
        case LOGIN_SUCCESS:
            window.localStorage.setItem('token', action.payload);
            console.log('Token saved to localstorage');
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                token: action.payload,
                error: '',
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                user: action.payload,
                error: '',
            };
        case REGISTER_ERROR:
                return {
                  ...state,
                  isLoading: false,
                  user: {},
                  error: action.error,
                };
        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case FETCH_USER_ERROR:
            window.localStorage.setItem('token', '')
            console.log('Token removed from Localstorage');
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                token: '',
                user: {},
                error: action.error,
            };
        default:
            return {
                state,
            }
            
           
            
    }
};





// import { createSlice } from "@reduxjs/toolkit";

// export const AuthReducer = createSlice({
//     name: "Auth",
//     initialState: {
//         isLoggedIn: false,
//         userId: null,
//         // token: window.localStorage.getItem('token'),
//         token: '',
//     },
//     reducers: {
//         setLoggedIn: (state,action) => {
//             state.isLoggedIn = action.payload;
//         },
//         setUserId: (state,action) => {
//             state.userId = action.payload;
//         }
//     },
// });

// export const { setLoggedIn, setUserId } = AuthReducer.actions;
// export default AuthReducer.reducer;