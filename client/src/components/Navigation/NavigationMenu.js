import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";

export const navigationMenu=[
    {
        id:1,
        title:"Home",
        icon: <HomeIcon/>,
        path:"/home"
    },
    {
        id:2,
        title:"Explore",
        icon: <ExploreIcon/>,
        path:"/explore"
    },
    {
        id:3,
        title:"Notifications",
        icon: <NotificationIcon/>,
        path:"/notification"
    },

    {
        id:4,
        title:"Messages",
        icon: <MessageIcon/>,
        path:"/messages"
    },
    {
        id:5,
        title:"Lists",
        icon: <ListAltIcon/>,
        path:"/list"
    },
    {
        id:6,
        title:"Communities",
        icon: <GroupIcon/>,
        path:"/communities"
    },
    {
        id:7,
        title:"Verified",
        icon: <VerifiedIcon/>,
        path:"/verified"
    },
    {
        id:8,
        title:"Profile",
        icon: <AccountCircleIcon/>,
        path:"/profile"
    },
    {
        id:9,
        title:"More",
        icon: <PendingIcon/>,
        path:"/more"
    },
]