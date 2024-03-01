import React from 'react';
import './App.css';
import AppRouters from './route/AppRouters';
import { Provider } from 'react-redux';
import store from './app/store';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <div className='container-fluid'>
            <div className='row p-0'>
              <ToastContainer/>
              <AppRouters/>
            </div>
          </div>
        </div>
      </Provider>
  );
}

export default App;


{/* <Routes>
<Route path='/login' element={<Login/>}></Route>
<Route path='/forgot-password' element={<ForgotPassword/>}></Route>
{/* <Route path='/reset-password/:oneTimeToken' element={<ChangePassword></ChangePassword>}></Route> */}
{/* <Route path='/reset-password/:oneTimeToken' element={<ChangePassword/>}></Route>
<Route path='/reset-password-link' element={<LinkSent/>}></Route>
<Route path='/' element={<RequireAuth>
  <Home/>
</RequireAuth>}></Route>
<Route path='/valid-licenses' element={<RequireAuth>
  <ValidLicense/>
</RequireAuth>}></Route>
<Route path='/create' element={<RequireAuth>
  <CreateLicense/>
</RequireAuth>}></Route>
<Route path='/edit/:id' element={<RequireAuth>
  <EditLicense/>
</RequireAuth>}></Route>
<Route path='/valid-licenses-detail/:id' element={<RequireAuth>
  <LicenseDetail/>
</RequireAuth>}></Route>
<Route path='/invalid-licenses-detail/:id' element={<RequireAuth>
  <LicenseDetailInvalid/>
</RequireAuth>}></Route>
<Route path='/invalid-licenses' element={<RequireAuth>
  <InvalidLicense/>
</RequireAuth>}></Route>
<Route path='/setting' element={<RequireAuth>
  <Setting/>
</RequireAuth>}></Route>
<Route path='/*' element={<NotFound/>}></Route>
</Routes> */}