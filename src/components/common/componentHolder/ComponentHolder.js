import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ComponentHolder = (props) => {

    const selectedFeature = useSelector(state=>state.features.features.featureCode);
    const features = useSelector(state=>state.features.features.features);
    const feature = features.filter(item=>item.featureCode===selectedFeature)[0];

    const { children, value, index, type, hideHeader, ...other } = props;

    return(
        <Box
            role="componentHolder"
            id={`componentHolder-${index}`}
            hidden={value !== index}
            className={  type === 'main' && feature && ( 'bg-white m-5 mt-4 mb-2 pb-2 pt-2 rounded-md overflow-y-scroll no-scrollbar transform-gpu' + ' ' + (
                feature.openTabs.length > 0 ? (
                    hideHeader == true ? 'h-[82.6vh]' : 'h-[77.6vh]'
                ) : (
                    hideHeader == true ? 'h-[86vh]' : 'h-[81vh]'
                )
            ))}
            {...other}
            style={{transition: 'all 0.1s ease-in-out'}}
        >
            {children}
        </Box>
    )
}

export default ComponentHolder;