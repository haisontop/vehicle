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
} from "@mui/material";
import TagManager from "react-gtm-module";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";

export default function SpecificationDialog({
  isOpen,
  onClose,
  vehicle,
  features,
}) {
  const {
    widthMM,
    bootSpaceSeatsDownLitres,
    bootSpaceSeatsUpLitres,
    grossVehicleWeightKG,
    heightMM,
    lengthMM,
    valves,
    zeroToSixtyMPHSeconds,
    enginePowerBHP,
    engineTorqueNM,
    topSpeedMPH,
    cylinders,
    minimumKerbWeightKG,
  } = vehicle;

  const performanceFeatures = features.filter(
    (feature) => feature.category === "Performance"
  );

  const driverFeatures = features.filter(
    (feature) => feature.category === "Drivers Assistance"
  );

  const safetyFeatures = features.filter(
    (feature) => feature.category === "Safety and Security"
  );

  const exteriorFeatures = features.filter(
    (feature) => feature.category === "Exterior"
  );

  const interiorFeatures = features.filter(
    (feature) => feature.category === "Interior"
  );

  const handleClose = () => {
    onClose();
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      TagManager.dataLayer({
        dataLayer: {
          event: "details_list_click",
          fieldName: panel,
        },
      });
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography variant="h3" textAlign="center">
            Specification
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "66%", flexShrink: 0 }} variant="h5">
                Performance
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">0-62mph</Typography>
                    <Typography variant="subtitle2">
                      {zeroToSixtyMPHSeconds
                        ? `${zeroToSixtyMPHSeconds} seconds`
                        : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Valves</Typography>
                    <Typography variant="subtitle2">{valves}</Typography>
                  </Box>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Top Speed</Typography>
                    <Typography variant="subtitle2">
                      {topSpeedMPH ? `${topSpeedMPH} mph` : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Engine power</Typography>
                    <Typography variant="subtitle2">
                      {enginePowerBHP ? `${enginePowerBHP} bhp` : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Cylinders</Typography>
                    <Typography variant="subtitle2">
                      {cylinders ? cylinders : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Engine torque</Typography>
                    <Typography variant="subtitle2">
                      {engineTorqueNM ? `${engineTorqueNM} lbs/ft` : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "driver_convenience"}
            onChange={handleChange("driver_convenience")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="driver_conveniencebh-content"
              id="driver_conveniencebh-header"
            >
              <Typography sx={{ width: "66%", flexShrink: 0 }} variant="h5">
                Driver Convenience
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {driverFeatures.map((feature, index) => {
                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2">
                          {feature.genericName
                            ? feature.genericName
                            : feature.name}
                        </Typography>
                        <CheckIcon color="success" />
                      </Box>
                      <Divider />
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "safety"}
            onChange={handleChange("safety")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="safetybh-content"
              id="safetybh-header"
            >
              <Typography sx={{ width: "66%", flexShrink: 0 }} variant="h5">
                Safety
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {safetyFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2">
                        {feature.name}
                      </Typography>
                      <CheckIcon color="success" />
                    </Box>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "exterior_features"}
            onChange={handleChange("exterior_features")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="exterior_featuresbh-content"
              id="exterior_featuresbh-header"
            >
              <Typography sx={{ width: "66%", flexShrink: 0 }} variant="h5">
                Exterior Features
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {exteriorFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2">
                        {feature.name}
                      </Typography>
                      <CheckIcon color="success" />
                    </Box>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "interior_features"}
            onChange={handleChange("interior_features")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="interior_featuresbh-content"
              id="interior_featuresbh-header"
            >
              <Typography sx={{ width: "66%", flexShrink: 0 }} variant="h5">
                Interior Features
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {interiorFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2">
                        {feature.name}
                      </Typography>
                      <CheckIcon color="success" />
                    </Box>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "technical"}
            onChange={handleChange("technical")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="technicalbh-content"
              id="technicalbh-header"
            >
              <Typography sx={{ width: "66%", flexShrink: 0 }} variant="h5">
                Technical
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">
                      Electric Power Steering - EPS
                    </Typography>
                    <CheckIcon color="success" />
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Speed Limiter</Typography>
                    <CheckIcon color="success" />
                  </Box>
                  <Divider />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "dimensions"}
            onChange={handleChange("dimensions")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="dimensionsbh-content"
              id="dimensionsbh-header"
            >
              <Typography sx={{ width: "66%", flexShrink: 0 }} variant="h5">
                Dimensions
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Height</Typography>
                    <Typography variant="subtitle2">
                      {heightMM ? `${heightMM} mm` : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">
                      Fuel tank capacity
                    </Typography>
                    <Typography variant="subtitle2">35.00 litres</Typography>
                  </Box>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Length</Typography>
                    <Typography variant="subtitle2">
                      {lengthMM ? `${lengthMM} mm` : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">
                      Gross vehicle weight
                    </Typography>
                    <Typography variant="subtitle2">
                      {grossVehicleWeightKG ? `${grossVehicleWeightKG} kg` : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Wheelbase</Typography>
                    <Typography variant="subtitle2">2340 mm</Typography>
                  </Box>
                  <Divider />
                </Grid>
                {bootSpaceSeatsDownLitres && (
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2">
                        Boot space (seats down)
                      </Typography>
                      <Typography variant="subtitle2">
                        {bootSpaceSeatsDownLitres
                          ? `${bootSpaceSeatsDownLitres} litres`
                          : ""}
                      </Typography>
                    </Box>
                    <Divider />
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">
                      Boot space (seats up)
                    </Typography>
                    <Typography variant="subtitle2">
                      {bootSpaceSeatsUpLitres
                        ? `${bootSpaceSeatsUpLitres} litres`
                        : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">Width</Typography>
                    <Typography variant="subtitle2">
                      {widthMM ? `${widthMM} mm` : ""}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
                {minimumKerbWeightKG && (
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2">
                        Minimum kerb weight
                      </Typography>
                      <Typography variant="subtitle2">
                        {minimumKerbWeightKG} kg
                      </Typography>
                    </Box>
                    <Divider />
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
