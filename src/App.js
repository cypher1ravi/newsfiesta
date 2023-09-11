import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
      // onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
       <News setProgress={setProgress} key="general" pageSize={12} country='in' category='general' />
      <Routes>
        <Route path='/' element={<News setProgress={setProgress} key="general" pageSize={12} country='in' category='general' />} />
        <Route path='/sports' element={<News setProgress={setProgress} key="sports" pageSize={12} country='in' category='sports' />} />
        <Route path='/business' element={<News setProgress={setProgress} key="business" pageSize={12} country='in' category='business' />} />
        <Route path='/entertainment' element={<News setProgress={setProgress} key="entertainment" pageSize={12} country='in' category='entertainment' />} />
        <Route path='/health' element={<News setProgress={setProgress} key="health" pageSize={12} country='in' category='health' />} />
        <Route path='/science' element={<News setProgress={setProgress} key="science" pageSize={12} country='in' category='science' />} />
        <Route path='/technology' element={<News setProgress={setProgress} key="technology" country='in' category='technology' />} />
      </Routes>
    </div>
  );
}

export default App;
