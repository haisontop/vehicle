import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useSWR from "swr";
import { ArrowBack } from "@mui/icons-material";
import { SearchContext } from "../src/contexts/SearchContext";
import CarFavoriteCard from "../src/components/cars/CarFavoriteCard";
import TagManager from "react-gtm-module";
import { cleanSearchParams } from "../src/utils";

const fetcher = (url, id) => {
  return axios.get(url, { params: { id } }).then((res) => {
    return res.data;
  });
};

export default function DetailsPage({ baseOrigin }) {
  const router = useRouter();

  const { userId } = useContext(SearchContext);
  const [vehicles, setVehicles] = React.useState([]);

  const { isLoading, data, error } = useSWR(() => {
    if (userId) {
      return `${process.env.NEXT_PUBLIC_BASE_WEB_API}/user/${userId}/favourites`;
    } else {
      return null;
    }
  }, fetcher);

  React.useEffect(() => {
    if (data && data.length > 0) {
      setVehicles(data);
    }
  }, [data]);

  if (isLoading || !vehicles) {
    return (
      <Box>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return <Box></Box>;
  }

  const handleClickBack = () => {
    router.back();
  };

  const handleRemoveFavorite = (stockId) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "delete_favorites_click",
      },
    });
    setVehicles((vehicles) =>
      vehicles.filter((vehicle) => vehicle.metadata.stockId !== stockId)
    );
  };

  const handleClickView = (carId) => {
    const filteredParams = cleanSearchParams({
      ...router.query,
      id: carId,
      favorite: true,
    });

    router.push({
      pathname: "/",
      query: filteredParams,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 6 }}>
      <Grid container spacing={2} sx={{ position: "relative" }}>
        <Grid item xs={12}>
          <Button
            variant="text"
            sx={{color:'primary.main'}}
            startIcon={<ArrowBack />}
            onClick={handleClickBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          {vehicles &&
            vehicles.length > 0 &&
            vehicles.map((car) => (
              <Grid item xs={12} key={car.metadata.stockId}>
                <CarFavoriteCard
                  details={car}
                  handleRemoveFavorite={handleRemoveFavorite}
                  handleView={handleClickView}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}
