'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DialogVariant = 'error' | 'confirm';

interface Props {
  title: React.ReactNode;
  message: React.ReactNode;
  variant: DialogVariant;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClickApply: () => void;
}

export default function AlertDialog({
  title,
  message,
  onClickApply,
  open,
  setOpen,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClickApply}>
          확인
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
          autoFocus
        >
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
