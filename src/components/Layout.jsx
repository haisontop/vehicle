import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Navbar } from "./Navbar";
import { SearchContext } from "../contexts/SearchContext";
import { useRouter } from "next/router";
import CookieModal from "./CookiePopup";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
}));

const Layout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const router = useRouter();
  const { userId, onChangeUserId, cookieEnabled } = useContext(SearchContext);

  React.useEffect(() => {
    if (router.query.user && cookieEnabled) {
      if (!userId || router.query.user !== userId)
        onChangeUserId(router.query.user);
    }
  }, [router.query.user, userId, onChangeUserId, cookieEnabled]);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar />
      <CookieModal />
    </>
  );
};

export default Layout;
