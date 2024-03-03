import React, { FC } from 'react';
import { MtButton } from './common';
import { CircularProgress } from '@mui/material';

interface Props {
  text: string;
  isLoading?: boolean;
}

const SubmitButton: FC<Props> = ({
  text,
  isLoading = false,
}) => {
  return (
    <MtButton
      startIcon={
        isLoading ? (
          <CircularProgress
            size={18}
            sx={{ color: 'white' }}
          />
        ) : null
      }
      type="submit"
      size="large"
      variant="contained"
    >
      {text}
    </MtButton>
  );
};

export default SubmitButton;
