import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

function DeletePostModal({ open, handleClose, handleDeletePost }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Do you want to delete post ?
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              className="flex justify-around"
            >
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  handleDeletePost();
                  handleClose();
                }}
              >
                YES
              </Button>
              <Button variant="outlined" color="success" onClick={handleClose}>
                CANCEL
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DeletePostModal;
