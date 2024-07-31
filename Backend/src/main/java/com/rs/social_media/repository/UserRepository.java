package com.rs.social_media.repository;

import com.rs.social_media.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface UserRepository  extends JpaRepository<User, Integer> {
    //jpa tự động tạo phương thức dựa trên tên của phương thức, nếu muốn tìm kếm
    //dựa trên một thuộc tính nào đó thì ta bắt đầu bằng findBy sau đó là tên thuộc tính
    // được viết theo camel case (viết hoa chữ cái đầu) và nó phai trùng khớp với
    // trường của thực thể hoặc là phương thức getter. Vd tìm theo firstName thì
    // đặt tên là findByFirstName với trường firstName. Thực chất jpa tự hiểu là
    //ta thêm annitation Query với cu pháp là: SELECT u FROM User u WHERE u.email = :email
    public User findByEmail(String email);

    @Query("select u from User u where u.firstName LIKE %:query9% OR u.lastName LIKE %:query9% OR u.email LIKE %:query9%")
    public List<User> searchUser(@Param("query9") String query);
}
