import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import RevealOnScroll from './RevealOnScroll';
import Contact from './Contact';

const EstimateTeam = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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

    try {
      const response = await fetch('/api/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Pricing Inquiry - Professional Estimate & Supplement Team'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      if (data.success) {
        setSubmitMessage(data.message || 'Thank you for your inquiry! We will get back to you soon with pricing information.');
        setFormData({ name: '', email: '', phone: '', message: '' });
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
  const howItWorksSteps = [
    {
      number: '1',
      title: 'Submit Your Request',
      description: 'Log into your Storm Buddi CRM and submit an estimate or supplement request with property details.'
    },
    {
      number: '2',
      title: 'Our Team Gets to Work',
      description: 'Our experienced estimators log into the CRM, access your job details, and create a complete professional estimate in Xactimate or Symbility.'
    },
    {
      number: '3',
      title: 'Complete Estimate Delivered',
      description: 'We include detailed material lists, accurate measurements, and material ordering information—then place it right back in your queue, ready to present to your customer.'
    },
    {
      number: '4',
      title: 'You Stay in Control',
      description: 'No percentage fees. No hidden costs. You get the estimate, you present it, you close the deal. Simple as that.'
    }
  ];

  const whatsIncluded = [
    {
      title: 'Professional Estimates in Xactimate & Symbility',
      description: 'Industry-standard software your insurance adjusters recognize and trust.'
    },
    {
      title: 'Detailed Material Lists',
      description: 'Complete breakdowns with accurate pricing for seamless ordering through SRS or ABC Supply.'
    },
    {
      title: 'Accurate Measurements',
      description: 'Precise calculations so you can order with confidence and avoid costly mistakes.'
    },
    {
      title: 'Supplements Done Right',
      description: 'Get the coverage your customers deserve without fighting the insurance company alone.'
    },
    {
      title: 'Fast Turnaround',
      description: 'Most estimates completed within 24-48 hours so you can keep jobs moving.'
    },
    {
      title: 'Delivered to Your CRM Queue',
      description: 'No emails, no file transfers—everything stays organized right in your Storm Buddi dashboard.'
    }
  ];

  const whyDifferent = [
    {
      title: 'Fixed Cost, No Percentages',
      description: 'Most supplement companies charge $300+ per job or take a percentage of what they recover. We don\'t play that game. You pay a simple, fixed rate—and you keep 100% of what you earn.'
    },
    {
      title: 'You Stay in Control',
      description: 'We create the estimate. You present it. You negotiate. You close. No middleman taking a cut of your hard-earned profit.'
    },
    {
      title: 'Seamless CRM Integration',
      description: 'Our estimators work directly in your Storm Buddi CRM. No back-and-forth emails, no lost files, no confusion. Submit a request, get your estimate, move forward.'
    },
    {
      title: 'Experienced Team',
      description: 'Our estimators know roofing. They know insurance. They know Xactimate and Symbility inside and out. You get professional-grade work every single time.'
    }
  ];

  const whoThisIsFor = [
    'Busy roofers who don\'t have time to sit at a desk for hours creating estimates',
    'Growing companies that need consistent, professional estimates without hiring full-time estimators',
    'Contractors tired of paying $300+ per supplement or giving up a percentage of their profit',
    'Roofing businesses that want to focus on sales and installations—not paperwork'
  ];

  return (
    <>
      <Header />
      
       {/* Hero Section */}
       <RevealOnScroll triggerOnce={false}>
         <section 
           className="relative pt-32 pb-20 md:pt-40 bg-gradient-to-b from-white via-slate-50 to-white"
           style={{
             backgroundImage: 'url(/images/Supplement-team.jpeg)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}
         >
           {/* Overlay for opacity and text readability */}
           <div className="absolute inset-0 bg-white/70"></div>
           
           <div className="container mx-auto px-4 relative z-10">
             <div className="max-w-4xl mx-auto text-center">
               
               
               <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#042D43] mb-6">
                 Professional Estimate & Supplement Team
               </h1>
              
              <h2 className="font-['DM_Sans',sans-serif] text-2xl md:text-3xl font-semibold text-[#A83119] mb-8">
                Get Expert Estimates Without the Markup
              </h2>
              
              <p className="font-['DM_Sans',sans-serif] text-lg md:text-xl leading-relaxed text-[#4C6371] max-w-3xl mx-auto">
                Your roofing business deserves professional estimates and supplements without the industry's typical percentage fees or $300+ per-job costs. Our in-house team of estimators works directly in your Storm Buddi CRM to deliver accurate, ready-to-use estimates—at a simple, fixed cost.
              </p>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* How It Works Section */}
      <RevealOnScroll triggerOnce={false}>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#042D43] mb-4">
                  How It Works
                </h2>
                <div className="w-24 h-1 bg-[#A83119] mx-auto"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(168,49,25,0.15)] hover:border-[#A83119]/30"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#FDF4F2] to-transparent pointer-events-none" />
                    <div className="relative flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#A83119] to-[#C4452A] text-white text-2xl font-bold shadow-lg flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-['DM_Sans',sans-serif] text-xl font-semibold text-[#042D43] mb-3">
                          {step.title}
                        </h3>
                        <p className="font-['DM_Sans',sans-serif] text-base text-[#4C6371] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* What's Included Section */}
      <RevealOnScroll triggerOnce={false}>
        <section className="pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#042D43] mb-4">
                  What's Included
                </h2>
                <div className="w-24 h-1 bg-[#A83119] mx-auto"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {whatsIncluded.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_8px_25px_rgba(168,49,25,0.15)] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <svg
                        className="w-6 h-6 text-[#A83119] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <h3 className="font-['DM_Sans',sans-serif] text-lg font-semibold text-[#042D43]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-['DM_Sans',sans-serif] text-sm text-[#4C6371] leading-relaxed ml-9">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Why Storm Buddi Is Different Section */}
      <RevealOnScroll triggerOnce={false}>
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#042D43] mb-4">
                  Why Storm Buddi Is Different
                </h2>
                <div className="w-24 h-1 bg-[#A83119] mx-auto"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {whyDifferent.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-8 border border-slate-200 shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                  >
                    <h3 className="font-['DM_Sans',sans-serif] text-xl font-semibold text-[#042D43] mb-4">
                      {item.title}
                    </h3>
                    <p className="font-['DM_Sans',sans-serif] text-base text-[#4C6371] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Pricing Section */}
      <RevealOnScroll triggerOnce={false}>
        <section className="pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#042D43] mb-6">
                Pricing That Makes Sense
              </h2>
              <div className="w-24 h-1 bg-[#A83119] mx-auto mb-8"></div>
              
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200">
                <p className="font-['DM_Sans',sans-serif] text-lg text-[#4C6371] mb-6 leading-relaxed">
                  Fixed-rate pricing means you know exactly what you're paying—no surprises, no percentage fees eating into your profit.
                </p>
                <p className="font-['DM_Sans',sans-serif] text-lg text-[#4C6371] mb-8 leading-relaxed">
                  Whether it's a simple repair estimate or a complex insurance supplement, you get the same transparent, straightforward pricing every time.
                </p>
                
                {/* Contact Form */}
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <h3 className="font-['DM_Sans',sans-serif] text-xl font-semibold text-[#042D43] mb-4 text-center">
                    Get Pricing Information
                  </h3>
                  <p className="font-['DM_Sans',sans-serif] text-sm text-[#4C6371] mb-6 text-center">
                    Contact us for current pricing and volume discounts
                  </p>
                  
                  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div>
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="Your Name *" 
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full p-3 border-2 rounded-lg text-base transition-all duration-300 outline-none font-['DM_Sans',sans-serif] ${
                            focusedField === 'name' ? 'border-[#A83119]' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="Your Email *" 
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full p-3 border-2 rounded-lg text-base transition-all duration-300 outline-none font-['DM_Sans',sans-serif] ${
                            focusedField === 'email' ? 'border-[#A83119]' : 'border-gray-200'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Phone Number (Optional)" 
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 border-2 rounded-lg text-base transition-all duration-300 outline-none font-['DM_Sans',sans-serif] ${
                          focusedField === 'phone' ? 'border-[#A83119]' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <textarea 
                        name="message" 
                        placeholder="Tell us about your estimating needs (Optional)" 
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full p-3 border-2 rounded-lg text-base transition-all duration-300 outline-none resize-y font-['DM_Sans',sans-serif] ${
                          focusedField === 'message' ? 'border-[#A83119]' : 'border-gray-200'
                        }`}
                      ></textarea>
                    </div>

                    {/* Success/Error Messages */}
                    {submitMessage && (
                      <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                        {submitMessage}
                      </div>
                    )}
                    {submitError && (
                      <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {submitError}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full md:w-auto bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white border-none py-3 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(168,49,25,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(168,49,25,0.4)] font-['DM_Sans',sans-serif] ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'SUBMITTING...' : 'REQUEST PRICING'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Who This Is For Section */}
      <RevealOnScroll triggerOnce={false}>
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#042D43] mb-4">
                  Who This Is For
                </h2>
                <div className="w-24 h-1 bg-[#A83119] mx-auto"></div>
              </div>

              <div className="grid gap-4">
                {whoThisIsFor.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white rounded-lg p-6 border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(168,49,25,0.15)] transition-all duration-300"
                  >
                    <svg
                      className="w-6 h-6 text-[#A83119] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="font-['DM_Sans',sans-serif] text-base text-[#4C6371] leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Get Started Section */}
      <RevealOnScroll triggerOnce={false}>
        <section className="py-20 bg-gradient-to-br from-[#A83119] to-[#C4452A] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold mb-6">
                Get Started Today
              </h2>
              
              <p className="font-['DM_Sans',sans-serif] text-lg md:text-xl mb-8 leading-relaxed opacity-95">
                Ready to streamline your estimating process and keep more money in your pocket?
              </p>
              
              <p className="font-['DM_Sans',sans-serif] text-base md:text-lg mb-10 leading-relaxed opacity-90">
                Log into your Storm Buddi CRM and submit your first estimate request, or contact our team to learn more about how our estimators can support your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a
                  href="#contact-us"
                  className="inline-flex items-center gap-2.5 bg-white text-[#A83119] no-underline border-2 border-white rounded-lg px-8 py-4 text-base font-semibold uppercase tracking-[1px] font-['DM_Sans',sans-serif] transition-all duration-300 ease-linear shadow-[0_4px_15px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
                >
                  <span>Contact Us</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M5 11L11 5M11 5H5M11 5V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                
                <a
                  href="/#pricing"
                  className="inline-flex items-center gap-2.5 bg-transparent text-white no-underline border-2 border-white rounded-lg px-8 py-4 text-base font-semibold uppercase tracking-[1px] font-['DM_Sans',sans-serif] transition-all duration-300 ease-linear cursor-pointer hover:bg-white/10 hover:-translate-y-0.5"
                >
                  <span>Get Started</span>
                </a>
              </div>

              <div className="border-t border-white/30 pt-8">
                <p className="font-['DM_Sans',sans-serif] text-base font-semibold mb-2">
                  Questions?
                </p>
                <p className="font-['DM_Sans',sans-serif] text-base opacity-90">
                  Email us at <a href="mailto:info@stormbuddi.com" className="underline hover:opacity-80">info@stormbuddi.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Contact Section */}
      <RevealOnScroll triggerOnce={false}>
        <Contact />
      </RevealOnScroll>

      {/* Footer Tagline */}
      <RevealOnScroll triggerOnce={false}>
        <section className="py-12 bg-[#042D43] text-white text-center">
          <div className="container mx-auto px-4">
            <p className="font-['DM_Sans',sans-serif] text-xl font-semibold">
              Storm Buddi: Roofing Made Simple. Estimates Made Easy.
            </p>
          </div>
        </section>
      </RevealOnScroll>

      <Footer />
    </>
  );
};

export default EstimateTeam;

