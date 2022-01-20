const courusel_images = [
  "first-slide-img",
  "second-slide-img",
  "third-slide-img",
  "fourth-slide-img",
  "fifth-slide-img",
];
const courusel_titles = [
  "first-slide-title",
  "second-slide-title",
  "third-slide-title",
  "fourth-slide-title",
  "fifth-slide-title",
];
const courusel_dates = [
  "first-slide-date",
  "second-slide-date",
  "third-slide-date",
  "fourth-slide-date",
  "fifth-slide-date",
];

const layout_classes = ["col-lg-4", "col-md-6", "col-sm-12"];
const card_classes = ["card", "zoom"];
const card_body_classes = ["card-body"];

const activeClass = "active";
const navBarLinks = [
  "home-link",
  "news-link",
  "search-link",
  "contact-link",
  "sources-link",
];

// Contact
const contactUrlParams = ["firstname", "lastname", "topic", "subject"];

// Weather parameters id
const weather_paramsID = {
  title: "weather-city-country",
  date: "weather-date",
  temperature: "weather-temp",
  temperature_feels: "weather-feel-like",
  icon: "icon",
  sunrise: "weather-sunrise",
  sunset: "weather-sunset",
  humidity: "weather-humidity",
  pressure: "weather-pressure",
  wind_speed: "weather-wind-speed",
  cloudiness: "weather-cloudiness",
};

// Page
const pagelistItemClassNames = ["page-item"];
const pageListFirstItemClassNames = ["page-item", "page-first"];
const pageListLastItemClassNames = ["page-item", "page-last"];
const pageListAnchorTagClassNames = ["page-link"];

const numberOfPages = getPageCount(data);
const steps = getPageSteps(numberOfPages);