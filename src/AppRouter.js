import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Error from './pages/Error';
import Login from './pages/Login';
import AdminDash from './components/admin/AdminDash';
import AddTeacherForm from './components/admin/AddStaffs';
import ChatPage from './components/ChatApp/ChatPage';
import TeacherDash from './components/teachers/TeacherDash';
import AddChild from './components/teachers/AddChild';
import ChildAttend from './components/teachers/ChildAttend';
import LeaveRequest from './components/teachers/LeaveRequest';
import HandleRequest from './components/admin/HandleRequest';
import SplChild from './components/admin/SplChild';
import ChildHealth from './components/teachers/ChildHealth';
import PasswordChangeModal from './components/teachers/Cpass';
import Dashboard from './components/admin/ADashboard';
import Main from './components/parents/Main';
import AttendanceHistory from './components/teachers/AttendanceHistory';


function AppRouter() {
  return (
    <Router>

      <Routes>

        {/* LandingPage */}
        <Route path="*" element={<Error />} /> 
        <Route path='/' element={<LandingPage />} />
        <Route path='/Login' element={<Login />} />
        
        {/* Admin */}
        <Route path='/admindash' element={<AdminDash/>} />
        <Route path='/addstaffs' element={<> <AdminDash/> <AddTeacherForm/> </> } />
        <Route path='/handlerequest' element={<> <AdminDash/> <HandleRequest/> </> } />
        <Route path='/SplChild' element={<><AdminDash/>  <SplChild/> </>} />
        <Route path='/dashboard' element={<><AdminDash/>  <Dashboard/> </>} />
      
        
        {/* Teacher */}
        <Route path='/teacherdash' element={<TeacherDash />} />
        <Route path='/addchild' element={<> <TeacherDash/> <AddChild/> </>  } />
        <Route path='/childattend' element={<> <TeacherDash/> <ChildAttend/> </>  } />
        <Route path='/leaverequest' element={<> <TeacherDash/> <LeaveRequest/> </>  } />
        <Route path='/childhealth' element={<> <TeacherDash/> <ChildHealth/> </>  } />
        <Route path='/cpass' element={<> <TeacherDash/> <PasswordChangeModal/> </>  } />
        <Route path='/attendancehistory' element={<> <TeacherDash/>  <AttendanceHistory/> </>  } />
        

        <Route path="/chat" element={<><TeacherDash/><ChatPage/></>} />
        
        {/* Parent */}
        <Route path='/Main' element={<Main />} />
        
      
      </Routes>

    </Router>
  );
}

export default AppRouter;
