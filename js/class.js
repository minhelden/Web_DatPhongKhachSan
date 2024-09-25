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
    constructor(MA_KS, TEN_KS, MO_TA, HINHANH, MA_VITRI, MA_VITRI_VITRI){
        this.MA_KS = MA_KS;
        this.TEN_KS = TEN_KS;
        this.MO_TA = MO_TA;
        this.HINHANH = HINHANH;
        this.MA_VITRI = MA_VITRI;
        this.MA_VITRI_VITRI = MA_VITRI_VITRI;
    }
}