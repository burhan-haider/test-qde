import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';

const CustomTabs = styled(Tabs)({
    background: '#052a4f',
    color: '#fff',
    height: '3rem',
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: '0rem',
    paddingRight: '0rem',
    alignItems: 'center',
    '& .MuiTabs-indicator': {
        background: 'transparent',
    }
})

export default CustomTabs;