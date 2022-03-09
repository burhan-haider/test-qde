import { useEffect, useState } from 'react';
import {useDispatch, useSelecttor} from 'react-redux';
import {setSelectedSubFeature} from '../../../redux/routes/routes.actions';

const SubFeatureTwo = ({feature, subFeature}) => {

    const dispatch = useDispatch();
    const homeFeature = feature;
    const subFeatureOne = subFeature;

  
    const handleClick = () => {
        dispatch(setSelectedSubFeature(homeFeature.id, 1));
    }
  
    return (
      <div>
          {/* <button class="bg-blue-500 my-5 text-white rounded p-5 hover:bg-blue-700" onClick={()=>handleClick()} >Sub Feature One</button> */}
        <h1 className="text-red-700 font-bold text-5xl" >Sub Feature Two</h1>
      </div>
    )
}

export default SubFeatureTwo;