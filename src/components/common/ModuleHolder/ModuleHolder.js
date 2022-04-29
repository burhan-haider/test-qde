import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedModule, addToBreadcrumbs, addToOpenTabs } from 'redux/features/features.actions';
import ModuleDataContainer from 'components/common/modules/moduleDataContainer/ModuleDataContainer';
import ModuleChartFrame from 'components/common/modules/mainModuleSearchFrame/ModuleChartFrame';
import { Grid } from '@mui/material';
// import ModuleFrame from './ModuleFrame';

const ModuleHolder = ({feature, module, getModuleChartData}) => {
    const dispatch = useDispatch();
    // const allModules = useSelector(state=>state.routes.modules);
    const selectedFeature = useSelector(state=>state.features.features.featureCode);
    let modules = feature.modules.filter(item=>item.parentModule_Id === module.module_Id);
    
    // useEffect(() => {
    //     console.log(selectedFeature);
    //     if(selectedFeature === feature.featureCode){
    //         console.log("SubFeature Modules:-",modules)
    //         console.log('Feature:-', feature)
    //     }
        
    // });

    const handleClick = (item) => {
        // if(feature.modules.filter(e=>e.uniqueNo === item.uniqueNo).length<1){
        //     dispatch(addToModules(feature.featureCode, item))
        // }
        // console.log("BreadCrumbs:-",feature.breadCrumbs)
        // console.log("Item Parent Id:-", item.parentModuleId)
        feature.breadCrumbs.map(crumb=>{
            if(item.parentModuleId === crumb.id){
                console.log("Module Parent Matches Crumb")
                dispatch(addToBreadcrumbs(feature.featureCode, {
                    id:item.uniqueNo, 
                    label: item.moduleName, 
                    level: crumb.level + 1,
                }))
                if(feature.openTabs.filter(e=>e.id===item.uniqueNo).length<1){
                    dispatch(addToOpenTabs(feature.featureCode, {
                        id: item.uniqueNo, 
                        label: item.moduleName,
                        level: crumb.level + 1,
                    }))
                }
            }
        })
        dispatch(setSelectedModule(feature.featureCode, item.uniqueNo))
    }

    

    return(
        <div>
            {module.hasChildren==false ? (
                <>
                    {module.presentationCategory!==null ? (
                        <ModuleDataContainer 
                            moduleCode={module.module_Id}
                            moduleURL={module.moduleURL}
                            presentationCategory={module.presentationCategory}
                            moduleId={module.uniqueNo}
                        />
                    ):(
                        <>
                            {module.moduleChartDetails!=null?(
                                <ModuleChartFrame current={module} getModuleChartData={getModuleChartData} feature={feature} />
                            ):(
                                <div>
                                    <h1 className="text-red-700 pt-20 font-bold text-5xl" >{module.moduleName}</h1>
                                    
                                </div>
                            )}
                        </>
                    )}
                </>
                
            ):(
                <Grid container className="px-5 py-3">
                    {modules.map(item=>{
                        if(item.moduleChartDetails!=null){
                            return(
                                <Grid item xs={6} >
                                    <div className="rounded-md shadow-lg text-center m-4" >
                                        <p>{item.moduleName}</p>
                                        <ModuleChartFrame current={item} getModuleChartData={getModuleChartData} feature={feature} />
                                    </div>
                                </Grid>
                            )
                        }
                        else{
                            return(
                                <button key={item.uniqueNo} onClick={()=>handleClick(item)} className=" m-5 text-white font-bold border-none bg-red-500 hover:bg-red-700 rounded-md p-3 cursor-pointer">
                                    {item.moduleName}
                                </button>
                            )
                        }
                    })}
                    
                </Grid>
            )}
        </div>
    )
}


export default ModuleHolder;