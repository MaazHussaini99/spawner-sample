import { CustomThemeProvider } from './layout/MainLayout/Header/ThemeContext';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { AuthProvider } from 'hooks/AuthContext'; // Import AuthProvider

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        {' '}
        {/* Wrap your app with AuthProvider */}
        <CustomThemeProvider>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </CustomThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};

export default App;
