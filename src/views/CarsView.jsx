import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Box,
  Pagination,
  Stack,
  Button,
  Skeleton,
} from "@mui/material";
import { CarsFilter } from "../components/filter";
import { CarsList } from "../components/cars";
import { makeStyles } from "@mui/styles";
import { useSearchSettings } from "../hooks";
import { cleanSearchParams, encryption } from "../utils";
import CarDetails from "../components/cars/CarDetails";
import { ArrowBack } from "@mui/icons-material";
import { isEmpty } from "lodash";
import {
  BODY_TYPE_OPTIONS,
  COLOR_OPTIONS,
  DOOR_OPTIONS,
  FUEL_TYPE_OPTIONS,
  MAKE_OPTIONS,
  MAX_MILES_OPTIONS,
  MAX_PRICE_OPTIONS,
  MAX_SEAT_OPTIONS,
  MAX_YEAR_OPTIONS,
  MIN_MILES_OPTIONS,
  MIN_PRICE_OPTIONS,
  MIN_SEAT_OPTIONS,
  MIN_YEAR_OPTIONS,
  MODEL_OPTIONS,
  TRANSMISSION_TYPE_OPTIONS,
} from "../constants";

const DEFAULT_PAGE_SIZE = 9;

const useStyles = makeStyles((theme) => {
  return {
    filterContainer: {
      [theme.breakpoints.down("sm")]: {
        position: "fixed",
        top: theme.spacing(8),
        zIndex: 2,
        width: "100%",
        padding: 10,
        background: theme.palette.common.white,
        boxShadow: theme.shadows[1],
      },
    },
  };
});

const CarsView = () => {
  const classes = useStyles();
  const router = useRouter();
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [havingError, setHavingError] = React.useState(false);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [defaultPage, setDefaultPage] = React.useState(1);
  const [searchOptions, setSearchOptions] = React.useState({});
  const { agentAddress, onChangeAgentAddress } = useSearchSettings();
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [makeOptions, setMakeOptions] = React.useState(
    MAKE_OPTIONS.map((makeOption) => ({
      value: makeOption.value,
      label: makeOption.value,
    }))
  );
  const [modelOptions, setModelOptions] = React.useState(MODEL_OPTIONS);
  const [minPriceOptions, setMinPriceOptions] = React.useState(
    MIN_PRICE_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [maxPriceOptions, setMaxPriceOptions] = React.useState(
    MAX_PRICE_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [minMilesOptions, setMinMilesOptions] = React.useState(
    MIN_MILES_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [maxMilesOptions, setMaxMilesOptions] = React.useState(
    MAX_MILES_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [minYearOptions, setMinYearOptions] = React.useState(
    MIN_YEAR_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [maxYearOptions, setMaxYearOptions] = React.useState(
    MAX_YEAR_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [fuelTypeOptions, setFuleTypeOptions] = React.useState(
    FUEL_TYPE_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [transmissionTypeOptions, setTransmissionTypeOptions] = React.useState(
    TRANSMISSION_TYPE_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [bodyTypeOptions, setBodyTypeOptions] = React.useState(
    BODY_TYPE_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [doorsOptions, setDoorsOptions] = React.useState(
    DOOR_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [minSeatsOptions, setMinSeatsOptions] = React.useState(
    MIN_SEAT_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [maxSeatsOptions, setMaxSeatsOptions] = React.useState(
    MAX_SEAT_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );
  const [colorOptions, setColorOptions] = React.useState(
    COLOR_OPTIONS.map((option) => ({
      value: option.value,
      label: option.value,
    }))
  );

  const pageTotalSize = React.useMemo(() => {
    if (!totalAmount) {
      return 0;
    }

    return Math.ceil(totalAmount / DEFAULT_PAGE_SIZE);
  }, [totalAmount]);

  const selectedId = React.useMemo(() => {
    return router.query.id ? router.query.id : "";
  }, [router.query]);

  React.useEffect(() => {
    if (dataLoaded) {
      setDefaultPage(parseInt(router.query.page));
      setCurrentPage(parseInt(router.query.page));
    }
  }, [router.query.page, dataLoaded]);

  const currentVehicle = cars.find(
    (car) => car.metadata.stockId === selectedId
  );

  React.useEffect(() => {
    const {
      standardMake,
      standardModel,
      distance,
      postcode,
      minPrice,
      maxPrice,
      minOdometerReadingMiles,
      maxOdometerReadingMiles,
      minManufacturedYear,
      maxManufacturedYear,
      standardFuelType,
      standardTransmissionType,
      emissionScheme,
      id,
      standardBodyType,
      doors,
      minSeats,
      maxSeats,
      standardColour,
      page,
    } = router.query;

    const searchParams = {
      standardMake,
      standardModel,
      distance,
      postcode,
      minPrice,
      maxPrice,
      minOdometerReadingMiles,
      maxOdometerReadingMiles,
      minManufacturedYear,
      maxManufacturedYear,
      standardFuelType,
      standardTransmissionType,
      emissionScheme,
      standardBodyType,
      doors,
      minSeats,
      maxSeats,
      standardColour,
    };

    if (!dataLoaded) {
      if (id) {
        handleSearchById(id);
      } else {
        handleSearch(searchParams, page);
      }
    }
  }, [router.query, dataLoaded]);

  const handleClickSearch = (searchParams, page = 1) => {
    const filteredParams = cleanSearchParams({
      isAgent: router.query.isAgent,
      distance: searchParams.distance,
      postcode: searchParams.postcode,
      standardMake: searchParams.standardMake,
      standardModel: searchParams.standardModel,
      minPrice: searchParams.minPrice,
      maxPrice: searchParams.maxPrice,
      minOdometerReadingMiles: searchParams.minOdometerReadingMiles,
      maxOdometerReadingMiles: searchParams.maxOdometerReadingMiles,
      minManufacturedYear: searchParams.minManufacturedYear,
      maxManufacturedYear: searchParams.maxManufacturedYear,
      standardFuelType: searchParams.standardFuelType,
      standardTransmissionType: searchParams.standardTransmissionType,
      emissionScheme: searchParams.emissionScheme,
      standardBodyType: searchParams.standardBodyType,
      doors: searchParams.doors,
      minSeats: searchParams.minSeats,
      maxSeats: searchParams.maxSeats,
      standardColour: searchParams.standardColour,
      agentAddress: encryption(agentAddress.value),
      page,
    });

    router
      .push({
        pathname: "/",
        query: filteredParams,
      })
      .then(() => {
        setDataLoaded(false);
      });
  };

  const handleSearch = async (searchParams, pageNumber = 1) => {
    setLoading(true);
    setSearchOptions(searchParams);
    const body = {
      ...searchParams,
      ...(searchParams.minManufacturedYear
        ? { minManufacturedYear: searchParams.minManufacturedYear }
        : { minManufacturedYear: new Date().getFullYear() - 12 }),
      ...(searchParams.maxOdometerReadingMiles
        ? { maxOdometerReadingMiles: searchParams.maxOdometerReadingMiles }
        : { maxOdometerReadingMiles: 100000 }),
      vehicleType: "Car",
      pageSize: DEFAULT_PAGE_SIZE,
      page: pageNumber,
    };
    try {
      const searchResult = await axios.post("/api/search", body);
      if (searchResult && searchResult.data && searchResult.data.data) {
        setCars(searchResult.data.data.results);
        setTotalAmount(searchResult.data.data.totalResults);
        setLoading(false);
        setHavingError(false);
        setDataLoaded(true);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setHavingError(true);
    }
  };

  const handleSearchById = async (stockId) => {
    setLoading(true);

    const body = {
      id: stockId,
    };
    try {
      const searchResult = await axios.post("/api/detail", body);
      if (searchResult && searchResult.data && searchResult.data.data) {
        setCars(searchResult.data.data.results);
        setTotalAmount(searchResult.data.data.totalResults);
        setLoading(false);
        setHavingError(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setHavingError(true);
    }
  };

  const handleChangePage = async (_event, page) => {
    setCurrentPage(page);
    const filteredParams = cleanSearchParams({
      ...router.query,
      page: page ? page : 1,
    });

    router
      .push({
        pathname: "/",
        query: filteredParams,
      })
      .then(() => {
        setDataLoaded(false);
      });
  };

  const handleClickCard = (carId) => {
    const filteredParams = cleanSearchParams({
      ...router.query,
      favorite: null,
      id: carId,
    });

    router.push({
      pathname: "/",
      query: filteredParams,
    });
  };

  const handleClickBack = () => {
    const { id, ...otherParams } = router.query;

    const filteredParams = cleanSearchParams({
      ...otherParams,
    });

    router.push({
      pathname: "/",
      query: filteredParams,
    });
  };

  return (
    <Container maxWidth={false} sx={{ pt: 2, pb: 6 }}>
      <Grid container spacing={2} sx={{ position: "relative" }}>
        {selectedId ? (
          <>
            {currentVehicle ? (
              <Grid item xs={12}>
                <CarDetails
                  details={currentVehicle}
                  handleClickBack={handleClickBack}
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <Button
                    variant="text"
                    startIcon={<ArrowBack />}
                    onClick={handleClickBack}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 2 }} width="100%">
                    <Skeleton variant="rectangular" width="100%" height={118} />
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            <Grid
              item
              xs={12}
              sm={3}
              md={4}
              sx={{borderRight:'1px sold lightgray'}}
              // classes={{ item: classes.filterContainer }}
            >
              <CarsFilter
                handleSubmit={handleClickSearch}
                loading={loading}
                searchOptions={searchOptions}
                makeOptions={makeOptions}
                modelOptions={modelOptions}
                minPriceOptions={minPriceOptions}
                maxPriceOptions={maxPriceOptions}
                minMilesOptions={minMilesOptions}
                maxMilesOptions={maxMilesOptions}
                fuelTypeOptions={fuelTypeOptions}
                transmissionTypeOptions={transmissionTypeOptions}
                minYearOptions={minYearOptions}
                maxYearOptions={maxYearOptions}
                bodyTypeOptions={bodyTypeOptions}
                doorsOptions={doorsOptions}
                minSeatsOptions={minSeatsOptions}
                maxSeatsOptions={maxSeatsOptions}
                colorOptions={colorOptions}
                havingError={havingError}
              />
            </Grid>
            <Grid item xs={12} sm={9} md={8}>
              <Stack spacing={2}>
                <CarsList
                  cars={cars}
                  loading={loading}
                  handleClickCard={handleClickCard}
                />
                {pageTotalSize > 0 && (
                  <Box display={"flex"} sx={{ mt: 2 }} justifyContent="center">
                    <Pagination
                      count={pageTotalSize}
                      defaultPage={defaultPage ? defaultPage : 1}
                      page={currentPage ? currentPage : 1}
                      onChange={handleChangePage}
                      size="large"
                      siblingCount={1}
                    />
                  </Box>
                )}
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default CarsView;
