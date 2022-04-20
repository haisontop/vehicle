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
import React from "react";
import useSWR from "swr";
import NextLink from "next/link";
import CarDetailsView from "../../src/views/CarDetailsView";
import { useSearchSettings } from "../../src/hooks";
import absoluteUrl from "next-absolute-url";
import { ArrowBack } from "@mui/icons-material";

const fetcher = (url, id) => {
  return axios.get(url, { params: { id } }).then((res) => {
    return res.data;
  });
};

export default function DetailsPage({ baseOrigin }) {
  const router = useRouter();

  const { baseURL, onChangeBaseURL } = useSearchSettings();

  React.useEffect(() => {
    if (!baseURL && baseOrigin && baseURL !== baseOrigin) {
      onChangeBaseURL(baseOrigin);
    }
  }, [onChangeBaseURL]);

  const { id } = router.query;

  const { isLoading, data, error } = useSWR(["/api/detail", id], fetcher);

  if (isLoading || !data) {
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
    let { id, ...newQuery } = router.query;
    router.push({ pathname: "/", query: newQuery });
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
        <Grid item xs={12}>
          <CarDetailsView
            lists={data.data.results}
            totalResults={data.data.totalResults}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req);
  return {
    props: { baseOrigin: origin }, // will be passed to the page component as props
  };
}
