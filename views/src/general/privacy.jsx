import React, { useEffect } from "react";
import Pageheader from "./partials/pageHeader";

export default function Privacy() {
  useEffect(() => {
    document.title =
      "Privacy Policy | We create digital solutions that enhance communication and growth.";
  }, []);

  return (
    <>
      <Pageheader title="Privacy Policy" description="Learn how Alphatech Multimedia Technologies protects client information, ensures compliance with NDPR and GDPR, and handles project details responsibly."  />
      <div className="max-w-4xl mx-auto bg-primary-100 px-6 py-10 text-primary-800 leading-relaxed">
        <p className="mb-6">
          <strong>Effective Date: September 1, 2025</strong>
          <br />
          At <strong>Alphatech Multimedia Technologies</strong> (“we,” “our,” or
          “us”), we value privacy and are committed to protecting information
          entrusted to us. We comply with the{" "}
          <strong>Nigeria Data Protection Regulation (NDPR)</strong> and align
          with international standards such as the{" "}
          <strong>General Data Protection Regulation (GDPR)</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>General Public:</strong> We do not collect personal
            information from visitors who simply browse our website or
            platforms.
          </li>
          <li>
            <strong>Clients / Project Engagements:</strong> When you engage us
            for a project, we may collect limited information such as contact
            details (name, company name, email, phone number), project-related
            details (requirements, specifications, supporting documents), and
            billing details (only where necessary).
          </li>
          <li>
            <strong>Technical Data:</strong> IP address, browser type, device
            details for security and analytics.
          </li>
          <li>
            <strong>Cookies:</strong> Our websites may use cookies to enhance
            functionality and improve the user experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Information</h2>
        <p className="mb-6">
          We use collected information strictly for legitimate business
          purposes, including:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>To review, plan, and execute client projects.</li>
          <li>To communicate with clients regarding inquiries, support, and updates.</li>
          <li>To prepare contracts, process invoices, and manage payments.</li>
          <li>To improve our systems, security, and services.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Sharing and Disclosure</h2>
        <p className="mb-6">
          We do not sell or trade your personal or business information. Data
          may only be shared with:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Trusted service providers (e.g., hosting or payment processors).</li>
          <li>Legal or regulatory authorities if required by law.</li>
          <li>
            Business partners or subcontractors strictly for project execution,
            with confidentiality safeguards.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p className="mb-6">
          We implement appropriate technical and organizational measures to
          protect client data from unauthorized access, alteration, or loss.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Retention</h2>
        <p className="mb-6">
          Project and contract-related data is retained only for as long as
          required to fulfill contractual obligations, legal requirements, or
          financial record-keeping. Once no longer required, data is securely
          deleted or anonymized.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p className="mb-6">
          Clients and partners have the right to access, correct, or request
          deletion of their information (subject to legal or contractual
          retention requirements). You may also object to certain processing or
          withdraw consent where applicable.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">7. Data Protection Officer (DPO)</h2>
        <p className="mb-6">
          We have appointed a Data Protection Officer (DPO) to oversee compliance
          with NDPR and GDPR. You may contact our DPO for any privacy-related
          concerns:
        </p>
        <p className="mb-6">
          <strong>Data Protection Officer (DPO)</strong>
          <br />
          Alphatech Multimedia Technologies
          <br />
          RC No: 3596357
          <br />
          Mr Adekunle
          <br />
          Email:dpo@alphatech.ng
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">8. Policy Updates</h2>
        <p className="mb-6">
          We may update this Privacy Policy periodically. Any changes will be
          published on our website with a new <strong>“Effective Date.”</strong>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p>
          For questions or concerns about this Privacy Policy, please contact us
          at:
        </p>
        <p className="mt-4">
          <strong>Alphatech Multimedia Technologies</strong>
          <br />
          RC No: 3596357
          <br />
          23, Wole Ariyo, Lekki Phase 1, Lagos, Nigeria.
          <br />
          support@alphatech.ng
          <br />
          +234 91x xxx xxxx
        </p>
      </div>
    </>
  );
}
