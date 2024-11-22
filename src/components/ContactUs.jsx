import React from "react";

const ContactUs = () => {
  const facebookUrl = `${window.themeDirectory}/assets/facebook.png`;
  const twitterUrl = `${window.themeDirectory}/assets/twitter.png`;
  const linkedinUrl = `${window.themeDirectory}/assets/linkedin.png`;
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="w-full h-full flex flex-col items-center justify-center py-12">
        <div className="w-full flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0">
          {/* Left Column: Social Media, Title, and Description */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-poppins font-bold">Contact Us</h2>
            <p className="text-gray-600 w-1/2 font-poppins font-normal">
              Have any questions or inquiries? Get in touch with us through our
              social media or the contact form.
            </p>
            <div className="flex justify-center items-center md:justify-start space-x-10">
              <a href="">
                <img src={facebookUrl} alt="" />
              </a>
              <a href="">
                <img src={twitterUrl} alt="" />
              </a>
              <a href="">
                <img src={linkedinUrl} alt="" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full md:w-1/2">
            <form className="w-full space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md font-poppins font-normal"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md font-poppins font-normal"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md font-poppins font-normal"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-bgBlue2 text-white rounded-md hover:bg-bgBlue font-poppins font-semibold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
