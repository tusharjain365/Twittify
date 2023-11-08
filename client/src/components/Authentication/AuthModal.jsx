import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SigninForm from './SigninForm';
import { useLocation, useNavigate } from 'react-router-dom';
import SignupForm from './SignupForm';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:2,
  outline:"none"
};

export default function AuthModal({open,handleClose}) {

  const location=useLocation();

  const navigate=useNavigate();

  const handleNavigate=()=>{
    const path=location.pathname==="/signup"?"/signin":"/signup";
    navigate(path);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-bold text-2xl pb-20">Create your Account</h1>

          {location.pathname==="/signup"?<SignupForm/>:<SigninForm/>}

          <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
            {location.pathname==="/signup"?"Already have Account":"if you don't have account"}
          </h1>

          <Button variant="outlined" sx={{borderRadius:"8px", py:"15px"}} fullWidth onClick={handleNavigate}>
            {location.pathname==="/signup"?"Sign in":"Signup"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
