const cloud_name = "dk1pqlooz";
const upload_presets = "social_media";

export const uploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {
    //FormData la giao dien cua JS xay dung cac cap khoa gia tri dai dien cho
    // cac truong bieu mau, sau do co the gui de dang gia tri bang cac phuong
    //thuc fetch, XMLHttpRequest.send() hoac navigator.sendBeacon()
    const data = new FormData();

    data.append("file", pics);
    data.append("upload_preset", upload_presets);
    data.append("cloud_name", cloud_name);
    console.log(cloud_name, fileType, pics);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      { method: "post", body: data }
    );
    console.log("res", res);

    //method json() is action asynchronous
    const fileData = await res.json();
    console.log("res", fileData.url);
    return fileData.url;
  } else {
    console.log("error........");
  }
};
