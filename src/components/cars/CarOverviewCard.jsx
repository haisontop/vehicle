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
  Popover,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import { MileIcon } from "../icons/MileIcon";
import { TransmissionTypeIcon } from "../icons/TransmissionTypeIcon";
import { ClipboardIcon } from "../icons/ClipboardIcon";
import { FuelTypeIcon } from "../icons/FuelTypeIcon";
import { DealerIcon } from "../icons/DealerIcon";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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

const CarOverviewCard = ({ details, handleClickCard, onFavoritClick }) => {
  const theme = useTheme();
  const router = useRouter();
  const { vehicle, media, adverts, metadata, advertiser } = details;


  const { forecourtPrice } = adverts;

  const [anchorEl, setAnchorEl] = useState(null);

  const mainMediaUrl = React.useMemo(() => {
    if (media && media.images && media.images.length > 0) {
      return media.images[0].href;
    }
    return "";
  }, [media]);

  const isAgent = React.useMemo(() => {
    return router.query.isAgent === "true";
  }, [router.query]);

  const handlePopover = (e) => {
    setAnchorEl(e.target);
  }
  return (
    <Card
      sx={{ height: "100%", p: 0, borderRadius: 1, position: 'relative' }}
    >
      <IconButton sx={{ position: 'absolute', zIndex: 20, top: '1rem', right: '1rem', bgcolor: 'primary.main', color: 'white' }}
        onClick={onFavoritClick}
      >
        <FavoriteBorderIcon />
      </IconButton>
      <CardActionArea

        sx={{
          height: "100%",
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
        <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={0.5}
            mb={1}
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
                  onClick={handlePopover}
                />
              )}
            <Popover
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ mt: 2,  }}
              
            >
              <Box
                p={2}
                sx={{ width: "250px" }}>
                <Typography fontSize={'11px'} >
                  Blue are proud to provide Autotrader priceindicators based on a detailed analysis ofcomparable car listings including make, model, trim, year, mileage and more. Weshow price indicators on all vehicles. It isintended to provide guidance and is not anofficial appraisal or guarantee.
                </Typography>
                <Stack direction="row" justifyContent="end">
                  <Button variant="text" size="small">
                    Read More
                    <ChevronRightIcon />
                  </Button>
                </Stack>
              </Box>
            </Popover>
          </Stack>
          <Box gap={2} display={'flex'} flexGrow={1} flexDirection="column" justifyContent="space-between"
            onClick={() => handleClickCard(metadata.stockId)}
          >

            <Box
              display="column"
              alignItems="start"
            >
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
      </CardActionArea>
    </Card>
  );
};

export default CarOverviewCard;
