import FeatureHolder from 'components/common/FeatureHolder';
import ComponentHolder from './components/common/componentHolder/ComponentHolder';
import {
  useSelector,
  // useDispatch
} from 'react-redux';

function App() {
  // const features = useSelector(state => state.routes.features);
  const newFeatures = useSelector(state => state.features.features.features);
  const selectedFeature = useSelector(state => state.features.features.featureCode);
  // const mainRoute = useSelector(state => state.routes.mainRoute);

  return (
    <div className="text-center" style={{backgroundColor: '#052a4f'}}>
      {newFeatures.map((item)=>( 
        <ComponentHolder 
          key={item.featureCode?item.featureCode:item.featureMapping_Id} 
          index={item.featureCode?item.featureCode:item.featureMapping_Id} 
          value={selectedFeature}
          >
          <FeatureHolder feature={item} />
        </ComponentHolder>
      ))}
    </div>
  );
}

export default App;