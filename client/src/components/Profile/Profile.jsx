import { useNavigate, useParams } from 'react-router-dom';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, Box, Button, CircularProgress, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import TweetCard from '../HomeSection/TweetCard';
import ProfileModal from '../Profile/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction, getUserById } from '../../Store/Auth/Action';
import { findTweetsByLikesContainsUser, getUserReplyTweets, getUsersTweets } from '../../Store/Tweet/Action';
import Header from '../Header/Header';

const Profile = () => {
    const [openProfileModel,setOpenProfileModel]=useState(false);

    const [tabValue, setTabValue] = useState('1');

    const {auth, tweet}=useSelector(store=>store);
    const dispatch=useDispatch();
    const {id}=useParams();

    const handelOpenProfileModel=()=>{setOpenProfileModel(true)}
    const handleClose=()=>{setOpenProfileModel(false)}

    const handleFollowUser = () => {
        dispatch(followUserAction(id));
    }


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(()=>{
        dispatch(getUserById(id));
        dispatch(getUsersTweets(id));
        dispatch(findTweetsByLikesContainsUser(id));
        dispatch(getUserReplyTweets(id));
    },[id,auth.user,tweet?.like,tweet?.retweet])

    if(auth.loading) {
        return (
            <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
        )
    }

    return (
        <div>
            {/* <section className={`bg-${auth.theme?"dark":"white"} flex items-center sticky top-0 z-50 bg-opacity-95`}>
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
                <h1 className="py-5 text-lg font-bold opacity-90 ml-5">{auth?.findUser?.fullName}</h1>
            </section> */}

            <Header text={auth.findUser?.fullName} type={auth.theme}/>

            <section>
                <img className='w-[100%] h-[15rem] object-cover' src={auth.user?.backgroundImage||"https://cdn.pixabay.com/photo/2023/09/05/16/39/sunrise-8235461_1280.jpg"} alt="" />
            </section>

                    {/*  'https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1' */}
            <section className='pl-5'>
                <div className="flex justify-between items-start mt-3 h-[5rem]">
                    <Avatar
                        className='transform -translate-y-20'
                        alt='test user' src={auth.findUser?.image}
                        sx={{ width: "7rem", height: "7rem", border: "2px solid white" }}
                    />

                    {auth.findUser?.id===auth.user?.id ? <Button onClick={handelOpenProfileModel} variant="contained" sx={{ borderRadius: "20px" }} >Edit Profile</Button> :
                        <Button onClick={handleFollowUser} variant="contained" sx={{ borderRadius: "20px" }} >{auth.findUser?.followed ? "Unfollow" : "Follow"}</Button>}
                </div>

                <div>
                    <div className="flex items-center">
                        <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
                        {true && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png" alt="verifiedIcon" className='ml-2 w-5 h-5' />}
                    </div>
                    <h1 className="text-gray-500">@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
                </div>

                <div className="mt-1 space-y-1">
                    <p>{auth.findUser?.bio}</p>
                    <div className="py-1 flex space-x-5">
                        <div className="flex items-center text-gray-500">
                            <BusinessCenterOutlinedIcon />
                            <p className="ml-2">Education</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <LocationOnIcon />
                            <p className="ml-2">{auth.findUser?.location}</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <CalendarMonthIcon />
                            <p className="ml-2">Joined June 2023</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-5">
                        <div className="flex items-center space-x-1">
                            <span>{auth.findUser?.following.length}</span>
                            <span className="text-gray-500">Following</span>
                        </div>

                        <div className="flex items-center space-x-1">
                            <span>{auth.findUser?.followers.length}</span>
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-5'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Tweets" value="1" />
                                <Tab label="Replies" value="2" />
                                <Tab label="Media" value="3" />
                                <Tab label="Likes" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {
                                tweet.loading?
                                <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
        :
                                tweet.tweets?.map((item) => <TweetCard item={item} key={item.id}/>)
                            }
                        </TabPanel>
                        <TabPanel value="2">
                            {
                                tweet.loading?
                                <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
        :
                                tweet.replyTweets?.map((item)=> <TweetCard item={item} key={item.id}/>)
                            }
                        </TabPanel>
                        <TabPanel value="3">Media</TabPanel>
                        <TabPanel value="4">
                            {
                                tweet.loading?
                                <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
        :
                                tweet.likedTweets?.map((item)=><TweetCard item={item} key={item.id}/>)
                            }
                        </TabPanel>
                    </TabContext>
                </Box>
            </section>

            <section>
                <ProfileModal open={openProfileModel} handleClose={handleClose}/>
            </section>
        </div>
    )
}

export default Profile;