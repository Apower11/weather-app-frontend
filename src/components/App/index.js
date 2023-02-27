import { Routes, Route, Navigate } from 'react-router-dom';
import Timeline from "../Timeline";
import NotFound from "../404";
import Layout from "../Layout";
import './style.css';

const App = () => (
   <div className="App">
      <Layout>
         <Routes>
            <Route index element={<Navigate to='timeline/1' replace />} />
            <Route path='timeline/:id' element={<Timeline />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Layout>
   </div>
);

export default App;