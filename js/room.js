document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const localID = urlParams.get('localID');
    const countryID = urlParams.get('countryID');
    if (localID) {
        getRoomLocal(localID);
    }
    if (countryID){
        getRoomCountry(countryID);
    }
})

function getElement(selector) {
    return document.querySelector(selector);
}

const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");
            if(checked && checked.length > 0){
                btnText.innerHTML = `${checked.length} Đã chọn`;
            } else{
                btnText.innerHTML = "Chọn phòng";
            }
    })
})

async function getRoomLocal(localID){
    try {
        const response = await apiGetRoomLocal(localID);
        const rooms = response.data;
        const roomObj = rooms.map((room) => new KHACHSAN(
            room.MA_KS,
            room.TEN_KS,
            room.MO_TA,
            room.HINHANH,
            room.MA_VITRI,
            room.MA_VITRI_VITRI,
            room.MA_QUOCGIA_QUOCGIum
        ))
        renderRoomLocal(roomObj);
    } catch (error) {
        console.log("Lỗi từ máy chủ", error);
    }
}

async function getRoomCountry(countryID){
    try {
        const response = await apiGetRoomCountry(countryID);
        const rooms = response.data;
        const roomObj = rooms.map((room) => new KHACHSAN(
            room.MA_KS,
            room.TEN_KS,
            room.MO_TA,
            room.HINHANH,
            room.MA_VITRI,
            room.MA_VITRI_VITRI,
            room.MA_QUOCGIA_QUOCGIum
        ))
        renderRoomCountry(roomObj);
    } catch (error) {
        console.log("Lỗi từ máy chủ", error);
    }
}

async function getPrice(roomID) {
    try {
        const response = await apiGetPriceDiscount(roomID);
        return {
            giaGoc: Math.round(response.data.giaGoc),
            giaDaGiam: response.data.giaDaGiam !== null ? Math.round(response.data.giaDaGiam) : null // Round the discounted price if it exists
        };
    } catch (error) {
        console.error("Lỗi lấy giá phòng:", error);
        return {
            giaGoc: "Giá không khả dụng",
            giaDaGiam: "Giá không khả dụng"
        };
    }
}

async function getRateSummary(roomID) {
    try {
        const response = await apiGetRateSummary(roomID);
             
        const { totalReviews, averageRating, ratingLabel } = response.data; 

        return { totalReviews, averageRating, ratingLabel };
    } catch (error) {
        console.error("Error fetching rate summary:", error);
        throw error; // Rethrow or handle the error as needed
    }
}


async function renderRoomLocal(rooms) {
    const html = await Promise.all(rooms.map(async (room) => {
        const { giaGoc, giaDaGiam } = await getPrice(room.MA_KS);
        const { totalReviews, averageRating, ratingLabel } = await getRateSummary(room.MA_KS);
        const duongDanHinh = room.HINHANH;

        // Format the prices
        const formattedGiaGoc = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaGoc);
        const formattedGiaDaGiam = giaDaGiam !== null ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaDaGiam) : null;

        return `
            <div class="col-md-12 mb-4">
                <div class="card hotel-card">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img class="rounded-start" src="/img/${duongDanHinh}" alt="Cozy Hotel Room">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${room.TEN_KS}</h5>
                                <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${room.MA_VITRI_VITRI.TENVITRI}, ${room.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.TEN_TINHTHANH}, ${room.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.MA_QUOCGIA_QUOCGIum.TEN_QUOCGIA}</p>
                                <p class="card-text">
                                    <span class="badge bg-success">${averageRating} <i class="fas fa-star"></i></span>
                                    <small class="text-muted">(${totalReviews} nhận xét)</small>
                                </p>
                                <p class="card-text"><strong>${ratingLabel}</strong></p>
                                <p class="card-text"><small class="text-muted">Tiết kiệm nhiều hơn và tận hưởng</small></p>
                                <p class="card-text price-info">
                                    ${giaDaGiam !== null ? `<span class="original-price">${formattedGiaGoc}</span>` : `<span class="discounted-price">${formattedGiaGoc}</span>`}
                                    ${giaDaGiam !== null ? `<span class="discounted-price">${formattedGiaDaGiam}</span>` : ''}                              
                               
                                </p>
                                <a href="/layouts/detailRoom.html?roomID=${room.MA_KS}" class="btn mb-3 select-room-btn" data-new-id="${room.MA_KS}">Chọn phòng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }));
    document.getElementById("room").innerHTML = html.join('');
}






async function renderRoomCountry(countries) {
    const html = await Promise.all(countries.map(async (country) => {
        const { giaGoc, giaDaGiam } = await getPrice(country.MA_KS);
        const { totalReviews, averageRating, ratingLabel } = await getRateSummary(country.MA_KS);
        const duongDanHinh = country.HINHANH;

        // Format the prices
        const formattedGiaGoc = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaGoc);
        const formattedGiaDaGiam = giaDaGiam !== null ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaDaGiam) : null;

        return `
            <div class="col-md-12 mb-4">
                <div class="card hotel-card">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img class="rounded-start" src="/img/${duongDanHinh}" alt="Cozy Hotel Room">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${country.TEN_KS}</h5>
                                <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${country.MA_VITRI_VITRI.TENVITRI}, ${country.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.TEN_TINHTHANH}, ${country.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.MA_QUOCGIA_QUOCGIum.TEN_QUOCGIA}</p>
                                <p class="card-text">
                                    <span class="badge bg-success">${averageRating} <i class="fas fa-star"></i></span>
                                    <small class="text-muted">(${totalReviews} nhận xét)</small>
                                </p>
                                <p class="card-text"><strong>${ratingLabel}</strong></p>
                                <p class="card-text"><small class="text-muted">Tiết kiệm nhiều hơn và tận hưởng</small></p>
                                <p class="card-text price-info">
                                    ${giaDaGiam !== null ? `<span class="original-price">${formattedGiaGoc}</span>` : `<span class="discounted-price">${formattedGiaGoc}</span>`}
                                    ${giaDaGiam !== null ? `<span class="discounted-price">${formattedGiaDaGiam}</span>` : ''}                              
                               
                                </p>
                                <a href="/layouts/detailRoom.html?roomID=${country.MA_KS}" class="btn mb-3 select-room-btn" data-new-id="${country.MA_KS}">Chọn phòng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }));
    document.getElementById("room").innerHTML = html.join('');
}