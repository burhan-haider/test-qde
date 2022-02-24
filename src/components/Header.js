import React, {useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MdHome, MdSettings, MdLocationOn } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom';

const Header = () => {

    const [value, setValue] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab icon={<MdHome size={24} />} component={Link} value="/" to={'/'} iconPosition="start"  label="Item One" />
                <Tab icon={<MdSettings size={24} />} component={Link} value="/page-one" to={'/page-one'} iconPosition="start"   label="Item Two" />
                <Tab icon={<MdLocationOn size={24} />} component={Link} value="/page-two" to={'/page-two'} iconPosition="start"  label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Eight" />
                <Tab label="Item Nine" />
                <Tab label="Item Ten" />
                <Tab label="Item Eleven" />
                <Tab label="Item Twelve" />
                <Tab label="Item Thirteen" />
                <Tab label="Item Fourteen" />
                <Tab label="Item Fifteen" />
            </Tabs>
            <Outlet />
        </Box>
    );
}

export default Header;