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
        p: 0,
        borderRadius: 1,
        display: "flex",
        gap: { xs: 1, sm: 4 },
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: "280px",
          width: { xs: "100%", sm: "400px" },
          objectFit: "cover",
          objectPosition: "center",
        }}
        image={mainMediaUrl || "/images/car_placeholder.svg"}
        alt="Media"
      />
      <Stack
        p={{ xs: 3, md: 5 }}
        pt={{ xs: 1, sm: 3 }}
        flexGrow={1}
        gap={3}
        justifyContent={"space-between"}
        direction={{ xs: "column", md: "row" }}
      >
        <Stack
          spacing={1}
          sx={{
            flexGrow: 1,
            maxWidth: "400px",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
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
                    p: "4px",
                    lineHeight: 1.33,
                  }}
                />
              )}
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {vehicle.make} {vehicle.model}
          </Typography>
          <Box flexGrow={1} />
          <Box
            display="flex"
            direction="row"
            alignItems="center"
            gap={0.5}
            flexWrap="wrap"
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
        </Stack>
        <Stack
          spacing={2}
          pb={{ xs: 2, sm: 0 }}
          flexGrow={1}
          justifyContent="center"
          alignItems={{ xs: "center", sm: "end" }}
          direction={{ xs: "row", md: "column" }}
        >
          <Button
            variant="outlined"
            onClick={handleClickView}
            fullWidth
            size="large"
            sx={{ borderRadius: 5, maxWidth: "220px" }}
          >
            View
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteFavorite}
            color="error"
            fullWidth
            size="large"
            sx={{ borderRadius: 5, maxWidth: "220px" }}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CarFavoriteCard;
