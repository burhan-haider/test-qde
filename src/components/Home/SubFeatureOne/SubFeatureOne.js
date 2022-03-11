import { useEffect, useState } from 'react';
import {useDispatch, useSelecttor} from 'react-redux';
import {
    addToOpenFeatures, 
    addToOpenTabs, 
    setSelectedSubFeature
} from '../../../redux/routes/routes.actions';

const SubFeatureOne = ({feature, subFeature}) => {
  
    const dispatch = useDispatch();
    const homeFeature = feature;
    const subFeatureOne = subFeature;
    const openTabs = feature.openTabs;
    useEffect(() => {
        console.log("Home Feature: ", homeFeature)
        console.log("Sub Feature One: ", subFeatureOne)
        
    });
  
    const handleClick = () => {
      dispatch(setSelectedSubFeature(homeFeature.id, homeFeature.id));
      if(openTabs.filter(e => e.id === homeFeature.subFeatures[1].id).length < 1){
        dispatch(addToOpenTabs(homeFeature.id, homeFeature.subFeatures[1]))
      }
    }
  
    return (
      <div>
        <button class="bg-red-500 transition my-5 cursor-pointer border-none shadow-lg text-white rounded p-5 hover:bg-red-700" onClick={()=>handleClick()} >Sub Feature Two</button>
        <h1 className="text-5xl font-bold text-blue-700" >Sub Feature One</h1>
      </div>
    )
  }

  export default SubFeatureOne;