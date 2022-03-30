import './App.css';
import FeatureHolder from 'components/FeatureHolder';
import ComponentHolder from './components/componentHolder/ComponentHolder';
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
    <div className="App bg-purple-700">
      {newFeatures.map((item)=>( 
        <ComponentHolder key={item.featureCode} index={item.featureCode} value={selectedFeature}>
          <FeatureHolder feature={item} />
        </ComponentHolder>
      ))}
    </div>
  );
}

export default App;