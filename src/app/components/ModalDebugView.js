import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ServerPaginatedTable from "./ServerPaginatedTable";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ReactJson from 'react-json-view';
import OverlayDebugView from "./OverlayDebugView";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {hot} from "react-hot-loader";
import {DialogActions} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";


const ModalDebugView = props => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{
      textAlign: 'center'
    }}>
      <Button
        size={"small"}
        color={"primary"}
        disableFocusRipple
        onClick={handleOpen}>
        <Icon>code</Icon>
      </Button>

      < Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        maxWidth={"lg"}
        classes={{
          paper: 'debugDialog'
        }}
      >
        <DialogTitle id="alert-dialog-title">{"JSON"}</DialogTitle>
        <DialogContent>
          < OverlayDebugView
            url={props.url}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default hot(module)(ModalDebugView);
