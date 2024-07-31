/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Card, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/postAction";
import { getAllUser } from "../../Redux/Auth/authAction";
import { ToastContainer } from "react-toastify";

function MiddlePart() {
  const dispatch = useDispatch();
  const { post, auth } = useSelector((store) => store);
  const story = auth.allUser;

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const handleClose = () => setOpenCreatePostModal(false);
  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
  };
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.newComment, post.deletePostStatus, post.like]);

  return (
    <div className="px-20">
      <section className="flex  py-5 items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "2.5rem", height: "2.5rem" }}>
            <AddIcon sx={{ fontSize: "2rem" }} />
          </Avatar>
          <p>New</p>
        </div>

        {story &&
          story.map((item, key) => (
            <div key={key}>
              <StoryCircle item={item} />
            </div>
          ))}
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handleOpenCreatePostModal}
            readOnly
            type="text"
            className="ml-3 outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border"
          />
        </div>

        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>

            <span>Media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>

            <span>Video</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>

            <span>Write Article</span>
          </div>
        </div>
      </Card>

      <div className="mt-5 space-y-5">
        {post.posts.map((item, key) => (
          <div key={key}>
            {" "}
            <PostCard item={item} />
          </div>
        ))}

        <div>
          <CreatePostModal
            handleClose={handleClose}
            open={openCreatePostModal}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default MiddlePart;
