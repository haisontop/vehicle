import axios from "axios";

const AUTH_AXIOS_CONFIG = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const AUTH_API = `${process.env.base_autotrader_api}/authenticate`;
export const SEARCH_API = `${process.env.base_search_api}`;

export default async function handler(req, res) {
  try {
    const authResponse = await handleAuth();

    if (authResponse && authResponse.success && authResponse.access_token) {
      //Faceted Search
      //TODO: handle make seprated function for each facet search and use Promise.all
      if (req.body.pageSize === 0 || req.body.pageSize === "0") {
        let minPriceFacets = [];
        let maxPriceFacets = [];
        let makeFacets = [];
        let modelFacets = [];
        let minYearFacets = [];
        let maxYearFacets = [];
        let minMilesFacets = [];
        let maxMilesFacets = [];
        let fuelFacets = [];
        let gearboxFacets = [];
        let bodyTypeFacets = [];
        let doorsFacets = [];
        let minSeatsFacets = [];
        let maxSeatsFacets = [];
        let colorFacets = [];
        let totalResults = 0;

        const baseFacetsConfig = {
          headers: {
            Authorization: `Bearer ${authResponse.access_token}`,
            "x-apikey": process.env.search_api_key,
          },
          params: {
            ...cleanSearchParams(req.body),
            postcode: req.body.postcode,
            pageSize: 0,
          },
        };

        try {
          Promise.all([
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: { ...baseFacetsConfig.params, facet: "price" },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: { ...baseFacetsConfig.params, facet: "manufacturedYear" },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: {
                ...baseFacetsConfig.params,
                facet: "odometerReadingMiles",
              },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: { ...baseFacetsConfig.params, facet: "standardFuelType" },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: {
                ...baseFacetsConfig.params,
                facet: "standardTransmissionType",
              },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: {
                ...baseFacetsConfig.params,
                facet: "standardBodyType",
              },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: {
                ...baseFacetsConfig.params,
                facet: "doors",
              },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: { ...baseFacetsConfig.params, facet: "standardMake" },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: {
                ...baseFacetsConfig.params,
                facet: "standardModel",
              },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: {
                ...baseFacetsConfig.params,
                facet: "seats",
              },
            }),
            axios.get(SEARCH_API, {
              ...baseFacetsConfig,
              params: {
                ...baseFacetsConfig.params,
                facet: "standardColour",
              },
            }),
          ])
            .then(async function (values) {
              if (values[0] && values[0].data) {
                const responseData = values[0].data;
                minPriceFacets =
                  responseData.facets && responseData.facets.minPrice
                    ? responseData.facets.minPrice
                    : [];
                maxPriceFacets =
                  responseData.facets && responseData.facets.maxPrice
                    ? responseData.facets.maxPrice
                    : [];
                totalResults = responseData.totalResults;
              }

              if (values[1] && values[1].data) {
                const responseData = values[1].data;
                minYearFacets =
                  responseData.facets && responseData.facets.minManufacturedYear
                    ? responseData.facets.minManufacturedYear
                    : [];
                maxYearFacets =
                  responseData.facets && responseData.facets.maxManufacturedYear
                    ? responseData.facets.maxManufacturedYear
                    : [];
                totalResults = responseData.totalResults;
              }

              if (values[2] && values[2].data) {
                const responseData = values[2].data;
                minMilesFacets =
                  responseData.facets &&
                  responseData.facets.minOdometerReadingMiles
                    ? responseData.facets.minOdometerReadingMiles
                    : [];
                maxMilesFacets =
                  responseData.facets &&
                  responseData.facets.maxOdometerReadingMiles
                    ? responseData.facets.maxOdometerReadingMiles
                    : [];
                totalResults = responseData.totalResults;
              }

              if (values[3] && values[3].data) {
                const responseData = values[3].data;
                fuelFacets =
                  responseData.facets && responseData.facets.standardFuelType
                    ? responseData.facets.standardFuelType
                    : [];
                totalResults = responseData.totalResults;
              }
              if (values[4] && values[4].data) {
                const responseData = values[4].data;
                gearboxFacets =
                  responseData.facets &&
                  responseData.facets.standardTransmissionType
                    ? responseData.facets.standardTransmissionType
                    : [];
                totalResults = responseData.totalResults;
              }
              if (values[5] && values[5].data) {
                const responseData = values[5].data;
                bodyTypeFacets =
                  responseData.facets && responseData.facets.standardBodyType
                    ? responseData.facets.standardBodyType
                    : [];
                totalResults = responseData.totalResults;
              }
              if (values[6] && values[6].data) {
                const responseData = values[6].data;
                doorsFacets =
                  responseData.facets && responseData.facets.doors
                    ? responseData.facets.doors
                    : [];
                totalResults = responseData.totalResults;
              }
              if (values[7] && values[7].data) {
                const responseData = values[7].data;
                makeFacets =
                  responseData.facets && responseData.facets.standardMake
                    ? responseData.facets.standardMake
                    : [];
                totalResults = responseData.totalResults;
              }
              if (values[8] && values[8].data) {
                const responseData = values[8].data;
                modelFacets =
                  responseData.facets && responseData.facets.standardModel
                    ? responseData.facets.standardModel
                    : [];
                totalResults = responseData.totalResults;
              }
              if (values[9] && values[9].data) {
                const responseData = values[9].data;
                minSeatsFacets =
                  responseData.facets && responseData.facets.minSeats
                    ? responseData.facets.minSeats
                    : [];
                maxSeatsFacets =
                  responseData.facets && responseData.facets.maxSeats
                    ? responseData.facets.maxSeats
                    : [];
                totalResults = responseData.totalResults;
              }
              if (values[10] && values[10].data) {
                const responseData = values[10].data;
                colorFacets =
                  responseData.facets && responseData.facets.standardColour
                    ? responseData.facets.standardColour
                    : [];
                totalResults = responseData.totalResults;
              }

              res.json({
                success: true,
                data: {
                  makeFacets,
                  modelFacets,
                  minPriceFacets,
                  maxPriceFacets,
                  minYearFacets,
                  maxYearFacets,
                  minMilesFacets,
                  maxMilesFacets,
                  fuelFacets,
                  gearboxFacets,
                  bodyTypeFacets,
                  doorsFacets,
                  minSeatsFacets,
                  maxSeatsFacets,
                  colorFacets,
                  totalResults,
                },
                token: authResponse.access_token,
              });
            })
            .catch(function (err) {
              console.warn("Error in Facets Search: ", err);
              res.json({
                success: false,
              });
            });
        } catch (e) {
          console.log("e", e);
          res.json({
            success: false,
          });
        }
      }
      //NORMAL Search
      else {
        const config = {
          headers: {
            Authorization: `Bearer ${authResponse.access_token}`,
            "x-apikey": process.env.search_api_key,
          },
          params: {
            ...cleanSearchParams(req.body),
            lifeceycleState: "FORECOURT",
            advertisingLocation: "autotraderCars",
          },
        };

        const response = await axios.get(SEARCH_API, config);

        if (response && response.data) {
          res.json({
            success: true,
            data: response.data,
            token: authResponse.access_token,
          });
        } else {
          res.json({ success: false });
        }
      }
    }
  } catch (error) {
    console.log("error", error)
    res.statusCode = 201;
    res.json({ success: false });
  }
}

export const handleAuth = async () => {
  try {
    const response = await axios.post(
      AUTH_API,
      {
        key: process.env.autotrader_key,
        secret: process.env.autotrader_secret,
      },
      AUTH_AXIOS_CONFIG
    );

    if (response && response.data) {
      return {
        success: true,
        access_token: response.data.access_token,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
};

function cleanSearchParams(searchParams) {
  for (var optionName in searchParams) {
    if (
      searchParams[optionName] === null ||
      searchParams[optionName] === undefined ||
      searchParams[optionName] === ""
    ) {
      delete searchParams[optionName];
    }
  }
  return searchParams;
}
