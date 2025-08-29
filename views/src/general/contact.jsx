import React, { useEffect } from "react";
import Pageheader from "./partials/pageHeader";
import ContactSection from "../componenets/contactSection";
import Action from "../componenets/action";
import SupportOptions from "../componenets/SupportOptions";

export default function contact() {
    useEffect(() => {
      document.title = "Contact Us | We create digital solutions that enhance communication and growth.";
    }, []);
  return (
    <>
     {/* Page Header Section */}
          <Pageheader
            title="Contact Us"
            description=" We are here to assist you. Reach out to us for inquiries, support, or to discuss your project needs. Our team is ready to help you achieve your digital goals."
          />
          <ContactSection/>
          <SupportOptions/>
          <Action/>
    </>
  )
}
