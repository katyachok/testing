// import {useLayoutEffect} from 'react';
import { Routes, HashRouter as Router, Route, Link } from "react-router-dom";

import { ReactComponent as Logo } from './logo.svg';
import {Admin} from './pages/admin/Admin'
import {Customer} from './pages/customer/Customer'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'


import './App.css';

const App = () => {
  // useLayoutEffect(() => {
  //   window.Chargebee.init({
  //     site: "attempt2-test",
  //     publishableKey: "test_cH934Hcucddc6dLrODyMGTA2SyTobmltda"
  //   })
  // }, [])

    return (
      <ErrorBoundary>
      <div className="App">
        <Logo />
        <main>
          <Router>
        <nav>
        <ul>
          <li>
            <Link to="/customer">Customer</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
            <Routes>
              <Route path="customer" element={<Customer/>} />
              <Route path="admin" element={<Admin />} />
            </Routes>
          </Router>
        </main>
    </div>
    </ErrorBoundary>
    )
}

export default App;

