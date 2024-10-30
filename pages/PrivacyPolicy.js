import React from 'react';
import Head from 'next/head'; 

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="image/favicon.png" />
        <title>Privacy Policy</title>
      </Head>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          <div className="h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar">
            <div className="space-y-6">
              <section>
                <h2 className="text-3xl font-semibold mb-4 text-gray-200">1. Introduction</h2>
                <p className="text-lg text-gray-400">Welcome to X SPLITTER. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.</p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 text-gray-200">2. Information We Collect</h2>
                <p className="text-lg text-gray-400">We collect information that you provide directly to us when you use our service, including:</p>
                <ul className="list-disc pl-6 mt-2 text-lg text-gray-400">
                  <li>Video files you upload</li>
                  <li>Usage data (e.g., features used, time spent on the service)</li>
                  <li>Device and browser information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 text-gray-200">3. How We Use Your Information</h2>
                <p className="text-lg text-gray-400">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-2 text-lg text-gray-400">
                  <li>Provide, maintain, and improve our service</li>
                  <li>Process and deliver your video segments</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 text-gray-200">4. Data Retention and Deletion</h2>
                <p className="text-lg text-gray-400">We retain your uploaded videos and generated segments for a limited time to provide the service. After processing, temporary files are automatically deleted. You can request deletion of your data at any time by contacting us.</p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 text-gray-200">5. Security</h2>
                <p className="text-lg text-gray-400">We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 text-gray-200">6. Changes to This Privacy Policy</h2>
                <p className="text-lg text-gray-400">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 text-gray-200">7. Contact Us</h2>
                <p className="text-lg text-gray-400">If you have any questions about this Privacy Policy, please contact us at <a href="" className="text-blue-500 hover:text-blue-700">xsplitter@xsplitter.com</a>.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;