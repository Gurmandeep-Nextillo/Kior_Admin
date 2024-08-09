import React from 'react';
import "../src/assests/sass/Style.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Form/Login/Login';
import Dashboard from './component/Dashboard/Dashboard';
import Test from './component/Test/Test';
import store from './redux/store';
import { Provider } from 'react-redux';
import Categories from './component/Categories/Categories';
import Packages from './component/Packages/Packages';


function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={<Test />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/packages" element={<Packages />} />
          </Routes>
        </Router>
      </Provider>,
    </>
  );
}

export default App;
