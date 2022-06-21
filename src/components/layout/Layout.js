import React, { useEffect, useState } from 'react';
import Header from './header/Header';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {

    const [hideHeader, setHideHeader] = useState(false);

    return (
        <Box sx={{
            minHeight: '100vh',
            background: '#052a4f',
            paddingBottom: 1,
            transition: 'all 0.1s ease-in-out',
        }} >
            <Header hideHeader={hideHeader} />
            {React.cloneElement(children, { hideHeader: hideHeader, setHideHeader: setHideHeader })}
        </Box>
    );
}

export default Layout;