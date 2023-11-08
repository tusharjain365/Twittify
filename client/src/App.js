import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Authentication from './components/Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from './Store/Auth/Action';
// import { createTheme, ThemeProvider } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
  
};

function App() {
  const jwt=localStorage.getItem("jwt");

  const {auth}=useSelector(store=>store);

  const dispatch=useDispatch();

  const navigate=useNavigate();

  useEffect(()=>{
    if(jwt) {
      dispatch(getUserProfile(jwt));
      navigate("/");
    }

  },[auth.jwt]);

  return (
    <ThemeProvider theme={auth.theme?createTheme(dark):createTheme(light)}>
    <CssBaseline />
    <div className="">
      <Routes>
        <Route path='/*' element={auth.user?<HomePage/>:<Authentication/>} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
