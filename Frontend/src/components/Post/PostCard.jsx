/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  deletePostAction,
  likePostAction,
} from "../../Redux/Post/postAction";
import { isLikeByReqUser } from "../../utils/isLikedByReqUser";
import getFirstAndLastInitials from "../../utils/getFirstAndLastInitials";
import DeletePostModal from "./DeletePostModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

function PostCard({ item }) {
  const [showComments, setShowComments] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { auth, post } = useSelector((store) => store);

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: { content },
    };

    dispatch(createCommentAction(reqData));
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };

  const handleDeletePost = () => {
    if (auth.user.id !== item.user.id) {
      toast.warning("This is someone else's post that cannot be deleted");
    } else {
      console.log("Duoc phep xoa ne m");
      dispatch(deletePostAction(item.id));
      if (post.error) {
        toast.error(post.error.response.data.message);
        console.log("LOI NE CU", post.error);
      } else {
        toast.success("Delete post successfully");
      }
    }
  };

  const [open, setOpen] = useState(false);
  const handleDeleteModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const handleOpenPost = () => {
    console.log("ID BAI POST", item.id);
    navigate(`/post/${item.id}`);
  };

  const location = useLocation();

  useEffect(() => {
    const isPostPath = matchPath({ path: "/post/:postId" }, location.pathname);
    if (isPostPath) {
      setShowComments(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Card className="">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {getFirstAndLastInitials(
                item.user.firstName + " " + item.user.lastName
              )}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleDeleteModal}>
              <MoreVertIcon />
            </IconButton>
          }
          title={item.user.firstName + " " + item.user.lastName}
          subheader={`@${item.user.firstName.toLowerCase()}_${item.user.lastName.toLowerCase()}`}
        />

        <CardMedia
          component="img"
          height="194"
          image={item.image}
          alt="Image"
          onClick={handleOpenPost}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.caption}
          </Typography>
        </CardContent>

        <CardActions className="flex justify-between" disableSpacing>
          <div>
            <IconButton onClick={handleLikePost}>
              {isLikeByReqUser(auth.user?.id, item) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            <IconButton>{<ShareIcon />}</IconButton>

            <IconButton onClick={handleShowComment}>
              {<ChatBubbleIcon />}
            </IconButton>
          </div>

          <div>
            <IconButton>
              {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </div>
        </CardActions>

        {showComments && (
          <section>
            <div className="flex items-center  space-x-5 mx-3 my-5">
              <Avatar />

              <input
                type="text"
                className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2 "
                placeholder="Write your comment..."
                ref={inputRef}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    handleCreateComment(e.target.value);
                    console.log("enter pressed----", e.target.value);
                    inputRef.current.value = "";
                  }
                }}
              />
            </div>

            <Divider />

            {item.comments?.map((comment, key) => (
              <div key={key} className="mx-3 space-y-2 my-5 text-xs">
                <div className="flex items-center space-x-5">
                  <Avatar
                    sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                  >
                    {getFirstAndLastInitials(
                      comment.user.firstName + " " + comment.user.lastName
                    )}
                  </Avatar>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </Card>

      <section>
        <DeletePostModal
          handleClose={handleClose}
          open={open}
          handleDeletePost={handleDeletePost}
        />
      </section>
    </>
  );
}

export default PostCard;
