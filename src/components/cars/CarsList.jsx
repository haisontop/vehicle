import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";
import CarOverviewCard from "./CarOverviewCard";

const CarsList = ({ cars, loading, handleClickCard }) => {


  const { userId,onChangeCookieEnabled } = useContext(SearchContext);

  const router = useRouter();

  const handleFavorit = async (details) => {
    const newUserId = Math.floor(Math.random()*10000);
   
    if (newUserId.toString() !== userId) {
      onChangeCookieEnabled(undefined)
    }
    router.push({ query: { user:newUserId } })
    
    
    if (userId) {
      try {
        const fetchResult = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_WEB_API}/user/${userId}/favourites`,
          { ...details }
        );
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  return (
    <>
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
              <CarOverviewCard details={car} handleClickCard={handleClickCard} onFavoritClick={() => handleFavorit(car)} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default CarsList;
