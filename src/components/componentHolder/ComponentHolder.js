import Box from '@mui/material/Box';

const ComponentHolder = (props) => {
    const { children, value, index, type, ...other } = props;
    return(
        <div
            role="componentHolder"
            id={`componentHolder-${index}`}
            hidden={value !== index}
            className={type=='main'&&'bg-white m-5 rounded-md min-h-screen'}
            {...other}
        >
            {children}
        </div>
    )
}

export default ComponentHolder;