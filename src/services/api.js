import axios from 'axios';

const API_URI = 'https://gmail-clone-backend-o2y5.onrender.com'
const token = window.localStorage.getItem('token')

const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
    const { params, urlParams, ...body } = requestData;

    return await axios({
        method: serviceUrlObject.method,
        url: `${API_URI}/${serviceUrlObject.endpoint}/${type}`,
        data: requestData,
        headers: {
            'Authorization': token
        }
    })
}

export default API_GMAIL;