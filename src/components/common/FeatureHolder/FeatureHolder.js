import { useEffect, useState } from 'react'
import {
    Box,
    Breadcrumbs,
    Chip,
    Menu,
    MenuItem,
    Button,
    IconButton,
    Grid, 
    Link,
    CircularProgress,
} from '@mui/material';
import { MdPushPin, MdBookmark, MdArrowDropDown } from 'react-icons/md'
import ComponentHolder from 'components/common/componentHolder/ComponentHolder';
import ModuleHolder from 'components/common/ModuleHolder'
import {useDispatch, useSelector} from 'react-redux';
import { 
    setSelectedModule, 
    addToBreadcrumbs, 
    removeFromBreadcrumbs, 
    addToOpenTabs, 
    removeFromOpenTabs,
    putMapClickedDataInFeatures,
    fetchModuleDetails,
    addToPinnedModules,
    removeFromPinnedModules,
    openPinnedModule,
} from 'redux/features/features.actions';
import getIconByKey from 'assets';
import ModuleChartFrame from 'components/common/modules/mainModuleSearchFrame/ModuleChartFrame'
import { handleBreakpoints } from '@mui/system';

const FeatureHolder = ({feature}) => {

  const [bookMark, toggleBookMark] = useState(null);
  const [trail, setTrail] = useState(feature.breadCrumbs);
  const [modules, setModules] = useState(null);

  const dispatch =  useDispatch();
  const selectedFeature = useSelector(state => state.features.features.featureCode);
  //   const selectedNewFeature = useSelector(state=> state.features.features.featureCode)
  const isLoading = useSelector(state=>state.features.features.isLoading);

  const pinnedModules = useSelector(state => state.features.features.pinnedModules);
  const features = useSelector(state => state.features.features);

  const open = Boolean(bookMark);

  const handleBookmark = (event) => {
      toggleBookMark(event.currentTarget);
  }
  const handleBookmarkClose = () => {
      toggleBookMark(null);
  }

  useEffect(()=>{
    //   console.log("Feature:", feature)
      if(feature.featureCode === selectedFeature){
            setModules(feature.modules);
      }
      if(feature.showModule === selectedFeature){
        console.log('This UseEffect was Fired!!')
        feature.breadCrumbs.map(crumb=>{
            if(crumb.id!==feature.featureCode){
                dispatch(removeFromBreadcrumbs(feature.featureCode, crumb))
            }
        })
      }
  },[selectedFeature,feature])

  

  var url = selectedFeature
    ? `/common/feature/${selectedFeature}`
    : null;

  const makeApiCallUrl = (uniqueNo, module_Id, parentModule_Id) => {
    return new Promise((resolve, reject) => {
      if (trail && trail.filter(mod => mod.id === uniqueNo).length === 0) {
        var mainUrl = "";

        let prevModules = trail
          .filter(x => x.id !== features.featureCode && x.id !== uniqueNo)
          .map(code => code.id);

        if (parentModule_Id !== undefined && parentModule_Id !== null) {
          prevModules.push(parentModule_Id);
          prevModules = [...new Set(prevModules)];
        }
        prevModules.push(module_Id);
        const finalUrl = url + prevModules.map(x => `~~~${x}`);
        mainUrl = finalUrl.replace(",", "");
        mainUrl = mainUrl.replaceAll(",", "");
        // makes url for first jump / not chart click
        //============================================================
      } else {
        const trailIndex = trail.findIndex(x => x.code === module_Id);
        if (trail.slice(1, trailIndex).length > 0) {
          const finalUrl = `~~~${trail.slice(1, trailIndex)[0].code}`;
          console.log("2nd One was fired")
          mainUrl = `${url}${finalUrl.replace(
            ",",
            ""
          )}~~~${parentModule_Id}~~~${module_Id}`;
          mainUrl.replace(",", "");
        } else {
          const finalUrl = `~~~${module_Id}`;
          console.log("3rd one was fired")
          mainUrl = `${url}${finalUrl.replace(",", "")}`;
          mainUrl.replaceAll(",", "");
        }
      }

      resolve(mainUrl);
    });
  };

  function getModuleChartData(module) {
    const { uniqueNo, module_Id, parentModule_Id, dataPointClick } = module;
    let moduleDataArray = [];
    moduleDataArray.push({
      uniqueNo: module.uniqueNo,
      module_Id: module.module_Id,
      moduleName: module.moduleName,
      parentModule_Id: module.parentModule_Id,
      parentModuleId: module.parentModuleId,
      url: module.moduleURL,
      presentationCategory: module.presentationCategory,
      dataPointClick: module.dataPointClick,
      hasChildren: module.hasMoreChild
    });

    //==========================================================
    if (
      modules.filter(x => x.uniqueNo === uniqueNo).length > 0 &&
      modules.filter(x => x.uniqueNo === uniqueNo)[0].selected
    ) {
    //   dispatch(removeModuleFromDeleted(uniqueNo));
    //   dispatch(selectSpecificModule(false, uniqueNo));
    } else {
    //   dispatch(removeModuleFromDeleted(uniqueNo));
      if (dataPointClick !== undefined && dataPointClick === true) {
        dispatch(putMapClickedDataInFeatures(moduleDataArray));
      }
      makeApiCallUrl(uniqueNo, module_Id, parentModule_Id).then(res => {
      console.log("TRAIL----->",trail)
      console.log('URL----->',res);
        dispatch(
          fetchModuleDetails(
            res,
            module_Id,
            uniqueNo,
            selectedFeature
          )
        );
      });
    }
  }
  
  
  const handleClick = (item) => {
      dispatch(setSelectedModule(feature.featureCode, item.id));
    //   console.log("Item in Tabs", item)
      const currentModule = feature.modules.filter(e => e.uniqueNo === item.id)[0];
      // to check if there is any value in array 
      if(feature.breadCrumbs.filter(e=>e.id===item.id).length<1){

          if(currentModule.parentModuleId!==null){

              const parentModule = feature.modules.filter(e=>e.uniqueNo === currentModule.parentModuleId)[0];

              if(feature.breadCrumbs.filter(e=>e.id===parentModule.uniqueNo).length<1){
                  dispatch(addToBreadcrumbs(feature.featureCode, {id: parentModule.uniqueNo, label: parentModule.moduleName, level: item.level-1}))
              }

              dispatch(addToBreadcrumbs(feature.featureCode, {id: item.id, label: item.label, level: item.level}));
          }
          else{

              dispatch(addToBreadcrumbs(feature.featureCode, {id: item.id, label: item.label, level: item.level}));
          }
      }

    //   //  if there is any breadcrumb with level higer than selected breadcrumb, it will be removed
      feature.breadCrumbs.map(crumb=>{
          if(crumb.level>=item.level&&crumb.id!==item.id){
              dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
              return crumb
          }
          return crumb;
      })
  }

  const handleDelete = (item) => {
      dispatch(removeFromOpenTabs(feature.featureCode, item))
      dispatch(setSelectedModule(feature.featureCode, feature.featureCode));
      feature.breadCrumbs.map(crumb=>{
          if(crumb.level>=1){
              dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
              return crumb
          }
          return crumb;
      })
  }

  const handleClickBreadcrumb = (item) => {
      dispatch(setSelectedModule(feature.featureCode, item.id));
      if(item.id!==feature.featureCode && feature.openTabs.filter(e=>e.label===item.label).length<1){
          dispatch(addToOpenTabs(feature.featureCode, item));
      }
      feature.breadCrumbs.map(crumb=>{
          if(crumb.id!==item.id&&crumb.level >= item.level){
              dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
              return crumb
          }
          return crumb;
      }) 
  }

  const handlePin = () => {
      const currentModuleName = feature.modules.filter(e => e.uniqueNo === feature.showModule)[0].moduleName;
      if(pinnedModules.filter(e=>e.selectedModule===feature.showModule).length<1){
        dispatch(addToPinnedModules({
            featureCode: selectedFeature,
            selectedModule: feature.showModule,
            moduleName: currentModuleName,
            module: feature
        }))
      }
  }

  const handleOpenPin = (item) => {
      dispatch(openPinnedModule(item.featureCode, item.module));
      handleBookmarkClose();
  }

  const handleRemovePin = (item) => {
    if(pinnedModules.filter(e=>e===item).length>0){
        dispatch(removeFromPinnedModules(item));
    }
  }

//   const handleClickPin = () => {
//       const label = feature.modules.filter(e=>e.uniqueNo===feature.selectedModule)[0].moduleName
//       if(selectedFeature === feature.featureCode){
//           dispatch(addToPinnedModules({label: label,feature: feature}));
//       }
//   }

    return(
    <div>
        
        <div className="flex justify-start w-100" >
            <div className="w-full" >
                {feature.openTabs.length>0&&(
                    <Box className="px-1 pt-1 bottom-1 text-left ml-5" style={{backgroundColor: '#fff'}} >
                        {feature.openTabs.length>0 && feature.openTabs.map((item)=>(
                            <>
                                {feature.showModule===item.id ? (
                                    <Chip key={item.id} style={{backgroundColor: '#83a3bb',}} className="text-xs m-1 text-white" label={item.label} size="small" onDelete={()=>handleDelete(item)} />
                                ):(
                                    <Chip key={item.id} style={{border: '1px solid #83a3bb'}} className=" bg-transparent hover:bg-light-grey hover:text-white text-xs m-1" size="small" label={item.label} onClick={()=>handleClick(item)}  onDelete={()=>handleDelete(item)} />
                                )}
                            </>
                        ))}
                    </Box>
                )}
                
                
                <Box className="flex justify-between border-4 border-solid border-white text-white items-center px-1 ml-5 text-left" style={{backgroundColor: '#052a4f'}} >
                    <div className='flex justify-start items-center' >
                        {feature.breadCrumbs.length>1 &&(
                            <IconButton style={{backgroundColor: '#cccc00'}} onClick={()=>handlePin()} className="rounded-full p-1 m-1" >
                                <img src={getIconByKey('pinBlack')} alt="pin Icon" className="w-4 h-auto m-0" />
                            </IconButton>
                        )}
                        
                        <Breadcrumbs className="text-white text-sm" >
                            {feature.breadCrumbs.map((item)=>(
                                <p 
                                    onClick={()=>handleClickBreadcrumb(item)} 
                                    className="cursor-pointer my-1 text-white"
                                    key={item.id}
                                > 
                                    {item.label}{feature.breadCrumbs.indexOf(item) === feature.breadCrumbs.length-1&&' /'}
                                </p>
                            ))}
                        </Breadcrumbs>
                    </div>
                </Box>
            </div>
            <IconButton id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleBookmark} 
                className="rounded-full w-12 h-12 ml-2 mr-4" 
                style={{background: '#cccc00'}} 
            >
                <img src={getIconByKey('pinned')} alt="Pinned Modules Logo" className="w-5 h-auto m-0"  />
            </IconButton>
            <Menu
            id="basic-menu"
            anchorEl={bookMark}
            open={open}
            onClose={handleBookmarkClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
                {pinnedModules.length>0 ? pinnedModules.map((item)=>(
                    <MenuItem disableRipple>
                        <Link component="button" onClick={()=>handleOpenPin(item)} className="text-2xl" underline='false' >{item.moduleName}</Link>
                        &nbsp;&nbsp;
                        <IconButton sx={{width: '14px', height: '14px'}} className="p-1" onClick={()=>handleRemovePin(item)} >
                            <img src={getIconByKey('closeBlue')} alt="closeIcon" style={{width: '10px', height: '10px'}} className="ml-5" />
                        </IconButton>
                    </MenuItem>
                )):(<p>&nbsp;&nbsp;No Pinned Modules!&nbsp;&nbsp;</p>)}

            </Menu>
        </div>
        {isLoading?(
            <CircularProgress />
        ):(
            <>
                <ComponentHolder index={feature.featureCode} type={'main'} value={feature.showModule}>
                    <MainPage key={feature.featureCode} feature={feature} getModuleChartData={getModuleChartData} />
                </ComponentHolder>
                {feature.modules.length > 0 && feature.modules.map((item)=>(
                    <ComponentHolder index={item.uniqueNo} key={item.uniqueNo} type={'main'} value={feature.showModule}  >
                        <ModuleHolder feature={feature} module={item} getModuleChartData={getModuleChartData} />
                    </ComponentHolder>
                ))}
            </>
        )}
            
    </div>
  )
}

const MainPage = ({feature, getModuleChartData}) =>{

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("Module Feature:", feature)
    })

    const handleClick = (item) => {
        dispatch(setSelectedModule(feature.featureCode, item.uniqueNo));

        if(feature.breadCrumbs.filter(e=>e.id===item.id).length<1){
            dispatch(addToBreadcrumbs(feature.featureCode, {id: item.uniqueNo, label: item.moduleName, level: 1}));
        }
        feature.breadCrumbs.map(crumb=>{
            if(crumb.level===1 && crumb.id!==item.uniqueNo){
                dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
                return crumb
            }
            return crumb;
        })
        if(feature.openTabs.filter(e=>e.id===item.uniqueNo).length<1){
            dispatch(addToOpenTabs(feature.featureCode, {id: item.uniqueNo, label: item.moduleName, level: 1}));
        }

        getModuleChartData(item);
    }

    return(
      <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} className="px-5 py-3" >

           {/* mapping all the modules inside a feature as button */}
        {feature.modules.length>0 && feature.modules.map((item)=>(
            <>
                {item.parentModuleId==null&&item.moduleChartDetails!=null?(
                <Grid item xs={6} >

                    <div className="text-center mx-2 my-0" >
                        <p>{item.moduleName}</p>
                        <ModuleChartFrame current={item} getModuleChartData={getModuleChartData} feature={feature} />
                    </div>
                </Grid>

                ):(
                    <>
                        {item.parentModuleId==null&&(
                            <button key={item.id} onClick={()=>handleClick(item)} className=" m-5 text-white font-bold border-none bg-red-500 hover:bg-red-700 rounded-md p-3 cursor-pointer">
                                {item.moduleName}
                            </button>
                        )}   
                    </>
                )}
            </>
        ))}
        
        </Grid>
    )
}

  export default FeatureHolder;