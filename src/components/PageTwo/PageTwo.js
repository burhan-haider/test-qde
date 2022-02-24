import React from 'react';
import { Box } from '@mui/material';

const PageTwo = () => {
    return (
        <div>
            <header>
                <Box sx={{
                    backgroundColor: 'white',
                    paddingY: '12px',
                    paddingX: '50px',
                    textAlign: 'left',
                    borderBottom: '1px solid #999'
                }} >
                    refreshing Tabs here 
                </Box>
                <Box sx={{
                    backgroundColor: 'white',
                    paddingY: '12px',
                    paddingX: '50px',
                    textAlign: 'left',
                }} >
                    Breadcrumbs here 
                </Box>
            </header>
            <h1>Page Two</h1>
        </div>
    );
}

export default PageTwo;