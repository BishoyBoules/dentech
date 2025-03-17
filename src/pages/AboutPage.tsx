import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logos-02.png';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar - keeping consistent with landing page */}
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

            {/* About Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8 font-display">About Trumedfin</h1>

                    <div className="prose prose-indigo max-w-none">
                        <p className="text-lg text-gray-500 mb-6 font-sans">
                            Trumedfin is a comprehensive medical practice management system designed to streamline the day-to-day operations of modern medical clinics. Our platform combines cutting-edge technology with user-friendly interfaces to provide an all-in-one solution for medical professionals.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-display">Our Mission</h2>
                        <p className="text-lg text-gray-500 mb-6 font-sans">
                            Our mission is to empower medical practices with digital tools that enhance efficiency, improve patient care, and simplify practice management. We believe that when administrative tasks are streamlined, medical professionals can focus more on what matters most - their patients.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-display">Key Features</h2>
                        <ul className="list-disc list-inside text-lg text-gray-500 mb-6 space-y-2 font-sans">
                            <li>Advanced inventory management system</li>
                            <li>Secure patient records management</li>
                            <li>Intuitive appointment scheduling</li>
                            <li>Comprehensive reporting tools</li>
                            <li>User-friendly interface</li>
                            <li>Secure data storage</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-display">Why Choose Trumedfin?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Easy to Use</h3>
                                <p className="text-gray-500 font-sans">
                                    Our intuitive interface means minimal training is required, allowing your team to get up and running quickly.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Secure</h3>
                                <p className="text-gray-500 font-sans">
                                    We implement the latest security measures to ensure your practice and patient data remains protected.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Reliable</h3>
                                <p className="text-gray-500 font-sans">
                                    Built on robust technology, our system ensures consistent performance when you need it most.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Supportive</h3>
                                <p className="text-gray-500 font-sans">
                                    Our dedicated support team is always ready to help you make the most of our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
