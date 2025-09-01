import React, { useEffect } from "react";
import Pageheader from "./partials/pageHeader";

export default function TermsService() {
  useEffect(() => {
    document.title =
      "Terms of Service | We create digital solutions that enhance communication and growth.";
  }, []);

  return (
    <>
      <Pageheader
        title="Terms of Service"
        description="Understand the rules, responsibilities, and limitations when engaging Alphatech Multimedia Technologies for digital solutions and services."
      />

      <div className="max-w-4xl mx-auto px-6 bg-primary-100 py-10 text-primary-800 leading-relaxed">
        <p className="mb-6">
          <strong>Effective Date: September 1, 2025</strong>
          <br />
          These Terms of Service (“Terms”) govern your use of the websites,
          applications, and services provided by{" "}
          <strong>Alphatech Multimedia Technologies</strong> (“we,” “our,” or
          “us”). By accessing or using our services, you agree to be bound by
          these Terms. If you do not agree, please discontinue use of our
          services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">1. Use of Services</h2>
        <p className="mb-6">
          You may use our services solely for lawful purposes and in accordance
          with these Terms. You agree not to misuse our services or assist
          anyone in doing so.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">2. Client Responsibilities</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provide accurate and complete project details when engaging us.</li>
          <li>
            Ensure that any content, materials, or data shared with us does not
            infringe third-party rights or violate applicable laws.
          </li>
          <li>Comply with payment terms as agreed in contracts or invoices.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
        <p className="mb-6">
          All intellectual property rights in our software, designs, and
          solutions remain the property of Alphatech Multimedia Technologies
          unless otherwise stated in a signed agreement. Clients retain rights
          over their own project content and materials provided to us.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">4. Confidentiality</h2>
        <p className="mb-6">
          We respect the confidentiality of client information and project
          details. Both parties agree not to disclose confidential information
          to third parties without prior written consent, except as required by
          law.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
        <p className="mb-6">
          While we strive to deliver high-quality services, Alphatech Multimedia
          Technologies is not liable for indirect, incidental, or consequential
          damages arising from the use or inability to use our services, except
          where prohibited by law.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">6. Termination</h2>
        <p className="mb-6">
          We reserve the right to suspend or terminate access to our services if
          you breach these Terms or misuse our platforms. Clients may terminate
          services in accordance with their contractual agreements.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">7. Governing Law</h2>
        <p className="mb-6">
          These Terms shall be governed by and construed in accordance with the
          laws of the Federal Republic of Nigeria, without regard to conflict of
          law principles.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
        <p className="mb-6">
          We may update these Terms from time to time. Any updates will be
          effective upon posting to our website. Your continued use of our
          services after changes are posted constitutes acceptance of the
          revised Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p>
          For questions about these Terms, please contact us at:
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
