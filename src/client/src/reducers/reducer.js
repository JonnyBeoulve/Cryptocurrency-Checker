/*======================================================================
// By default the user will be signed out and no modals will be shown.
======================================================================*/
const initialState = {
    displayDetailsModal: false,
    displayRegisterModal: false,
    displaySigninModal: false,
    signedIn: false,
    showMessage: false,
    messageText: ''
}

/*======================================================================
// The reducer will handle state changes for Redux. Currently,
// these only include UI elements along with a message bubble to alert
// the user.
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
        case 'DISPLAY_DETAILS_MODAL':
            return {
                ...state,
                displayDetailsModal: true
        }
        case 'HIDE_DETAILS_MODAL':
            return {
                ...state,
                displayDetailsModal: false
        }
        case 'HIDE_MESSAGE':
            return {
                ...state,
                showMessage: false,
                messageText: ''
        }
        case 'DISPLAY_MESSAGE_SIGNIN_SUCCESS':
            return {
                ...state,
                showMessage: true,
                messageText: 'Sign in was successful.'
        }
        case 'DISPLAY_MESSAGE_REGISTER_SUCCESS':
            return {
                ...state,
                showMessage: true,
                messageText: 'Registration was successful.'
        }        
        case 'DISPLAY_MESSAGE_SIGNIN_ERROR':
            return {
                ...state,
                showMessage: true,
                messageText: 'An error occurred during sign in.'
        }
        case 'DISPLAY_MESSAGE_REGISTER_ERROR':
            return {
                ...state,
                showMessage: true,
                messageText: 'An error occurred during registration.'
        }
        case 'DISPLAY_MESSAGE_FORM_INCOMPLETE':
            return {
                ...state,
                showMessage: true,
                messageText: 'Form incomplete.'
        }
        case 'DISPLAY_MESSAGE_SEARCH_ERROR':
            return {
                ...state,
                showMessage: true,
                messageText: "Couldn't find that crypto."
        }
        case 'FOLLOW_SUCCESS':
            return {
                ...state,
                showMessage: true,
                messageText: 'Follow succeeded.'
        }
        case 'FOLLOW_FAILED':
            return {
                ...state,
                showMessage: true,
                messageText: 'Follow failed.'
        }
        case 'SEARCH_FAILED':
            return {
                ...state,
                showMessage: true,
                messageText: "A cryptocurrency with that name wasn't found."
        }
    };
    return state;
}

export default reducer;