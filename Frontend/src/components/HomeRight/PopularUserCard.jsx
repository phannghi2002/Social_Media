import { Avatar, Button, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import getFirstAndLastInitials from "../../utils/getFirstAndLastInitials";
import { followUnfollowUser } from "../../Redux/Auth/authAction";

function PopularUserCard({ item }) {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  if (item.id === auth.user.id) {
    return null;
  }

  const isFollowing = auth.user.followings.includes(item.id);

  const handleFollowUnfollow = () => {
    dispatch(followUnfollowUser(item.id));
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {getFirstAndLastInitials(item.firstName + " " + item.lastName)}
          </Avatar>
        }
        action={
          isFollowing ? (
            <Button
              size="small"
              onClick={handleFollowUnfollow}
              variant="outlined"
              color="warning"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              size="small"
              onClick={handleFollowUnfollow}
              variant="contained"
              color="success"
            >
              Follow
            </Button>
          )
        }
        title={item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}
        subheader={
          <span
            style={{
              display: "inline-block",
              maxWidth: "150px", // Set the max-width to control the length
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.email}
          </span>
        }
      />
    </div>
  );
}

export default PopularUserCard;
