import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CircularProgress, Divider } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { findTweetById } from '../../Store/Tweet/Action';
import Header from '../Header/Header';
import TweetCard from '../HomeSection/TweetCard'

const TweetDetails=()=>{
    const navigate=useNavigate();

    const handleBack=(()=>navigate(-1)); // to back from where it loaded

    const {id}=useParams();
    const {auth,tweet}=useSelector(store=>store);

    const dispatch=useDispatch();
    
    useEffect(()=>{
        if(id) {
            dispatch(findTweetById(id));
        }
    },[id,tweet?.like,tweet?.retweet])

    return(
        <>
            {/* <section className="bg-white flex items-center sticky top-0 z-50 bg-opacity-95">
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
                <h1 className="py-5 text-lg font-bold opacity-90 ml-5">Tweet</h1>
            </section> */}

            <Header text="Tweet" type={auth.theme}/>

            {tweet.loading?
                                <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
        :
                <>
            <section>
                {tweet.tweet&&<TweetCard item={tweet.tweet}/>}
                <Divider sx={{margin:"2rem 0"}} />
            </section>

            <section>
                {
                    tweet.tweet&& tweet.tweet.replyTweets?.map((item)=> <TweetCard item={item} key={item.id} />)
                }
            </section>
                </>}
        </>
    )
}

export default TweetDetails;