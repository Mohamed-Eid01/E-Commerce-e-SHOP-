function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

      <p className="text-gray-600 mb-4">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information.
      </p>

      <div className="space-y-5 text-gray-600">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, phone number, and payment details when you use our
            services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How We Use Your Information
          </h2>
          <p>
            Your information is used to process orders, improve our services,
            communicate with you, and ensure account security.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Data Protection
          </h2>
          <p>
            We implement strong security measures to protect your data from
            unauthorized access or disclosure.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Third-Party Services
          </h2>
          <p>
            We may share limited data with trusted third-party services only
            when necessary to operate our platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
