class QUOCGIA{
    constructor(MA_QUOCGIA, TEN_QUOCGIA, HINHANH){
        this.MA_QUOCGIA = MA_QUOCGIA;
        this.TEN_QUOCGIA = TEN_QUOCGIA;
        this.HINHANH = HINHANH;
    }
}

class TINHTHANH{
    constructor(MA_TINHTHANH, TEN_TINHTHANH, MA_QUOCGIA, HINHANH, MA_QUOCGIA_QUOCGIum){
        this.MA_TINHTHANH = MA_TINHTHANH;
        this.TEN_TINHTHANH = TEN_TINHTHANH;
        this.MA_QUOCGIA = MA_QUOCGIA;
        this.HINHANH = HINHANH;
        this.MA_QUOCGIA_QUOCGIum = MA_QUOCGIA_QUOCGIum;
    }
}

class KHACHSAN{
    constructor(MA_KS, TEN_KS, MO_TA, HINHANH, MA_VITRI, MA_VITRI_VITRI, MA_TINHTHANH_TINHTHANH, MA_QUOCGIA_QUOCGIum){
        this.MA_KS = MA_KS;
        this.TEN_KS = TEN_KS;
        this.MO_TA = MO_TA;
        this.HINHANH = HINHANH;
        this.MA_VITRI = MA_VITRI;
        this.MA_VITRI_VITRI = MA_VITRI_VITRI;
        this.MA_TINHTHANH_TINHTHANH = MA_TINHTHANH_TINHTHANH;
        this.MA_QUOCGIA_QUOCGIum = MA_QUOCGIA_QUOCGIum;
    }
}

class NGUOIDUNG{
    constructor(MA_ND, HOTEN, EMAIL, MATKHAU, SDT, NGAYSINH, GIOITINH, CHUCVU, NGAYDANGKY, ANHDAIDIEN){
        this.MA_ND = MA_ND;
        this.HOTEN = HOTEN;
        this.EMAIL = EMAIL;
        this.MATKHAU = MATKHAU;
        this.SDT = SDT;
        this.NGAYSINH = NGAYSINH;
        this.GIOITINH = GIOITINH;
        this.CHUCVU = CHUCVU;
        this.NGAYDANGKY = NGAYDANGKY;
        this.ANHDAIDIEN = ANHDAIDIEN;
    }
}

class MAGIAMGIA{
    constructor(MA_MGG, MA_GIAMGIA, PHANTRAM, NGAYBATDAU, NGAYKETTHUC, DIEU_KIEN){
        this.MA_MGG = MA_MGG;
        this.MA_GIAMGIA = MA_GIAMGIA;
        this.PHANTRAM = PHANTRAM;
        this.NGAYBATDAU = NGAYBATDAU;
        this.NGAYKETTHUC = NGAYKETTHUC;
        this.DIEU_KIEN = DIEU_KIEN;
    }
}

class DANHGIA{
    constructor(MA_DG, MA_KS, MA_ND, SO_SAO, BINH_LUAN, NGAY_DG, MA_ND_NGUOIDUNG){
        this.MA_DG = MA_DG;
        this.MA_KS = MA_KS;
        this.MA_ND = MA_ND;
        this.SO_SAO = SO_SAO;
        this.BINH_LUAN = BINH_LUAN;
        this.NGAY_DG = NGAY_DG;
        this.MA_ND_NGUOIDUNG = MA_ND_NGUOIDUNG
    }
}

class KHACHSAN_TIENNGHI{
    constructor(MA_TIENNGHI, MA_KS){
        this.MA_TIENNGHI = MA_TIENNGHI;
        this.MA_KS = MA_KS;
    }
}

class PHONG{
    constructor(MA_PHONG, TENPHONG, MOTA, GIA_TIEN, HINHANH, TRANGTHAIPHG, MA_KS, MALOAIPHG, MA_KM){
        this.MA_PHONG = MA_PHONG;
        this.TENPHONG = TENPHONG;
        this.MOTA = MOTA;
        this.GIA_TIEN = GIA_TIEN;
        this.HINHANH = HINHANH;
        this.TRANGTHAIPHG = TRANGTHAIPHG;
        this.MA_KS = MA_KS;
        this.MALOAIPHG = MALOAIPHG;
        this.MA_KM = MA_KM;
    }
}