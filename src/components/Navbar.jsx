import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  Link,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import { useSearchSettings } from "../hooks";
import { SearchContext } from "../contexts/SearchContext";
import {
  cleanSearchParams,
  decryption,
  encryption,
  removeAgentRole,
  replaceURLParameter,
} from "../utils";
import { DEFAULT_PHONE_NUMBER } from "./cars/CarDetails";
import { Logo } from "./icons/Logo";
import { CustomMenuIcon } from "./icons/CustomMenuIcon";
import TagManager from "react-gtm-module";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[3],
}));

export const Navbar = (props) => {
  const router = useRouter();
  const { isAgent } = router.query;
  const { onSidebarOpen, ...other } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const mobileMenuOpen = Boolean(anchorEl);
  const handleClickMobileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMobileMenu = () => {
    setAnchorEl(null);
  };
  const { userId, onChangeCookieEnabled } = React.useContext(SearchContext);
  const [open, setOpen] = React.useState(false);

  const [currentAddress, setCurrentAddress] =
    React.useState(DEFAULT_PHONE_NUMBER);
  const { agentAddress, onChangeAgentAddress, baseURL } = useSearchSettings();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  React.useEffect(() => {
    if (router.query.agentAddress) {
      onChangeAgentAddress(decryption(router.query.agentAddress, "phone"));
    }
  }, []);

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    setOpen(false);

    router.push({
      pathname: "/",
      query: {
        ...router.query,
        agentAddress: encryption(currentAddress),
      },
    });
  };

  React.useEffect(() => {
    setCurrentAddress(agentAddress.value);
  }, [agentAddress.value, setCurrentAddress]);

  const targetURL = React.useMemo(() => {
    return (
      baseURL +
      removeAgentRole(
        replaceURLParameter(
          router.asPath,
          "agentAddress",
          encryption(currentAddress)
        )
      )
    );
  }, [baseURL, router.asPath, currentAddress]);

  const handleClickFavorites = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "show_favorites_click",
      },
    });
    const filteredParams = cleanSearchParams({
      ...router.query,
    });

    const newUserId = Math.floor(Math.random() * 10000);

    if (newUserId.toString() !== userId) {
      onChangeCookieEnabled(undefined)
    }
    router.push({ query: { ...router.query, user: newUserId } })


    router.push({
      pathname: "/favorites",
      query: filteredParams,
    });
  };

  const handleGoHome = () => {
    const filteredParams = cleanSearchParams({
      ...router.query,
      ...(router.query.id ? { id: null } : null),
      favorite: null
    });

    router.push({
      pathname: "/",
      query: filteredParams,
    });
  };

  return (
    <>
      <NavbarRoot {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <Box onClick={handleGoHome} sx={{ cursor: "pointer" }}>
            <Logo
              sx={{ width: "135px", height: "35px", color: "transparent" }}
            />
          </Box>

          {/* <Box sx={{ flexGrow: 1 }} />
          <Input startAdornment={<SearchIcon/>} placeholder="Search" sx={{px:3 ,py:0.5, borderRadius:1, display:{xs:'none', sm:'flex'}}}/> */}
          <Box sx={{ flexGrow: 1 }} />
          {isAgent ? (
            <>
              <Box display={{ xs: "none", sm: "none", md: "block" }}>
                <Tooltip title="Contact">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    sx={{ color: "#fff", borderWidth: 2 }}
                  >
                    Save agent phone number
                  </Button>
                </Tooltip>

                <CopyToClipboard
                  text={targetURL}
                  onCopy={() => handleOpenSnackBar()}
                >
                  <Tooltip title="Copy URL for customer">
                    <Button
                      variant="outlined"
                      color="primary"
                      id="copy-url-button"
                      sx={{ ml: 2, color: "#fff", borderWidth: 2 }}
                    >
                      Copy URL
                    </Button>
                  </Tooltip>
                </CopyToClipboard>
                <Tooltip title="Favorites">
                  <Button
                    variant="outlined"
                    color="primary"
                    id="show-favorites-button"
                    onClick={handleClickFavorites}
                    sx={{ color: "#fff", borderWidth: 2, ml: 2 }}
                  >
                    Favorites
                  </Button>
                </Tooltip>
              </Box>
              <Box display={{ sm: "block", md: "none" }}>
                <IconButton
                  onClick={handleClickMobileMenu}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <CustomMenuIcon sx={{ width: "40px", height: "40px" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={mobileMenuOpen}
                  onClose={handleCloseMobileMenu}
                  onClick={handleCloseMobileMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpen}
                    >
                      Save agent phone number
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <CopyToClipboard
                      text={targetURL}
                      onCopy={() => handleOpenSnackBar()}
                    >
                      <Button variant="contained" color="primary" fullWidth>
                        Copy URL
                      </Button>
                    </CopyToClipboard>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      variant="contained"
                      color="primary"
                      id="show-favorites-button"
                      onClick={handleClickFavorites}
                      fullWidth
                    >
                      Favorites
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box display={{ xs: "none", sm: "none", md: "block" }}>
                <Tooltip title="Favorites">
                  <Button
                    variant="outlined"
                    color="primary"
                    id="show-favorites-button"
                    onClick={handleClickFavorites}
                    sx={{ color: "#fff", borderWidth: 2 }}
                  >
                    Favorites
                  </Button>
                </Tooltip>
              </Box>
              <Box display={{ sm: "block", md: "none" }}>
                <IconButton
                  onClick={handleClickMobileMenu}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <CustomMenuIcon sx={{ width: "40px", height: "40px" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={mobileMenuOpen}
                  onClose={handleCloseMobileMenu}
                  onClick={handleCloseMobileMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Button
                      variant="contained"
                      color="primary"
                      id="show-favorites-button"
                      onClick={handleClickFavorites}
                    >
                      Favorites
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </NavbarRoot>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="URL copied"
      />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-title">Save Phone number</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Phone number"
            fullWidth
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Navbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
