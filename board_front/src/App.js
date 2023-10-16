import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Auth from './components/Auth/Auth';
import Home from './pages/Home/Home';
import RootLayout from './components/RootLayout/RootLayout';

function App() {
  return (
    <RootLayout>
    <Routes>
      <Route path="/" element={<Home />} />;
      <Route path="/auth/*" element={<Auth />} />;
      <Route path="/board/:category" element={<></>} />
      <Route path="/board/:category/register" element={<></>} />
      <Route path="/board/:category/edit" element={<></>} />
      {/* <Route path="/" element={<></>} /> */}
    </Routes>
    </RootLayout>
  );
}

export default App;
