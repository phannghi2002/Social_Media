import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
// import { useState } from "react";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../Redux/Auth/authAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
};

const CustomField = ({ name, setError, ...props }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    setError("");
    setFieldValue(name, e.target.value);
  };

  return <Field name={name} {...props} onChange={handleChange} />;
};
// const validationSchema = {
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is Required"),
//   gender: Yup.string()
//     .oneOf(["male", "female"], "Gender is required")
//     .required("Gender is required"),
// };

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Gender is required")
    .required("Gender is required"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleSubmit = async (values) => {
    console.log("handle submit", values);
    let error = await dispatch(registerUserAction({ data: values }));
    if (error) {
      setError(error.response.data.message);
    } else {
      setError("");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            <div className="space-y-5">
              <div>
                <CustomField
                  name="firstName"
                  placeholder="First Name"
                  as={TextField}
                  type="text"
                  variant="outlined"
                  fullWidth
                  setError={setError}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <CustomField
                  name="lastName"
                  placeholder="Last Name"
                  as={TextField}
                  type="text"
                  variant="outlined"
                  fullWidth
                  setError={setError}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500"
                />
              </div>
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
              <div>
                <RadioGroup
                  onChange={(e) => {
                    setFieldValue("gender", e.target.value);
                    setError(""); // Clear the error message
                  }}
                  aria-label="gender"
                  name="gender"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}{" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex gap-2 items-center justify-center pt-5">
        <p>if you have already account?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  );
}

export default Register;
