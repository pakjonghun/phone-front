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
  TableContainer,
  TextField,
  Typography,
} from '@mui/material';
import { Client } from '@/model/client';
import dayjs from 'dayjs';
import { Edit } from '@mui/icons-material';
import FormDialog from '@/components/dialog/FormDialog';
import { useEditDashboardNote } from '@/hooks/purchaseDashboard/usePurchaseDashboard';
import { useSnackbar } from '@/context/SnackBarProvicer';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { getCurrencyToKRW, getWithCommaNumber } from '@/util/util';
import { VISIT_CLIENT_PURCHASE } from '@/hooks/purchaseDashboard/constant';

function createSaleData({
  _id,
  lastInDate,
  note,
  accInPrice,
  count,
}: Client & { lastInDate: string; count: number; accInPrice: number }) {
  let duration = '판매기록 없음';
  if (lastInDate) {
    duration = `${dayjs().diff(dayjs(lastInDate), 'days')}일째 매입 안함`;
  }

  return {
    name: _id,
    note,
    duration,
    accInPrice,
    count,
  };
}

const header = ['날짜', '업체명', '누적 매입가', '누적 매입수량', '비고', ''];

type DisplayClient = {
  name: string;
  note: string;
  duration: string;
};

interface Props {
  title: string;
  data?: (Client & { lastInDate: string; accInPrice: number; count: number })[];
}

type EditForm = {
  note: string;
};

export default function ClientVisitTable({ title, data = [] }: Props) {
  const { register, handleSubmit, setValue } = useForm<EditForm>({
    defaultValues: {
      note: '',
    },
  });
  const rows = data.map((item) => createSaleData(item));

  const [selectedClient, setSelectedClient] = React.useState<null | DisplayClient>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const snack = useSnackbar();
  const { mutate: editNote, isPending } = useEditDashboardNote();
  const handleClickEdit = ({ note }: EditForm) => {
    if (!selectedClient) return;
    editNote(
      { id: selectedClient.name, note },
      {
        onSuccess: () => {
          snack('비고 편집 성공', 'success');
          setIsOpen(false);
          setSelectedClient(null);
          queryClient.invalidateQueries({
            queryKey: [VISIT_CLIENT_PURCHASE],
          });
        },
        onError: (err) => {
          snack('비고 편집 실패', 'error');
        },
      }
    );
  };

  return (
    <Paper sx={{ pt: 3, height: '100%' }}>
      <FormDialog
        title="비고 편집"
        content={
          <form onSubmit={handleSubmit(handleClickEdit)}>
            <DialogContent>
              <TextField
                {...register('note')}
                autoFocus
                placeholder="변경할 비고를 입력하세요."
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                취소
              </Button>
              <Button
                variant="contained"
                type="submit"
                startIcon={isPending ? <CircularProgress color="inherit" size={14} /> : ''}
              >
                비고편집
              </Button>
            </DialogActions>
          </form>
        }
        open={isOpen && !!selectedClient}
        setOpen={setIsOpen}
      />
      <Typography ml={3} mb={3} variant="h5">
        {title}
      </Typography>
      <TableContainer sx={{ maxHeight: '650px' }}>
        <Table aria-label="simple table" stickyHeader>
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
                <TableCell align="left">{getCurrencyToKRW(row.accInPrice)}</TableCell>
                <TableCell align="left">{getWithCommaNumber(row.count)}</TableCell>
                <TableCell align="left" sx={{ width: '30%', px: 1 }}>
                  <Typography variant="body2" whiteSpace="collapse">
                    {row.note}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedClient(row);
                      setValue('note', row.note);
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
                    비고작성
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
