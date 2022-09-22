import CreateMeme from "../components/Meme/CreateMeme"
import EditMeme from "../components/Meme/EditMeme"
import UserProfile from "../components/UserProfile/UserProfile"
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"


const routes = [
    {
        name: "CreateMeme",
        path: "/",
        component: <CreateMeme />,
        access: "public",
    },
    {
        name: "EditMeme",
        path: "/edit/:id",
        component: <EditMeme />,
        access: "public",
    },
    {
        name: "UserProfile",
        path: "/user/:id",
        component: <UserProfile />,
        access: "private",
    },
    {
        name: "Login",
        path: "/login",
        component: <Login/>,
        access: "public",
    },
    {
        name: "Register",
        path: "/register",
        component: <Register />,
        access: "public",
    },
];

export default routes;