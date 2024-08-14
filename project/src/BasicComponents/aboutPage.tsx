const AboutPage = () => {
  return (
    <div className="bg-[#1a1a1a] text-gray-100 min-h-screen">
      <header className="bg-gray-500/10 text-gray-100 text-center py-24">
        <h1 className="text-6xl font-bold">About Us</h1>
        <p className="text-xl mt-4">Discover our story and values</p>
      </header>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-7xl mx-auto">
          <div className="bg-gray-500/10 shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg mb-6">
                Our mission is to provide high-quality products at affordable
                prices while delivering exceptional customer service.
              </p>

              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg mb-6">
                Founded in 2021, we started with a small team and a big dream.
                Our goal was to revolutionize online shopping by focusing on
                quality and customer satisfaction. Today, we’re proud to be a
                trusted brand in e-commerce.
              </p>

              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-lg">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-green-400 mr-2"></i>
                  Customer-Centric
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-green-400 mr-2"></i>
                  Quality First
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-green-400 mr-2"></i>
                  Innovation
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-green-400 mr-2"></i>
                  Integrity
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-12">
          <div className="bg-gray-400/10 shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg mb-4">
                Have any questions or feedback? Feel free to reach out to us!
              </p>
              <div className="flex space-x-6">
                <a
                  href="mailto:info@example.com"
                  className="text-blue-400 hover:underline"
                >
                  <i className="fas fa-envelope mr-2"></i>Email Us
                </a>
                <a
                  href="tel:+1234567890"
                  className="text-blue-400 hover:underline"
                >
                  <i className="fas fa-phone mr-2"></i>Call Us
                </a>
                <a href="#" className="text-blue-400 hover:underline">
                  <i className="fas fa-map-marker-alt mr-2"></i>Find Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-400/10 text-gray-100 text-center py-4">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
