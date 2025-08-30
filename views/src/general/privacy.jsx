import React, { useEffect } from "react";
import Pageheader from "./partials/pageHeader";

export default function Privacy() {
   useEffect(() => {
      document.title = "Privacy Policy | We create digital solutions that enhance communication and growth.";
    }, []);
  return (
  <>
  <Pageheader  title="Privacy Policy"
        description=""/>
  </>
  );
}
