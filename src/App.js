import React, { useState, useEffect } from 'react';
import FeatureHolder from 'components/common/FeatureHolder';
import ComponentHolder from './components/common/componentHolder/ComponentHolder';
import { CircularProgress } from '@mui/material';
import {
  useSelector,
  // useDispatch
} from 'react-redux';

function App({ hideHeader, setHideHeader }) {

  const [isLoading, setIsLoading] = useState(true);
  const newFeatures = useSelector(state => state.features.features.features);
  const selectedFeature = useSelector(state => state.features.features.featureCode);
  const [features, setFeatures] = useState(newFeatures);

  useEffect(() => {
    if( newFeatures !== null && newFeatures !== undefined && newFeatures.length > 0 ){
      setIsLoading(false);
    }
    else{
      setIsLoading(true);
    }

  },[newFeatures])

  return (
    <div className="text-center overflow-hidden" style={{transition: 'all 0.1s ease-in-out' ,backgroundColor: '#052a4f', transform: hideHeader == true ? 'translateY(-40px)' : 'none' }} >
      {isLoading ? (<CircularProgress sx={{color: 'white', marginTop: '150px'}} />) : (
        <>
          {newFeatures.map((item)=>( 
            <ComponentHolder 
              key={item.featureCode?item.featureCode:item.featureMapping_Id} 
              index={item.featureCode?item.featureCode:item.featureMapping_Id} 
              value={selectedFeature}
              hideHeader={hideHeader}
              >
              <FeatureHolder feature={item} hideHeader={hideHeader} setHideHeader={setHideHeader} />
            </ComponentHolder>
          ))}
        </>
      )}
      
    </div>
  );
}

export default App;