import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logos-02.png';
import Logo2 from '../assets/Logos-11.png'

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <img src={Logo} alt="Trumedfin Logo" className="w-48 h-auto" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                About
                            </Link>
                            <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <img src={Logo2} alt="Trumedfin Logo" className="w-48 h-auto" />
                        </div>
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-display">
                            <span className="block">Modern Solutions for</span>
                            <span className="block text-indigo-600">Medical Practices</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-sans">
                            Streamline your medical practice with our comprehensive management system. Handle appointments, inventory, and patient records with ease.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 font-display">Inventory Management</h3>
                            <p className="mt-2 text-gray-500 font-sans">Keep track of your medical supplies and equipment with our advanced inventory system.</p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 font-display">Patient Records</h3>
                            <p className="mt-2 text-gray-500 font-sans">Securely manage patient information and treatment history in one place.</p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 font-display">Appointment Scheduling</h3>
                            <p className="mt-2 text-gray-500 font-sans">Efficiently schedule and manage appointments with our intuitive calendar system.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
