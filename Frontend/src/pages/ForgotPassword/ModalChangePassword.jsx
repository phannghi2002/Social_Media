import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ModalChangePassword({ open, handleClose }) {
  const { email } = useSelector((store) => store.forgotPassword);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState("");
  const handleSumbit = () => {
    if (value.password !== value.repeatPassword) {
      setError("Passwords do not match");
    } else {
      setError("");

      axios
        .post(`${API_BASE_URL}/forgotPassword/changePassword/${email}`, value)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Update password success");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data);
            setError(error.response.data); // Display the error message
            toast.error(error.response.data);
          }
        });

      handleClose();
      navigate("/login");
    }
  };
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: ".6rem",
          outline: "none",
        }}
      >
        <span className="flex justify-end -mt-6 -mr-6 mb-4">
          {" "}
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </Button>
        </span>
        <input
          type="password"
          placeholder="Type password"
          className="w-full p-2 rounded border-none outline-none text-black mb-4"
          value={value.password}
          onChange={(e) => {
            setValue({ ...value, password: e.target.value });
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Type password repeat"
          className="w-full p-2 rounded border-none outline-none text-black mb-4"
          value={value.repeatPassword}
          onChange={(e) => {
            setValue({ ...value, repeatPassword: e.target.value });
            setError("");
          }}
        />
        {error && <div className="text-red-700 mb-3">{error}</div>}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleSumbit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalChangePassword;
