import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

function contactPage() {
  return (
    <div className='min-h-screen'>
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default contactPage;
