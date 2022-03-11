import React, {useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { MdHome, MdSettings, MdLocationOn } from 'react-icons/md'
// import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRoute, removeRoute, setMainRoute } from '../redux/routes/routes.actions';

const Header = () => {

    const mainRoute = useSelector(state => state.routes.mainRoute);
    const features = useSelector(state => state.routes.features);
    const openFeatures = useSelector(state => state.routes.openFeatures);
    const dispatch = useDispatch();

    // const [value, setValue] = useState(mainRoute);

    useEffect(() => {
        console.log('Features:', features);
        console.log('Main Route:', mainRoute);
        
    }, []);

    const iconsMap = {
        1: <MdHome size={24} />,
        2: <MdSettings size={24} />,
        3: <MdLocationOn size={24} />,
    }

    const handleChange = (event, newValue) => {
        dispatch(setMainRoute(newValue));
    };

    return (
        <Box>
            <Tabs
                value={mainRoute}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                indicator={{background: 'blue'}}
                className="bg-purple-700 text-white"
            >
                {/* <Tab icon={<MdHome size={24} />} component={Link} value="/" to={'/'} iconPosition="start"  label="Item One" />
                <Tab icon={<MdSettings size={24} />} component={Link} value="/page-one" to={'/page-one'} iconPosition="start"   label="Item Two" />
                <Tab icon={<MdLocationOn size={24} />} component={Link} value="/page-two" to={'/page-two'} iconPosition="start"  label="Item Three" /> */}
                {features.map((item)=>(
                    <Tab 
                        key={item.id} 
                        icon={iconsMap[item.id]} 
                        iconPosition="start" 
                        className="text-white"
                        label={openFeatures.includes(item.id) ? <span style={{textAlign: 'center'}} >{item.name}<br/><Badge color='primary' badgeContent={''} variant={'dot'} /></span> : item.name}
                    />    
                ))}
                {/* <Tab label="Item Four" /> */}
                
            </Tabs>
        </Box>
    );
}

export default Header;