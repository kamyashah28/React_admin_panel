import type { StackProps } from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LogoutButton } from '../../sections/auth/logout';

export function NavUpgrade({ sx, ...other }: StackProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ mb: 4, textAlign: 'center', ...sx }}
      {...other}
    >
      <LogoutButton />
    </Box>
  );
}
