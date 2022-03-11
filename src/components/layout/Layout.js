import React from 'react';
import Header from '../Header';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    
    return (
        <Box sx={{
            minHeight: '100vh',
        }}
        className="bg-purple-700" >
            <Header />
            {children}
        </Box>
    );
}

export default Layout;