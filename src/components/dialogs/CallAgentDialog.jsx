import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";

export default function CallAgentDialog({ open, onClose, phonNumber }) {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Call Agent</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Number: {phonNumber}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {matches && (
          <Button variant="contained">
            <a
              href={`tel:${phonNumber}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Call
            </a>
          </Button>
        )}
        <Button onClick={onClose} autoFocus variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
