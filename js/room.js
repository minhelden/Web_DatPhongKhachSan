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
            <div class="d-flex justify-content-around mt-5">
                <img src="/img/${duongDanHinh}" width="350" height="300" alt="">
                <div class="ps-3 pt-3 flex-grow-1 details-hotel">
                    <h4>${room.TEN_KS}</h4>
                    <p class="room-location"><i class="fa-solid fa-location-dot me-2"></i>${room.MA_VITRI_VITRI.TENVITRI}, ${room.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.TEN_TINHTHANH}, ${room.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.MA_QUOCGIA_QUOCGIum.TEN_QUOCGIA}</p>
                </div>
                <div class="text-end flex-grow-1 pe-3 details-rate">
                    <div>
                        <div class="d-flex justify-content-end align-items-center mt-4">
                            <div class="room-rate">
                                <p class="mb-0">${ratingLabel}</p>
                                <span class="room-comment">${totalReviews} nhận xét</span>
                            </div>
                            <div class="d">
                                <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c" style="transform: none;">
                                    <path d="M1.199 3.053H21.99a1.5 1.5 0 0 1 1.5 1.5v14.983a1.5 1.5 0 0 1-1.5 1.5H4.53a1.5 1.5 0 0 1-1.5-1.5V8.333a.5.5 0 0 0-.1-.3L.399 4.653a1 1 0 0 1 .8-1.6zm0 1l2.53 3.381c.195.26.3.575.3.9v11.202a.5.5 0 0 0 .5.5H21.99a.5.5 0 0 0 .5-.5V4.553a.5.5 0 0 0-.5-.5H1.2z"></path>
                                </svg>
                                <div class="a">
                                    <span class="b">${averageRating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>Tiết kiệm nhiều hơn và tận hưởng</h6>
                        ${giaDaGiam !== null ? `<p class="price-original">${formattedGiaGoc}</p>` : `<h4 class="price-discount">${formattedGiaGoc}</h4>`}
                        ${giaDaGiam !== null ? `<h4 class="price-discount">${formattedGiaDaGiam}</h4>` : ''}
                        <a href="/layouts/detailRoom.html?roomID=${room.MA_KS}" class="btn btn-outline-primary mb-3" data-new-id="${room.MA_KS}">Chọn phòng</a>
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
            <div class="d-flex justify-content-around mt-5">
                <img src="/img/${duongDanHinh}" width="350" height="300" alt="">
                <div class="ps-3 pt-3 flex-grow-1 details-hotel">
                    <h4>${country.TEN_KS}</h4>
                    <p class="room-location"><i class="fa-solid fa-location-dot me-2"></i>${country.MA_VITRI_VITRI.TENVITRI}, ${country.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.TEN_TINHTHANH}, ${country.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.MA_QUOCGIA_QUOCGIum.TEN_QUOCGIA}</p>
                </div>
                <div class="text-end flex-grow-1 pe-3 details-rate">
                    <div>
                        <div class="d-flex justify-content-end align-items-center mt-4">
                            <div class="room-rate">
                                <p class="mb-0">${ratingLabel}</p>
                                <span class="room-comment">${totalReviews} nhận xét</span>
                            </div>
                            <div class="d">
                                <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c" style="transform: none;">
                                    <path d="M1.199 3.053H21.99a1.5 1.5 0 0 1 1.5 1.5v14.983a1.5 1.5 0 0 1-1.5 1.5H4.53a1.5 1.5 0 0 1-1.5-1.5V8.333a.5.5 0 0 0-.1-.3L.399 4.653a1 1 0 0 1 .8-1.6zm0 1l2.53 3.381c.195.26.3.575.3.9v11.202a.5.5 0 0 0 .5.5H21.99a.5.5 0 0 0 .5-.5V4.553a.5.5 0 0 0-.5-.5H1.2z"></path>
                                </svg>
                                <div class="a">
                                    <span class="b">${averageRating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>Tiết kiệm nhiều hơn và tận hưởng</h6>
                        ${giaDaGiam !== null ? `<p class="price-original">${formattedGiaGoc}</p>` : `<h4 class="price-discount">${formattedGiaGoc}</h4>`}
                        ${giaDaGiam !== null ? `<h4 class="price-discount">${formattedGiaDaGiam}</h4>` : ''}
                        <a href="/layouts/detailRoom.html?roomID=${country.MA_KS}" class="btn btn-outline-primary mb-3" data-new-id="${country.MA_KS}">Chọn phòng</a>
                    </div>
                </div>
            </div>
        `;
    }));
    document.getElementById("room").innerHTML = html.join('');
}