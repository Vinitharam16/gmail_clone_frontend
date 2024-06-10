import { getAllEmails, getemailsfromtype, sendEmail } from "../../api";
import { FETCH_EMAILS_ERROR, FETCH_EMAILS_REQUEST, FETCH_EMAILS_SUCCESS, SEND_EMAIL_ERROR, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from "../constants"


export const getEmailsAction = async (dispatch, getState) => {
    dispatch({ type: FETCH_EMAILS_REQUEST });
    try {
        const response = await getAllEmails(getState().authreducer.userId);
        dispatch({ type: FETCH_EMAILS_SUCCESS, payload: response.data.mails})
    } catch (error) {
        dispatch({ type: FETCH_EMAILS_ERROR, error });
    }
}

export const sendEmailAction = (form) => async (dispatch, getState) => {
    dispatch({ type: SEND_EMAIL_REQUEST });
    try {
      const response = await sendEmail(
        getState().authreducer.token, 
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbImN1c3RvbWVyIiwiYWRtaW4iXSwidWlkIjoiNjY2NDQxNmYyZDQ3MzRhMDdhZjVjMGI0IiwiaWF0IjoxNzE3OTIwOTAzLCJleHAiOjE3MTc5NTY5MDN9.o47u560mFyUdPxJiJT_ipnlCnc_MGaxZW4nGB288Qxk',
        form);
        console.log(response);
      dispatch({
        type: SEND_EMAIL_SUCCESS,
        payload: { sent: response.data.sent },
      });
    } catch (error) {
      dispatch({ type: SEND_EMAIL_ERROR, error });
    }
  };


export const getEmailsfromtypeAction = (token,type) =>  async (dispatch, getState) => {
  dispatch({ type: FETCH_EMAILS_REQUEST });
  try {
      const response = await getemailsfromtype(token,type);
      dispatch({ type: FETCH_EMAILS_SUCCESS, payload: response.data.mails})
  } catch (error) {
      dispatch({ type: FETCH_EMAILS_ERROR, error });
  }
}