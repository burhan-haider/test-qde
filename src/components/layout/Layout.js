import React from 'react';
import Header from '../Header';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    
    return (
        <Box sx={{
            backgroundColor: '#ddd',
            minHeight: '100vh',
        }} >
            <Header />
            {children}
        </Box>
    );
}

export default Layout;