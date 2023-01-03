import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography
} from "@material-ui/core";

const StartDialog = () => {
  const dialogHasBeenSeen = localStorage.getItem("dialogHasBeenSeen1") === "true" || false;
  const [open, setOpen] = useState(!dialogHasBeenSeen);
  return (
    <Dialog
      open={open}
      disableBackdropClick
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Spoiler Alert & Disclaimer
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <Typography variant="h3" color="error">This app is outdated, find the new version <a href="https://mdworld.nl/cytocom/?gedcomPath=%2Fcytocom%2F7sisters.ged&layout=cola">here</a></Typography>
            <Typography color="primary">This app contains spoilers for The Seven Sisters books by Lucinda Riley.</Typography>
            <Typography>I do not own the rights to any of the characters or books mentioned.</Typography>
            <Typography>The data may be incomplete or inaccurate, you may file an issue on Github if you want to have this fixed.</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            localStorage.setItem("dialogHasBeenSeen1", "true");
            setOpen(false);
          }}
          color="primary"
          autoFocus
        >
          I agree, hide this message in the future.
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartDialog;
