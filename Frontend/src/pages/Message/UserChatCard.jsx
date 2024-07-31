import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

function UserChatCard({ chat }) {
  const { auth } = useSelector((store) => store);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3rem",
              height: "3rem",
              fontSize: "1.5rem",
              bgcolor: "191c29",
              color: "rgb(88,19,250)",
            }}
            src="https://th.bing.com/th/id/R.17100960780cba2fa32af0f792b47264?rik=%2bC3ZW%2fQ2QiNn4A&pid=ImgRaw&r=0"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          auth && auth?.user?.id === chat?.users[0]?.id
            ? chat.users[1].firstName + " " + chat.users[1].lastName
            : chat.users[0].firstName + " " + chat.users[0].lastName
        }
        subheader={"new message"}
      ></CardHeader>
    </Card>
  );
}

export default UserChatCard;
