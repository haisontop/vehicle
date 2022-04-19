export const replaceURLParameter = (url, paramName, paramValue) => {
  if (paramValue == null) {
    paramValue = "";
  }
  var pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  url = url.replace(/[?#]$/, "");
  return (
    url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue
  );
};

export const removeAgentRole = (url) => {
  return url.replace("isAgent=true&", "");
};

export function getFullUrl(req, fallback) {
  //server side request object(req)
  if (req) {
    return req.protocol + "://" + req.get("host") + req.originalUrl;
  } //making sure we are on the client side
  else if (!(typeof window === "undefined")) {
    return window.location.href;
  } else {
    return fallback;
  }
}

export function encryption(value) {
  return Buffer.from(value).toString("base64");
}

export function decryption(value) {
  return Buffer.from(value, "base64").toString();
}

export function cleanSearchParams(searchParams) {
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

export function getPriceIndicatorColor(priceIndicator) {
  //default is
  let color = "#666666";
  switch (priceIndicator) {
    case "GOOD":
      color = "#48d445";
      break;

    case "LOW":
      color = "#A4A4A4";
      break;

    case "FAIR":
      color = "#FDD13A";

      break;

    case "GREAT":
      color = "#1f8300";
      break;

    case "HIGH":
      color = "#FC7B1E";
      break;

    default:
      break;
  }
  return color;
}

export function getPriceIndicatorLabelColor(priceIndicator) {
  //default is
  let color = "#fff";
  switch (priceIndicator) {
    case "GOOD":
      color = "#000";
      break;

    case "LOW":
      color = "#fff";
      break;

    case "FAIR":
      color = "#000";

      break;

    case "GREAT":
      color = "#fff";
      break;

    case "HIGH":
      color = "#fff";
      break;

    default:
      break;
  }
  return color;
}

export function getPriceIndicatorLabel(priceIndicator) {
  //default is
  let label = "No analysis";
  switch (priceIndicator) {
    case "GOOD":
      label = "Good price";
      break;

    case "LOW":
      label = "Lower price";
      break;

    case "FAIR":
      label = "Fair price";

      break;

    case "GREAT":
      label = "Great price";
      break;

    case "HIGH":
      label = "Higher price";
      break;

    default:
      break;
  }
  return label;
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
