'use client';

import { Alert, Snackbar } from '@mui/material';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

type SnackBarVariant = 'success' | 'warning' | 'error';
type SnackbarContextValue = (msg: string, variant?: SnackBarVariant) => void;

const SnackBarContext = createContext<null | SnackbarContextValue>(null);

const SnackBarProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('zzz');
  const [variant, setVariant] = useState<SnackBarVariant>('success');

  const showSnackBar = (message: string, variant?: SnackBarVariant) => {
    if (variant) setVariant(variant);
    setMessage(message);
    setIsOpen(true);
  };

  const handleCloseSnackBar = () => {
    setIsOpen(false);
  };

  return (
    <SnackBarContext.Provider value={showSnackBar}>
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={10000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClick={handleCloseSnackBar}
          variant="filled"
          sx={(props) => ({
            width: '100%',
            background: props.palette[variant].main,
          })}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;

export const useSnackbar = () => {
  const showSnackbar = useContext(SnackBarContext);
  if (showSnackbar == null) throw new Error('no snackbar');

  return showSnackbar;
};
