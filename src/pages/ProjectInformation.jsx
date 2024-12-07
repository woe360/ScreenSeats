import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import projectPdf from '../assets/project-doc.pdf'; // You'll need to add your PDF file
import projectImage from '../assets/project-image.jpg'; // You'll need to add your image

const ProjectInformation = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Project Information</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* PDF Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Documentation</h2>
              <div className="aspect-[8.5/11] w-full">
                <embed
                  src={projectPdf}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  className="border border-gray-200 rounded"
                />
              </div>
              <a 
                href={projectPdf} 
                download
                className="mt-4 inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Download PDF
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
              <div className="aspect-video w-full mb-4">
                <img
                  src={projectImage}
                  alt="Project Overview"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <p className="text-gray-600">
                This project implements a ticket booking system with features including event management,
                seat selection, and ticket generation.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectInformation; 