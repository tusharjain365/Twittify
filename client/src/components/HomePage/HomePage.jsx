import { Grid } from "@mui/material";
import HomeSection from "../HomeSection/HomeSection";
import Navigation from "../Navigation/Navigation";
import RightPart from "../RightPart/RightPart";
import {Routes, Route} from 'react-router-dom';
import Profile from "../Profile/Profile";
import TweetDetails from '../TweetDetails/TweetDetails'


const HomePage=()=>{
    return(
        <Grid container className="px-3 lg:px-32 justify-between">
            <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
                <Navigation/>
            </Grid>

            <Grid item xs={12} lg={6} className="px-4 lg:px-3 hidden lg:block w-full relative">
                
                <Routes>
                    <Route path="/" element={<HomeSection/>} />
                    <Route path="/home" element={<HomeSection/>} />
                    <Route path="/profile/:id" element={<Profile/>} />
                    <Route path="/tweets/:id" element={<TweetDetails/>} />
                </Routes>
            </Grid>

            <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
                <RightPart/>
            </Grid>
        </Grid>
    )
}

export default HomePage;