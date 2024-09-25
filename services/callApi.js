const URL = "http://localhost:8080";

async function apiGetCountry() {
    return await axios({
      method: "GET",
      url: `${URL}/api/local/get-country`,
    });
}

async function apiGetProvince() {
    return await axios({
      method: "GET",
      url: `${URL}/api/local/get-province`,
    });
}

async function apiGetHotel() {
  return await axios({
    method: "GET",
    url: `${URL}/api/hotel/get-hotel`,
  });
}

async function apiSearchHotel(name) {
  try {
      const response = await axios({
          method: "GET",
          url: `${URL}/api/hotel/search-hotel/${name}`
      });
      return response;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
}