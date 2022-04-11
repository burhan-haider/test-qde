import React, {useEffect} from 'react';
import {Tabs, Tab} from 'components/common/CustomTabs';
import TabScrollButton from '@mui/material/TabScrollButton';
import { styled } from '@mui/system';
import Icon from 'components/Icon';
import getIconByKey from 'assets/icons';
import { Avatar, Divider, Button, IconButton, Box, Badge } from '@mui/material';
// import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToOpenFeatures, setSelectedFeature } from '../../redux/routes/routes.actions';
import logo from 'assets/header/cognifi-logo.png';
import headerBar from 'assets/header/header-bar.png'

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

    // const mainRoute = useSelector(state => state.routes.mainRoute);
    const selectedFeature = useSelector(state => state.routes.newFeatures.featureCode);
    const modules = useSelector(state => state.routes.modules);
    // const features = useSelector(state => state.routes.features);
    const newFeatures = useSelector(state => state.routes.newFeatures.userFeatures);
    const openFeatures = useSelector(state => state.routes.newFeatures.features);
    // const openFeatures = useSelector(state => state.routes.openFeatures);
    const dispatch = useDispatch();

    // const [value, setValue] = useState(mainRoute);

    // useEffect(() => {
    //     console.log('Features:', openFeatures);
    //     console.log('Main Route:', selectedFeature);
    //     console.log('Modules:', modules);
        
    // });

    const handleChange = (event, newValue) => {
        dispatch(setSelectedFeature(newValue));
        const featureModulesId = newFeatures.filter(e => e.featureCode === newValue)[0].mainModulesList;

        const featureModules = [];

        const featureName = newFeatures.filter(e => e.featureCode === newValue)[0].featureName;

        if(modules&&modules.length>0){
            modules.map(module => {
                if(featureModulesId.includes(module.moduleCode)){
                    featureModules.push(module);
                    return module;
                }
                return module;
            })
        }
        if(openFeatures.filter(e => e.featureCode === newValue).length < 1){
            dispatch(addToOpenFeatures({
                featureCode: newValue,
                modules: featureModules,
                openTabs: [],
                breadCrumbs: [{id: newValue, label: featureName, level: 0}],
                selectedModule: newValue
            }));
        }
    };

    return (
        <Box className='flex justify-start align-middle px-1'>
            <img 
                src={logo} 
                alt="cognifi-logo" 
                className="h-8 w-8 m-auto mx-2 cursor-pointer" 
                onClick={()=>window.location.reload}
            />
            <img src={headerBar} alt="cognifi-logo" className="h-9 w-auto m-auto" />
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
                        key={item.featureCode} 
                        icon={<Icon iconName={item.icon} size={18} color={'inherit'} />} 
                        iconPosition="start" 
                        value={item.featureCode}
                        className="text-white border-none"
                        label={
                            item.featureName
                        }
                    />    
                    
                ))}
                {/* <Tab label="Item Four" /> */}
                
            </Tabs>
            <img src={headerBar} alt="cognifi-logo" className="h-9 w-auto m-auto" />
            <IconButton onClick={()=>{}} color="primary" className="mx-2 m-auto" >
                <img src={getIconByKey('searchOne')} alt={'search_icon'} className="h-5 w-auto " />
            </IconButton>
            <Divider sx={{borderColor: '#e2e8f0', marginTop: '20px', marginBottom: '16px'}} orientation='vertical' variant='middle' flexItem />
            <img src={getIconByKey('menu')} alt={'menu icon'} className="h-4 w-auto mx-4 m-auto" />
            {/*<div className="flex justify-start align-middle w-100" >
                <p className="text-white" >Vivek Raj</p>
                    </div>*/}
            <Button variant="text" className="flex rounded py-0 px-5 mr-3 normal-case" >
                <p className="text-white text-sm normal-case" >Vivek&nbsp;Raj&nbsp;&nbsp;</p>
                <Avatar sx={{width: '35px', height: '35px'}} >
                    
                </Avatar>
            </Button>
        </Box>
    );
}

export default Header;