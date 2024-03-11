import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import { MoreHoriz } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  alpha,
} from '@mui/material';
import { FC, MouseEvent, ReactNode, useState } from 'react';
import { useChangeRole } from '@/hooks/user/useUserData';
import { Role, User } from '@/model/user';
import { useSnackbar } from '@/context/SnackBarProvicer';

import { USER_LIST } from '@/hooks/user/constant';
import { useUserAlert } from '@/lib/store/user/userAlert';
import { useUserId } from '@/lib/store/user/userId';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  user: Omit<User, 'password'>;
}

const UserCard: FC<Props> = ({ user }) => {
  const roleMapper: Record<Role, ReactNode> = {
    ADMIN: 'A',
    MANAGER: 'M',
    STAFF: 'S',
  };

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const [selectedRole, setSelectedRole] = useState(
    user.role
  );
  const { mutate: changeRole } = useChangeRole();

  const setShowForm = useUserAlert(
    (state) => state.setFormShow
  );

  const handleChangeRole = () => {
    changeRole(
      { id: user.id, role: selectedRole },
      {
        onSuccess: () => {
          snackbar('권한 변경이 성공했습니다.', 'success');
          queryClient.invalidateQueries({
            queryKey: [USER_LIST],
          });
        },
        onError: (error) => {
          const errorMessage = error.response.data.message;
          snackbar(
            errorMessage ?? '권한변경이 실패했습니다.'
          );
        },
      }
    );
  };

  const setShowWarning = useUserAlert(
    (state) => state.setWarnShow
  );

  const handleCancelClick = () => {
    setSelectedRole(user.role);
  };

  const canEdit = selectedRole !== user.role;

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const setSelectedUserId = useUserId(
    (state) => state.setSelectedUserId
  );

  return (
    <Card
      sx={{
        m: 2,
        w: '100%',
        h: '100%',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'gray-200' }}>
            {roleMapper[user.role]}
          </Avatar>
        }
        action={
          <>
            <IconButton
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setSelectedUserId(user.id);
                  setShowForm(true);
                }}
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText>비밀번호 변경</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    bgcolor: (theme) =>
                      alpha(theme.palette.error.light, 0.3),
                  },
                  color: (theme) =>
                    theme.palette.error.light,
                }}
                onClick={() => {
                  handleClose();
                  setSelectedUserId(user.id);
                  setShowWarning(true);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon
                    sx={{
                      color: (theme) =>
                        theme.palette.error.light,
                    }}
                  />
                </ListItemIcon>
                <ListItemText>계정 삭제</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
        title={user.id}
      />
      <CardContent>
        <FormControl fullWidth>
          <InputLabel id={user.id}>권한</InputLabel>
          <Select
            label="권한"
            value={selectedRole}
            onChange={(event) => {
              const value = event.target.value as Role;
              setSelectedRole(value);
            }}
            labelId={user.id}
            fullWidth
          >
            {['ADMIN', 'MANAGER', 'STAFF'].map((item) => (
              <MenuItem
                value={item}
                sx={{ w: '100%' }}
                key={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pr: 2,
        }}
      >
        <Button
          onClick={handleCancelClick}
          disabled={!canEdit}
          variant="outlined"
        >
          취소
        </Button>
        <Button
          onClick={handleChangeRole}
          disabled={!canEdit}
          variant="contained"
        >
          적용
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
