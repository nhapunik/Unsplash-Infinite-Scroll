document.getElementById("search-box").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      currentPage = 1;
      searchImages(event.target.value);
    }
  });
  
  const accessKey = "kQaoyz53sG-uxIBAH-wpEEmd8bEYaqjtc_hjGrnxyRw";
  const apiEndpoint = "https://api.unsplash.com/search/photos";
  
  document.getElementById("search-button").addEventListener("click", function () {
    const searchBox = document.getElementById("search-box");
    currentPage = 1;
    searchImages(searchBox.value);
  });
  
  async function searchImages(query) {
    try {
      const response = await fetch(`${apiEndpoint}?query=${query}&client_id=${accessKey}&page=${currentPage}&per_page=20`);
      const data = await response.json();
  
      displayImages(data.results, currentPage !== 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }
  
  function displayImages(images, append = false) {
    const container = document.getElementById("image-container");
  
    if (!append) {
      container.innerHTML = "";
    }
  
    images.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.urls.small;
      imgElement.classList.add("image");
      container.appendChild(imgElement);
    });
  }
  
  let currentPage = 1;
  let isLoading = false;
  
  async function loadMoreImages(query) {
    isLoading = true;
    currentPage++;
    try {
      await searchImages(query);
      isLoading = false;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }
  
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (!isLoading && scrollTop + clientHeight >= scrollHeight - 500) {
      const searchBox = document.getElementById("search-box");
      loadMoreImages(searchBox.value);
    }
  });