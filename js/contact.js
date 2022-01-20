window.addEventListener("DOMContentLoaded", (event) => {
  const getUrlParams = getParamsFromUrl();

  let urlParamsValues = [];

  for (let i = 0; i < contactUrlParams.length; i++) {
    let param = getUrlParams.get(contactUrlParams[i]);
    urlParamsValues.push(param)
  }

  console.log(urlParamsValues);
  
  if (urlParamsValues[0] !== null) {
    alert(urlParamsValues[0] + ", thank you for your message. We will contact you in 48 hours.")
    window.location.href = "index.html"
  } 

  // validateForm("contactForm", "firstname");
  activateNavLink(3);
});

