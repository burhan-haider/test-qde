import Box from '@mui/material/Box';

const ComponentHolder = (props) => {
    const { children, value, index, type, ...other } = props;
    return(
        <Box
            role="componentHolder"
            id={`componentHolder-${index}`}
            hidden={value !== index}
            className={type === 'main' && 'bg-white m-5 rounded-md min-h-screen'}
            style={{transition: 'all 0.3s ease-in'}}
            {...other}
        >
            {children}
        </Box>
    )
}

export default ComponentHolder;