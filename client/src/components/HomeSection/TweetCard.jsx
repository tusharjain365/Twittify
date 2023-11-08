import RepeatIcon from '@mui/icons-material/Repeat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, Avatar, MenuItem, Menu, CircularProgress } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReplyModal from './ReplyModal';
import { useDispatch, useSelector } from 'react-redux';
import { createReTweetReply, deleteTweet, likeTweet } from '../../Store/Tweet/Action';

const TweetCard = ({item,shouldReRender,setShouldReRender}) => {

    const {auth, tweet}=useSelector(store=>store);

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const dispatch=useDispatch();

    const [openReplyModal, setOpenReplyModal]=useState(false);

    const handleOpenReply=()=>{setOpenReplyModal(true)}
    const handleCloseReply=()=>{setOpenReplyModal(false)}

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteTweet = () => {
        dispatch(deleteTweet(item.id));
        setShouldReRender(!shouldReRender);
        handleClose();
    }

    const handleCreateRetweet = () => {
        dispatch(createReTweetReply(item?.id))
    }

    const handleLikeTweet = () => {
        dispatch(likeTweet(item?.id))
    }

    const navigateToTweet=()=> {
        navigate(`/tweets/${item?.id}`);
    }

    if(tweet.loading) {
        return (
                                <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
        )
    }


    return (
        <>
            {/* <div className="flex items-center text-gray-700 py-2">
                <RepeatIcon/>
            </div> */}

            <div className="flex space-x-3">
                <Avatar
                    alt="username"
                    src={item.user?.image||"https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1"}
                    className='cursor-pointer'
                    onClick={() => navigate(`/profile/${item.user?.id}`)}
                />

                <div className='w-full'>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <span className="font-semibold">{item?.user?.fullName}</span>
                            <span className="text-gray-600">@{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png" alt="verifiedIcon" className='ml-2 w-5 h-5' />
                        </div>

                        <div>
                            <Button
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                {auth.user?.id===item.user?.id&&
                                    <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                                }
                                <MenuItem onClick={()=> navigate(`/tweets/${item?.id}`)}>Details</MenuItem>
                                {/* {auth.user?.id===item.user?.id&&<MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>} */}
                            </Menu>
                        </div>
                    </div>

                    {item.isReply&&<h1>This is replied</h1>}

                    <div className="mt-2 px-2">
                        <div onClick={navigateToTweet} className="cursor-pointer">
                            <p className="mb-2 p-0">{item?.content}</p>
                            {item.image&&<img className='w-[28rem] border-2 border-gray-400 p-1 rounded-md' 
                            // src="https://th.bing.com/th/id/OIP.y8opuVhq_b1NhSRD6GVD-AHaEA?pid=ImgDet&rs=1" 
                            src={item.image}
                            alt="" />}

                            {item.video&&<video className='w-[28rem] border-2 border-gray-400 p-1 rounded-md' controls>
                                <source src={item.video}/>
                            </video>}
                        </div>

                        <div className="py-2 flex flex-wrap items-center justify-around">
                            <div className="space-x-1 flex items-center text-gray-6">
                                <ChatBubbleOutlineIcon className='cursor-pointer' onClick={handleOpenReply} />
                                <p>{item?.totalReplies}</p>
                            </div>

                            <div className={`${item?.retweet ? "text-pink-600" : "text-gray-600"} space-x-1 flex items-center`}>
                                <RepeatIcon className="cursor-pointer" onClick={handleCreateRetweet} />
                                <p>{item?.totalRetweets}</p>
                            </div>

                            <div className={`${item?.liked ? 'text-pink-600' : 'text-gray-600'} space-x-1 flex items-center`}>
                                {item?.liked ? <FavoriteIcon className="cursor-pointer" onClick={handleLikeTweet} /> : <FavoriteBorderIcon className="cursor-pointer" onClick={handleLikeTweet} />}
                                <p>{item?.totalLikes}</p>
                            </div>

                            <div className="space-x-1 flex items-center text-gray-6">
                                <BarChartIcon className='cursor-pointer' onClick={handleOpenReply} />
                                <p>430</p>
                            </div>

                            <div className="space-x-1 flex items-center text-gray-6">
                                <FileUploadIcon className='cursor-pointer' onClick={handleOpenReply} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <ReplyModal key={item.id} open={openReplyModal} handleClose={handleCloseReply} item={item}/>
            </section>
        </>
    )
}

export default TweetCard;