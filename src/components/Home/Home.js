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
import {
  setSelectedSubFeature, 
  removeFromOpenTabs, 
  addToMapTrail,
  addToOpenTabs,
} from '../../redux/routes/routes.actions';

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
        dispatch(setSelectedSubFeature(feature.id, feature.id));
    }

  
    return(
      <div>
          {feature.openTabs.length > 0 && (
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
            marginY: '20px'
            }}
            className="rounded-md">
          <Breadcrumbs>
            {feature.mapTrail.map((item) => (
                <p 
                  onClick={()=>{dispatch(setSelectedSubFeature(feature.id, item.id))}} 
                  className="cursor-pointer"
                  key={item.id}
                > 
                  {item.name}{feature.mapTrail.indexOf(item) === feature.mapTrail.length-1&&' /'}
                </p>
            ))}
          </Breadcrumbs>
        </Box>
        <ComponentHolder index={feature.id} type={'main'} value={feature.selectedTab} >
          <MainPage feature={feature} />
        </ComponentHolder>
        <ComponentHolder index={feature.subFeatures[0].id} type={'main'} value={feature.selectedTab}>
          <SubFeatureOne feature={feature} subFeature={feature.subFeatures[0]} />
        </ComponentHolder>
        <ComponentHolder index={feature.subFeatures[1].id} type={'main'} value={feature.selectedTab} >
          <SubFeatureTwo feature={feature} subFeature={feature.subFeatures[1]} />
        </ComponentHolder>
          
      </div>
    )
  }

  const MainPage = ({feature}) =>{

    const dispatch = useDispatch();

    const handleClick = (item) => {
      dispatch(addToMapTrail(feature.id, item));
      dispatch(setSelectedSubFeature(feature.id, item.id))
      dispatch(addToOpenTabs(feature.id, item))
    }

    return(
      <Box >
        {feature.subFeatures.map((item)=>(
          <button key={item.id} onClick={()=>handleClick(item)} className=" m-5 text-white font-bold border-none bg-red-500 hover:bg-red-700 rounded-md p-3 cursor-pointer">
            {item.name}
          </button>
        ))}
        
      </Box>
    )
  }

  export default Home;