import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Reels",
    icon: <ExploreIcon />,
    path: "/reels",
  },

  {
    title: "Notifications",
    icon: <NotificationsIcon />,
    path: "/",
  },
  {
    title: "Message",
    icon: <MessageIcon />,
    path: "/message",
  },

  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
];
