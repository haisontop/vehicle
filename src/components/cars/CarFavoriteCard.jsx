import {
  Card,
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { MileIcon } from "../icons/MileIcon";
import { TransmissionTypeIcon } from "../icons/TransmissionTypeIcon";
import { ClipboardIcon } from "../icons/ClipboardIcon";
import { FuelTypeIcon } from "../icons/FuelTypeIcon";
import { DealerIcon } from "../icons/DealerIcon";
import { useTheme } from "@emotion/react";
import {
  getPriceIndicatorColor,
  getPriceIndicatorLabel,
  getPriceIndicatorLabelColor,
  toTitleCase,
} from "../../utils";
import { SearchContext } from "../../contexts/SearchContext";
import axios from "axios";
import TagManager from "react-gtm-module";

const CarFavoriteCard = ({ details, handleRemoveFavorite, handleView }) => {
  const theme = useTheme();
  const router = useRouter();
  const { userId } = useContext(SearchContext);
  const { vehicle, media, adverts, metadata, advertiser } = details;

  const { forecourtPrice } = adverts;

  const mainMediaUrl = React.useMemo(() => {
    if (media && media.images && media.images.length > 0) {
      return media.images[0].href;
    }
    return "";
  }, [media]);

  const isAgent = React.useMemo(() => {
    return router.query.isAgent === "true";
  }, [router.query]);

  const handleDeleteFavorite = async () => {
    if (userId) {
      try {
        const fetchResult = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_WEB_API}/user/${userId}/favourites/${metadata.stockId}`
        );

        handleRemoveFavorite(metadata.stockId);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleClickView = () => {
    handleView(metadata.stockId);
  };

  return (
    <Card
      sx={{
        height: "100%",
        p: 0,
        borderRadius: 1,
        display: "flex",
        gap: { xs: 1, sm: 4 },
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: { xs: "158px", sm: "200px", md: "200px" },
          width: { xs: "100%", sm: "200px", md: "200px" },
        }}
        image={mainMediaUrl}
        alt="Media"
      />

      <CardContent sx={{ px: 2, py: 1.5, flexGrow: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            spacing={1}
            height="100%"
            sx={{ flexGrow: 1, maxWidth: "400px", mr: { xs: 0, sm: 4 } }}
          >
            <Grid item xs={12}>
              <Box
                display="column"
                alignItems="start"
                minHeight={{ xs: theme.spacing(6), md: theme.spacing(7.5) }}
              >
                <Typography variant="h4" sx={{ lineHeight: 1.2 }}>
                  {vehicle.make} {vehicle.model}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={0.5}
              >
                <Box display="flex">
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: 400, lineHeight: 1.2 }}
                  >
                    {parseInt(forecourtPrice.amountGBP)
                      .toLocaleString("en-US", {
                        currency: "GBP",
                        style: "currency",
                      })
                      .slice(0, -3)}
                  </Typography>
                </Box>
                {adverts &&
                  adverts.retailAdverts &&
                  adverts.retailAdverts.priceIndicatorRating &&
                  adverts.retailAdverts.priceIndicatorRating !==
                    "NOANALYSIS" && (
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
                        p: "4px",
                        lineHeight: 1.33,
                      }}
                    />
                  )}
              </Stack>
            </Grid>
            <Grid item xs={12} minHeight="54px">
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
            </Grid>
            {isAgent && (
              <Grid item xs={12} sm={12}>
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
              </Grid>
            )}
          </Grid>
          <Stack spacing={2} alignItems="center" sx={{ ml: "auto" }}>
            <Button
              variant="contained"
              sx={{ display: { xs: "none", sm: "flex" } }}
              onClick={handleClickView}
              fullWidth
            >
              View
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteFavorite}
              sx={{ display: { xs: "none", sm: "flex" } }}
              color="error"
              fullWidth
              id="delete-favorites-button"
            >
              Delete
            </Button>
          </Stack>
        </Box>
        <Box width="100%" display="flex">
          <Button
            variant="contained"
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={handleClickView}
          >
            View
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteFavorite}
            sx={{ display: { xs: "flex", sm: "none" }, ml: "auto" }}
            color="error"
            id="delete-favorites-button"
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarFavoriteCard;
