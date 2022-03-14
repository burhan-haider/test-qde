import { useEffect } from 'react'
import {
    Box,
    Breadcrumbs,
    Chip,
} from '@mui/material';
import ComponentHolder from 'components/componentHolder/ComponentHolder';
import ModuleHolder from 'components/ModuleHolder'
import {useDispatch} from 'react-redux';
import {
    setSelectedSubFeature, 
    removeFromOpenTabs, 
    // addToMapTrail,
    addToOpenTabs,
  } from 'redux/routes/routes.actions';

  const FeatureHolder = ({feature}) => {
    const dispatch =  useDispatch();
    
    const handleClick = (item) => {
        dispatch(setSelectedSubFeature(feature.id, item.id));
    }

    useEffect(() => {
        if(feature.openTabs.filter(e=>e.name === feature.name).length<1 && feature.openTabs.length <1 ){
            dispatch(addToOpenTabs(feature.id, {id: feature.id, name: feature.name}))
        }
    });

    const handleClickBreadcrumb = (item) => {
        dispatch(setSelectedSubFeature(feature.id, item.id));
        if(feature.openTabs.filter(e=>e.name===item.name).length<1){
            dispatch(addToOpenTabs(feature.id, item));
        }
        else if(item.id === feature.id && feature.openTabs.filter(e => e.name === feature.name).length < 1){
            dispatch(addToOpenTabs(feature.id, {id: feature.id, name: feature.name}));
        }
        else return;
    }

    const handleDelete = (item) => {
        dispatch(removeFromOpenTabs(feature.id, item))
        dispatch(setSelectedSubFeature(feature.id, feature.id));
    }

    return(
        <div>
            {feature.openTabs.length > 1 || feature.openTabs.filter(e=>e.name===feature.name).length < 1 ? (
                <Box className="bg-purple-700 px-12 py-3 text-left">
                    {feature.openTabs.map((item)=>(
                        <>
                            {feature.selectedTab===item.id ? (
                                <Chip key={item.id} className="bg-green-500  text-white m-1" label={item.name}  onDelete={()=>handleDelete(item)} />
                            ):(
                                <Chip key={item.id} className="bg-green-700 hover:bg-green-500 text-white m-1" label={item.name} onClick={()=>handleClick(item)}   onDelete={()=>handleDelete(item)} />
                            )}
                        </>
                    ))}
                </Box>
            ):(<></>)}
            
            <Box className="bg-white rounded-md px-12 m-5 text-left" >
                <Breadcrumbs>
                    {feature.mapTrail.map((item)=>(
                        <p 
                        onClick={()=>handleClickBreadcrumb(item)} 
                        className="cursor-pointer"
                        key={item.id}> 
                            {item.name}{feature.mapTrail.indexOf(item) === feature.mapTrail.length-1&&' /'}
                        </p>
                    ))}
                </Breadcrumbs>
            </Box>
            <ComponentHolder index={feature.id} type={'main'} value={feature.selectedTab} >
                <MainPage feature={feature} />
            </ComponentHolder>
            {feature.subFeatures.map((item)=>(
                <ComponentHolder index={item.id} type={'main'} value={feature.selectedTab}  >
                    <ModuleHolder feature={feature} subFeature={item} />
                </ComponentHolder>
            ))}
        </div>
    )
  }

  const MainPage = ({feature}) =>{

    const dispatch = useDispatch();

    const handleClick = (item) => {
    //   dispatch(addToMapTrail(feature.id, item));
      dispatch(setSelectedSubFeature(feature.id, item.id))
      if(feature.openTabs.filter(e=>e.name===item.name).length<1){
        dispatch(addToOpenTabs(feature.id, item))
      }
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

  export default FeatureHolder;