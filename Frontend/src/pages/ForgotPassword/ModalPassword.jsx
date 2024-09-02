/* eslint-disable react/prop-types */
import { Box, Button, Modal } from "@mui/material";

import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailAction } from "../../Redux/ForgotPassword/forgotPasswordAction";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import ModalChangePassword from "./ModalChangePassword";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: ".6rem",
  outline: "none",
};

function OTP({ separator, length, value, onChange }) {
  const inputRefs = useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};
function ModalPassword({ open, handleClose }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const [timeLeft, setTimeLeft] = useState(3 * 60);
  const [isTimeout, setIsTimeout] = useState(false);

  const dispatch = useDispatch();
  const { email } = useSelector((store) => store.forgotPassword);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsTimeout(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (open) {
      setTimeLeft(3 * 60); // Set the initial timeLeft when modal opens
      setIsTimeout(false); // Reset timeout status
    }
  }, [open]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (otp.length === 6) {
      checkOtpValidity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const checkOtpValidity = () => {
    axios
      .post(`${API_BASE_URL}/forgotPassword/verifyOTP/${otp}/${email}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          handleOpenChangePasswordModal(); // Show the "Change Password" modal
          handleClose();
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          setError(error.response.data); // Display the error message
        } else {
          console.error("Error verifying OTP:", error);
        }
      });
  };

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mb-4 flex justify-between">
            <div className="text-2xl">Time: {formatTime(timeLeft)}</div>

            <span className="flex justify-end -mt-6 -mr-6 mb-4">
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={() => {
                  handleClose();
                  setOtp("");
                }}
              >
                <CloseIcon />
              </Button>
            </span>
          </div>

          <div className="text-xl mb-3">OTP sent to email: {email}</div>
          <OTP
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={6}
          />

          {error && <div className="text-red-600">{error}</div>}

          {isTimeout && (
            <div className="mt-4">
              OTP has expired.
              <span
                className="text-blue-500 underline ml-2 cursor-pointer"
                onClick={() => {
                  setTimeLeft(3 * 60);
                  setIsTimeout(false);
                  dispatch(sendEmailAction(email));
                  setError("");
                  setOtp("");
                }}
              >
                Send to OTP again ?
              </span>
            </div>
          )}
        </Box>
      </Modal>

      <ModalChangePassword
        open={openChangePasswordModal}
        handleClose={() => setOpenChangePasswordModal(false)}
      />
    </div>
  );
}

export default ModalPassword;

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
    width: 40px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 0px;
    border-radius: 8px;
    text-align: center;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
