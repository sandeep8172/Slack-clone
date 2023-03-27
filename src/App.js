import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import GeneralPage from './components/generalSetion/GeneralPage';
import Random from "./components/randomSection/Random"
import Slack from './components/slackSection/Slack';
import SignIn from './components/loginSection/SignIn';
import Welcome from './components/welcomePage/Welcome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/home' element={<><Home /><Welcome /> </>} />
      <Route path='/home/general' element={<><Home /><GeneralPage /></>} />
      <Route path='/home/random' element={<><Home /><Random /></>} />
      <Route path='/home/slack' element={<><Home /><Slack /></>} />
    </Routes>
  );
}

export default App;
