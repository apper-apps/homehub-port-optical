import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import PropertyListingPage from "@/components/pages/PropertyListingPage";
import PropertyDetailPage from "@/components/pages/PropertyDetailPage";
import SavedPropertiesPage from "@/components/pages/SavedPropertiesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<PropertyListingPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/saved" element={<SavedPropertiesPage />} />
          </Routes>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;