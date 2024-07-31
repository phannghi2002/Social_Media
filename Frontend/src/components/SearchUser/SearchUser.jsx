import { Avatar, Card, CardHeader } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/authAction";
import { createChat } from "../../Redux/Message/messageAction";

function SearchUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSearchUser = (e) => {
    setUsername(e.target.value);

    dispatch(searchUser(username));
  };

  const handleClick = (id) => {
    dispatch(createChat({ userId: id }));
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          type="text"
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search user..."
          onChange={handleSearchUser}
        />

        {username &&
          auth.searchUser.map((item, index) => (
            <Card
              key={index}
              className="mb-4 w-full z-10 top-[4.5rem] cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  console.log("USER name ne m", username);
                }}
                avatar={
                  <Avatar src="data:image/jpeg;base64,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" />
                }
                title={item.firstName + " " + item.lastName}
                subheader={
                  item.firstName.toLowerCase() +
                  " " +
                  item.lastName.toLowerCase()
                }
              />
            </Card>
          ))}
      </div>
    </div>
  );
}

export default SearchUser;
