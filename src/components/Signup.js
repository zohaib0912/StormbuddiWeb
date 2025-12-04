import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    // Validate required fields
    if (!formData.name || !formData.name.trim()) {
      setSubmitError('Name is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      setSubmitError('Email is required');
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (!formData.contactNumber || !formData.contactNumber.trim()) {
      setSubmitError('Contact number is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.address || !formData.address.trim()) {
      setSubmitError('Address is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/signup/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      if (data.success) {
        setSubmitMessage(data.message || 'Thank you for signing up! We will get back to you soon.');
        setFormData({ name: '', email: '', contactNumber: '', address: '', message: '' });
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again later.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSubmitError(error.message || 'Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (submitMessage || submitError) {
      setSubmitMessage('');
      setSubmitError('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-12 md:py-16 lg:py-20 pt-32 md:pt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12 mt-0 md:mt-12">
              <h1 className="text-black text-4xl md:text-5xl lg:text-[48px] font-bold mb-4">
                Sign Up
              </h1>
              <h2 className="text-[#042D43] text-2xl font-medium">
                Join StormBuddi Today
              </h2>
            </div>

            {/* Main Content: Image Left, Form Right */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left Side - Image */}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  <img
                    src="/images/Event.jpeg"
                    alt="StormBuddi"
                    className="w-full h-auto rounded-2xl shadow-[0_20px_60px_rgba(4,45,67,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-[500px] bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-2xl flex items-center justify-center">
                          <div class="text-white text-center">
                            <svg class="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <p class="text-2xl font-bold">StormBuddi</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>

              {/* Right Side - Signup Form */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-200">
                  <form className="signup-form" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="form-group mb-6">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-4 border-2 rounded-lg text-base transition-all duration-300 outline-none ${
                          focusedField === 'name' ? 'border-[#A83119]' : 'border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="form-group mb-6">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-4 border-2 rounded-lg text-base transition-all duration-300 outline-none ${
                          focusedField === 'email' ? 'border-[#A83119]' : 'border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Contact Number Field */}
                    <div className="form-group mb-6">
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Contact Number"
                        required
                        value={formData.contactNumber}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('contactNumber')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-4 border-2 rounded-lg text-base transition-all duration-300 outline-none ${
                          focusedField === 'contactNumber' ? 'border-[#A83119]' : 'border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Address Field */}
                    <div className="form-group mb-6">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Your Address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-4 border-2 rounded-lg text-base transition-all duration-300 outline-none ${
                          focusedField === 'address' ? 'border-[#A83119]' : 'border-gray-200'
                        }`}
                      />
                    </div>

                    {/* Message Field */}
                    <div className="form-group mb-8">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Your Message (Optional)"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-4 border-2 rounded-lg text-base transition-all duration-300 outline-none resize-y min-h-[120px] ${
                          focusedField === 'message' ? 'border-[#A83119]' : 'border-gray-200'
                        }`}
                      ></textarea>
                    </div>

                    {/* Success/Error Messages */}
                    {submitMessage && (
                      <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {submitMessage}
                      </div>
                    )}
                    {submitError && (
                      <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center md:justify-start">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full max-w-[240px] md:max-w-none text-center bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white border-none py-4 px-9 rounded-full text-base font-bold cursor-pointer transition-all duration-300 shadow-[0_6px_20px_rgba(168,49,25,0.3)] tracking-wide relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.4)] ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'SUBMITTING...' : 'SIGN UP'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;

