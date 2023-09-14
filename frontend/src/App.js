import React from 'react';
import { MantineProvider, BackgroundImage } from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AutoLogout from './components/logout/AutoLogout';
import AppRoutes from './routes/Routes';
import backgroundImage from './images/luffy2.jpg';
import FooterCentered from './footer/Footer';

const footerLinks = [
  { link: "https://guides.emich.edu/classbooks/CSD", label: 'Class Books' },
  { link: "https://www.lib.uoc.gr/", label: 'Library Info' },
  { link: "https://www.lib.uoc.gr/news/", label: 'News' },
];

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <BackgroundImage src={backgroundImage} style={{ backgroundSize: 'cover', height: '100vh' }}>
      <Router>
          <AppRoutes isAuthenticated={isAuthenticated} /> 
        </Router>
        {isAuthenticated && <AutoLogout />}
      </BackgroundImage>
      <FooterCentered links={footerLinks} />
    </MantineProvider>
  );
}

export default App;
