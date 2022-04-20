import React from "react";
import { Box } from "@mui/material";
import CarsView from "../src/views/CarsView";
import absoluteUrl from "next-absolute-url";
import { useSearchSettings } from "../src/hooks";

export default function Home({ baseOrigin }) {
  const { baseURL, onChangeBaseURL } = useSearchSettings();

  React.useEffect(() => {
    if (!baseURL && baseOrigin && baseURL !== baseOrigin) {
      onChangeBaseURL(baseOrigin);
    }
  }, [onChangeBaseURL]);

  return <CarsView />;
}

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req);
  return {
    props: { baseOrigin: origin }, // will be passed to the page component as props
  };
}
