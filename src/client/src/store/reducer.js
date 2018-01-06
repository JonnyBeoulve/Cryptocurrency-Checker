/*======================================================================
// By default the user will be signed out.
======================================================================*/
const initialState = {
    signedIn: false
}

/*======================================================================
// The reducer will handle state changes for Redux.
======================================================================*/
const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case 'SIGNIN':
            console.log("BEFORE: " + state.signedIn);
            return {
                ...state,
                signedIn: true
            }
        case 'SIGNOUT':
            return {
                ...state,
                signedIn: false
            }
    };
    return state;
}

export default reducer;