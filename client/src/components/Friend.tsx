import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import { urlBuilder } from "../constants";
import { setFriends } from "../store/features/userSlice";

const Friend: React.FC<any> = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(({ user }) => user.token);
  const friends = useAppSelector(({ user }) => user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(urlBuilder(`/users/${friendId}`), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends(data));
  };
  const navigateToProfile = () => {
    navigate(`/profile/${friendId}`);
    navigate(0);
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box onClick={navigateToProfile}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
