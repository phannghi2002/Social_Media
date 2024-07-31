import { useSelector } from "react-redux";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

function HomeRight() {
  const { auth } = useSelector((store) => store);

  return (
    <div className="pr-5">
      <SearchUser />

      <Card>
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70 pl-2">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95 pr-2">View All</p>
        </div>

        <div className="">
          {auth &&
            auth.allUser &&
            auth.allUser.map((item, key) => (
              <div key={key}>
                {" "}
                <PopularUserCard item={item} />
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}

export default HomeRight;
