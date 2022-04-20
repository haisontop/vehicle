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
  const { userId, cookieEnabled, onChangeCookieEnabled, onChangeUserId } =
    React.useContext(SearchContext);

  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (cookieEnabled === "undefined" || cookieEnabled === undefined) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [cookieEnabled]);

  const handleRejectCookie = () => {
    onChangeCookieEnabled("false");
    setOpen(false);
    TagManager.dataLayer({
      dataLayer: {
        event: "LocalStorageAcceptNo",
      },
    });
  };

  const handleAcceptCookie = React.useCallback(() => {
    if (!userId || router.query.user) {
      onChangeUserId(router.query.user);
    }

    TagManager.dataLayer({
      dataLayer: {
        event: "LocalStorageAcceptYes",
      },
    });

    setOpen(true);

    setTimeout(() => {
      onChangeCookieEnabled("true");
    }, 1000);
  }, [
    onChangeCookieEnabled,
    setOpen,
    onChangeUserId,
    router.query.user,
    userId,
  ]);

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
            We use cookies to save vehicles to your favourites area. Is this ok
            with you?
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
