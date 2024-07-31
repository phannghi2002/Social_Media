import { Card, Grid } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

function Authentication() {
  return (
    <div>
      <Grid container>
        <Grid item xs={7} className="h-screen overflow-hidden">
          <img
            className="h-full w-full"
            src="https://static.vecteezy.com/system/resources/previews/001/261/012/original/connecting-people-avatars-vector.jpg"
            alt="Connect people"
          />
        </Grid>
        <Grid item xs={5} className="h-screen overflow-hidden">
          <div className="px-20 flex flex-col justify-center h-full">
            <Card className="p-8">
              <div className="flex flex-col items-center mb-5 space-y-5">
                <h1 className="logo text-center">Social Media</h1>
                <p className="text-center text-sm w-[70%]">
                  Connecting Lives, Sharing Stories: Your Social World, Your Way
                </p>
              </div>

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Authentication;
