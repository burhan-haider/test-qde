import './App.css';
import FeatureHolder from 'components/common/FeatureHolder';
import ComponentHolder from './components/common/componentHolder/ComponentHolder';
import {
  useSelector,
  // useDispatch
} from 'react-redux';

function App() {
  // const features = useSelector(state => state.routes.features);
  const newFeatures = useSelector(state => state.routes.newFeatures.features);
  const selectedFeature = useSelector(state => state.routes.newFeatures.featureCode);
  // const mainRoute = useSelector(state => state.routes.mainRoute);

  return (
    <div className="App " style={{backgroundColor: '#052a4f'}}>
      {newFeatures.map((item)=>( 
        <ComponentHolder 
          key={item.featureCode} 
          index={item.featureCode} 
          value={selectedFeature}
          >
          <FeatureHolder feature={item} />
        </ComponentHolder>
      ))}
    </div>
  );
}

export default App;