import { Aggregate } from '@/model/dashboard';
import {
  Avatar,
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
          {data.map(({ _id, count, accPrice }, index) => (
            <Stack
              key={_id}
              direction="row"
              alignItems="center"
              gap={1}
            >
              <Avatar sx={{ width: 24, height: 24 }}>
                {index + 1}
              </Avatar>
              <Typography variant="body1">
                {suffixFunc({ _id, count, accPrice })}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TopCard;
