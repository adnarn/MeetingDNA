import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to MeetingDNA
        </Link>
        <div className="text-center">
          <div className="text-5xl mb-4">📜</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 space-y-8">
        
        {/* Introduction */}
        <section>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Please read these terms and conditions carefully before using Our Service.
          </p>
        </section>

        {/* Interpretation and Definitions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Interpretation and Definitions
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Interpretation
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The words whose initial letters are capitalized have meanings defined under the following conditions. 
            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Definitions
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Affiliate</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Means an entity that controls, is controlled by, or is under common control with a party, 
                where "control" means ownership of 50% or more of the shares, equity interest or other securities 
                entitled to vote for election of directors or other managing authority.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Country</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Refers to: Nigeria</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Company</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                (referred to as either "the Company", "We", "Us" or "Our" in these Terms and Conditions) refers to MeetingDNA.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Device</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Means any device that can access the Service such as a computer, a cell phone or a digital tablet.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Service</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Refers to the Website.</p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Terms and Conditions</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                (also referred to as "Terms") means these Terms and Conditions, including any documents expressly incorporated by reference, 
                which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service.
              </p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Third-Party Social Media Service</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Means any services or content (including data, information, products or services) provided by a third party 
                that is displayed, included, made available, or linked to through the Service.
              </p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Website</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Refers to MeetingDNA, accessible from https://meetingdna.vercel.app/
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">You</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Means the individual accessing or using the Service, or the company, or other legal entity on behalf of which 
                such individual is accessing or using the Service, as applicable.
              </p>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">
            Acknowledgment
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. 
            These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. 
            These Terms and Conditions apply to all visitors, users and others who access or use the Service.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            By accessing or using the Service You agree to be bound by these Terms and Conditions. 
            If You disagree with any part of these Terms and Conditions then You may not access the Service.
          </p>
          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              ⚠️ You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. 
            Please read Our Privacy Policy carefully before using Our Service.
          </p>
        </section>

        {/* Links to Other Websites */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Links to Other Websites
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. 
            You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused 
            or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
          </p>
        </section>

        {/* Third-Party Social Media Service */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Links from a Third-Party Social Media Service
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. 
            A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility 
            for any Third-Party Social Media Service.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused 
            or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, 
            or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's 
            terms and privacy policies.
          </p>
        </section>

        {/* Termination */}
        <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
          <h3 className="text-xl font-semibold text-red-900 dark:text-red-300 mb-4">
            Termination
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, 
            including without limitation if You breach these Terms and Conditions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
            Upon termination, Your right to use the Service will cease immediately.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Limitation of Liability
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms 
            and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD 
            if You haven't purchased anything through the Service.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, 
            or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, 
            for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or 
            third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier 
            has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
          </p>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ℹ️ Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, 
              which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.
            </p>
          </div>
        </section>

        {/* "AS IS" and "AS AVAILABLE" Disclaimer */}
        <section className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            "AS IS" and "AS AVAILABLE" Disclaimer
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. 
            To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors 
            and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, 
            including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise 
            out of course of dealing, course of performance, usage or trade practice.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service 
            will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, 
            operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
          </p>
        </section>

        {/* Governing Law */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Governing Law
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. 
            Your use of the Application may also be subject to other local, state, national, or international laws.
          </p>
        </section>

        {/* Disputes Resolution */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Disputes Resolution
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
          </p>
        </section>

        {/* EU Users */}
        <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-4">
            For European Union (EU) Users
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
          </p>
        </section>

        {/* US Legal Compliance */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            United States Legal Compliance
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, 
            or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed 
            on any United States government list of prohibited or restricted parties.
          </p>
        </section>

        {/* Severability and Waiver */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Severability and Waiver
          </h3>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Severability</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted 
            to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions 
            will continue in full force and effect.
          </p>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Waiver</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms 
            shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver 
            of a breach constitute a waiver of any subsequent breach.
          </p>
        </section>

        {/* Translation Interpretation */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Translation Interpretation
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms and Conditions may have been translated if We have made them available to You on our Service. 
            You agree that the original English text shall prevail in the case of a dispute.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-300 mb-4">
            Changes to These Terms and Conditions
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. 
            What constitutes a material change will be determined at Our sole discretion.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. 
            If You do not agree to the new terms, in whole or in part, please stop using the Service.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions about these Terms and Conditions, You can contact us:
          </p>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-gray-900 dark:text-white font-medium">
              📧 codewithdex@gmail.com
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By using MeetingDNA, you agree to these Terms and Conditions.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            © {new Date().getFullYear()} MeetingDNA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;