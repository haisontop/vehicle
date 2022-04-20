import {
  Card,
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  Divider,
  Chip,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
import CallAgentDialog from "../dialogs/CallAgentDialog";

export const DEFAULT_PHONE_NUMBER = "00442030059330";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow placement="bottom-start" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    zIndex: 10
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
  },
}));

const CarDetails = ({ details, handleClickBack }) => {
  const router = useRouter();
  const [openCall, setOpenCall] = React.useState(false);
  const [specificationOpen, setSpecificationOpen] = React.useState(false);
  const [runningCostOpen, setRunningCostOpen] = React.useState(false);
  const [pricePop, setPricePop] = React.useState(false)

  const { vehicle, media, adverts, advertiser, metadata } = details;

  const { searchId } = metadata;

  const { forecourtPrice } = adverts;

  const { userId, onChangeCookieEnabled } = useContext(SearchContext);

  const cookieEnabled = restoreCookieEnabled();

  const [features, setFeatures] = React.useState([]);
  const [saved, setSaved] = React.useState(false);

  const handleClickOpen = () => {
    setOpenCall(true);
  };

  const handleClose = () => {
    setOpenCall(false);
  };

  const images = React.useMemo(() => {
    if (media && media.images && media.images.length > 0) {
      return media.images.map((image) => ({
        original: image.href,
        thumbnail: image.href,
        originalWidth: "100%",
        originalHeight: "auto",
        originalClass: "gallery-original",
        thumbnailClass: "gallery-thumbnail",
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
      } catch (error) { }
    }

    fetchData();

    return () => { };
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
          <Button
            variant="text"
            sx={{ color: "primary.main" }}
            startIcon={<ArrowBack />}
            onClick={handleClickBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} md={7} position="relative">
          <ImageGallery items={images} />
          <IconButton
            size="large"
            sx={{
              position: "absolute",
              zIndex: 20,
              top: "3rem",
              right: "1rem",
              bgcolor: "primary.main",
              color: "white",
            }}
            onClick={handleClickSave}
          >
            <FavoriteBorderIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              borderRadius: 0.5,
              bgcolor: "common.white",
              gap: 3,
            }}
          >
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent="space-between"
              spacing={0.5}
            >
              <Typography
                variant="h3"
                color="primary"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
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
                  <LightTooltip
                    open={pricePop}
                    onOpen={() => setPricePop(true)}
                    onClose={() => setPricePop(false)}
                    leaveTouchDelay={5000}
                    title={
                      <Box
                        p={1}
                        sx={{ width: "250px" }}>
                        <Typography fontSize={'11px'} >
                          Blue are proud to provide Autotrader priceindicators based on a detailed analysis ofcomparable car listings including make, model, trim, year, mileage and more. Weshow price indicators on all vehicles. It isintended to provide guidance and is not anofficial appraisal or guarantee.
                        </Typography>
                        <Stack direction="row" justifyContent="end">
                          <Button variant="text" size="small" sx={{ fontSize: 13 }}>
                            Read More
                            <ChevronRightIcon />
                          </Button>
                        </Stack>
                      </Box>
                    }
                  >
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
                        p: 0.5,
                        lineHeight: 1.33,
                      }}
                      onClick={() => setPricePop(true)}
                    />

                  </LightTooltip>
                )}
            </Box>
            <Typography variant="h4" fontWeight={600} sx={{ lineHeight: 1.2 }}>
              {vehicle.make} {vehicle.model}
            </Typography>
            <Box
              display="flex"
              direction="row"
              gap={0.5}
              flexWrap="wrap"
              alignItems={"center"}
            >
              <TransmissionTypeIcon sx={{ color: "primary.main" }} />
              <Typography
                variant="body1"
                whiteSpace="nowrap"
                sx={{ color: "primary.main" }}
              >
                {vehicle.odometerReadingMiles} miles
              </Typography>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  color: "primary.main",
                  borderRightWidth: 2,
                  borderColor: "rgba(35, 35, 35, 1)",
                  my: 0.5,
                }}
              />
              <Typography
                variant="body1"
                whiteSpace="nowrap"
                sx={{ color: "primary.main" }}
              >
                {vehicle.transmissionType}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  color: "primary.main",
                  borderRightWidth: 2,
                  borderColor: "rgba(35, 35, 35, 1)",
                  my: 0.5,
                }}
              />
              <Typography
                variant="body1"
                whiteSpace="nowrap"
                sx={{ color: "primary.main" }}
              >
                {vehicle.fuelType}
              </Typography>
              {vehicle.emissionClass && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      color: "primary.main",
                      borderRightWidth: 2,
                      borderColor: "rgba(35, 35, 35, 1)",
                      my: 0.5,
                    }}
                  />
                  <Typography
                    variant="body1"
                    whiteSpace="nowrap"
                    sx={{ color: "primary.main" }}
                  >
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

            {!isAgent && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ borderRadius: 5, display: { xs: 'none', sm: 'flex' } }}
                  onClick={handleClickOpen}
                >
                  Contact Seller
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: 5, display: { sm: 'none' } }}
                  href={`tel:${agentAddress ? agentAddress : DEFAULT_PHONE_NUMBER
                    }`}
                >
                  Contact Seller
                </Button>
              </>
            )}
            <Box mt={2}>
              <List>
                <Divider />
                <ListItem sx={{ px: 0 }}>
                  <ListItemButton
                    sx={{ px: 0 }}
                    onClick={handleOpenSpecification}
                  >
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
                <ListItem sx={{ px: 0 }}>
                  <ListItemButton
                    sx={{ px: 0 }}
                    onClick={handleOpenRunningCost}
                  >
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
      {
        openCall && (
          <CallAgentDialog
            open={openCall}
            onClose={handleClose}
            phonNumber={agentAddress || DEFAULT_PHONE_NUMBER}
          />
        )
      }

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
