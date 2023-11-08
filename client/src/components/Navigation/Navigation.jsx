import { useNavigate } from "react-router-dom";
import { navigationMenu } from "./NavigationMenu";
import { Button, Avatar , MenuItem, Menu} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";

const Navigation = () => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const dispatch=useDispatch();

    const {auth}=useSelector(store=>store);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout=()=>{
        dispatch(logout());
        handleClose();
    }


    return (
        <div className="h-screen sticky top-0">
            <div>
                <div className="py-5">
                    {/* <img src="https://th.bing.com/th?id=OSK.50a4337ddb8f32c31afe1610d3d99f0b&w=102&h=102&c=7&o=6&oif=webp&dpr=1.5&pid=SANGAM" alt="Logo" height="30" width="30" /> */}

                    <img src="https://th.bing.com/th/id/OIP.sFU_4z7QbZJp5b2cTVH63QAAAA?pid=ImgDet&w=320&h=240&rs=1" alt="Logo" height="50" width="50" />
                </div>

                <div className="space-y-4">
                    {
                        navigationMenu.map((item) =>
                            <div key={item.id} className="cursor-pointer flex space-x-3 items-center" onClick={() => item.title === "Profile" ? navigate(`profile/${auth.user?.id}`) : navigate(item.path)}>
                                {item.icon}
                                <p className="text-lg">{item.title}</p>
                            </div>
                        )
                    }
                </div>

                <div className="py-4">
                    <Button
                        sx={{ width: "100%", borderRadius: "29px", py: "15px", bgcolor: "#1e88e5", fontSize:"15px" }}
                        variant="contained"
                    >Tweet</Button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar
                        alt="username"
                        src={auth.user?.image||"https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1"} />
                    <div>
                        <p>{auth.user?.fullName}</p>
                        <span className="opacity-70">@{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
                    </div>
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
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Navigation;