import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CarOverviewCard from "./CarOverviewCard";

const CarsList = ({ cars, loading, handleClickCard }) => {

  return (
    <Grid container spacing={2}>
      {loading ? (
        <>
          {Array.from(Array(9).keys()).map((item) => (
            <Grid item xs={4} key={item}>
              <Box sx={{ pt: 0.5 }}>
                <Skeleton variant="rectangular" width="100%" height={118} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
        </>
      ) : (
        cars.map((car) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={car.metadata.stockId}>
            <CarOverviewCard details={car} handleClickCard={handleClickCard}/>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CarsList;
