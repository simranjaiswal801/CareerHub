import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Jobs from './pages/Jobs';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';
import ApplicationDetails from './pages/ApplicationDetails';
import Interviews from './pages/Interviews';
import Skills from './pages/Skills';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/applications/add" element={<ProtectedRoute><AddApplication /></ProtectedRoute>} />
            <Route path="/applications/edit/:id" element={<ProtectedRoute><EditApplication /></ProtectedRoute>} />
            <Route path="/applications/:id" element={<ProtectedRoute><ApplicationDetails /></ProtectedRoute>} />
            <Route path="/interviews" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
            <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
