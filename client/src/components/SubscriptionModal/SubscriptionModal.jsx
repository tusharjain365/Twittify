import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: "8px",
    height:"98%"
};

const features=[
    {
        id:1,
        content:"Prioritized ranking in conversations and search",
    },
    {
        id:2,
        content:"See approx twice as many Tweets between ads in your followers and following",
    },
    {
        id:3,
        content:"Post longer vidoes and 1080p quality",
    },
]

export default function SubscriptionModal({open,handleClose}) {
  const[plan, setPlan]=useState("Annually");


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-y-scroll hideScrollBar">
        <div className="flex items-center space-x-3">
                                <IconButton onClick={handleClose} aria-label="delete">
                                    <CloseIcon/>
                                </IconButton>
                            </div>

        <div className="flex justify-center py-10">
            <div className="space-y-10 w-[80%]">
                <div className="p-5 rounded-md flex items-center justify-between shadow-lg bg-slate-200">
                    <h1 className='text-lg pr-5'>Blue subscribers with a verified phone number will get a blue checkmark once approved</h1>
                    <img className="w-24 h-24" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png" alt="verifiedIcon" />
                </div>

                <div className="flex justify-between border rounded-full px-5 py-5">
                    <div>
                        <span onClick={()=>setPlan('Annually')} className={`${plan==="Annually"?'text-black':'text-gray-400'} cursor-pointer`}>Annually</span>
                        <span className='text-green-500 text-sm ml-5' >Save 12%</span>
                    </div>
                    <p onClick={()=>setPlan('monthly')} className={`${plan==="monthly"?'text-black':'text-gray-400'} cursor-pointer`}>Monthly</p>
                </div>

                <div className="space-y-3">
                    {features.map((item)=><div key={item.id} className="flex items-center space-x-3">
                        <FiberManualRecordIcon sx={{width:"7px", height:"7px"}}/>
                        <p className="text-sm">{item.content}</p>
                    </div>)}
                </div>

                <div className="cursor-pointer flex justify-center bg-gray-600 text-white rounded-full px-5 py-3">
                    <span className="line-through italic">₹7,800.00</span>
                    <span className="px-5">₹6,800/year</span>
                </div>

            </div>
        </div>
        </Box>
      </Modal>
    </div>
  );
}