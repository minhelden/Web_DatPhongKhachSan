document.addEventListener("DOMContentLoaded", function () {
    getCountry();
    getProvince();
});

function getElement(selector) {
    return document.querySelector(selector);
}

async function getCountry() {    
    try {
        const response = await apiGetCountry();
        const country = response.data; 
        const countryObj = country.map((country) => new QUOCGIA(
            country.MA_QUOCGIA,
            country.TEN_QUOCGIA,
            country.HINHANH
        ));
        renderCountry(countryObj);
    } catch (error) {
        console.log("Lỗi từ máy chủ", error);
    }
}

async function getProvince() {    
    try {
        const response = await apiGetProvince();
        const provinces = response.data; 
        const provinceObj = provinces.map((province) => new TINHTHANH(
            province.MA_TINHTHANH,
            province.TEN_TINHTHANH,
            province.MA_QUOCGIA,
            province.HINHANH,
            province.MA_QUOCGIA_QUOCGIum
        ));
        renderProvince(provinceObj);
    } catch (error) {
        console.log("Lỗi từ máy chủ", error);
    }
}

function renderCountry(countrys) {
    const html = countrys.reduce((result, country) => {
        const duongDanHinh = country.HINHANH;
        return (
            result +
            ` 
                <div class="col">
                    <div class="card text-white">
                        <img src="/img/${duongDanHinh}" class="card-img" alt="...">
                        <div class="card-img-overlay">
                            <h5 class="card-title mt-3 fw-bold">${country.TEN_QUOCGIA}</h5>
                            <p class="card-text"><small>16,763 accommodations</small></p>
                        </div>
                    </div>               
                </div>
          `
        );
    }, "");
    document.getElementById("country").innerHTML = html;
}

function renderProvince(provinces) {
    const html = provinces.reduce((result, province) => {
        const duongDanHinh = province.HINHANH;
        return (
            result +
            ` 
                <div class="col">
                    <div class="card text-white">
                      <img src="/img/${duongDanHinh}" class="card-province object-fit-cover" alt="...">
                      <div class="card-img-overlay d-flex justify-content-end align-items-lg-start flex-column">
                        <h6 class="card-title">${province.TEN_TINHTHANH}</h6>
                        <p class="card-text"><small>${province.MA_QUOCGIA_QUOCGIum.TEN_QUOCGIA}</small></p>
                      </div>
                    </div>
                  </div>
          `
        );
    }, "");
    document.getElementById("province").innerHTML = html;
}
