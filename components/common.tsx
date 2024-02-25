import { Button, Typography, styled } from '@mui/material';

export const H4 = styled(Typography, {
  name: 'header',
  slot: 'root',
})(() => ({
  fontWeight: 600,
}));

export const Header = styled('header')((props) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Form = styled('form')``;

export const MtButton = styled(Button)(() => ({
  mt: '2%',
}));
