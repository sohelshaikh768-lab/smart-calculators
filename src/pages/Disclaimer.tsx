import LegalPage from "../components/LegalPage";

export default function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Important disclaimer regarding the accuracy and use of GST Calc India's calculators and blog content."
      path="/disclaimer"
      updated="February 2, 2026"
    >
      <p>
        The information provided by GST Calc India ("we", "us", or "our") on this website is for general
        informational and educational purposes only. All information on the site is provided in good faith; however,
        we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy,
        validity, reliability, availability or completeness of any information on the site.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Not Tax or Legal Advice</h2>
      <p>
        Our GST, percentage, discount and profit margin calculators are estimation tools intended to assist with
        general calculations. They do not constitute professional tax, legal, accounting or financial advice. GST
        rates and rules are subject to change by the Government of India / GST Council, and applicability can vary
        based on product/service category, state and specific business circumstances.
      </p>
      <p>
        Always verify current GST rates on the official GST portal (gst.gov.in) and consult a qualified Chartered
        Accountant or tax professional before making business, pricing, invoicing or compliance decisions.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Liability</h2>
      <p>
        Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a
        result of the use of this site or reliance on any information provided. Your use of the site and your
        reliance on any information is solely at your own risk.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">External Links Disclaimer</h2>
      <p>
        The site may contain links to third-party websites or advertisements that are not affiliated with us. We do
        not guarantee the accuracy, relevance, timeliness or completeness of any information on these external
        websites.
      </p>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Affiliate Disclaimer</h2>
      <p>
        Some links on this site may be affiliate links, meaning we may earn a small commission if you make a purchase
        through them, at no additional cost to you.
      </p>
    </LegalPage>
  );
}
