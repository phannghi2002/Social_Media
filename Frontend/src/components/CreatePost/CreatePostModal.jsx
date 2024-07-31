/* eslint-disable react/prop-types */
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/Post/postAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

function CreatePostModal({ open, handleClose }) {
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("formik values", values);
      dispatch(createPostAction(values));
      handleClose();
      resetForm();
      setSelectdImage();
      setSelectdVideo();
    },
  });

  const [selectdImage, setSelectdImage] = useState();
  const [selectdVideo, setSelectdVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { auth } = useSelector((store) => store);

  const dispatch = useDispatch();

  const handleSelectImage = async (e) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(e.target.files[0], "image");
    console.log("deo ion", e.target.files[0]);

    setSelectdImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  };

  const handleSelectVideo = async (e) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(e.target.files[0], "video");
    console.log("deo ion", e.target.files[0]);

    setSelectdVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-4 items-center ">
            <Avatar />

            <div>
              <p className="font-bold text-lg">
                {auth.user?.firstName.toLowerCase() +
                  "_" +
                  auth.user?.lastName.toLowerCase()}
              </p>
              <p className="text-sm">{auth.user?.email}</p>
            </div>
          </div>
          <textarea
            className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm"
            placeholder="Write caption ..."
            name="caption"
            id=""
            value={formik.values.caption}
            onChange={formik.handleChange}
            rows="4"
          ></textarea>

          <div className="flex space-x-5 items-center mt-5">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectImage}
                style={{ display: "none" }}
                id="image-input"
              />
              <label htmlFor="image-input">
                <IconButton color="primary" component="span">
                  <ImageIcon />
                </IconButton>
              </label>

              <span>Image</span>
            </div>

            <div>
              <input
                type="file"
                accept="video/*"
                onChange={handleSelectVideo}
                style={{ display: "none" }}
                id="video-input"
              />
              <label htmlFor="video-input">
                <IconButton color="primary" component="span">
                  <VideoCallIcon />
                </IconButton>
              </label>

              <span>Video</span>
            </div>
          </div>

          {selectdImage && (
            <div>
              <img src={selectdImage} alt="" className="h-[10rem]" />
            </div>
          )}
          {selectdVideo && (
            <div>
              <video src={selectdVideo} alt="" className="h-[10rem]" controls />
            </div>
          )}

          <div className="flex w-full justify-end">
            <Button
              variant="contained"
              type="submit"
              sx={{ borderRadius: "1.5rem" }}
            >
              Post
            </Button>
          </div>
        </form>
        <div></div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
}

export default CreatePostModal;
