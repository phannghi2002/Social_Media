/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostClickedAction } from "../../Redux/Post/postAction";
import PostCard from "./PostCard";

function PostDetail() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getPostClickedAction(postId));
    console.log(post);
  }, [post.newComment, post.like]);
  return (
    <div className="w-[40%] m-auto">
      {post.post && <PostCard item={post.post} />}
    </div>
  );
}

export default PostDetail;
