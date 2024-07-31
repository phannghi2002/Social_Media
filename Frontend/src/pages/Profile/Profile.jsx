/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
// import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { getUserPostAction } from "../../Redux/Post/postAction";
import PostCard from "../../components/Post/PostCard";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "report", name: "Report" },
];

const reels = [1, 1, 1, 1];

function Profile() {
  const { auth, post } = useSelector((store) => store);

  const dispatch = useDispatch();

  const [value, setValue] = useState("post");

  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getUserPostAction());
  }, [post.newComment, post.like]);

  return (
    <Card className="py-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://th.bing.com/th/id/OIP.zDsVZwOKycFGG5k3sVc53wHaEo?w=254&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Scenery"
          />
        </div>

        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://th.bing.com/th?id=OIP.gIY2zFXyzM6sPatl9Z4GoAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          />

          <Button
            sx={{ borderRadius: "20px" }}
            variant="outlined"
            onClick={handleOpenProfileModal}
          >
            Edit Profile
          </Button>
        </div>

        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {" "}
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p>
              @
              {auth.user?.firstName.toLowerCase() +
                "_" +
                auth.user?.lastName.toLowerCase()}
            </p>
          </div>

          <div className="flex gap-5 items-center py-3">
            <span>{post.postsMine.length} post</span>
            <span>{auth.user.followers.length} followers </span>
            <span>{auth.user.followings.length} followings </span>
          </div>

          <div>
            <p>
              Today is hard, tomorrow will be worse but the day after tomorrow
              will be sunshine.
            </p>
          </div>
        </div>

        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item, key) => (
                <Tab value={item.value} label={item.name} key={key} wrapped />
              ))}
            </Tabs>
          </Box>

          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.postsMine &&
                  post.postsMine.map((item, key) => (
                    <div
                      className="border border-slate-100 rounded-md"
                      key={key}
                    >
                      <PostCard item={item} />
                    </div>
                  ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {reels.map((item, index) => (
                  <UserReelCard key={index} />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10 round">
                <div>Not found post saved.</div>
              </div>
            ) : (
              <div>Report</div>
            )}
          </div>
        </section>
      </div>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
}

export default Profile;
