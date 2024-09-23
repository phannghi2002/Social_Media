package com.rs.social_media.utils;

//record tu dong them cac phuong thuc nhu getter,equals(), hashCode(), and toString() and contructor() va
// muon lay gia tri ra su dung thi ta khong dung getter nhu thong thuong ma ta dung cp.password();
// voi cp la instance ta khoi tao tu class ChangePassword. Ngoai ra truong password and repeatPassword
// automatically la private va final (nghia la khong thay doi trong qua trinh object duoc khoi tao)
public record ChangePassword(String password, String repeatPassword) {

}
