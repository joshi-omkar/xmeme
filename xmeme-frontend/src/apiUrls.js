// const BASEURL = "https://xmeme-backend.onrender.com/"
const BASEURL = "http://localhost:8081/" 

// const BASEURL = window.location.hostname.indexOf('localhost') > -1 ? 'http://localhost:9000/' : 'https://xmeme-backend.onrender.com/';

const GET_ALL_MEMES = `${BASEURL}memes/`
const USER_LOGIN = `${BASEURL}userInfo/login`
const UPLOAD_FROM_DEVICE = `${BASEURL}file/upload`
const USER_REGISTER = `${BASEURL}userInfo/register`
const USER_INFO = `${BASEURL}userInfo/me`
const LIKES = `${BASEURL}memes/likes`
const UNLIKES = `${BASEURL}memes/unlikes`

module.exports = {
    GET_ALL_MEMES,
    USER_LOGIN,
    UPLOAD_FROM_DEVICE,
    USER_REGISTER,
    USER_INFO,
    LIKES,
    UNLIKES
}
