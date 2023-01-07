import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../store/store";
import Posts from "../../components/Posts";
import User from "../../components/User";

const Home: React.FC = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useAppSelector((state) => state.user);
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <User userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <Posts userId={_id} />
        </Box>
        {/* {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default Home;
