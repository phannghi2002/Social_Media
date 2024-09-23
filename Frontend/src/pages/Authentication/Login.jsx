import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../Redux/Auth/authAction";
import { Link, useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
};

//Tuy chinh  lai cai field cua formik
const CustomField = ({ name, setError, ...props }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    setError("");
    setFieldValue(name, e.target.value);
  };

  return <Field name={name} {...props} onChange={handleChange} />;
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    console.log("handle submit", values);
    const error = await dispatch(loginUserAction({ data: values }));
    if (error) {
      console.error("Login Error:", error.response.data.message);
      setError(error.response.data.message || "Login failed"); // Set the error message
    } else {
      setError(""); // Clear the error if the login is successful

      navigate("/");
      window.location.reload();
    }
  };

  //neu khong dung bat dong bo thi no se sai vi khi dispatch no la ham bat dong bo nen phai cho tra ve ket qua, luc nay no se thuc hien
  //cau lenh if voi error la gia tri promise

  // const handleSubmit = (values) => {
  //   console.log("handle submit", values);
  //   const error = dispatch(loginUserAction({ data: values }));
  //   if (error) {
  //     console.error("Login Error:", error);

  //     // setError(error || "Login failed"); // Set the error message
  //     setError(error.response?.data?.message || "Login failed");
  //   } else {
  //     setError("ko chay duoc"); // Clear the error if the login is successful
  //   }
  // };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <CustomField
                name="email"
                placeholder="Email"
                as={TextField}
                type="email"
                variant="outlined"
                fullWidth
                setError={setError}
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <CustomField
                name="password"
                placeholder="Password"
                as={TextField}
                type="password"
                variant="outlined"
                fullWidth
                setError={setError}
              />

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}{" "}
          {/* Display the error message */}
          <Button
            sx={{ padding: "0.8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>

      <Link
        to="/forgot-password"
        className="underline flex justify-center mt-2 text-blue-500"
      >
        Forgot Password ?
      </Link>
      <div className="flex gap-2 items-center justify-center pt-5">
        <p>If you don't have account?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  );
}

export default Login;
