import React from "react";
import { Container, Card, Grid, Box, Pagination, Stack, Link } from "@mui/material";
import CarDetails from "../components/cars/CarDetails";
import NextLink  from "next/link";

const CarDetailsView = ({ lists, totalResults }) => {
  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 6 }}>
      <Grid container spacing={2} sx={{ position: "relative" }}>
        <Grid item xs={12}>
          {lists && lists.length > 0 && <CarDetails details={lists[0]} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetailsView;
