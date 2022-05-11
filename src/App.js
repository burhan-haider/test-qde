import React, { useState, useEffect } from 'react';
import FeatureHolder from 'components/common/FeatureHolder';
import ComponentHolder from './components/common/componentHolder/ComponentHolder';
import { CircularProgress } from '@mui/material';
import {
  useSelector,
  // useDispatch
} from 'react-redux';

function App() {

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
    <div className="text-center" style={{backgroundColor: '#052a4f'}}>
      {isLoading ? (<CircularProgress sx={{color: 'white', marginTop: '150px'}} />) : (
        <>
          {newFeatures.map((item)=>( 
            <ComponentHolder 
              key={item.featureCode?item.featureCode:item.featureMapping_Id} 
              index={item.featureCode?item.featureCode:item.featureMapping_Id} 
              value={selectedFeature}
              >
              <FeatureHolder feature={item} />
            </ComponentHolder>
          ))}
        </>
      )}
      
    </div>
  );
}

export default App;