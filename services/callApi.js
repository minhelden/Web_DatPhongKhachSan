const URL = "http://localhost:8080";

async function apiGetCountry() {
    return await axios({
      method: "GET",
      url: `${URL}/api/local/get-country`,
    });
}

async function apiGetProvince(countryID) {
    return await axios({
      method: "GET",
      url: `${URL}/api/local/get-province/${countryID}`,
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

async function apiGetRoomID(roomID) {
  return await axios({
    method: "GET",
    url: `${URL}/api/hotel/get-hotel-id/${roomID}`,
  });
}

async function apiGetRateID(roomID) {
  return await axios({
    method: "GET",
    url: `${URL}/api/rate/get-rate-id/${roomID}`,
  });
}

async function apiGetConvenientID(roomID) {
  return await axios({
    method: "GET",
    url: `${URL}/api/room/get-convenient/${roomID}`,
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

async function apiLoginUser(user) {
  return await axios({
    method: "POST",
    url: `${URL}/api/user/login-user`,
    data: user
  });
}

async function apiGetPriceDiscount(roomID){
  return await axios({
    method: "GET",
    url: `${URL}/api/room/get-price-discount/${roomID}`,
  });
}

async function apiGetRateSummary(roomID){
  return await axios({
    method: "GET",
    url: `${URL}/api/rate/get-avg-rate/${roomID}`,
  });
}

async function apiGetDataRoom(roomID){
  return await axios({
    method: "GET",
    url: `${URL}/api/room/get-data-room/${roomID}`,
  });
}
//api create danh gia
async function apiCreateReview(reviewData) {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken");
    const response = await axios({
      method: "POST",
      url: `${URL}/api/reviews/create-review`,
      data: reviewData,
      headers: {
        token: localStorageToken,
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error("Lỗi khi tạo đánh giá:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
}
// API để lấy tất cả đánh giá
async function apiGetReviews() {
  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/api/reviews/get-review`,
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đánh giá:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
}

// API để lấy một đánh giá theo MA_DG
async function apiSelectReview(maDg) {
  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/api/reviews/get-review/${maDg}`,
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
}
// API để cập nhật một đánh giá
async function apiUpdateReview(maDg, reviewData) {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken");
    const response = await axios({
      method: "PUT",
      url: `${URL}/api/reviews/update-review/${maDg}`,
      data: reviewData,
      headers: {
        token: localStorageToken,
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error("Lỗi khi cập nhật đánh giá:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
}
// API để xóa một đánh giá
async function apiDeleteReview(maDg) {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken");
    const response = await axios({
      method: "DELETE",
      url: `${URL}/api/reviews/delete-review/${maDg}`,
      headers: {
        token: localStorageToken,
      },
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error("Lỗi khi xóa đánh giá:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
}
// Hàm để xóa đánh giá
async function deleteReview(maDg) {
  try {
      // Xác nhận người dùng có thực sự muốn xóa đánh giá không
      const result = await Swal.fire({
          title: 'Bạn có chắc chắn?',
          text: 'Bạn sẽ không thể hoàn tác hành động này!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
          // Gọi API để xóa đánh giá
          await apiDeleteReview(maDg);

          // Xóa đánh giá khỏi giao diện sau khi API thành công
          const reviewElement = document.getElementById(`review-${maDg}`);
          if (reviewElement) {
              reviewElement.remove();
          }

          // Hiển thị thông báo thành công
          Swal.fire({
              title: 'Thành công!',
              text: 'Đánh giá đã được xóa.',
              icon: 'success',
              confirmButtonText: 'OK'
          });
      }
  } catch (error) {
      console.error(error);
      Swal.fire({
          title: 'Lỗi!',
          text: 'Không thể xóa đánh giá. Vui lòng thử lại sau.',
          icon: 'error',
          confirmButtonText: 'OK'
      });
  }
}
async function editReview(maDg) {
  try {
      const review = await apiGetReviewById(maDg);
      const { SO_SAO, BINH_LUAN } = review;

      // Hiển thị modal hoặc form để chỉnh sửa đánh giá
      const { value: formValues } = await Swal.fire({
          title: 'Chỉnh sửa đánh giá',
          html: `
              <label>Chọn số sao:</label>
              <div id="editRatingStars" class="star-rating mb-3">
                  ${[...Array(5)].map((_, i) => i < SO_SAO ? '<i class="fas fa-star" data-rating="' + (i + 1) + '" style="color: #ffc107;"></i>' : '<i class="far fa-star" data-rating="' + (i + 1) + '" style="color: #ffc107;"></i>').join('')}
              </div>
              <textarea id="editReviewText" class="form-control" rows="3" placeholder="Nhập bình luận...">${BINH_LUAN}</textarea>`,
          focusConfirm: false,
          preConfirm: () => {
              const newRating = document.querySelector('#editRatingStars').getAttribute('data-selected');
              const newComment = document.querySelector('#editReviewText').value;
              return { SO_SAO: newRating, BINH_LUAN: newComment };
          }
      });

      if (!formValues) return;

      if (!formValues.SO_SAO || formValues.SO_SAO === "0") {
          Swal.fire({
              title: 'Lỗi',
              text: 'Vui lòng chọn số sao hợp lệ!',
              icon: 'warning',
              confirmButtonText: 'OK'
          });
          return;
      }

      const updatedReview = {
          SO_SAO: formValues.SO_SAO,
          BINH_LUAN: formValues.BINH_LUAN
      };

      // Gọi API cập nhật đánh giá
      await apiUpdateReview(maDg, updatedReview);

      // Cập nhật giao diện
      const reviewElement = document.getElementById(`review-${maDg}`);
      reviewElement.querySelector('.star-rating').innerHTML = 
          [...Array(5)].map((_, i) => i < formValues.SO_SAO ? '<i class="fas fa-star" style="color: #ffc107;"></i>' : '<i class="far fa-star" style="color: #ffc107;"></i>').join('');
      reviewElement.querySelector('.card-text').textContent = formValues.BINH_LUAN;

      Swal.fire({
          title: 'Thành công!',
          text: 'Đánh giá của bạn đã được cập nhật.',
          icon: 'success',
          confirmButtonText: 'OK'
      });

      // Thiết lập lại số sao đã chọn trong modal
      const editStars = document.querySelectorAll('#editRatingStars i');
      let editSelectedRating = SO_SAO;

      editStars.forEach((star, index) => {
          star.addEventListener('click', () => {
              editSelectedRating = index + 1;
              editStars.forEach((s, i) => {
                  s.classList.toggle('fas', i < editSelectedRating); // Thêm class fas cho các sao đã chọn
                  s.classList.toggle('far', i >= editSelectedRating); // Thay đổi class cho các sao chưa chọn
              });
              document.getElementById('editRatingStars').setAttribute('data-selected', editSelectedRating);
          });
      });

  } catch (error) {
      console.error("Lỗi khi cập nhật đánh giá:", error);
      Swal.fire({
          title: 'Lỗi!',
          text: error.response.data || 'Không thể cập nhật đánh giá. Vui lòng thử lại sau.',
          icon: 'error',
          confirmButtonText: 'OK'
      });
  }
}



// API để lấy thông tin đánh giá theo MA_DG
async function apiGetReviewById(maDg) {
  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/api/reviews/get-review/${maDg}`, // Đảm bảo sử dụng URL đúng với route trong backend
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error("Lỗi khi lấy thông tin đánh giá:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
}



// API để lấy đánh giá theo MA_PHONG
async function apiGetReviewsByRoomId(maPhong) {
  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/api/reviews/reviews/room/${maPhong}`,
    });
    return response.data; // Trả về dữ liệu phản hồi từ server
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá theo mã phòng:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
}
