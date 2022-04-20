import React from "react";
import { Container, Card, Grid, Box, Pagination, Stack, Link } from "@mui/material";
import CarDetails from "../components/cars/CarDetails";
import NextLink  from "next/link";

const CarDetailsView = ({ lists, totalResults }) => {
  return (
      <Grid container p={2} pb={6} spacing={2} sx={{ position: "relative" }}>
        <Grid item xs={12}>
          {lists && lists.length > 0 && <CarDetails details={lists[0]} />}
        </Grid>
      </Grid>
  );
};

export default CarDetailsView;
