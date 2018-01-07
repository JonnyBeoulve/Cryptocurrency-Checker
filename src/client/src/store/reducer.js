/*======================================================================
// By default the user will be signed out.
======================================================================*/
const initialState = {
    signedIn: false,
    displaySigninModal: false,
    displayRegisterModal: false
}

/*======================================================================
// The reducer will handle state changes for Redux.
======================================================================*/
const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case 'SIGNIN':
            return {
                ...state,
                signedIn: true
            }
        case 'SIGNOUT':
            return {
                ...state,
                signedIn: false
            }
        case 'DISPLAY_SIGNIN_MODAL':
        console.log("SHOWING SIGNIN");
            return {
                ...state,
                displaySigninModal: true
        }
        case 'HIDE_SIGNIN_MODAL':
            return {
                ...state,
                displaySigninModal: false
        }
        case 'DISPLAY_REGISTER_MODAL':
            return {
                ...state,
                displayRegisterModal: true
        }
        case 'HIDE_REGISTER_MODAL':
            return {
                ...state,
                displayRegisterModal: false
        }
    };
    return state;
}

export default reducer;