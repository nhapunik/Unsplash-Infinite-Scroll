document.getElementById("search-box").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchImages(event.target.value);
    }
  });