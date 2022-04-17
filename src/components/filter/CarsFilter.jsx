import {
  Button,
  ButtonGroup,
  Card,
  Grid,
  Stack,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  BottomNavigation,
  Switch,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import TagManager from "react-gtm-module";
import { makeStyles } from "@mui/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import {
  MAKE_OPTIONS,
  MAX_PRICE_OPTIONS,
  MIN_PRICE_OPTIONS,
  NATIONAL_OPTIONS,
} from "../../constants";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const useStyles = makeStyles((theme) => {
  return {
    filterContainer: {
      margin: 0,
    },
  };
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CarsFilter = ({
  loading,
  havingError,
  handleSubmit,
  searchOptions,
  totalAmount,
  makeOptions,
  modelOptions,
  minPriceOptions,
  maxPriceOptions,
  minMilesOptions,
  maxMilesOptions,
  fuelTypeOptions,
  transmissionTypeOptions,
  minYearOptions,
  maxYearOptions,
  bodyTypeOptions,
  doorsOptions,
  minSeatsOptions,
  maxSeatsOptions,
  colorOptions,
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    if (!loading) {
      setOpen(false);
    }
  }, [loading]);

  const handleTrackingSearchField = (fieldName) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "search_fields_click",
        fieldName: fieldName,
      },
    });
  };

  const handleResetFilter = (resetForm) => {
    resetForm({
      values: {
        distance: "",
        minPrice: "",
        maxPrice: "",
        standardMake: "",
        standardModel: "",
        postcode: "",
        minOdometerReadingMiles: "",
        maxOdometerReadingMiles: "",
        minManufacturedYear: "",
        maxManufacturedYear: "",
        standardFuelType: "",
        standardTransmissionType: "",
        emissionScheme: "",
        standardBodyType: "",
        doors: "",
        minSeats: "",
        maxSeats: "",
        standardColour: "",
      },
    });

    handleSubmit({
      distance: "",
      minPrice: "",
      maxPrice: "",
      standardMake: "",
      standardModel: "",
      postcode: "",
      minOdometerReadingMiles: "",
      maxOdometerReadingMiles: "",
      minManufacturedYear: "",
      maxManufacturedYear: "",
      standardFuelType: "",
      standardTransmissionType: "",
      emissionScheme: "",
      standardBodyType: "",
      doors: "",
      minSeats: "",
      maxSeats: "",
      standardColour: "",
    });
  };

  const renderSelectValue = (value) => {
    return value.replace(/(.*?)/, "");
  };

  const renderForm = () => {
    return (
      <Formik
        enableReinitialize
        initialValues={{
          distance: searchOptions.distance || "",
          minPrice: searchOptions.minPrice || "",
          maxPrice: searchOptions.maxPrice || "",
          standardMake: searchOptions.standardMake || "",
          standardModel: searchOptions.standardModel
            ? searchOptions.standardModel
            : "",
          postcode: searchOptions.postcode || "",
          minOdometerReadingMiles: searchOptions.minOdometerReadingMiles || "",
          maxOdometerReadingMiles: searchOptions.maxOdometerReadingMiles || "",
          minManufacturedYear: searchOptions.minManufacturedYear || "",
          maxManufacturedYear: searchOptions.maxManufacturedYear || "",
          standardFuelType: searchOptions.standardFuelType || "",
          standardTransmissionType:
            searchOptions.standardTransmissionType || "",
          emissionScheme: searchOptions.emissionScheme || "",
          standardBodyType: searchOptions.standardBodyType || "",
          doors: searchOptions.doors || "",
          minSeats: searchOptions.minSeats || "",
          maxSeats: searchOptions.maxSeats || "",
          standardColour: searchOptions.standardColour || "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
        }}
      >
        {({ handleChange, setFieldValue, values, errors, resetForm }) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="postcode">
                    {({ field, form }) => (
                      <TextField
                        placeholder="Postcode"
                        {...field}
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        fullWidth
                      ></TextField>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="distance">
                    {({ field, form }) => (
                      <Select
                        placeholder="National"
                        fullWidth
                        {...field}
                        id="distance"
                        labelId="distance"
                        displayEmpty
                        onChange={(event) => {
                          handleChange("distance")(event);
                        }}
                        onClick={(event) => {
                          handleTrackingSearchField(field.name);
                        }}
                        className="gtm-select-field"
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                      >
                        {NATIONAL_OPTIONS.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="standardMake">
                    {({ field, form }) => {
                      return (
                        <Select
                          size="large"
                          sx={{
                            "& .MuiSelect-select": {
                              paddingY: 3,
                            },
                          }}
                          className="gtm-select-field"
                          placeholder="Make"
                          fullWidth
                          displayEmpty
                          {...field}
                          onChange={(event) => {
                            handleChange("standardMake")(event);
                            setFieldValue("standardModel", "");
                          }}
                          renderValue={
                            field.value ? renderSelectValue : undefined
                          }
                          onClick={(event) => {
                            handleTrackingSearchField(field.name);
                          }}
                        >
                          <MenuItem value="">
                            <em>Make</em>
                          </MenuItem>
                          {makeOptions.map((option) => (
                            <MenuItem value={option.value} key={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    }}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="standardModel">
                    {({ field, form }) => {
                      const currentModelTarget = modelOptions.find(
                        (modelOption) =>
                          modelOption.make === values.standardMake
                      );

                      const currentModelOptions =
                        currentModelTarget && currentModelTarget.options
                          ? currentModelTarget.options.map((option) => ({
                              value: option.value,
                              label: option.value,
                            }))
                          : [];

                      return (
                        <FormControl disabled={!values.standardMake} fullWidth>
                          <Select
                            sx={{
                              "& .MuiSelect-select": {
                                paddingY: 3,
                                backgroundColor: "common.white",
                              },
                            }}
                            className="gtm-select-field"
                            placeholder="Model"
                            fullWidth
                            displayEmpty
                            {...field}
                            onChange={(event) => {
                              handleChange("standardModel")(event);
                            }}
                            renderValue={
                              field.value ? renderSelectValue : undefined
                            }
                            onClick={(event) => {
                              handleTrackingSearchField(field.name);
                            }}
                          >
                            <MenuItem value="">
                              <em>Model</em>
                            </MenuItem>
                            {currentModelOptions.map((option) => (
                              <MenuItem value={option.value} key={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      );
                    }}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="minPrice">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Min Price"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("minPrice")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Min Price</em>
                        </MenuItem>
                        {minPriceOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="maxPrice">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Max Price"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("maxPrice")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Max Price</em>
                        </MenuItem>
                        {maxPriceOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="minOdometerReadingMiles">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Min Mileage"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("minOdometerReadingMiles")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Min mileage</em>
                        </MenuItem>
                        {minMilesOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="maxOdometerReadingMiles">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Max Mileage"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("maxOdometerReadingMiles")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Max Mileage</em>
                        </MenuItem>
                        {maxMilesOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field name="minManufacturedYear">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Min Year"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("minManufacturedYear")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Min Year</em>
                        </MenuItem>
                        {minYearOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="maxManufacturedYear">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Max Year"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("maxManufacturedYear")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Max Year</em>
                        </MenuItem>
                        {maxYearOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="standardFuelType">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Fuel Type"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("standardFuelType")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Fuel Type</em>
                        </MenuItem>
                        {fuelTypeOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="standardTransmissionType">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Gearbox"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("standardTransmissionType")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Gearbox</em>
                        </MenuItem>
                        {transmissionTypeOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field name="standardBodyType">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Body Type"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("standardBodyType")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                        onClick={(event) => {
                          handleTrackingSearchField(field.name);
                        }}
                      >
                        <MenuItem value="">
                          <em>Body Type</em>
                        </MenuItem>
                        {bodyTypeOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field name="doors">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Doors"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("doors")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Doors</em>
                        </MenuItem>
                        {doorsOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Field name="minSeats">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Min Seats"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("minSeats")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Min Seats</em>
                        </MenuItem>
                        {minSeatsOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Field name="maxSeats">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Max Seats"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("maxSeats")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Max Seats</em>
                        </MenuItem>
                        {maxSeatsOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Field name="standardColour">
                    {({ field, form }) => (
                      <Select
                        sx={{
                          "& .MuiSelect-select": {
                            paddingY: 3,
                            backgroundColor: "common.white",
                          },
                        }}
                        className="gtm-select-field"
                        placeholder="Color"
                        fullWidth
                        {...field}
                        displayEmpty
                        onChange={(event) => {
                          handleChange("standardColour")(event);
                        }}
                        renderValue={
                          field.value ? renderSelectValue : undefined
                        }
                      >
                        <MenuItem value="">
                          <em>Color</em>
                        </MenuItem>
                        {colorOptions.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Field name="emissionScheme">
                    {({ field, form }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            className="gtm-select-field"
                            checked={field.value === "ulez"}
                            onChange={(event) => {
                              form.setFieldValue(
                                field.name,
                                event.target.checked ? "ulez" : ""
                              );
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                            onClick={() => {
                              handleTrackingSearchField(field.name);
                            }}
                          />
                        }
                        label="Only show ULEZ compliant cars"
                      />
                    )}
                  </Field>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Box flexGrow={1}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        id="search-button"
                        size="large"
                        fullWidth
                        loading={loading}
                        sx={{
                          paddingY: 3,
                          borderRadius: 5,
                        }}
                      >
                        Search
                      </LoadingButton>
                      {havingError && (
                        <Typography color="red">
                          Searching had some issues. Please try again later
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      size="large"
                      onClick={() => handleResetFilter(resetForm)}
                      sx={{
                        color: "#23325C",
                        backgroundColor: "#C2C5CD",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "#fff",
                        },
                      }}
                    >
                      <CloseIcon sx={{}} />
                    </IconButton>
                  </Stack>
                </Grid>
                <Paper
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: { xs: "block", sm: "none" },
                  }}
                  elevation={3}
                >
                  <BottomNavigation showLabels>
                    <Box
                      width={1}
                      px={2}
                      sx={{
                        background: "#fff",
                        boxShadow: "rgb(0 0 0 / 10%) 0px -1px 4px 0px",
                      }}
                      display="flex"
                      alignItems="center"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <LoadingButton
                            type="submit"
                            color="primary"
                            variant="contained"
                            fullWidth
                            id="search-button"
                            loading={loading}
                          >
                            Search
                          </LoadingButton>
                          {havingError && (
                            <Typography color="red">
                              Searching had some issues. Please try again later
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <LoadingButton
                            color="primary"
                            variant="contained"
                            fullWidth
                            id="reset-button"
                            onClick={() => handleResetFilter(resetForm)}
                          >
                            Reset Filters
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </BottomNavigation>
                </Paper>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display={{ xs: "block", sm: "none" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Filter
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          classes={{ paper: classes.filterContainer }}
        >
          <AppBar sx={{ position: "relative", bottom: 0 }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Filter
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Card sx={{ p: 2, pb: 8, overflow: "auto" }}>{renderForm()}</Card>
        </Dialog>
      </Box>
      <Box
        display={{ xs: "none", sm: "block" }}
        sx={{ position: "sticky", top: "84px" }}
      >
        <Box sx={{ p: 2 }}>{renderForm()}</Box>
      </Box>
    </>
  );
};

export default CarsFilter;
