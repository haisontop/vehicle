import { Button, Link } from "@mui/material";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ReadMore() {
  return (
    <Button
      variant="text"
      size="small"
      sx={{ fontSize: 13 }}
      onClick={() =>
        window.open("https://trade.autotrader.co.uk/price-indicator/", "_blank")
      }
    >
      Read More
      <ChevronRightIcon />
    </Button>
  );
}
