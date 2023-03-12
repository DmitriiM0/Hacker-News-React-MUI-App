import AppBar from '@mui/material/AppBar';
import { Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme';
import { ThemeProvider } from '@mui/material/styles';

export default function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ bgcolor: '#171717' }}>
        <Container maxWidth="md">
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            color="#D9D9D9"
          >
            <Typography variant="h6" sx={{ py: 2 }}>
              Hacker News
            </Typography>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ columnGap: 4 }}
            >
              <Typography variant="body2">New</Typography>
              <Typography variant="body2">Past</Typography>
              <Typography variant="body2">Comments</Typography>
              <Typography variant="body2">Ask</Typography>
              <Typography variant="body2">Show</Typography>
            </Box>
          </Box>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
