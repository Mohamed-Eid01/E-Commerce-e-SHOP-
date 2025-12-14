function Contact() {
  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

      <p className="text-gray-600 leading-8 max-w-3xl mx-auto text-lg">
        We’re always happy to help. If you have any questions, suggestions, or
        need support, feel free to reach out anytime.
      </p>

      <p className="text-gray-600 leading-8 max-w-3xl mx-auto text-lg mt-6">
        Email: <span className="font-semibold">support@eshop.com</span>
        <br />
        Phone: <span className="font-semibold">+20 100 000 0000</span>
        <br />
        Our team will get back to you as soon as possible.
      </p>
    </div>
  );
}

export default Contact;
