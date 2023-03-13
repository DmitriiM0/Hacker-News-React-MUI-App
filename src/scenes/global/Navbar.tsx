import { Outlet } from 'react-router-dom';
import theme from '../../theme';
import { ThemeProvider } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Typography,
  Box,
  Container,
  CssBaseline,
  IconButton,
} from '@mui/material';

export default function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ bgcolor: '#171717' }}>
        <Container maxWidth="md">
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems="center"
            color="#D9D9D9"
          >
            <Typography variant="h6" sx={{ py: 2 }}>
              Hacker News
            </Typography>
            <Box
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ columnGap: 4, display: { xs: 'none', md: 'flex' } }}
            >
              <Typography variant="body2">New</Typography>
              <Typography variant="body2">Past</Typography>
              <Typography variant="body2">Comments</Typography>
              <Typography variant="body2">Ask</Typography>
              <Typography variant="body2">Show</Typography>
            </Box>
            <IconButton
              disableRipple
              sx={{ display: { xs: 'block', md: 'none' }, color: '#D9D9D9' }}
            >
              <MenuRoundedIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
