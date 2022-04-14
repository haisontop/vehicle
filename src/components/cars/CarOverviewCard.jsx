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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
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

const GridForDivider = styled(Grid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const CarOverviewCard = ({ details, handleClickCard }) => {
  const theme = useTheme();
  const router = useRouter();
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

  return (
    <Card
      sx={{ height: "100%", p: 0, borderRadius: 1 }}
      className="car-details-card"
    >
      <CardActionArea
        onClick={() => handleClickCard(metadata.stockId)}
        sx={{
          height: "100%",
          p: 1.5,
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: { xs: "158px", sm: "200px", md: "158px" } }}
          image={mainMediaUrl}
          alt="Media"
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
          />
        )}
        <CardContent sx={{ px: 0, py: 1.5, flexGrow: 1 }}>
          <Grid container spacing={1} height="100%">
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
              <Grid item xs={12}>
                <Stack direction="row" spacing={0.6} alignItems="start">
                  <DealerIcon />
                  <Typography variant="body1">
                    {advertiser.name}: {advertiser.phone}
                  </Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarOverviewCard;
