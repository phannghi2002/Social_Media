package com.rs.social_media.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;

    @ElementCollection// khi trong nay la ta muon tao mot bang rieng chua nhieu nguoi thi dung den no, no khong
    //phai la entity, dung de tap hop cac loai don gian nhu chuoi... hoac tap hop cac phan tu co the nhung (@Embeddable),
    // khi muon la entity thi ta phai dung OneToMany or ManyToMany
    private List<Integer> followers = new ArrayList<>();
    @ElementCollection
    //ElementCollection duoc dund de dinh nghia tap hop nhieu cai giong nhau, thuong la 1 filed, VD nhu 1 nguoi
    // co the dinh nghia boi nhieu sdt hoac nhieu email, con ta dung Embeddable dung de thay the cho Entity khi
    //khong muon no la thuc the va no co nhieu truong hon ElementCollection nhu address chang han: no con chua
    // so nha. ten duong ,...
    //@Embeddable
    //public class Address {
    //    private String street;
    //    private String city;
    //    private String zipCode;
    //}
    //
    //@Entity
    //public class User {
    //    @Id
    //    @GeneratedValue(strategy = GenerationType.AUTO)
    //    private Long id;
    //
    //    @Embedded
    //    private Address address;
    //}

    private List<Integer> followings = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<Post> savePost = new ArrayList<>();

    @OneToOne(mappedBy = "user") //
    //mappedBy = user nghia la user la chu so huu, va user ung voi ten cua thuc the chu khong phai la ten bang (users)
    // mappedBy khai bao ben trong chu so huu, JoinColumn khai bao ben con lai
    //neu dung JoinColumn thi ta co @JoinColumn(name = "user_id") sau name la khoa ngoai

    // chu y: khi ta dung cac moi quan he nay co nghia la ta dang lien ket no voi
    //mot thuc the, khi ta xoa nguoi dung ma trong truong hop ForgotPassword nay chua du lieu lien quan den
    //User thi no se gap loi: a foreign key constraint fails, de xoa duoc nguoi dung ma khong gap loi thi ta
    //co 2 cach: cach thu nhat la them add: CascadeType.REMOVE trong annotation tren:
    // @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    //cach thu hai la xoa ban ghi trong ForgotPassword sau do la xoa ban ghi cua User
    //ForgotPassword forgotPassword = user.getForgotPassword();
    //if (forgotPassword != null) {
    //    forgotPasswordRepository.delete(forgotPassword);
    //}
    //userRepository.deleteById(id);
    private ForgotPassword forgotPassword;

}
