import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, getUserBySearch } from '../../Store/Auth/Action';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const RightPart=()=>{

    const [openSubscriptionModal,setOpenSubscriptionModal]=useState(false);

    const {auth}=useSelector(store=>store);

    const navigate=useNavigate();

    const dispatch=useDispatch();

    const handleOpenSubscriptionModal=()=>{setOpenSubscriptionModal(true)};
    const handleCloseSubscriptionModal=()=>{setOpenSubscriptionModal(false)};

    const [searchUserValue, setSearchUserValue]=useState('');

    const handleSearchUser=(e)=> {

        setSearchUserValue(e.target.value);
        dispatch(getUserBySearch(searchUserValue));

    }

    const handleChangeTheme=()=> {
        dispatch(changeTheme());
    }

    return(
        <div className="py-5 sticky top">
            <div className="relative flex items-center">
                <input type="text" className="py-3 rounded-full text-gray-500 w-full pl-12" placeholder='Search a user' name="searchUserValue" value={searchUserValue} onChange={handleSearchUser}/>

                <div className="absolute top-0 left-0 pl-3 pt-3">
                    <SearchIcon className='text-gray-500'/>

                </div>

                <Brightness4Icon onClick={handleChangeTheme} className="ml-3 cursor-pointer" />
            </div>



            {auth.loading ? 
            <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
            :<div className="space-y-2">
            {searchUserValue&&auth.searchUser&&auth.searchUser.map((item)=> item.id!==auth.user?.id&&(
                <div key={item.id} className="cursor-pointer flex space-x-3 items-center py-2" onClick={() => navigate(`profile/${item.id}`)}>
                <AccountCircleIcon/>
                <p className="text-lg">{item.fullName}</p>
                <p className='text-gray-500'>{item.fullName.split(" ").join("_").toLowerCase()}</p>
            </div>
            ))}
            </div>}

            <section className="my-5">
                <h1 className="text-lg font-bold">Get Verified</h1>
                <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
                <Button
                        sx={{ borderRadius: "25px", paddingY: "10px", paddingX:"20px", bgcolor: "#1e88e5" }}
                        variant="contained"
                        onClick={handleOpenSubscriptionModal}
                    >Get Verified</Button>
            </section>

            <section className="mt-7 space-y-5">
                <h1 className="font-bold text-lg py1">What's happening</h1>

                <div>
                    <p className="text-sm">Some news</p>
                    <p className="font-bold">Something about it</p>
                </div>

                {
                    [0,1,2,3,4].map((item)=>
                    <div className="flex justify-between w-full" key={item}>
                    <div>
                        <p>Entertainment- Trending</p>
                        <p className="font-bold">#TheMarvels</p>
                        <p>34.3k Tweets</p>
                    </div>

                    <MoreHorizIcon/>
                </div>
                    )
                }
                

            </section>

            <section>
                <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal} />
            </section>

        </div>
    )
}

export default RightPart;