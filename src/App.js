import logo from './logo.svg';
import './App.css';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import Post from './components/PageOne/Posts/post';
import { Box } from '@mui/material' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
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
      </Routes>
    </div>
  );
}

const Home = () =>{
  return(
    <div>
      <Box sx={{
        backgroundColor: 'white',
        paddingY: '12px',
        paddingX: '50px',
        textAlign: 'left',
        borderBottom: '1px solid #999'
      }} >
        refreshing Tabs here 
      </Box>
      <Box sx={{
        backgroundColor: 'white',
        paddingY: '12px',
        paddingX: '50px',
        textAlign: 'left',
      }} >
        Breadcrumbs here 
      </Box>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App;
