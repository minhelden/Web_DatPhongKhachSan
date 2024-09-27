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
                btnText.innerHTML = `${checked.length} Selected`;
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
            room.MA_VITRI_VITRI
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
            room.MA_VITRI_VITRI
        ))
        renderRoomCountry(roomObj);
    } catch (error) {
        console.log("Lỗi từ máy chủ", error);
    }
}

function renderRoomLocal(rooms){
    const html = rooms.reduce((result, room) =>{
        const duongDanHinh = room.HINHANH;
        return (
            result +
            `
                <div class="d-flex justify-content-around mt-5">
                        <img src="/img/${duongDanHinh}" width="350" height="300" alt="">
                        <div class="ps-3 pt-3 flex-grow-1 details-hotel">
                            <h4>${room.TEN_KS}</h4>
                            <p class="room-location"><i class="fa-solid fa-location-dot me-2"></i>${room.MA_VITRI_VITRI.TENVITRI}, ${room.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.TEN_TINHTHANH}</p>
                        </div>
                        <div class="text-end flex-grow-1 pe-3 details-rate">
                            <div>
                                <div class="d-flex justify-content-end align-items-center mt-4">
                                    <div class="room-rate">
                                        <p class="mb-0">Tuyệt vời</p>
                                        <span class="room-comment">100 nhận xét</span>
                                    </div>
                                    <div class="d">
                                        <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c" style="transform: none;"><path d="M1.199 3.053H21.99a1.5 1.5 0 0 1 1.5 1.5v14.983a1.5 1.5 0 0 1-1.5 1.5H4.53a1.5 1.5 0 0 1-1.5-1.5V8.333a.5.5 0 0 0-.1-.3L.399 4.653a1 1 0 0 1 .8-1.6zm0 1l2.53 3.381c.195.26.3.575.3.9v11.202a.5.5 0 0 0 .5.5H21.99a.5.5 0 0 0 .5-.5V4.553a.5.5 0 0 0-.5-.5H1.2z"></path></svg>
                                        <div class="a">
                                            <span class="b">8.6</span>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                            <div>
                                <h6>Tiết kiệm nhiều hơn và tận hưởng</h6>
                                <p class="price-original">2.698.413 VND</p>
                                <h4 class="price-discount">998.413 VND</h4>
                                <button type="button" class="btn btn-outline-primary mb-3">Chọn phòng</button>
                            </div>
                        </div>
                    </div>
            `
        );
    }, "");
    document.getElementById("room").innerHTML = html;
}

function renderRoomCountry(countries){
    const html = countries.reduce((result, country) =>{
        const duongDanHinh = country.HINHANH;
        return (
            result +
            `
                    <div class="d-flex justify-content-around mt-5">
                        <img src="/img/${duongDanHinh}" width="350" height="300" alt="">
                        <div class="ps-3 pt-3 flex-grow-1 details-hotel">
                            <h4>${country.TEN_KS}</h4>
                            <p class="room-location"><i class="fa-solid fa-location-dot me-2"></i>${country.MA_VITRI_VITRI.TENVITRI}, ${country.MA_VITRI_VITRI.MA_TINHTHANH_TINHTHANH.TEN_TINHTHANH}</p>
                        </div>
                        <div class="text-end flex-grow-1 pe-3 details-rate">
                            <div>
                                <div class="d-flex justify-content-end align-items-center mt-4">
                                    <div class="room-rate">
                                        <p class="mb-0">Tuyệt vời</p>
                                        <span class="room-comment">100 nhận xét</span>
                                    </div>
                                    <div class="d">
                                        <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c" style="transform: none;"><path d="M1.199 3.053H21.99a1.5 1.5 0 0 1 1.5 1.5v14.983a1.5 1.5 0 0 1-1.5 1.5H4.53a1.5 1.5 0 0 1-1.5-1.5V8.333a.5.5 0 0 0-.1-.3L.399 4.653a1 1 0 0 1 .8-1.6zm0 1l2.53 3.381c.195.26.3.575.3.9v11.202a.5.5 0 0 0 .5.5H21.99a.5.5 0 0 0 .5-.5V4.553a.5.5 0 0 0-.5-.5H1.2z"></path></svg>
                                        <div class="a">
                                            <span class="b">8.6</span>
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                            <div>
                                <h6>Tiết kiệm nhiều hơn và tận hưởng</h6>
                                <p class="price-original">2.698.413 VND</p>
                                <h4 class="price-discount">998.413 VND</h4>
                                <button type="button" class="btn btn-outline-primary mb-3">Chọn phòng</button>
                            </div>
                        </div>
                    </div>
            `
        );
    }, "");
    document.getElementById("room").innerHTML = html;
}