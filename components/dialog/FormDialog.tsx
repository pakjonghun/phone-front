import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  title: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function FormDialog({
  title,
  content,
  open,
  setOpen,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      {content}
    </Dialog>
  );
}
