// import React, { useContext } from 'react'
// import {Route , Routes} from 'react-router-dom'
// import Home from './pages/Home'
// import ApplyJob from './pages/ApplyJob'
// import Applications from './pages/Applications'
// import RecruiterLogin from './components/RecruiterLogin'
// import { AppContext } from './context/AppContext'
// import Dashboard from './pages/Dashboard'
// import AddJob from './pages/AddJob'
// import ManageJobs from './pages/ManageJobs'
// import ViewApplications from './pages/ViewApplications'
// import 'quill/dist/quill.snow.css'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// const App = () => {
//   const {showRecruiterLogin, companyToken} = useContext(AppContext)


//   return (
//     <div>
//     {showRecruiterLogin &&   <RecruiterLogin/> }
//       <ToastContainer/>
//       <Routes>
//         <Route path = '/' element= {<Home/>}/>
//         <Route path = '/apply-job/:id' element= {<ApplyJob/>}/>
//         <Route path = '/applications' element = {<Applications/>} />

//         <Route path='/dashboard' element = {<Dashboard/>}>
//           {companyToken ? <>
//           <Route path='add-job' element = {<AddJob/>} />
//           <Route path='manage-job' element= {<ManageJobs/>}/>
//           <Route path='view-applications' element = {<ViewApplications/>} />

//           </>
//           : null
//           }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

//         </Route>

//       </Routes>
//     </div>
//   )
// }

// export default App

// // import React, { useContext } from 'react'
// // import { Route, Routes, Navigate } from 'react-router-dom'
// // import Home from './pages/Home'
// // import ApplyJob from './pages/ApplyJob'
// // import Applications from './pages/Applications'
// // import RecruiterLogin from './components/RecruiterLogin'
// // import { AppContext } from './context/AppContext'
// // import Dashboard from './pages/Dashboard'
// // import AddJob from './pages/AddJob'
// // import ManageJobs from './pages/ManageJobs'
// // import ViewApplications from './pages/ViewApplications'
// // import 'quill/dist/quill.snow.css'
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css'

// // const App = () => {
// //   const { showRecruiterLogin, companyToken } = useContext(AppContext)

// //   return (
// //     <div>
// //       {showRecruiterLogin && <RecruiterLogin />}
// //       <ToastContainer />
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path='/' element={<Home />} />
// //         <Route path='/apply-job/:id' element={<ApplyJob />} />
// //         <Route path='/applications' element={<Applications />} />

// //         {/* Dashboard with nested routes */}
// //         <Route path='/dashboard' element={<Dashboard />}>
// //           {companyToken ? (
// //             <>
// //               {/* Default redirect: if user hits /dashboard directly */}
// //               <Route index element={<Navigate to="manage-job" replace />} />

// //               <Route path='add-job' element={<AddJob />} />
// //               <Route path='manage-job' element={<ManageJobs />} />
// //               <Route path='view-applications' element={<ViewApplications />} />
// //             </>
// //           ) : (
// //             // If not logged in, redirect to home (or login page)
// //             <Route index element={<Navigate to="/" replace />} />
// //           )}
// //         </Route>

// //         {/* Fallback Route */}
// //         <Route path='*' element={<h2>404 - Page Not Found</h2>} />
// //       </Routes>
// //     </div>
// //   )
// // }

// // export default App


import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />

        {/* Dashboard with nested routes */}
        <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ? (
            <>
              {/* Default redirect when visiting /dashboard */}
              <Route index element={<Navigate to="manage-job" replace />} />

              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-job' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </>
          ) : (
            // If not logged in, redirect to home
            <Route index element={<Navigate to="/" replace />} />
          )}
        </Route>

        {/* Catch-all route for unknown paths */}
        <Route path='*' element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  )
}

export default App
