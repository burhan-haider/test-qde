import React, {useEffect, useState} from 'react';
import {Tabs, Tab} from 'components/common/CustomTabs';
import TabScrollButton from '@mui/material/TabScrollButton';
import { styled } from '@mui/system';
import Icon from 'components/Icon';
import getIconByKey from 'assets';
import { Avatar, Divider, Button, IconButton, Box, Badge } from '@mui/material';
import { 
    fetchUserFeature,
    setSelectedFeature,
    fetchFeatureModules,
} from 'redux/features/features.actions';
// import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { addToOpenFeatures, setSelectedFeature } from 'redux/routes/routes.actions';
import logo from 'assets/header/cognifi-logo.png';
import headerBar from 'assets/header/header-bar.png'
import UserMenuList from './userMenu/UserMenu';
import commonService from 'services/common/commonService'

const MyTabScrollButton = styled(TabScrollButton)({
    display: 'none',
    width: 12,
    root: {
      display: 'none',
      width: 28,
      overflow: 'hidden',
      transition: 'width 5s',
      '&.Mui-disabled': {
        width: 0,
      },
    },
  });

const Header = () => {

    const selectedFeature = useSelector(state => state.features.features.featureCode);
    // const modules = useSelector(state => state.routes.modules);
    // const currentFeatures = useSelector(state => state.routes.newFeatures.userFeatures);
    const newFeatures = useSelector(state => state.features.features.userFeatures);
    // const openFeatures = useSelector(state => state.routes.newFeatures.features);
    const user = useSelector(state => state.auth.user)
    // const [newFeatures, setNewFeatures] = useState(currentFeatures);
    const features = useSelector(state=>state.features.features.features)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserFeature(user))
        console.log("selectedFeature", selectedFeature);
        if(selectedFeature==null){
            dispatch(setSelectedFeature('dashboard'))
            dispatch(fetchFeatureModules('dashboard'))
        }
        // setNewFeatures(currentFeatures)
    },[]);

    const handleChange = (event, newValue) => {
        dispatch(setSelectedFeature(newValue));
        if(features.filter(e=>e.featureCode===newValue).length<1){
            dispatch(fetchFeatureModules(newValue));
        }
    };

    return (
        <Box className='flex justify-start align-middle px-3'>
            <div className='flex justify-start' >
                <img 
                    src={logo} 
                    alt="cognifi-logo" 
                    className="h-8 w-8 m-auto mx-2 cursor-pointer" 
                    onClick={()=>window.location.reload()}
                />
                <img src={headerBar} alt="header-bar" className="h-9 w-auto m-auto" />
            </div>
            <Tabs
                value={selectedFeature}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                ScrollButtonComponent={MyTabScrollButton}
            >
                {/* <Tab icon={<MdHome size={24} />} component={Link} value="/" to={'/'} iconPosition="start"  label="Item One" />
                <Tab icon={<MdSettings size={24} />} component={Link} value="/page-one" to={'/page-one'} iconPosition="start"   label="Item Two" />
                <Tab icon={<MdLocationOn size={24} />} component={Link} value="/page-two" to={'/page-two'} iconPosition="start"  label="Item Three" /> */}
                {newFeatures.map((item)=>(
                    <Tab 
                        key={item.featureCode?item.featureCode:item.featureMapping_Id} 
                        icon={item.icon?<Icon iconName={item.icon} size={18} color={'inherit'} />:<img src={getIconByKey(item.featureIcon)} style={{height: '1.25rem', width: 'auto'}} className="h-5 w-auto mr-2" alt={item.featureIcon}/>} 
                        iconPosition="start" 
                        value={item.featureCode?item.featureCode:item.featureMapping_Id}
                        className="text-white border-none"
                        label={
                            item.featureName
                        }
                    />    
                    
                ))}
                {/* <Tab label="Item Four" /> */}
                
            </Tabs>
            <img src={headerBar} alt="header-bar" className="h-9 w-auto m-auto" />
            <IconButton onClick={()=>{}} color="primary" className="mx-2 m-auto" >
                <img src={getIconByKey('searchOne')} alt={'search_icon'} className="h-5 w-auto " />
            </IconButton>
            <Divider sx={{borderColor: '#e2e8f0', marginTop: '16px', marginBottom: '16px'}} orientation='vertical' variant='middle' flexItem />
            <img src={getIconByKey('menu')} alt={'menu icon'} className="h-4 w-auto mx-4 m-auto" />
            {/*<div className="flex justify-start align-middle w-100" >
                <p className="text-white" >Vivek Raj</p>
                    </div>*/}
            <div>
                <ul className="p-0 m-0 mt-1 mr-2">
                    <li className="inline-block z-50">
                        <UserMenuList />
                    </li>
                </ul>
            </div>
        </Box>
    );
}

export default Header;