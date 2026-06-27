import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MovieSearch } from './features/movie-search/components/MovieSearch/MovieSearch';

const theme = createTheme();

const AppRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const MainContent = styled('main')({
  flex: 1,
  minHeight: 0,
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoot>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Movie Finder</Typography>
          </Toolbar>
        </AppBar>

        <MainContent>
          <MovieSearch />
        </MainContent>
      </AppRoot>
    </ThemeProvider>
  );
}
