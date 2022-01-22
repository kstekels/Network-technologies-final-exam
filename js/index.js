window.addEventListener("DOMContentLoaded", (event) => {
  load_news(data, 5);
  getWeatherData();

});

// window.onload = function() {
//   if (window.jQuery) {  
//       // jQuery is loaded  
//       alert("Yeah!");
//   } else {
//       // jQuery is not loaded
//       alert("Doesn't Work");
//   }
// }

$(document).ready(function(){
  $("#post-button").click(function(){
    alert("You will be redirected to original source!");
  })
});
