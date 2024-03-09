'use client';

import { Aggregate } from '@/model/dashboard';
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';

interface Props {
  title: string;
  note: string;
  data: Aggregate[];
  suffixFunc: (args: Aggregate) => string;
}

const TopCard: FC<Props> = ({
  title,
  note,
  data,
  suffixFunc,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{note}</Typography>
        <Stack
          sx={{
            flexDirection: {
              sx: 'column',
              lg: 'row',
            },
          }}
          gap={2}
          mt={2}
        >
          {data.map((item, index) => (
            <Stack
              key={`${index}_${Object.keys(item).join(
                ' '
              )}`}
              direction="row"
              alignItems="center"
              gap={1}
            >
              <Typography variant="body1">
                {suffixFunc(item)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TopCard;
