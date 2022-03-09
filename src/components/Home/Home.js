import {useState, useEffect} from 'react';
import {
    Box,
    Chip,
    Breadcrumbs,
} from '@mui/material';
import ComponentHolder from '../componentHolder/ComponentHolder';
import SubFeatureOne from './SubFeatureOne/SubFeatureOne';
import SubFeatureTwo from './SubFeatureTwo/SubFeatureTwo';
import {useSelector, useDispatch} from 'react-redux';
import {setSelectedSubFeature, removeFromOpenTabs} from '../../redux/routes/routes.actions';

const Home = ({feature}) =>{

    // useEffect(() => {
    //   console.log("Selected Tab: ",feature.selectedTab)
  
    // },[]);

    const dispatch = useDispatch();

    const handleClick = (item) => {
        dispatch(setSelectedSubFeature(feature.id, item.id));
    }

    const handleDelete = (item) => {
        dispatch(removeFromOpenTabs(feature.id, item))
        dispatch(setSelectedSubFeature(feature.id, 1));

    }

  
    return(
      <div>
          {feature.openTabs.length > 1 && (
            <Box sx={{
                paddingY: '12px',
                paddingX: '50px',
                textAlign: 'left',
            }} className="bg-purple-700" >
                {feature.openTabs.map((item) => (
                    <>
                        {feature.selectedTab===item.id ? (
                            <Chip key={item.id} className="bg-green-500  text-white" sx={{margin: '5px'}}  label={item.name}  onDelete={()=>handleDelete(item)} />
                        ):(
                            <Chip key={item.id} className="bg-green-700 hover:bg-green-500 text-white" sx={{margin: '5px'}} label={item.name} onClick={()=>handleClick(item)}   onDelete={()=>handleDelete(item)} />
                        )}
                        
                    </>
                ))}
            </Box>
          )}
        
        <Box 
            sx={{
            backgroundColor: 'white',
            paddingX: '50px',
            textAlign: 'left',
            marginX: '20px',
            }}
            className="rounded-md">
          <Breadcrumbs>
            {feature.openTabs.map((item) => (
                <p key={item.id}> {item.name}</p>
            ))}
          </Breadcrumbs>
        </Box>
        <ComponentHolder index={1} type={'main'} value={feature.selectedTab}>
          <SubFeatureOne feature={feature} subFeature={feature.subFeatures[0]} />
        </ComponentHolder>
        <ComponentHolder index={2} type={'main'} value={feature.selectedTab} >
          <SubFeatureTwo feature={feature} subFeature={feature.subFeatures[1]} />
        </ComponentHolder>
          
      </div>
    )
  }

  export default Home;