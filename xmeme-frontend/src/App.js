import { useState } from 'react';
import PageWrapper from './components/Meme/PageWrapper';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import CreateMeme from "./components/Meme/CreateMeme"
import EditMeme from "./components/Meme/EditMeme"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Navbar from './components/Navbar/Navbar';
import User from './components/UserProfile/User';

function App() {

  const [isLogedIn, setIsLogedIn] = useState(false);

  localStorage.setItem("isLogedIn", isLogedIn);
  console.log(JSON.parse(localStorage.getItem('isLogedIn')))
  console.log(isLogedIn)

  function logout(){
    setIsLogedIn(false)
    localStorage.removeItem("token");
    window.location = "/login";
  };
  
  return (
    <div>
      <Router>
        <Navbar isLogedIn={isLogedIn || JSON.parse(localStorage.getItem('isLogedIn')) === true} logout={logout}/>
        <PageWrapper>
          <Routes>
            <Route exact path="/" element={<CreateMeme />}/>
            <Route exact path="/edit/:id/:memeId" element={<EditMeme />}/>
            <Route exact path={`/user/me`} element={<User/>}/>
            <Route exact path="/login" element={<Login setIsLogedIn={setIsLogedIn}/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </PageWrapper>
      </Router>
    </div>
  );
}

export default App;
