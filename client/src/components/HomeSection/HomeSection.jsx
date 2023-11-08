import { Avatar, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Button } from "@mui/material";
import { useState } from 'react';
import TweetCard from './TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createTweet, getAllTweets } from '../../Store/Tweet/Action';
import { uploadFileCloudinary } from '../Util/uploadFileCloudinary';
import { allowedImageExtensions, allowedVideoExtensions } from '../Util/extensions';
import EmojiPicker from 'emoji-picker-react';

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Text is required")
})

const HomeSection = () => {

    const [uploadImage, setUploadImage] = useState(false);

    const [selectImage, setSelectImage] = useState("");

    const [selectVideo, setSelectVideo] = useState("");

    const [shouldReRender, setShouldReRender] = useState(false);

    const [showPicker, setShowPicker] = useState(false);

    const dispatch = useDispatch();

    const { auth,tweet } = useSelector(state => state);

    const handleSubmit = (values, actions) => {
        dispatch(createTweet(values));
        actions.resetForm();
        setSelectImage("");
        setSelectVideo("");
    }

    useEffect(() => {
        dispatch(getAllTweets());
    }, [tweet.like, tweet.retweet, tweet.delete, tweet.tweet])

    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            video: "",
            isTweet: true
        },
        onSubmit: handleSubmit,
        validationSchema,
    });

    const handleSelectImage = async (event) => {
        setUploadImage(true);
        let type = 0;
        const extension = event.target.files[0].type.split("/")[1];

        allowedImageExtensions.map((ext) => {
            if (ext === extension) {
                type = 1;
                return 1;
            }
        })

        allowedVideoExtensions.map((ext) => {
            if (ext === extension) {
                type = 2;
            }
        })

        if (type === 0) {
            console.log("invalid file");
            return;
        }

        const imgUrl = await uploadFileCloudinary(event.target.files[0], type);

        if (type === 1) {
            setSelectImage(imgUrl);
            formik.setFieldValue("image", imgUrl);
            formik.setFieldValue("video", "");
            setSelectVideo("");
            setUploadImage(false);
        } else {
            setSelectVideo(imgUrl);
            formik.setFieldValue("video", imgUrl);
            formik.setFieldValue("image", "");
            setSelectImage("");
            setUploadImage(false);
        }
    }

    // if(tweet.loading) {
    //     return <h1>Loading</h1>
    // }

    const handleEmoji = (event) => {
        formik.setFieldValue("content", formik.values.content + event.emoji);

        setShowPicker(!showPicker);
    }

    return (
        <div className="space-y-5">
            <section>
                <h1 className="py-5 font-bold text-xl">Home</h1>
            </section>

            <section className="pb-10">
                <div className='flex space-x-5'>
                    <Avatar alt="username" src={auth.user?.image||"https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1"} />
                    <div className='w-full'>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input type="text" name="content" placeholder='What is happening' className='border-none outline-none bg-transparent text-lg' value={formik.values.content} onChange={formik.handleChange} />
                                {formik.errors.content && formik.touched.content && (
                                    <span className='text-red-500'>{formik.errors.content}</span>
                                )}
                            </div>

                            {/* <div>
                                <img src="" alt="" />
                            </div> */}

                            <div className='flex justify-between items-center mt-5'>
                                <div className="flex space-x-5 items-center">
                                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                                        <ImageIcon className='text-[#1d9bf0]' />
                                        <input type="file" name="imageFile" className='hidden' onChange={handleSelectImage} />
                                    </label>

                                    <FmdGoodIcon className='text-[#1d9bf0] cursor-pointer' />
                                    <TagFacesIcon className='text-[#1d9bf0] cursor-pointer' onClick={() => setShowPicker(!showPicker)} />


                                </div>



                                <div>
                                    <Button
                                        sx={{ width: "100%", borderRadius: "20px", paddingY: "8px", paddingX: "20px", bgcolor: "#1e88e5" }}
                                        variant="contained" type='submit'
                                    >Tweet</Button>
                                </div>
                            </div>
                        </form>

                        {uploadImage&&
                        <div className='flex justify-center items-center w-full'>
                            <CircularProgress/>
                        </div>
}

                        {selectImage && <img src={selectImage} alt="" />}

                        {selectVideo &&
                            <video controls>
                                <source src={selectVideo} type="video/mp4" />
                            </video>
                        }

                        {
                            showPicker &&
                            <EmojiPicker
                                height={270}
                                width={300}
                                searchDisabled
                                onEmojiClick={handleEmoji}
                            />
                        }
                    </div>
                </div>
            </section>

            

            {tweet.loading? 
            <div className='flex justify-center items-center w-full'>
            <CircularProgress/>
        </div>
        :
            <section className='space-y-4'>
                {tweet.tweets?.map((item) => <TweetCard item={item} key={item.id} setShouldReRender={setShouldReRender} shouldReRender={shouldReRender} />)}
            </section>}
        </div>
    )
}

export default HomeSection;