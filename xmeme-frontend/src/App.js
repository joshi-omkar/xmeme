import { useState } from 'react';
import PageWrapper from './components/Meme/PageWrapper';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import routes from './Routes/Routes'
import CreateMeme from "./components/Meme/CreateMeme"
import EditMeme from "./components/Meme/EditMeme"
import UserProfile from "./components/UserProfile/UserProfile"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Navbar from './components/Navbar/Navbar';
import User from './components/UserProfile/User';

function App() {

  const [loginUser, setLoginUser] = useState("");

  return (
    <div>
      <Router>
        {/* page wrapper to wrap components as one*/}
        <Navbar loginUser={loginUser}/>
        <PageWrapper>
          <Routes>
            {/* {routes?.map((route) => <Route exact path={route.path} element={route.component}/>)} */}
            <Route exact path="/" element={<CreateMeme />}/>
            <Route exact path="/edit/:id/:memeId" element={<EditMeme />}/>
            <Route exact path={`/user/me`} element={<User/>}/>
            <Route exact path="/login" element={<Login setLoginUser={setLoginUser} />}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </PageWrapper>
      </Router>
    </div>
  );
}

export default App;
