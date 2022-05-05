import Box from '@mui/material/Box';

const ComponentHolder = (props) => {
    const { children, value, index, type, ...other } = props;
    return(
        <Box
            role="componentHolder"
            id={`componentHolder-${index}`}
            hidden={value !== index}
            className={type === 'main' && 'bg-white m-5 mt-4 pb-2 pt-2 rounded-md min-h-[75vh]'}
            style={{transition: 'all 0.3s ease-in'}}
            {...other}
        >
            {children}
        </Box>
    )
}

export default ComponentHolder;