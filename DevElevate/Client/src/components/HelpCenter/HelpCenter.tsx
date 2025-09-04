import React from "react";
import { useGlobalState } from "../../contexts/GlobalContext";

const HelpCenter: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <div
      className={`container mx-auto p-6 ${
        state.darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${
          state.darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Help Center
      </h1>
      <div
        className={`${
          state.darkMode
            ? "bg-gray-800 text-gray-300"
            : "bg-white text-gray-700"
        } shadow-md rounded-lg p-6 mb-6`}
      >
        <h2 className="mb-4 text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium">How do I reset my password?</h3>
            <p>
              You can reset your password by clicking on the "Forgot Password"
              link on the login page and following the instructions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">
              How can I update my profile information?
            </h3>
            <p>
              Navigate to the "Profile" section from the dropdown menu and click
              on "Edit Profile" to update your details.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">
              Where can I find my course progress?
            </h3>
            <p>
              Your course progress is available in the "Progress & Goals"
              section under the "Learning" menu.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Need More Help?</h2>
        <p className="mb-4 text-gray-700">
          If you can't find the answer to your question here, please don't
          hesitate to contact our support team.
        </p>
        <a
          href="mailto:officialdevelevate@gmail.com?subject=Support%20Request&body=Hello%20DevElevate%20Support%2C%0D%0A%0D%0AI%20need%20help%20with..."
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg transition duration-300 hover:bg-blue-600"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default HelpCenter;
