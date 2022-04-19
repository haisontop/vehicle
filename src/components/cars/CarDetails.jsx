import {
  Card,
  Box,
  CardContent,
  Typography,
  Grid,
  Stack,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Chip,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import ImageGallery from "react-image-gallery";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  decryption,
  getPriceIndicatorColor,
  getPriceIndicatorLabel,
  getPriceIndicatorLabelColor,
} from "../../utils";
import { useRouter } from "next/router";
import TagManager from "react-gtm-module";
import { TransmissionTypeIcon } from "../icons/TransmissionTypeIcon";
import { DealerIcon } from "../icons/DealerIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { WheelIcon } from "../icons/WheelIcon";
import { CalculatorIcon } from "../icons/CalculatorIcon";
import SpecificationDialog from "../dialogs/SpecificationDialog";
import RunningCostDialog from "../dialogs/RunningCostDialog";
import axios from "axios";
import {
  SearchContext,
  restoreCookieEnabled,
} from "../../contexts/SearchContext";
import { ArrowBack } from "@mui/icons-material";

export const DEFAULT_PHONE_NUMBER = "00442030059330";

const CarDetails = ({ details, handleClickBack }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [specificationOpen, setSpecificationOpen] = React.useState(false);
  const [runningCostOpen, setRunningCostOpen] = React.useState(false);

  const { vehicle, media, adverts, advertiser, metadata } = details;

  const { searchId } = metadata;

  const { forecourtPrice } = adverts;

  const { userId, onChangeCookieEnabled } = useContext(SearchContext);

  const cookieEnabled = restoreCookieEnabled();

  const [features, setFeatures] = React.useState([]);
  const [saved, setSaved] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const images = React.useMemo(() => {
    if (media && media.images && media.images.length > 0) {
      return media.images.map((image) => ({
        original: image.href,
        thumbnail: image.href,
      }));
    }
    return [];
  }, [media]);

  const agentAddress = React.useMemo(() => {
    if (router.query.agentAddress) {
      return decryption(router.query.agentAddress);
    }

    return "";
  }, [router.query]);

  const isAgent = React.useMemo(() => {
    return router.query.isAgent === "true";
  }, [router.query]);

  const isFavorite = React.useMemo(() => {
    return router.query.favorite === "true";
  }, [router.query]);

  const handleOpenSpecification = () => {
    setSpecificationOpen(true);
    TagManager.dataLayer({
      dataLayer: {
        event: "details_category_click",
        fieldName: "specifications",
      },
    });
  };

  const handleCloseSpecification = () => {
    setSpecificationOpen(false);
  };

  const handleOpenRunningCost = () => {
    setRunningCostOpen(true);
    TagManager.dataLayer({
      dataLayer: {
        event: "details_category_click",
        fieldName: "running_cost",
      },
    });
  };

  const handleCloseRunningCost = () => {
    setRunningCostOpen(false);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const fetchResult = await axios.post("/api/feature", { searchId });
        if (
          fetchResult &&
          fetchResult.data &&
          fetchResult.data.success &&
          fetchResult.data.data
        ) {
          setFeatures(fetchResult.data.data);
        }
      } catch (error) {}
    }

    fetchData();

    return () => {};
  }, [searchId]);

  const handleClickSave = async () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "save_favorites_click",
      },
    });
    if (cookieEnabled === null || cookieEnabled === "false") {
      onChangeCookieEnabled(undefined);
    }
    router.push({ query: { ...router.query, user: userId } });
    if (userId) {
      try {
        const fetchResult = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_WEB_API}/user/${userId}/favourites`,
          { ...details }
        );
        setSaved(true);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleDeleteFavorite = async () => {
    if (userId) {
      try {
        const fetchResult = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_WEB_API}/user/${userId}/favourites/${metadata.stockId}`
        );

        TagManager.dataLayer({
          dataLayer: {
            event: "show_favorites_click",
          },
        });
        router.push("/favorites");
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <Grid container spacing={4} pb={{ xs: 2, sm: 0 }}>
        <Grid item xs={12}>
          <Box width="100%" display={"flex"}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={handleClickBack}
            >
              Back to search
            </Button>
            {isFavorite ? (
              <Button
                variant="contained"
                color="error"
                id="delete-favorites-button"
                onClick={handleDeleteFavorite}
                sx={{
                  display: { xs: "inline-flex", sm: "none" },
                  ml: "auto",
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                id="save-favorites-button"
                onClick={handleClickSave}
                disabled={saved}
                sx={{
                  display: { xs: "inline-flex", sm: "none" },
                  ml: "auto",
                }}
              >
                {saved ? "Saved" : "Save"}
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageGallery items={images} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              bgcolor: "common.white",
              gap: 3,
            }}
          >
            <Box display="column" alignItems="start">
              <Typography variant="h3" sx={{ lineHeight: 1.2 }}>
                {vehicle.make} {vehicle.model}
              </Typography>
              <Box
                height="2px"
                width="50px"
                mt={0.5}
                sx={{
                  backgroundImage: "linear-gradient(270deg, #54EFB6, #03A9F4)",
                }}
              />
            </Box>
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent="space-between"
              spacing={0.5}
            >
              <Typography
                variant="h3"
                color="primary"
                sx={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                {parseInt(forecourtPrice.amountGBP)
                  .toLocaleString("en-US", {
                    currency: "GBP",
                    style: "currency",
                  })
                  .slice(0, -3)}
              </Typography>
              {adverts &&
                adverts.retailAdverts &&
                adverts.retailAdverts.priceIndicatorRating &&
                adverts.retailAdverts.priceIndicatorRating !== "NOANALYSIS" && (
                  <Chip
                    label={getPriceIndicatorLabel(
                      adverts.retailAdverts.priceIndicatorRating
                    )}
                    size="small"
                    sx={{
                      backgroundColor: getPriceIndicatorColor(
                        adverts.retailAdverts.priceIndicatorRating
                      ),
                      color: getPriceIndicatorLabelColor(
                        adverts.retailAdverts.priceIndicatorRating
                      ),
                      textTransform: "capitalize",
                      borderRadius: "3px",
                      fontSize: "0.85em",
                      fontWeight: 600,
                      p: 0.5,
                      lineHeight: 1.33,
                    }}
                  />
                )}
            </Box>
            <Box display="flex" direction="row" gap={0.5} flexWrap="wrap">
              <Stack direction="row" spacing={0.6} alignItems="center">
                <TransmissionTypeIcon />
                <Typography variant="body1" whiteSpace="nowrap">
                  {vehicle.odometerReadingMiles} miles
                </Typography>
              </Stack>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  borderRightWidth: 2,
                  borderColor: "rgba(35, 35, 35, 1)",
                  my: 0.5,
                }}
              />
              <Typography variant="body1" whiteSpace="nowrap">
                {vehicle.transmissionType}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderRightWidth: 2,
                  borderColor: "rgba(35, 35, 35, 1)",
                  my: 0.5,
                }}
              />
              <Typography variant="body1" whiteSpace="nowrap">
                {vehicle.fuelType}
              </Typography>
              {vehicle.emissionClass && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      borderRightWidth: 2,
                      borderColor: "rgba(35, 35, 35, 1)",
                      my: 0.5,
                    }}
                  />
                  <Typography variant="body1" whiteSpace="nowrap">
                    ULEZ
                  </Typography>
                </>
              )}
            </Box>

            {isAgent && (
              <Stack
                direction="row"
                spacing={0.6}
                alignItems="center"
                width="100%"
              >
                <DealerIcon />
                <Typography>{advertiser.name}: </Typography>
                <Typography>{advertiser.phone}</Typography>
              </Stack>
            )}
            {(vehicle.make === "Toyota" || vehicle.make === "Lexus") && (
              <Box
                position="relative"
                bgcolor={"#F8F8F8"}
                borderRadius={"8px"}
                px="19px"
                pt="49px"
                pb="24px"
              >
                <CardMedia
                  component="img"
                  height="68px"
                  image="/images/toyota-warranty-icon.png"
                  alt="Media"
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    left: "15px",
                    width: "56px",
                  }}
                />
                <Typography
                  variant="body1"
                  fontWeight={700}
                  lineHeight={"18.75px"}
                >
                  Up to 10 years (100,000 mile) Toyota warranty - With Toyota
                  Relax
                </Typography>
                <Typography variant="body1" lineHeight={"22px"} mt={1.5}>
                  Every new and used Toyota, is eligible to be covered by up to
                  10 years’ manufacturer warranty through Toyota Relax. This is
                  provided through an initial 3 years manufacturer warranty from
                  the vehicle’s registration date that can be extended with
                  regular servicing at a Toyota dealer. 12 months warranty is
                  included with every Toyota Service, up to 100,000 miles or 10
                  years, whichever comes first, giving you a chance to relax in
                  the knowledge that you and your vehicle are in safe hands.
                  <Link
                    href="https://www.toyota.co.uk/owners/warranty/toyota-warranty"
                    underline="none"
                    target="_blank"
                  >
                    Terms and conditions apply.
                  </Link>
                </Typography>
              </Box>
            )}

            <Box gap={3} display={{ xs: "none", sm: "flex" }}>
              {isFavorite ? (
                <Button
                  variant="contained"
                  color="error"
                  id="delete-favorites-button"
                  fullWidth
                  onClick={handleDeleteFavorite}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  id="save-favorites-button"
                  fullWidth
                  onClick={handleClickSave}
                  disabled={saved}
                >
                  {saved ? "Saved" : "Save"}
                </Button>
              )}
              {!isAgent && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleClickOpen}
                  id="call-agent-button"
                >
                  Call Agent
                </Button>
              )}
            </Box>
            <Box mt={2}>
              <List>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={handleOpenSpecification}>
                    <ListItemIcon>
                      <WheelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Specifications" />
                    <ListItemIcon>
                      <ChevronRightIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={handleOpenRunningCost}>
                    <ListItemIcon>
                      <CalculatorIcon />
                    </ListItemIcon>
                    <ListItemText primary="Running costs" />
                    <ListItemIcon>
                      <ChevronRightIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </List>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Call Agent</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Number: {agentAddress ? agentAddress : DEFAULT_PHONE_NUMBER}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: "block", sm: "none" },
        }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <Box
            width={1}
            px={2}
            sx={{
              background: "#fff",
              boxShadow: "rgb(0 0 0 / 10%) 0px -1px 4px 0px",
            }}
            display="flex"
            alignItems="center"
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  id="call-agent-button"
                  href={`tel:${
                    agentAddress ? agentAddress : DEFAULT_PHONE_NUMBER
                  }`}
                >
                  Call Agent
                </Button>
              </Grid>
              {/* <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth>
                  Message Agent
                </Button>
              </Grid> */}
            </Grid>
          </Box>
        </BottomNavigation>
      </Paper>

      <SpecificationDialog
        isOpen={specificationOpen}
        onClose={handleCloseSpecification}
        vehicle={vehicle}
        features={features}
      />
      <RunningCostDialog
        isOpen={runningCostOpen}
        onClose={handleCloseRunningCost}
        vehicle={vehicle}
      />
    </>
  );
};

export default CarDetails;
