import React, { useEffect } from "react";
import { urlBuilder } from "../constants";
import { setAllPosts } from "../store/features/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import Post from "./Post";

const Posts: React.FC<any> = ({ userId, isProfile = false }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.app.posts);
  const token = useAppSelector((state) => state.user.token);

  const getPosts = async () => {
    try {
    } catch (err) {}
    const response = await fetch(urlBuilder("posts"), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setAllPosts(data));
  };

  const getUserPosts = async () => {
    const response = await fetch(urlBuilder(`posts/${userId}/posts`), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setAllPosts(data));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (posts.length === 0) return <div> No posts available </div>;
  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }: any) => (
          <Post
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default Posts;
