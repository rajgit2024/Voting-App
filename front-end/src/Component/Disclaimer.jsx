import React from "react";

const Disclaimer = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Disclaimer</h1>
      <p className="text-gray-700 mb-4">
        Welcome to our voting website. By using this website, you agree to the terms and conditions outlined in this disclaimer.
      </p>
      <h2 className="text-xl font-semibold mt-4">Accuracy of Information</h2>
      <p className="text-gray-700 mb-4">
        We strive to provide accurate and up-to-date information. However, we do not guarantee the completeness, accuracy, or reliability of any information presented on this site.
      </p>
      <h2 className="text-xl font-semibold mt-4">No Liability</h2>
      <p className="text-gray-700 mb-4">
        We are not responsible for any errors, omissions, or inaccuracies on this website. Users rely on the provided information at their own risk.
      </p>
      <h2 className="text-xl font-semibold mt-4">External Links</h2>
      <p className="text-gray-700 mb-4">
        Our website may contain links to third-party websites. We do not endorse or assume responsibility for the content of these external sites.
      </p>
      <h2 className="text-xl font-semibold mt-4">Changes to the Disclaimer</h2>
      <p className="text-gray-700 mb-4">
        We reserve the right to modify or update this disclaimer at any time. It is the user’s responsibility to review this page periodically.
      </p>
      <p className="text-gray-700">If you have any questions, please contact us.</p>
    </div>
  );
};

export default Disclaimer;