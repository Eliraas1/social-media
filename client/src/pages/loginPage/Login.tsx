import { FC } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../../components/Form";

const Login: FC = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        bgcolor={(theme.palette.background as any).alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={(theme.palette.background as any).alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to our social mediaa
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
