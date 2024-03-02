'use client';

import { H4, Header } from '@/components/common';
import { MoreHoriz } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SignUpDialog from './_component/SignUpDialog';

const Admin = () => {
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <Box sx={{ width: '100%', bgcolor: 'primary' }}>
      <SignUpDialog
        openSignUp={openSignUp}
        onClose={() => setOpenSignUp(false)}
      />
      <Header
        sx={{ justifyContent: 'space-between', mb: 2 }}
      >
        <H4 variant="h4">관리자 </H4>
        <Button
          onClick={() => setOpenSignUp(true)}
          variant="contained"
        >
          회원생성
        </Button>
      </Header>
      <Stack sx={{ width: '100%' }}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'gray-200' }}>
                A
              </Avatar>
            }
            action={
              <IconButton>
                <MoreHoriz />
              </IconButton>
            }
            title="1번유저"
          />
          <CardContent>
            <Typography> 아이디 : 11</Typography>
            <Typography>권한 : 어드민</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Admin;
