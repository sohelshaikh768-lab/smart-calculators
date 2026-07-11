import LegalPage from "../components/LegalPage";

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="Read the terms and conditions for using GST Calc India's calculators, blog and related services."
      path="/terms-and-conditions"
      updated="February 2, 2026"
    >
      <p>By accessing or using GST Calc India (the "Service"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the Service.</p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Use of Service</h2>
      <p>
        Our calculators and content are provided for general informational and educational purposes only. You may use
        the Service free of charge for personal or business calculations.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. No Professional Advice</h2>
      <p>
        Nothing on this website constitutes tax, legal, financial or professional advice. Always consult a qualified
        Chartered Accountant or tax professional before making business or compliance decisions based on GST
        calculations.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Accuracy of Information</h2>
      <p>
        While we strive to keep GST rates and formulas accurate and up to date, tax laws change periodically. We make
        no warranties regarding the completeness, reliability or accuracy of the information or calculations provided.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Intellectual Property</h2>
      <p>
        All content, design, logos and code on this website are the property of GST Calc India unless otherwise
        stated, and may not be reproduced without prior written permission.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Limitation of Liability</h2>
      <p>
        We shall not be liable for any direct, indirect, incidental or consequential damages arising from your use of
        or inability to use the Service, including any errors or inaccuracies in calculations.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Third-Party Advertising & Links</h2>
      <p>
        The Service may display third-party advertisements and affiliate links. We do not endorse and are not
        responsible for the products, services, or content of third parties.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Changes to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of India.</p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">9. Contact</h2>
      <p>For any questions regarding these Terms, please contact us via our Contact page.</p>
    </LegalPage>
  );
}
