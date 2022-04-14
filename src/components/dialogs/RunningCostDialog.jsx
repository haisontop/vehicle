import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { InsuranceIcon } from "../icons/InsuranceIcon";
import { TaxIcon } from "../icons/TaxIcon";
import { FuelIcon } from "../icons/FuelIcon";

export default function RunningCostDialog({ isOpen, onClose, vehicle }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    fuelEconomyWLTPCombinedMPG,
    co2EmissionGPKM,
    insuranceGroup,
    insuranceSecurityCode,
    fuelEconomyNEDCUrbanMPG,
    fuelEconomyNEDCExtraUrbanMPG,
  } = vehicle;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        fullScreen={fullScreen}
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography variant="h3" textAlign="center">
            Running Costs
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid
            container
            spacing={2}
            sx={{ minWidth: { xs: "100%", sm: "500px" } }}
          >
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={2}>
                  <InsuranceIcon sx={{ width: "48px", height: "48px" }} />
                </Grid>
                <Grid item xs={10}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">Insurance</Typography>
                  </Box>
                  {insuranceGroup && insuranceSecurityCode && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">Insurance Group</Typography>
                      <Typography variant="body1">{`${insuranceGroup}${insuranceSecurityCode}`}</Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={2}>
                  <TaxIcon sx={{ width: "48px", height: "48px" }} />
                </Grid>
                <Grid item xs={10}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">Tax</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">Annual Tax</Typography>
                    <Typography variant="body1">£155*</Typography>
                  </Box>
                  {co2EmissionGPKM && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">CO2 Emissions</Typography>
                      <Typography variant="body1">
                        {co2EmissionGPKM} g/km
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={2}>
                  <FuelIcon sx={{ width: "48px", height: "48px" }} />
                </Grid>
                <Grid item xs={10}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">Fuel</Typography>
                  </Box>
                  {fuelEconomyNEDCUrbanMPG && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">Urban</Typography>
                      <Typography variant="body1">
                        {fuelEconomyNEDCUrbanMPG} mpg
                      </Typography>
                    </Box>
                  )}
                  {fuelEconomyNEDCExtraUrbanMPG && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">Extra Urban</Typography>
                      <Typography variant="body1">{fuelEconomyNEDCExtraUrbanMPG} mpg</Typography>
                    </Box>
                  )}

                  {fuelEconomyWLTPCombinedMPG && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">Combined</Typography>
                      <Typography variant="body1">
                        {fuelEconomyWLTPCombinedMPG} mpg
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Divider />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
