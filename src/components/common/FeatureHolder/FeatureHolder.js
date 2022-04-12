import { useEffect, useState } from 'react'
import {
    Box,
    Breadcrumbs,
    Chip,
    Menu,
    MenuItem,
    Button,
} from '@mui/material';
import { MdPushPin, MdBookmark, MdArrowDropDown } from 'react-icons/md'
import ComponentHolder from 'components/common/componentHolder/ComponentHolder';
import ModuleHolder from 'components/common/ModuleHolder'
import {useDispatch, useSelector} from 'react-redux';
import {
    setSelectedSubFeature, 
    removeFromOpenTabs, 
    addToMapTrail,
    removeFromMapTrail,
    addToOpenTabs,
    addToPinnedModules,
    removeFromPinnedModules,
  } from 'redux/routes/routes.actions';

  const FeatureHolder = ({feature}) => {

    const [bookMark, toggleBookMark] = useState(null);
    const open = Boolean(bookMark);

    const handleBookmark = (event) => {
        toggleBookMark(event.currentTarget);
    }
    const handleBookmarkClose = () => {
        toggleBookMark(null);
    }

    const dispatch =  useDispatch();
    const selectedFeature = useSelector(state => state.routes.newFeatures.featureCode);
    const pinnedModules = useSelector(state => state.routes.pinnedModules);
    
    const handleClick = (item) => {
        dispatch(setSelectedSubFeature(feature.featureCode, item.id));
        console.log("Item in Tabs", item)
        const currentModule = feature.modules.filter(e => e.uniqueNo === item.id)[0];
        // to check if there is any value in array 
        if(feature.breadCrumbs.filter(e=>e.id===item.id).length<1){

            if(currentModule.parentModuleId!==null){

                const parentModule = feature.modules.filter(e=>e.uniqueNo === currentModule.parentModuleId)[0];

                if(feature.breadCrumbs.filter(e=>e.id===parentModule.uniqueNo).length<1){
                    dispatch(addToMapTrail(feature.featureCode, {id: parentModule.uniqueNo, label: parentModule.moduleName, level: item.level-1}))
                }

                dispatch(addToMapTrail(feature.featureCode, {id: item.id, label: item.label, level: item.level}));
            }
            else{

                dispatch(addToMapTrail(feature.featureCode, {id: item.id, label: item.label, level: item.level}));
            }
        }

        //  if there is any breadcrumb with level higer than selected breadcrumb, it will be removed
        feature.breadCrumbs.map(crumb=>{
            if(crumb.level>=item.level&&crumb.id!==item.id){
                dispatch(removeFromMapTrail(feature.featureCode, crumb));
                return crumb
            }
            return crumb;
        })
    }

    const handleDelete = (item) => {
        dispatch(removeFromOpenTabs(feature.featureCode, item))
        dispatch(setSelectedSubFeature(feature.featureCode, feature.featureCode));
        feature.breadCrumbs.map(crumb=>{
            if(crumb.level>=1){
                dispatch(removeFromMapTrail(feature.featureCode, crumb));
                return crumb
            }
            return crumb;
        })
    }

    const handleClickBreadcrumb = (item) => {
        dispatch(setSelectedSubFeature(feature.featureCode, item.id));
        if(item.id!==feature.featureCode && feature.openTabs.filter(e=>e.label===item.label).length<1){
            dispatch(addToOpenTabs(feature.featureCode, item));
        }
        feature.breadCrumbs.map(crumb=>{
            if(crumb.id!==item.id&&crumb.level >= item.level){
                dispatch(removeFromMapTrail(feature.featureCode, crumb));
                return crumb
            }
            return crumb;
        }) 
    }

    const handleClickPin = () => {
        const label = feature.modules.filter(e=>e.uniqueNo===feature.selectedModule)[0].moduleName
        if(selectedFeature === feature.featureCode){
            dispatch(addToPinnedModules({label: label,feature: feature}));
        }
    }

    return(
        <div>
            <Box className="px-12 py-3 text-left" style={{backgroundColor: '#052a4f'}} >
                {feature.openTabs.length>0 && feature.openTabs.map((item)=>(
                    <>
                        {feature.selectedModule===item.id ? (
                            <Chip key={item.id} className="bg-green-500  text-white m-1" label={item.label}  onDelete={()=>handleDelete(item)} />
                        ):(
                            <Chip key={item.id} className="bg-green-700 hover:bg-green-500 text-white m-1" label={item.label} onClick={()=>handleClick(item)}  onDelete={()=>handleDelete(item)} />
                        )}
                    </>
                ))}
            </Box>
            
            <Box className="bg-white rounded-md flex justify-between items-center px-5 m-5 text-left" >
                <div className='flex justify-start items-center' >
                    <Button className='bg-orange-600 d-flex justify-center items-center text-white rounded-full border-none hover:bg-orange-700 p-1 h-9 px-3 mr-5' onClick={()=>handleClickPin()} >
                        <MdPushPin size={24} className="mx-0" />
                        <p>Pin</p>
                    </Button>
                    <Breadcrumbs>
                        {feature.breadCrumbs.map((item)=>(
                            <p 
                                onClick={()=>handleClickBreadcrumb(item)} 
                                className="cursor-pointer"
                                key={item.id}> 
                                {item.label}{feature.breadCrumbs.indexOf(item) === feature.breadCrumbs.length-1&&' /'}
                            </p>
                        ))}
                    </Breadcrumbs>
                </div>
                <Button 
                    id="bookmark-button"
                    aria-controls={open ? 'bookmark-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleBookmark}
                    className='bg-purple-700 hover:bg-purple-800 rounded-full flex h-9 w-18 justify-between items-center' 
                >
                    <MdBookmark size={24} className="text-white" />
                    <MdArrowDropDown size={28} className="text-white" />
                </Button>
                <Menu
                    id="bookmark-menu"
                    anchorEl={bookMark}
                    open={open}
                    onClose={handleBookmarkClose}
                    MenuListProps={{
                    'aria-labelledby': 'bookmark-button',
                    }}
                >
                {pinnedModules.length>0?pinnedModules.map(pin=>(
                    <MenuItem onClick={handleBookmarkClose}>{pin.label}</MenuItem>

                )):(
                    <p>No Pinned Modules Here!</p>
                )}
                </Menu>
            </Box>
            <ComponentHolder index={feature.featureCode} type={'main'} value={feature.selectedModule}>
                <MainPage key={feature.featureCode} feature={feature} />
            </ComponentHolder>
            {feature.modules.length > 0 && feature.modules.map((item)=>(
                <ComponentHolder index={item.uniqueNo} key={item.uniqueNo} type={'main'} value={feature.selectedModule}  >
                    <ModuleHolder feature={feature} subFeature={item} />
                </ComponentHolder>
            ))}
        </div>
    )
  }

const MainPage = ({feature}) =>{

    const dispatch = useDispatch();

    const handleClick = (item) => {
        if(feature.breadCrumbs.filter(e=>e.id===item.id).length<1){
            dispatch(addToMapTrail(feature.featureCode, {id: item.uniqueNo, label: item.moduleName, level: 1}));
        }
        feature.breadCrumbs.map(crumb=>{
            if(crumb.level===1 && crumb.id!==item.id){
                dispatch(removeFromMapTrail(feature.featureCode, crumb));
                return crumb
            }
            return crumb;
        })
        dispatch(setSelectedSubFeature(feature.featureCode, item.uniqueNo))
        if(feature.openTabs && feature.openTabs.filter(e => e.id === item.uniqueNo).length<1){
            dispatch(addToOpenTabs(feature.featureCode, {id: item.uniqueNo, label: item.moduleName, level: 1}))
        }
    }

    return(
      <Box >

           {/* mapping all the modules inside a feature as button */}
        {feature.modules.length>0 && feature.modules.map((item)=>(<>{item.parentModuleId===null&&(
            <button key={item.id} onClick={()=>handleClick(item)} className=" m-5 text-white font-bold border-none bg-red-500 hover:bg-red-700 rounded-md p-3 cursor-pointer">
            {item.moduleName}
            </button>
        )}</>))}
        
        </Box>
    )
}

  export default FeatureHolder;