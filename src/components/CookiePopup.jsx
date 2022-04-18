import * as React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TagManager from "react-gtm-module";
import { SearchContext } from "../contexts/SearchContext";

export default function CookieModal() {
  const { userId, cookieEnabled, onChangeCookieEnabled } =
    React.useContext(SearchContext);

  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  console.log(router.query.user, userId);

  React.useEffect(() => {
   
    if (cookieEnabled === undefined) {
      setOpen(true);
    } else if (open) {
      setOpen(false);
    }
  }, [cookieEnabled,  open, setOpen]);

  const handleRejectCookie = () => {
    onChangeCookieEnabled(false);
    setOpen(false);
    TagManager.dataLayer({
      dataLayer: {
        event: "LocalStorageAcceptNo",
      },
    });
  };

  const handleAcceptCookie = () => {
    onChangeCookieEnabled(true);
    setOpen(false);
    TagManager.dataLayer({
      dataLayer: {
        event: "LocalStorageAcceptYes",
      },
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Want to use the Favourite feature?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We use cookies to save vehicles to your favourites area. Is this ok with you?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectCookie} id="reject-cookie-button">
            No thanks
          </Button>
          <Button
            onClick={handleAcceptCookie}
            autoFocus
            variant="contained"
            id="accept-cookie-button"
          >
            {`Yes, that's great`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
