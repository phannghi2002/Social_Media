import { Avatar } from "@mui/material";

function StoryCircle({ item }) {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer ">
        <Avatar
          sx={{ width: "2.5rem", height: "2.5rem" }}
          src="https://th.bing.com/th/id/OIP.6Zu4MaXfS1aM1EdA31OweQAAAA?rs=1&pid=ImgDetMain"
        ></Avatar>
        <p>
          {" "}
          {item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}
        </p>
      </div>
    </div>
  );
}

export default StoryCircle;
