import { Avatar, Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useDispatch, useSelector } from 'react-redux';
import { createTweetReply } from '../../Store/Tweet/Action';
import { allowedImageExtensions, allowedVideoExtensions } from '../Util/extensions';
import { uploadFileCloudinary } from '../Util/uploadFileCloudinary';
import EmojiPicker from 'emoji-picker-react';

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
    borderRadius: "8px"
};

export default function ReplyModal({ open, handleClose, item }) {
    const navigate = useNavigate();

    const [uploadImage, setUploadImage] = useState(false);

    const [selectImage, setSelectImage] = useState("");

    const [selectVideo, setSelectVideo] = useState("");

    const [showPicker,setShowPicker]=useState(false);

    const {auth}=useSelector(store=>store);

    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        dispatch(createTweetReply(values));
        actions.resetForm();
        handleClose();
    }

    const handleSelectImage = async (event) => {
        setUploadImage(true);

        let type = 0;
        const extension = event.target.files[0].type.split("/")[1];

        allowedImageExtensions.map((ext) => {
            if (ext === extension) {
                type = 1;
            }
        })

        allowedVideoExtensions.map((ext) => {
            if (ext === extension) {
                type = 2;
            }
        })

        if (type == 0) {
            console.log("invalid file");
            return;
        }

        const imgUrl = await uploadFileCloudinary(event.target.files[0], type);

        if (type == 1) {
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

    const formik = useFormik({
        initialValues: {
            content: '',
            image: "",
            video: "",
            tweetId: item?.id
        },
        onSubmit: handleSubmit
    })

    const handleEmoji=(event)=>{ 
        formik.setFieldValue("content",formik.values.content+event.emoji);

        setShowPicker(!showPicker);
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

                    <div className="flex space-x-5">
                        <Avatar
                            alt="username"
                            src={item.user?.image||"https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1"}
                            className='cursor-pointer'
                            onClick={() => navigate(`/profile/${item.user?.id}`)}
                        />

                        <div className='w-full'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <span className="font-semibold">{item.user?.fullName}</span>
                                    <span className="text-gray-600">@{item.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png" alt="verifiedIcon" className='ml-2 w-5 h-5' />
                                </div>
                            </div>

                            <div className="mt-2">
                                <div onClick={() => navigate(`/tweets/${item.id}`)} className="cursor-pointer">
                                    <p className="mb-2 p-0">{item.content}</p>
                                </div>
                            </div>
                        </div>


                    </div>
                    <section className="py-10">
                        <div className='flex space-x-5'>
                            <Avatar alt="username" src={auth.user?.image||"https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1"} />
                            <div className='w-full'>
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <input type="text" name="content" placeholder='What is happening' className='border-none outline-none bg-transparent text-lg' {...formik.getFieldProps("content")} />
                                        {formik.errors.content && formik.touched.content && (
                                            <span className='text-red-500'>{formik.errors.content}</span>
                                        )}
                                    </div>

                                    <div className='flex justify-between items-center mt-5'>
                                        <div className="flex space-x-5 items-center">
                                            <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                                                <ImageIcon className='text-[#1d9bf0]' />
                                                <input type="file" name="imageFile" className='hidden' onChange={handleSelectImage} />
                                            </label>

                                            <FmdGoodIcon className='text-[#1d9bf0] cursor-pointer' />
                                            <TagFacesIcon className='text-[#1d9bf0] cursor-pointer' onClick={()=> setShowPicker(!showPicker)} />
                                        </div>

                                        <div>
                                            <Button
                                                sx={{ width: "100%", borderRadius: "20px", paddingY: "8px", paddingX: "20px", bgcolor: "#1e88e5" }}
                                                variant="contained" type='submit'
                                            >comment</Button>
                                        </div>
                                    </div>
                                </form>

                                {uploadImage&&
                        <div className='flex justify-center items-center w-full'>
                            <CircularProgress/>
                        </div>}

                                {selectImage && <img src={selectImage} alt="" />}

                                {selectVideo &&
                                    <video controls>
                                        <source src={selectVideo} type="video/mp4" />
                                    </video>
                                }

                                {
                                    showPicker&&
                                    <EmojiPicker
                                    height={280}
                                    width={300}
                                    onEmojiClick={handleEmoji}
                                    searchDisabled
                                    />
                                }
                            </div>
                        </div>
                    </section>

                </Box>
            </Modal>
        </div>
    );
}
