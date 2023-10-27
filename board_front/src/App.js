import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Auth from './Routes/AuthRoute';
import Home from './pages/Home/Home';
import RootLayout from './components/RootLayout/RootLayout';
import { useQuery } from 'react-query';
import { instance } from './api/config/instance';
import AuthRoute from './Routes/AuthRoute';
import MyPageRoute from './Routes/AccountRoute';
import AccountRoute from './Routes/AccountRoute';
import EditPassword from './pages/EditPassword/EditPassword';
import BoardWrite from './pages/BoardWrite/BoardWrite';
import BoardList from './pages/BoardList/BoardList';
import BoardDetails from './pages/BoardDetails/BoardDetails';
import Store from './pages/Store/PointStore';

function App() {
  const navigate = useNavigate();

  // [key값 지정 (, dependency)] + 비동기
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
    retry: 0, //요청 실패했을때 요청 몇번 날릴거냐
    refetchInterval: 1000 * 60 * 10, //주기적(10분)으로 서버의 데이터 동기화
    refetchOnWindowFocus: false
  });

  if(getPrincipal.isLoading) {
    return<></>
  }

  return (
    <RootLayout>
    <Routes>
      <Route path="/" element={<Home />} />;
      <Route path="/auth/*" element={<AuthRoute />} />;
      <Route path="/account/*" element={<AccountRoute />} />
      <Route path="/board/write" element={ <BoardWrite />} />
      <Route path="/board/:category/:page" element={ <BoardList /> } />
      <Route path="/board/:boardId" element={<BoardDetails />} />
      <Route path="/board/:category/edit" element={<></>} />
      <Route path="/auth/forgot/password" element={<EditPassword />} />
      <Route path="/store/products" element={<Store />} />
      {/* <Route path="/" element={<></>} /> */}
    </Routes>
    </RootLayout>
  );
}

export default App;
