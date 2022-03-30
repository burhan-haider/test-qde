import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Icon from 'components/Icon';
// import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToOpenFeatures, setSelectedFeature } from '../redux/routes/routes.actions';

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
        <Box>
            <Tabs
                value={selectedFeature}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                indicator={{background: 'blue'}}
                className="bg-purple-700 text-white"
            >
                {/* <Tab icon={<MdHome size={24} />} component={Link} value="/" to={'/'} iconPosition="start"  label="Item One" />
                <Tab icon={<MdSettings size={24} />} component={Link} value="/page-one" to={'/page-one'} iconPosition="start"   label="Item Two" />
                <Tab icon={<MdLocationOn size={24} />} component={Link} value="/page-two" to={'/page-two'} iconPosition="start"  label="Item Three" /> */}
                {newFeatures.map((item)=>(
                    <Tab 
                        key={item.featureCode} 
                        icon={<Icon iconName={item.icon} size={24} color={'inherit'} />} 
                        iconPosition="start" 
                        value={item.featureCode}
                        className="text-white"
                        label={
                            openFeatures.filter(e=>e.featureCode === item.featureCode).length > 0 && selectedFeature !== item.featureCode ? <span style={{textAlign: 'center'}} ><Badge sx={{"& .MuiBadge-badge": {backgroundColor: 'white', color: 'white'}}} badgeContent={''} variant={'dot'} /><br/>{item.featureName}</span> : item.featureName
                        }
                    />    
                ))}
                {/* <Tab label="Item Four" /> */}
                
            </Tabs>
        </Box>
    );
}

export default Header;