window.addEventListener("DOMContentLoaded", (event) => {
  //  URL parameters
  const queryString = new URLSearchParams(window.location.search);
  let page = queryString.get("page");

  //  Prev button
  createPaginatorButton(page - 1, "Prev");

  // Page buttons (1, 2, ... , n)
  for (let x = 1; x < numberOfPages; x++) {
    createPaginatorButton(x, x);
  }

  // Next button
  createPaginatorButton(parseInt(page) + 1, "Next");

  const prev_btn = findElementByID("page-0");
  const next_btn = findElementByID("page-" + numberOfPages);

  // Disable Paginator first or last button
  disablePaginatorButton(page, prev_btn, 1);
  disablePaginatorButton(page, next_btn, 0);

  // Divide post to pages (24 posts in page)
  let step = steps[parseInt(page - 1)];
  const articles_in_page = data.slice(step, step + 24);
  load_news(articles_in_page);

  // Create title
  const newsHeader = document.getElementById("news-header");
  newsHeader.innerHTML =
    "Page " + page + " - (" + articles_in_page.length + " articles)";

  activatePageLink(page, numberOfPages);
  activateNavLink(1);
});