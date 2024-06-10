import { SEND_EMAIL_SUCCESS } from "../constants"



const initialState = {
    isLoading: false,
    mails: {
        inbox: [],
        sent: [],
        drafts: [],
        trash: [],
        starred: [],
    },
    error: '',
}



export const emailReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                mails: {
                    ...state.mails,
                    inbox: [...state.mails.inbox, action.payload.inbox]
                },
                error: '',
            }
        
    }
}
