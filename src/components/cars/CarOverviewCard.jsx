import {
  Card,
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Divider,
  IconButton,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MileIcon } from "../icons/MileIcon";
import { TransmissionTypeIcon } from "../icons/TransmissionTypeIcon";
import { ClipboardIcon } from "../icons/ClipboardIcon";
import { FuelTypeIcon } from "../icons/FuelTypeIcon";
import { DealerIcon } from "../icons/DealerIcon";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@emotion/react";
import {
  getPriceIndicatorColor,
  getPriceIndicatorLabel,
  getPriceIndicatorLabelColor,
  toTitleCase,
} from "../../utils";
import { Favorite } from "@mui/icons-material";

const GridForDivider = styled(Grid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    placement="bottom-start"
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    zIndex: 10,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[2],
  },
}));

const CarOverviewCard = ({ details, handleClickCard, onFavoritClick }) => {
  const theme = useTheme();
  const router = useRouter();
  const { vehicle, media, adverts, metadata, advertiser } = details;

  const [pricePop, setPricePop] = React.useState(false);

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

  return (
    <Card
      sx={{
        height: "100%",
        p: 0,
        borderRadius: 1,
        position: "relative",
        cursor: "pointer",
        "&:hover": { boxShadow: theme.shadows[24] },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          zIndex: 20,
          top: "1rem",
          right: "1rem",
          bgcolor: "primary.main",
          color: "white",
        }}
        onClick={onFavoritClick}
      >
        <FavoriteBorderIcon />
      </IconButton>

      <CardMedia
        component="img"
        sx={{
          height: "200px",
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        image={mainMediaUrl || "/images/car_placeholder.svg"}
        alt="Media"
        onClick={() => handleClickCard(metadata.stockId)}
      />
      {(vehicle.make === "Toyota" || vehicle.make === "Lexus") && (
        <CardMedia
          component="img"
          height="68px"
          image="/images/toyota-warranty-icon.png"
          alt="Media"
          sx={{
            position: "absolute",
            top: "5px",
            left: "0px",
            width: "56px",
          }}
          onClick={() => handleClickCard(metadata.stockId)}
        />
      )}
      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={0.5}
          mb={1}
          width={"100%"}
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
            adverts.retailAdverts.priceIndicatorRating !== "NOANALYSIS" && (
              <LightTooltip
                open={pricePop}
                onOpen={() => setPricePop(true)}
                onClose={() => setPricePop(false)}
                leaveTouchDelay={5000}
                title={
                  <Box p={1} sx={{ width: "250px" }}>
                    <Typography fontSize={"11px"}>
                      Blue are proud to provide Autotrader priceindicators based
                      on a detailed analysis ofcomparable car listings including
                      make, model, trim, year, mileage and more. Weshow price
                      indicators on all vehicles. It isintended to provide
                      guidance and is not anofficial appraisal or guarantee.
                    </Typography>
                    <Stack direction="row" justifyContent="end">
                      <Link
                        href="https://trade.autotrader.co.uk/price-indicator/"
                        passHref={true}
                      >
                        <Button
                          variant="text"
                          size="small"
                          sx={{ fontSize: 13 }}
                        >
                          Read More
                          <ChevronRightIcon />
                        </Button>
                      </Link>
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
                    fontWeight: 600,
                    p: "4px",
                    lineHeight: 1.33,
                  }}
                  onClick={() => setPricePop(true)}
                />
              </LightTooltip>
            )}
        </Stack>
        <Box
          gap={2}
          display={"flex"}
          flexGrow={1}
          flexDirection="column"
          justifyContent="space-between"
          onClick={() => handleClickCard(metadata.stockId)}
        >
          <Box display="column" alignItems="start">
            <Typography variant="h4" sx={{ lineHeight: 1.2 }}>
              {vehicle.make} {vehicle.model}
            </Typography>
          </Box>
          <Box flexGrow={1} />
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
            <Stack direction="row" spacing={0.6} alignItems="start">
              <DealerIcon />
              <Typography variant="body1">
                {advertiser.name}: {advertiser.phone}
              </Typography>
            </Stack>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarOverviewCard;
