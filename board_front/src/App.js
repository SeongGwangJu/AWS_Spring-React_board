import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Auth from './components/Auth/Auth';
import Home from './pages/Home/Home';
import RootLayout from './components/RootLayout/RootLayout';
import { useQuery } from 'react-query';
import { instance } from './api/config/instance';

function App() {
  const navigate = useNavigate();

  //key값 지정 + 비동기
  const getPrincipal = useQuery(["getPrincipal"], async () => {
    try{
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      }
      return await instance.get("/account/principal", option);

    }catch(error) {
      throw new Error(error);
    }
  }, {
    retry: 0,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  });

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
