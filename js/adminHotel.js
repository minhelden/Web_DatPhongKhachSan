document.addEventListener("DOMContentLoaded", function () {
    const localStorageToken = localStorage.getItem('localStorageToken');
    if (!localStorageToken) {
        window.location.href = "/layout/loginAdmin.html";
        return; 
    }

    const decodedToken = localStorageToken ? JSON.parse(atob(localStorageToken.split('.')[1])) : null;
    const userID = decodedToken && decodedToken.data && decodedToken.data.MA_ND;
    const userRole = decodedToken && decodedToken.data && decodedToken.data.CHUCVU;

    if (userRole !== "Admin") {
        window.location.href = "/layout/index.html";
        return;
    }

    if (userID) {
        getHotel();
    } else {
        console.log("UserID không tồn tại trong localStorage");
    }
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                handleSearch(event);
            }
        });
    }
});

function getElement(selector) {
    return document.querySelector(selector);
}

async function getHotel(){
    try {
        const response = await apiGetHotel();
        const hotels = response.data; 
        const hotelObj =  hotels.map((hotel) => new KHACHSAN(
            hotel.MA_KS,
            hotel.TEN_KS,
            hotel.MO_TA,
            hotel.HINHANH,
            hotel.MA_VITRI,
            hotel.MA_VITRI_VITRI
        ));
        renderHotels(hotelObj);
    } catch (error) {
        console.log("Lỗi từ máy chủ", error);
    }
}

function renderHotels(hotels) {
    const totalPages = Math.ceil(hotels.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHotels = hotels.slice(startIndex, endIndex);
    const html = currentHotels.reduce((result, hotel, index) => {
        const duongDanHinh = hotel.HINHANH;
        return (
            result +
            `
                <tr>
                    <td>${hotel.MA_KS}</td>
                    <td>${hotel.TEN_KS}</td>
                    <td>${hotel.MO_TA}</td>
                    <td class="d-flex justify-content-center"><img width="50" height="50" src="/img/${duongDanHinh}"><img/></td>
                    <td>${hotel.MA_VITRI_VITRI.TENVITRI}</td>
                    <td>
                        <div class="d-flex justify-content-center align-items-center">
                            <button class="btn btn-outline-success mx-2" onclick="selectHotel('${hotel.MA_KS}');">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="deleteHotel('${hotel.MA_KS}')">
                                <i class="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `
            );
    }, "");
    document.getElementById("hotel").innerHTML = html;
    renderPagination(totalPages);
}

let currentPage = 1;
const itemsPerPage = 10; 

function renderPagination(totalPages) {
    let paginationHtml = '';
  
    paginationHtml += `<button class="btn btn-outline-dark mx-1" onclick="prevPage()" ${currentPage === 1 ? 'disabled' : ''}>&laquo;</button>`;
  
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<button class="btn btn-outline-dark mx-1 ${currentPage === i ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    paginationHtml += `<button class="btn btn-outline-dark  mx-1" onclick="nextPage()" ${currentPage === totalPages ? 'disabled' : ''}>&raquo;</button>`;
  
    document.getElementById("pagination").innerHTML = paginationHtml;
}
  
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        getHotel();
    }
}
  
function nextPage() {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
        currentPage++;
        getHotel();
    }
}

function goToPage(page) {
    currentPage = page;
    getHotel(); 
}

async function getSearchHotelByName(searchParam) {
    try {
        if (!searchParam) {
            getHotel(); 
            return;
        }

        const response = await apiSearchHotel(searchParam);
        if (response && Array.isArray(response.data) && response.data.length > 0) {
            hotels = response.data.map((hotel) => new KHACHSAN(
                hotel.MA_KS,
                hotel.TEN_KS,
                hotel.MO_TA,
                hotel.HINHANH,
                hotel.MA_VITRI,
                hotel.MA_VITRI_VITRI
            ));
            renderHotelsByName(hotels, searchParam);
        } else {
            console.log("Không có dữ liệu người dùng trả về từ API");
            document.getElementById("hotel").innerHTML = "<tr><td colspan='6'>No matching hotels found</td></tr>";
        }

    } catch (error) {
        console.log("Lỗi từ máy chủ", error);
    }
}


function renderHotelsByName(hotels, searchParam) {
    const totalPages = Math.ceil(hotels.length / itemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHotels = hotels.slice(startIndex, endIndex);
  
    const html = currentHotels.reduce((result, hotel, index) => {
      const duongDanHinh = hotel.HINHANH;
      if (hotel.TEN_KS.toLowerCase().includes(searchParam.toLowerCase())) {
        return (
            result +
            `
           <tr>
                    <td>${hotel.MA_KS}</td>
                    <td>${hotel.TEN_KS}</td>
                    <td>${hotel.MO_TA}</td>
                    <td class="d-flex justify-content-center"><img width="50" height="50" src="/img/${duongDanHinh}"><img/></td>
                    <td>${hotel.MA_VITRI_VITRI.TENVITRI}</td>
                    <td>
                        <div class="d-flex justify-content-center align-items-center">
                            <button class="btn btn-outline-success mx-2" onclick="selectHotel('${hotel.MA_KS}');">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="deleteHotel('${hotel.MA_KS}')">
                                <i class="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                    </td>
                </tr>
          `
        );
      }
      return result;
    }, "");
  
    document.getElementById("hotel").innerHTML = html;
    renderPagination(totalPages);
}
  

function handleSearch(event) {
    event.preventDefault(); 
    const searchTerm = document.querySelector('.search-bar input[name="search"]').value;
    getSearchHotelByName(searchTerm);
  }

document.querySelector('.search-bar form').addEventListener('submit', handleSearch);

function showSpinner() {
    getElement("#loading-spinner").classList.remove("hidden");
}

function hideSpinner() {
    getElement("#loading-spinner").classList.add("hidden");
}

function logout() {
    showSpinner();
    localStorage.removeItem('localStorageToken');
    setTimeout(function() {
        hideSpinner(); 
        window.location.href = "index.html";
    }, 500);
}

document.getElementById("logoutButton").addEventListener("click", function() {
    logout();
});
