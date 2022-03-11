// import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PageOne from './components/PageOne';
import Home from './components/Home';
import PageTwo from './components/PageTwo';
import Post from './components/PageOne/Posts/post';
import { Box } from '@mui/material' ;
import ComponentHolder from './components/componentHolder/ComponentHolder';
import {
  useSelector,
  // useDispatch
} from 'react-redux';
// import { setSelectedSubFeature } from './redux/routes/routes.actions';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const features = useSelector(state => state.routes.features);
  const mainRoute = useSelector(state => state.routes.mainRoute);

  const mapComponent = [
    {
      id: 0,
      component: <Home feature={features[0]} />,
    },
    {
      id: 1,
      component: <PageOne feature={features[1]} />,
    }
  ]

  return (
    <div className="App bg-purple-700">
      {mapComponent.map((item)=>( 
        <ComponentHolder key={item.id} index={item.id} value={mainRoute}>
          {item.component}
        </ComponentHolder>
      ))}
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='page-one' element={<PageOne />} >
          <Route path=':postId' element={<Post />} />
        </Route>
        <Route path='page-two' element={<PageTwo />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes> */}
    </div>
  );
}





export default App;
