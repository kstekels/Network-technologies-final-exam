const findElementByID = (idName) => {
  return document.getElementById(idName);
};

const convertDate = (date) => {
  return new Date(date).toDateString();
};

const convertTime = (date) => {
  return new Date(date).toLocaleTimeString("la", {
    timeStyle: "short",
    hour12: false,
    timeZone: "UTC",
  });
};

function create_post_image(url) {
  // Image
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.id = "post-image";
  img.src = url;
  return img;
}

const create_post_body = (post_title, post_date, post_url) => {
  // Title
  let title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerHTML = post_title;

  // Date
  let date = document.createElement("p");
  date.classList.add("text-muted");
  let p_date = convertDate(post_date);
  const p_time = convertTime(post_date);
  date.innerHTML = p_date + ", " + p_time;

  // Button
  let post_button = document.createElement("a");
  let post_button_url = document.createTextNode("Read");
  post_button.classList.add("btn");
  post_button.classList.add("btn-outline-primary");
  post_button.id = "post-button";
  post_button.appendChild(post_button_url);
  post_button.href = post_url;

  let card_body = {
    title: title,
    date: date,
    button: post_button,
  };

  return card_body;
};

const create_div = (class_names = [""]) => {
  const layout = document.createElement("div");
  for (let i = 0; i < class_names.length; i++) {
    layout.classList.add(class_names[i]);
  }
  return layout;
};

const create_element = (elementName, className = [], element_id = "") => {
  const layout = document.createElement(elementName);
  for (let i = 0; i < className.length; i++) {
    layout.classList.add(className[i]);
    if (element_id !== "") {
      layout.id = element_id;
    }
  }
  return layout;
};

const calculateDateFromNumber = (num) => {
  let unix = num;
  return new Date(unix * 1000);
};

const getTimeFromNumber = (number) => {
  return convertTime(calculateDateFromNumber(number));
};

const converTemperatureNumber = (value) => {
  return parseFloat(value).toFixed(1);
};

const load_news = (post_data, slides = 0) => {
  // sort data
  post_data.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  let main_page_news = null;
  if (slides > 0) {
    let latest_news = post_data.slice(0, 5);
    main_page_news = post_data.slice(5, 20);
    // Load courusle

    for (let i = 0; i < slides; i++) {
      let courusel_img = document.getElementById(courusel_images[i]);
      let courusel_title = document.getElementById(courusel_titles[i]);
      let courusel_date = document.getElementById(courusel_dates[i]);
      try {
        courusel_img.src = latest_news[i].urlToImage;
        courusel_title.innerHTML = latest_news[i].title;
        courusel_title.href = latest_news[i].url;
        courusel_date.innerHTML = convertDate(latest_news[i].publishedAt);
      } catch (error) {
        console.log(error);
        document.getElementById("courosel-section").style.visibility = "false";
      }
      courusel_title.classList.add("courusel-title");
    }
  } else {
    main_page_news = post_data;
  }

  for (let i = 0; i < main_page_news.length; i++) {
    let post_img = create_post_image(main_page_news[i].urlToImage);

    var post_body = create_post_body(
      main_page_news[i].title,
      main_page_news[i].publishedAt,
      main_page_news[i].url
    );

    // Main body
    const row = document.getElementById("row");

    // Post Layout
    const post_layout = create_div(layout_classes);

    // Card
    const card = create_div(card_classes);

    // Card body
    const card_body = create_div(card_body_classes);

    card_body.appendChild(post_body.title);
    card_body.appendChild(post_body.date);
    card_body.appendChild(post_body.button);

    card.appendChild(post_img);
    card.appendChild(card_body);

    post_layout.appendChild(card);

    row.appendChild(post_layout);
    console.log(main_page_news);
  }
};

const activateNavLink = (linkNum) => {
  for (let i = 0; i < navBarLinks.length; i++) {
    const navLink = document.getElementById(navBarLinks[i]);
    const newsLink = document.getElementById(navBarLinks[linkNum]);
    newsLink.classList.add(activeClass);
    if (navLink.classList.contains(activeClass) && navLink !== newsLink) {
      navLink.classList.remove(activeClass);
    }
  }
};

const activatePageLink = (pageNum, pageCount) => {
  for (let i = 1; i < pageCount; i++) {
    const pageLink = findElementByID("page-" + i);
    const currentPage = findElementByID("page-" + pageNum);
    currentPage.classList.add(activeClass);
    if (pageLink.classList.contains(activeClass) && pageLink !== currentPage) {
      pageLink.classList.remove(activeClass);
    }
  }
};

const getParamsFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params;
};

function search(query_keyword, dataArray) {
  let newArr = [];
  for (var i = 0; i < dataArray.length; i++) {
    let first_condition = dataArray[i].title
      .toLowerCase()
      .includes(query_keyword.toLowerCase());
    let second_condition = dataArray[i].description
      .toLowerCase()
      .includes(query_keyword.toLowerCase());
    if (first_condition || second_condition) {
      newArr.push(dataArray[i]);
    }
  }
  return newArr;
}

function searchAllPosts() {
  const queryString = new URLSearchParams(window.location.search);
  let query = queryString.get("q");
  console.log("Query: " + query);
  if (query) {
    let found_posts_data = search(query, data);
    console.log(found_posts_data);
    load_news(found_posts_data);

    const newsHeader = document.getElementById("news-header");
    newsHeader.innerHTML =
      '<span id="query-header-title">Result for:</span> ' +
      '"' +
      query +
      '" (' +
      found_posts_data.length +
      ")";
  }
}

const generateWeatherTitlesWithClass = (
  titleName,
  value,
  symbol = "",
  className = "header-text"
) => {
  return (
    '<span class="' +
    className +
    '">' +
    titleName +
    ":</span> " +
    value.toString() +
    symbol
  );
};

const generateOpenWeatherIconUrl = (icon) => {
  return "http://openweathermap.org/img/wn/" + icon + "@2x.png";
};

const setTemperatureIcon = (value, imgId) => {
  if (value < 0) {
    imgId.src = "../images/thermometer-snow.svg";
  } else {
    imgId.src = "../images/thermometer-sun.svg";
  }
};

const getPageCount = (articles) => {
  let p = parseFloat(articles.length / 24).toFixed(3);
  let fullPages = parseInt(p);
  if (parseFloat(p).toFixed(2) > parseFloat(fullPages).toFixed(2)) {
    fullPages = fullPages + 1;
  }
  return fullPages;
};

const getPageSteps = (numberOfPages) => {
  let steps = [];
  for (let i = 0; i < numberOfPages - 1; i++) {
    steps.push(i * 25);
  }
  return steps;
};

const createPaginatorButton = (_page, inner_name) => {
  const page_ul = findElementByID("pages-ul");
  const _itemClassNames = () => {
    if (inner_name === "Prev") {
      return pageListFirstItemClassNames;
    } else if (inner_name == "Next") {
      return pageListLastItemClassNames;
    } else {
      return pagelistItemClassNames;
    }
  };

  let itemClassNames = _itemClassNames();
  const pg_li = create_element("li", itemClassNames, "page-" + _page);
  const pg_li_a = create_element("a", pageListAnchorTagClassNames);
  pg_li_a.href = "news.html" + "?" + "page=" + _page.toString();
  pg_li_a.innerHTML = inner_name;
  pg_li.appendChild(pg_li_a);
  page_ul.appendChild(pg_li);
};

const disablePaginatorButton = (pageNum, button, isFirst) => {
  if (pageNum == 1 && isFirst == true) {
    button.classList.add("disabled");
  } else if (pageNum == numberOfPages - 1 && isFirst == false) {
    button.classList.add("disabled");
  } else {
    try {
      button.classList.remove("disabled");
      button.classList.remove("disabled");
    } catch (error) {
      console.log(error);
    }
  }
};




// const validateForm = (formName, fieldName) => {
//   let field = document.forms[formName][fieldName];
//   if (field.value == "") {
//     alert(field.name + " must be filled out!");
//     return false
//   }
// } 