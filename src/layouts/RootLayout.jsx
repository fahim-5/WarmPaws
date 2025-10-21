import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <main className="flex-grow pt-16"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;