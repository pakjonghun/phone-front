import * as React from 'react';
import { SxProps, Theme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CircularProgress } from '@mui/material';

interface Props {
  text: string;
  isPending: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
}

export default function UploadFileButton({
  text,
  isPending,
  inputRef,
  onChange,
  sx = {},
}: Props) {
  return (
    <Button
      sx={sx}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={
        isPending ? (
          <CircularProgress variant="indeterminate" color="info" size={24} />
        ) : (
          <CloudUploadIcon />
        )
      }
    >
      {text}
      <VisuallyHiddenInput
        accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={onChange}
        ref={inputRef}
        type="file"
      />
    </Button>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
