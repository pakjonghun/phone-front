'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Client } from '@/model/client';
import dayjs from 'dayjs';
import { Edit } from '@mui/icons-material';
import FormDialog from '@/components/dialog/FormDialog';
import { useEditDashboardNote } from '@/hooks/dashboard/useDashboard';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useQueryClient } from '@tanstack/react-query';
import { DASHBOARD_DATA } from '@/hooks/dashboard/constant';
import { useForm } from 'react-hook-form';

function createSaleData({
  _id,
  lastOutDate,
  note,
}: Client) {
  let duration = '판매기록 없음';
  if (lastOutDate) {
    duration = `${dayjs().diff(
      dayjs(lastOutDate),
      'days'
    )}일째 판매 안함`;
  }

  return {
    name: _id,
    note,
    duration,
  };
}

function createPurchaseData({
  _id,
  lastInDate,
  note,
}: Client) {
  let duration = '구매기록 없음';
  if (lastInDate) {
    const now = dayjs().format('YYYYMMDDHHmmss');
    const diff = dayjs(now).diff(dayjs(lastInDate), 'days');
    duration = `${diff}일째 구매 안함`;
  }

  return {
    name: _id,
    note,
    duration,
  };
}

const header = ['날짜', '업체명', '비고'];

type DisplayClient = {
  name: string;
  note: string;
  duration: string;
};

interface Props {
  tableType: 'sale' | 'purchase';
  title: string;
  data: Client[];
}

type EditForm = {
  note: string;
};

export default function ClientVisitTable({
  title,
  data,
  tableType,
}: Props) {
  const { register, handleSubmit } = useForm<EditForm>();

  const rows =
    tableType === 'sale'
      ? data.map((item) => createSaleData(item))
      : data.map((item) => createPurchaseData(item));

  const [selectedClient, setSelectedClient] =
    React.useState<null | DisplayClient>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [note, setNote] = React.useState('');

  const queryClient = useQueryClient();
  const snack = useSnackbar();
  const { mutate: editNote, isPending } =
    useEditDashboardNote();
  const handleClickEdit = ({ note }: EditForm) => {
    if (!selectedClient) return;
    editNote(
      { id: selectedClient.name, note },
      {
        onSuccess: () => {
          snack('비고 편집 성공', 'success');
          setIsOpen(false);
          setSelectedClient(null);
          setNote('');
          queryClient.invalidateQueries({
            queryKey: [DASHBOARD_DATA],
          });
        },
        onError: (err) => {
          console.log(err);
          snack('비고 편집 실패', 'error');
        },
      }
    );
  };

  return (
    <Paper sx={{ pt: 3, height: '100%' }}>
      <FormDialog
        content={
          <form onSubmit={handleSubmit(handleClickEdit)}>
            <DialogContent>
              <TextField
                {...register('note')}
                placeholder="변경할 비고를 입력하세요."
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setIsOpen(false)}
              >
                취소
              </Button>
              <Button
                variant="contained"
                type="submit"
                startIcon={
                  isPending ? (
                    <CircularProgress
                      color="inherit"
                      size={14}
                    />
                  ) : (
                    ''
                  )
                }
              >
                편집
              </Button>
            </DialogActions>
          </form>
        }
        open={isOpen && !!selectedClient}
        setOpen={setIsOpen}
        title="title"
      />
      <Typography ml={3} mb={3} variant="h5">
        {title}
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row.duration}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left" sx={{ width: '50%' }}>
                <Stack direction="row">
                  <Typography
                    variant="body2"
                    whiteSpace="collapse"
                  >
                    {row.note}
                  </Typography>
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedClient(row);
                      setNote(row.note ?? '');
                    }}
                    size="small"
                    sx={{
                      whiteSpace: 'nowrap',
                      ml: 'auto',
                      height: 'fit-content',
                    }}
                    variant="contained"
                    endIcon={<Edit />}
                  >
                    편집
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
