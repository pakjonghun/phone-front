import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Edit } from '@mui/icons-material';
import { useEditPurchaseClient } from '@/hooks/search/client/useClient';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useQueryClient } from '@tanstack/react-query';
import { CLIENT_LIST } from '@/hooks/search/client/constant';
import { CircularProgress } from '@mui/material';

interface Props {
  id: string;
  note: string;
  manager: string;
}

export default function EditClientDialog({ id, note, manager }: Props) {
  const [open, setOpen] = React.useState(false);
  const { mutate: editClient, isPending } = useEditPurchaseClient();
  const snackbar = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  return (
    <React.Fragment>
      <Button
        endIcon={isPending ? <CircularProgress size={20} /> : <Edit />}
        variant="outlined"
        onClick={handleClickOpen}
      >
        편집
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const note = formJson.note;
            const manager = formJson.manager;

            editClient(
              { note, manager, id },
              {
                onSuccess: () => {
                  snackbar('편집이 성공 했습니다.', 'success');
                  handleClose();
                  queryClient.invalidateQueries({ queryKey: [CLIENT_LIST] });
                },
                onError: () => {
                  snackbar('편집이 실패 했습니다.', 'error');
                },
              }
            );
          },
        }}
      >
        <DialogTitle>거리처 편집</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            거래처 관련 데이터를 수정할 수 있습니다. <br />
            담당자와 비고를 수정합니다.
          </DialogContentText>
          <TextField
            defaultValue={manager}
            sx={{ mb: 2 }}
            autoFocus
            margin="dense"
            id="manager"
            name="manager"
            label="담당자"
            fullWidth
            variant="outlined"
          />
          <TextField
            defaultValue={note}
            autoFocus
            margin="dense"
            id="name"
            name="note"
            label="비고"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
          <Button
            endIcon={isPending ? <CircularProgress size={20} /> : <></>}
            variant="contained"
            type="submit"
          >
            편집
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
