import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

const ComponentHolder = (props) => {

    const selectedFeature = useSelector(state=>state.features.features.featureCode);
    const features = useSelector(state=>state.features.features.features);
    const feature = features.filter(item=>item.featureCode===selectedFeature)[0];

    const { children, value, index, type, ...other } = props;
    return(
        <Box
            role="componentHolder"
            id={`componentHolder-${index}`}
            hidden={value !== index}
            className={type === 'main' && (feature && feature.openTabs.length > 0 ? 'bg-white m-5 mt-4 mb-2 pb-2 pt-2 rounded-md h-[76.2vh] overflow-y-scroll no-scrollbar':'bg-white m-5 mt-4 mb-2 pb-2 pt-2 rounded-md h-[80vh] overflow-y-scroll no-scrollbar')}
            style={{transition: 'all 0.3s ease-in'}}
            {...other}
        >
            {children}
        </Box>
    )
}

export default ComponentHolder;