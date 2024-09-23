import { Button } from "@mui/material";
import ModalPassword from "../ForgotPassword/ModalPassword";
import { useDispatch } from "react-redux";
import { sendEmailAction } from "../../Redux/ForgotPassword/forgotPasswordAction";
import { useState } from "react";

export default function ForgotPassword() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleClickSendEmail = async () => {
    // Basic email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is blank
    if (!email) {
      setError("Email cannot be blank");
      return; // Prevent further execution
    }

    // Check if email format is invalid
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return; // Prevent further execution
    }

    // Reset error before making the request
    setError("");

    const result = await dispatch(sendEmailAction(email));

    if (result === "Email send for verification") {
      handleOpenModal(); // Show the modal on success
    } else {
      setError(result?.response?.data?.message);
    }
  };

  const handleClose = () => setOpenModal(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <input
        type="email"
        className="h-12 w-full rounded-lg mb-2 text-black outline-none pl-2"
        placeholder="Enter email to authentication"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
      />

      {error && <div className="text-red-600">{error}</div>}
      <Button
        sx={{ padding: "0.8rem 0rem" }}
        fullWidth
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleClickSendEmail}
      >
        Send OTP to gmail
      </Button>

      <div>
        <ModalPassword handleClose={handleClose} open={openModal} />
      </div>
    </div>
  );
}
