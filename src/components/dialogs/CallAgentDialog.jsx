import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function CallAgentDialog({ open, onClose, phonNumber }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"

    >
      {/* <DialogTitle id="alert-dialog-title">Call Agent</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Number: {phonNumber}
        </DialogContentText>
      </DialogContent> */}
      {/* <DialogActions>
        <Button onClick={onClose} autoFocus>
          OK
        </Button>
      </DialogActions> */}
    </Dialog>
  )

}