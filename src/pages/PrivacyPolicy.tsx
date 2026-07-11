import LegalPage from "../components/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Read the GST Calc India privacy policy to understand how we handle your data, cookies and third-party advertising."
      path="/privacy-policy"
      updated="February 2, 2026"
    >
      <p>
        This Privacy Policy describes how GST Calc India ("we", "us", or "our") handles information when you use our website
        (the "Service"). We are committed to protecting your privacy.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
      <p>
        All GST, percentage, discount and profit margin calculations are performed entirely within your browser using
        JavaScript. We do not collect, store or transmit the numbers you enter into any calculator to our servers.
      </p>
      <p>
        If you subscribe to our newsletter or use the contact form, we collect the information you voluntarily provide
        (such as your name and email address) solely to respond to your enquiry or send you requested updates.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Cookies & Local Storage</h2>
      <p>
        We use your browser's local storage to remember your theme preference (light/dark mode). We do not use
        tracking cookies of our own, though third-party advertising partners (see below) may set cookies to serve
        relevant ads.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Third-Party Advertising</h2>
      <p>
        This site may display advertisements served by third parties such as Google AdSense. These providers may use
        cookies or similar technologies to serve ads based on your prior visits to this or other websites. You can
        opt out of personalized advertising by visiting Google's Ads Settings.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Analytics</h2>
      <p>
        We may use privacy-friendly analytics tools to understand aggregate usage patterns (e.g., which pages are
        popular). This data is anonymized and not used to personally identify visitors.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Third-Party Links</h2>
      <p>
        Our site may contain links to external websites, including affiliate partners. We are not responsible for the
        privacy practices of these third-party sites.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Children's Privacy</h2>
      <p>Our Service is not directed to children under 13, and we do not knowingly collect personal information from children.</p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please reach out via our Contact page.</p>
    </LegalPage>
  );
}
