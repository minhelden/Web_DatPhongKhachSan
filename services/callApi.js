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

async function apiGetRoomLocal(localID) {
  return await axios({
    method: "GET",
    url: `${URL}/api/hotel/get-hotel-local/${localID}`,
  });
}

async function apiGetRoomCountry(countryID) {
  return await axios({
    method: "GET",
    url: `${URL}/api/hotel/get-hotel-country/${countryID}`,
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

async function apiGetUsers() {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken");
    const response = await axios({
      method: "GET",
      url: `${URL}/api/user/get-user-all`,
      headers: {
        token: localStorageToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function apiGetDiscount() {
  return await axios({
    method: "GET",
    url: `${URL}/api/discount/get-discount`,
  });
}

async function apiLoginAdmin(user) {
  return await axios({
    method: "POST",
    url: `${URL}/api/user/login-admin`,
    data: user
  });
}