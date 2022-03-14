import './App.css';
import FeatureHolder from 'components/FeatureHolder';
import ComponentHolder from './components/componentHolder/ComponentHolder';
import {
  useSelector,
  // useDispatch
} from 'react-redux';

function App() {

  const features = useSelector(state => state.routes.features);
  const mainRoute = useSelector(state => state.routes.mainRoute);

  return (
    <div className="App bg-purple-700">
      {features.map((item)=>( 
        <ComponentHolder key={item.id} index={item.id} value={mainRoute}>
          <FeatureHolder feature={item} />
        </ComponentHolder>
      ))}
    </div>
  );
}





export default App;
