import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

    if (!formData.message || !formData.message.trim()) {
      setSubmitError('Message is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://app.stormbuddi.com/api/stormbuddi-website/contact/submit', {
        method: 'POST',
        mode: 'cors',
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
        setSubmitMessage(data.message || 'Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again later.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
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
    <section id="contact-us" className="contact-us-section py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-black text-4xl md:text-5xl lg:text-[48px] font-bold mb-4">
              Contact Us
            </h1>
            <h2 className="text-[#042D43] text-2xl font-medium mb-10">
              Let's Talk - We're Here to Help
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16 lg:gap-20">
            {/* Left Section - Contact Information */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0 pr-0 lg:pr-12">
              <div className="contact-info">
                {/* Introduction Text */}
                <p className="text-[#4C6371] text-lg leading-relaxed mb-10">
                  Ready to transform your roofing business? Get in touch with our team to learn more about how StormBuddi can help you grow and succeed.
                </p>

                {/* Contact Details */}
                <div className="contact-details mb-10">
                  {/* Address */}
                  <div className="flex items-center mb-6 p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl transition-all duration-300 hover:shadow-md">
                    <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-full flex items-center justify-center mr-5 flex-shrink-0 shadow-[0_4px_15px_rgba(168,49,25,0.3)] border-2 border-white">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                        <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M10 17.5C12.5 14.5 17.5 10.1667 17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5C6.5 10.1667 11.5 14.5 14 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <strong className="text-[#042D43] text-base font-semibold block mb-1">Address:</strong>
                      <span className="text-[#4C6371] text-base leading-relaxed">
                        2785 Rockbrook Dr Suite 104<br />
                        Lewisville, Texas, United States of America
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center mb-6 p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl transition-all duration-300 hover:shadow-md">
                    <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-full flex items-center justify-center mr-5 flex-shrink-0 shadow-[0_4px_15px_rgba(168,49,25,0.3)] border-2 border-white">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                        <path d="M3 4C3 3.44772 3.44772 3 4 3H6.15287C6.64171 3 7.0589 3.35341 7.13927 3.8356L7.87858 8.27147C7.95075 8.70451 7.73206 9.13397 7.3394 9.3303L5.79126 10.1043C6.90756 12.4063 8.59368 14.0924 10.8957 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3C2 2.44772 2.44772 2 3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <strong className="text-[#042D43] text-base font-semibold block mb-1">Phone:</strong>
                      <a 
                        href="tel:+14693069209" 
                        className="text-[#4C6371] text-base leading-relaxed no-underline transition-colors duration-300 hover:text-[#A83119]"
                      >
                        +1 469 306 9209
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center mb-6 p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl transition-all duration-300 hover:shadow-md">
                    <div className="w-[50px] h-[50px] bg-gradient-to-br from-[#A83119] to-[#D1452A] rounded-full flex items-center justify-center mr-5 flex-shrink-0 shadow-[0_4px_15px_rgba(168,49,25,0.3)] border-2 border-white">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                        <path d="M3 4L10 9L17 4M3 4H17M3 4V16H17V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <strong className="text-[#042D43] text-base font-semibold block mb-1">Email:</strong>
                      <a 
                        href="mailto:info@stormbuddi.com" 
                        className="text-[#4C6371] text-base leading-relaxed no-underline transition-colors duration-300 hover:text-[#A83119]"
                      >
                        info@stormbuddi.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="social-media">
                  <p className="text-[#042D43] text-base font-semibold mb-5 text-center">
                    Follow us on:
                  </p>
                  <div className="flex gap-5 justify-center flex-wrap">
                    {/* Facebook */}
                    <a 
                      href="https://www.facebook.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[55px] h-[55px] rounded-full flex items-center justify-center no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(24,119,242,0.3)] border-2 border-white/80 hover:scale-110 hover:shadow-[0_6px_20px_rgba(24,119,242,0.4)]"
                      aria-label="Visit our Facebook page"
                    >
                      <div className="w-[55px] h-[55px] bg-gradient-to-br from-[#1877F2] to-[#0D6EFD] rounded-full flex items-center justify-center text-white text-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                    </a>
                    
                    {/* Instagram */}
                    <a 
                      href="https://www.instagram.com/stormbuddi2025/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[55px] h-[55px] rounded-full flex items-center justify-center no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(220,39,67,0.3)] border-2 border-white/80 hover:scale-110 hover:shadow-[0_6px_20px_rgba(220,39,67,0.4)]"
                    >
                      <div className="w-[55px] h-[55px] bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] rounded-full flex items-center justify-center text-white text-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </a>
                    
                    {/* Twitter/X */}
                    <a 
                      href="https://twitter.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[55px] h-[55px] rounded-full flex items-center justify-center no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(29,161,242,0.3)] border-2 border-white/80 hover:scale-110 hover:shadow-[0_6px_20px_rgba(29,161,242,0.4)]"
                      aria-label="Visit our Twitter/X page"
                    >
                      <div className="w-[55px] h-[55px] bg-gradient-to-br from-[#1DA1F2] to-[#0EA5E9] rounded-full flex items-center justify-center text-white text-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                    </a>
                    
                    {/* WhatsApp */}
                    <a 
                      href="https://wa.me" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[55px] h-[55px] rounded-full flex items-center justify-center no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.3)] border-2 border-white/80 hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)]"
                      aria-label="Contact us on WhatsApp"
                    >
                      <div className="w-[55px] h-[55px] bg-gradient-to-br from-[#25D366] to-[#16A34A] rounded-full flex items-center justify-center text-white text-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="w-full md:w-1/2">
              <div className="contact-form-wrapper bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-200">
                <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
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

                  <div className="form-group mb-8">
                    <textarea 
                      id="message" 
                      name="message" 
                      placeholder="Your Message" 
                      rows="5" 
                      required
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

                  <div className="flex justify-center md:justify-start">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full max-w-[240px] md:max-w-none text-center bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white border-none py-4 px-9 rounded-full text-base font-bold cursor-pointer transition-all duration-300 shadow-[0_6px_20px_rgba(168,49,25,0.3)] tracking-wide relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.4)] ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .social-media a,
          .social-media a > div {
            width: 44px !important;
            height: 44px !important;
          }
          .social-media a > div {
            font-size: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
