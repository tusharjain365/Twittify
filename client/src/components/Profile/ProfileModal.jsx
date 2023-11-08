import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, CircularProgress, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Store/Auth/Action';
import { uploadFileCloudinary } from '../Util/uploadFileCloudinary';
import { days, months, years } from '../Util/Date';

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



export default function ProfileModal({ open, handleClose }) {
    const [uploadImage, setUploadImage] = useState(false);

    const dispatch = useDispatch();

    const { auth } = useSelector(store => store);

    const handleSubmit = (values) => {

        const { day, month, year } = values.birthDate;
        const birthDate = `${year}-${month}-${day}`;

        values.birthDate = birthDate;

        dispatch(updateUser(values));
        handleClose();
    }

    const formik = useFormik({
        initialValues: {
            fullName: auth.user?.fullName,
            website: auth.user?.website,
            location: auth.user?.location,
            bio: auth.user?.bio,
            backgroundImage: auth.user?.backgroundImage,
            image: auth.user?.image,
            birthDate: {
                day: `${auth.user?.birthDate ? parseInt(auth.user?.birthDate.split("-")[2]) : 1}`,
                month: `${auth.user?.birthDate ? auth.user?.birthDate.split("-")[1] : "January"}`,
                year: `${auth.user?.birthDate ? parseInt(auth.user?.birthDate.split("-")[0]) : 1997}`,
            }
        },
        onSubmit: handleSubmit
    });

    const handleImageChange = async (event) => {
        setUploadImage(true);
        const { name } = event.target;
        const file = await uploadFileCloudinary(event.target.files[0],1);

        formik.setFieldValue(name, file);

        setUploadImage(false);
    }

    const handleDateChange = (name) => (event) => {
        formik.setFieldValue("birthDate", {
            ...formik.values.birthDate,
            [name]: event.target.value
        })
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

                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconButton onClick={handleClose} aria-label="delete">
                                    <CloseIcon />
                                </IconButton>
                                <p className="text-sm">Edit Profile</p>
                            </div>

                            <Button type="submit">Save</Button>
                        </div>

                        <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
                            <>
                                <div className="w-full">
                                    <div className="relative">
                                        <img className='h-[12rem] object-cover object-center w-full' src={formik.values.backgroundImage||"https://cdn.pixabay.com/photo/2023/09/05/16/39/sunrise-8235461_1280.jpg"} alt="background image"/>
                                        <input className='w-full absolute top-0 opacity-0 cursor-pointer left-0 h-full' type="file" name="backgroundImage"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>

                                {uploadImage&&
                        <div className='flex justify-center items-center w-full'>
                            <CircularProgress/>
                        </div>}

                                <div className="w-full tranform -translate-y-20 ml-4 h-[6rem]">
                                    <div className="relative">
                                        <Avatar
                                            sx={{ width: "10rem", height: "10rem", border: "2px solid white" }}
                                            src={formik.values.image||auth.user?.image || "https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1"}
                                        />

                                        <input
                                            className="absolute top-0 left-0 opacity-0 cursor-pointer h-full w-[10rem]"
                                            type="file"
                                            name="image"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <TextField
                                        fullWidth
                                        name="fullName"
                                        id="fullName"
                                        label="Full Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.fullName}
                                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                        helperText={formik.touched.fullName && formik.errors.fullName}
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="bio"
                                        id="bio"
                                        label="Bio"
                                        onChange={formik.handleChange}
                                        value={formik.values.bio}
                                        error={formik.touched.bio && Boolean(formik.errors.bio)}
                                        helperText={formik.touched.bio && formik.errors.bio}
                                    />

                                    <TextField
                                        fullWidth
                                        name="website"
                                        id="website"
                                        label="Website"
                                        onChange={formik.handleChange}
                                        value={formik.values.website}
                                        error={formik.touched.website && Boolean(formik.errors.website)}
                                        helperText={formik.touched.website && formik.errors.website}
                                    />

                                    <TextField
                                        fullWidth
                                        name="location"
                                        id="location"
                                        label="Location"
                                        onChange={formik.handleChange}
                                        value={formik.values.location}
                                        error={formik.touched.location && Boolean(formik.errors.location)}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />

                                    <div className="my-3">
                                        <p className="text-lg">Birth Date</p>
                                        <Grid container spacing={2}>

                                            <Grid xs={4} item>
                                                <InputLabel>Day</InputLabel>
                                                <Select
                                                    name="day"
                                                    value={formik.values.birthDate.day}
                                                    fullWidth
                                                    onChange={handleDateChange('day')}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    {days.map((day) => (
                                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                                    ))}
                                                </Select>

                                            </Grid>

                                            <Grid xs={4} item>
                                                <InputLabel>Month</InputLabel>
                                                <Select
                                                    name="month"
                                                    fullWidth
                                                    value={formik.values.birthDate.month}
                                                    onChange={handleDateChange('month')}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    {months.map((month) => (
                                                        <MenuItem key={month.value} value={month.label}>{month.label}</MenuItem>
                                                    ))}
                                                </Select>

                                            </Grid>

                                            <Grid xs={4} item>
                                                <InputLabel>Year</InputLabel>
                                                <Select
                                                    name="year"
                                                    fullWidth
                                                    value={formik.values.birthDate.year}
                                                    onChange={handleDateChange('year')}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    {years.map((year) => (
                                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                                    ))}
                                                </Select>

                                            </Grid>
                                        </Grid>

                                        <p className="text-lg font-bold">{auth.user?.birthDate?.split("-")[1]} {auth.user?.birthDate?.split("-")[2]} {auth.user?.birthDate?.split("-")[0]}</p>

                                    </div>

                                    <p className="text-lg py-3">Edit your Professional Profile</p>
                                </div>
                            </>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}