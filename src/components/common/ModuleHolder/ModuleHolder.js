import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToMapTrail, setSelectedSubFeature, addToOpenTabs, addToModules } from 'redux/routes/routes.actions';
import ModuleFrame from './ModuleFrame';

const ModuleHolder = ({feature, module}) => {
    const dispatch = useDispatch();
    // const allModules = useSelector(state=>state.routes.modules);
    const selectedFeature = useSelector(state=>state.features.features.featureCode);
    // let modules = allModules.filter(e=>e.parentModuleId===subFeature.uniqueNo);
    
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
        // feature.breadCrumbs.map(crumb=>{
        //     if(item.parentModuleId === crumb.id){
        //         console.log("Module Parent Matches Crumb")
        //         dispatch(addToMapTrail(feature.featureCode, {
        //             id:item.uniqueNo, 
        //             label: item.moduleName, 
        //             level: crumb.level + 1,
        //         }))
        //         if(feature.openTabs.filter(e=>e.id===item.uniqueNo).length<1){
        //             dispatch(addToOpenTabs(feature.featureCode, {
        //                 id: item.uniqueNo, 
        //                 label: item.moduleName,
        //                 level: crumb.level + 1,
        //             }))
        //         }
        //     }
        // })
        // dispatch(setSelectedSubFeature(feature.featureCode, item.uniqueNo))
    }

    

    return(
        <div>
            {!module.hasChildren?(
                <h1 className="text-red-700 pt-20 font-bold text-5xl" >{module.moduleName}</h1>
                
            ):(
                <div>
                    <h1 className="text-red-700 pt-20 font-bold text-5xl" >{module.moduleName}</h1>
                
                    {/* {modules.map(item=>(
                        <button key={item.uniqueNo} onClick={()=>handleClick(item)} className=" m-5 text-white font-bold border-none bg-red-500 hover:bg-red-700 rounded-md p-3 cursor-pointer">
                            {item.moduleName}
                        </button>
                    ))} */}
                </div>
            )}
        </div>
    )
}


export default ModuleHolder;