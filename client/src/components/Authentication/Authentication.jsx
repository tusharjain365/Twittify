import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import AuthModal from "./AuthModal";

const Authentication=()=>{

    const [openAuthModal,setopenAuthModal]=useState(false);
    const handleOpneAuthModal=()=>{setopenAuthModal(true)};
    const handleCloseAuthModal=()=>{setopenAuthModal(false)};

    return(
        <div>
            <Grid className="overflow-y-hidden" container>
                <Grid className="hidden lg:block" item lg={7} sx={{backgroundColor:"rgb(41, 41, 41)"}} >
                    <div className="w-full h-screen"></div>
                    {/* <img className="absolute top-[26%] left-[19%]" src="https://th.bing.com/th?id=OSK.50a4337ddb8f32c31afe1610d3d99f0b&w=102&h=102&c=7&o=6&oif=webp&dpr=1.5&pid=SANGAM" alt="cover screen"/> */}

                    <img className="absolute top-[26%] left-[19%]" src="https://th.bing.com/th/id/OIP.sFU_4z7QbZJp5b2cTVH63QAAAA?pid=ImgDet&w=320&h=240&rs=1" alt="cover screen"/>
                </Grid>

                <Grid className="px-10" lg={5} sm={12} item>
                    <h1 className=" mt-5 font-bold text-6xl">Happening Now</h1>
                    <h1 className="font-bold text-4xl py-6">Join Twittify Today</h1>

                    <div className="w-[60%]">
                        <div className="w-full">
                            <GoogleLogin width={330}/>
                            <p className="py-3 text-center">OR</p>

                            <Button onClick={handleOpneAuthModal} fullWidth variant="contained" sx={{borderRadius:"8px",py:"7px"}} size="large">Create Account</Button>

                            <p className="text-sm mt-2">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie user</p>
                        </div>

                        <div className="mt-5">
                            <h1 className="font-bold text-lg mb-5">Already have account?</h1>
                            <Button onClick={handleOpneAuthModal} fullWidth variant="outlined" sx={{borderRadius:"8px",py:"7px"}} size="large">Login</Button>
                        </div>

                    </div>
                </Grid>
            </Grid>

            <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal}/>
        </div>
    )
}

export default Authentication;