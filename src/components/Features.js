import React, { useState, useEffect, useRef } from 'react';

const Features = () => {
  const [nodeHovered, setNodeHovered] = useState(false);
  const [nodePosition, setNodePosition] = useState(290);
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  const features = [
    {
      id: 1,
      title: 'Map-Based Neighborhood Insights',
      description: 'Visualize and explore affected neighborhoods using our interactive map interface. Identify high-potential zones and access impact details, property profiles, and project opportunities across the area with ease.',
      image: '/images/Mapbasedinsight.png',
      alt: 'Map Based Insight',
      side: 'left'
    },
    {
      id: 2,
      title: 'Storm Impact Reports',
      description: 'Quickly view detailed storm impact reports for any address. Whether you\'re preparing an estimate or canvassing neighborhoods, our platform gives you accurate historical and recent storm activity with just a few clicks.',
      image: '/images/stormimpact.png',
      alt: 'Material Order',
      side: 'right'
    },
    {
      id: 3,
      title: 'E-Signed Proposals',
      description: 'Generate professional proposals in just a few steps and allow your clients to sign electronically. No more paperwork delays—get faster approvals and keep jobs moving forward.',
      image: '/images/esigned.png',
      alt: 'Storm Impact',
      side: 'left'
    },
    {
      id: 4,
      title: 'Leads Management',
      description: 'Capture and manage high-quality leads from storm-affected areas. Use our CRM to track customer interactions, follow-ups, and project stages—ensuring no opportunity is missed.',
      image: '/images/leadmanagment.png',
      alt: 'Leads Management',
      side: 'right'
    },
    {
      id: 5,
      title: 'Appointment Scheduling',
      description: 'Schedule inspections, meetings, and team visits directly from the dashboard. Get real-time calendar views and automated reminders for you and your customers.',
      image: '/images/appointmentsetting.png',
      alt: 'Appointment Scheduling',
      side: 'left'
    },
    {
      id: 6,
      title: 'Material Ordering System',
      description: 'Streamlined material ordering system with inventory tracking and automated reordering capabilities for efficient project management.',
      image: '/images/materialorder.png',
      alt: 'Material Ordering System',
      side: 'right'
    },
    {
      id: 7,
      title: 'Team Management',
      description: 'Add team members, define roles, and assign them to jobs with live updates. Track field activity and productivity in real-time to enhance team performance.',
      image: '/images/teammanagement.png',
      alt: 'Team Management',
      side: 'left'
    }
  ];

  useEffect(() => {
    const observers = [];
    
    imageRefs.current.forEach((ref) => {
      if (!ref) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );
      
      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      const progress = (scrollPosition - sectionTop) / sectionHeight;
      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      const lineStart = 290;
      const lineEnd = Math.max(sectionHeight - 350, lineStart);
      const available = lineEnd - lineStart;

      setNodePosition(lineStart + clampedProgress * available);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <section 
        id="features" 
        ref={sectionRef}
        className="features-timeline-section relative py-10 bg-white md:min-h-screen"
      >
        {/* Timeline Center Line */}
        <div 
          className="timeline-center-line absolute left-1/2 top-[290px] bottom-[350px] w-[3px] -translate-x-1/2 z-[1] hidden md:block bg-[#A83119]"
        ></div>
        
        {/* Timeline Node */}
        <div
          className={`timeline-node active absolute left-1/2 w-8 h-8 -translate-x-1/2 rounded-full border-[4px] border-[#A83119] bg-white cursor-pointer hidden md:block transition-transform duration-300 z-[3] ${nodeHovered ? 'scale-110' : 'scale-100'}`}
          id="scrollable-timeline-node"
          style={{ top: `${nodePosition}px` }}
          onMouseEnter={() => setNodeHovered(true)}
          onMouseLeave={() => setNodeHovered(false)}
        ></div>

        {/* Features Header Section */}
        <div 
          className="features-header text-center mb-15 px-5 py-10 bg-white/90 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] relative z-[3] w-full mx-auto mt-10"
        >
          <h2 className="text-[36px] font-bold mb-10 text-[#042D43] mt-0">
            Features
          </h2>
          <p className="text-[16px] font-normal text-[#4C6371] mb-0">
            Our platform is designed to streamline your roofing business, from lead management to material ordering.
          </p>
        </div>

        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="row">
            <div className="col-12">
              <div className="features-timeline-wrapper relative">
                {/* Features */}
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`feature-${feature.side} relative flex flex-col md:flex-row items-center ${index === 0 ? 'mt-0' : 'mt-0'} gap-6`}
                  >
                    {feature.side === 'left' ? (
                      <>
                        <div
                          className="feature-content w-full md:w-1/2 md:pr-10 text-left md:text-right px-5 md:px-0"
                        >
                          <h3 className="text-[#042D43] text-2xl font-bold mb-4 leading-snug">
                            {feature.title}
                          </h3>
                          <p className="text-[#4C6371] text-base leading-relaxed m-0">
                            {feature.description}
                          </p>
                        </div>
                        <div
                          className="feature-graphic w-full md:w-1/2 md:pl-10 px-5 md:px-0"
                        >
                          <img
                            ref={(el) => (imageRefs.current[index] = el)}
                            src={feature.image}
                            alt={feature.alt}
                            className="map-scroll-animation w-full h-auto object-cover rounded-xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<div style="width: 100%; height: 300px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); display: flex; align-items: center; justify-content: center; border-radius: 10px;"><span style="color: #4C6371; font-size: 18px;">${feature.alt}</span></div>`;
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="feature-graphic w-full md:w-1/2 md:pr-10 px-5 md:px-0 order-2 md:order-1"
                        >
                          <img
                            ref={(el) => (imageRefs.current[index] = el)}
                            src={feature.image}
                            alt={feature.alt}
                            className="map-scroll-animation w-full h-auto object-cover rounded-xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<div style="width: 100%; height: 300px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); display: flex; align-items: center; justify-content: center; border-radius: 10px;"><span style="color: #4C6371; font-size: 18px;">${feature.alt}</span></div>`;
                            }}
                          />
                        </div>
                        <div
                          className="feature-content w-full md:w-1/2 md:pl-10 text-left px-5 md:px-0 order-1 md:order-2"
                        >
                          <h3 className="text-[#042D43] text-2xl font-bold mb-4 leading-snug">
                            {feature.title}
                          </h3>
                          <p className="text-[#4C6371] text-base leading-relaxed m-0">
                            {feature.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* Final Call to Action */}
                <div className="feature-final text-center mt-20 pb-10">
                  <h2 className="text-[#042D43] text-3xl font-bold mb-5 mt-0">
                    All the CRM Tools Your Business Needs
                  </h2>
                  <p className="text-[#4C6371] text-lg mb-8 mt-0">
                    One comprehensive solution for all your needs
                  </p>
                  <button
                    onClick={scrollToPricing}
                    className="bg-[#A83119] text-white border-none px-7 py-3.5 rounded-md text-base font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_6px_rgba(168,49,25,0.3)] hover:bg-[#D1452A] hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(168,49,25,0.4)]"
                  >
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes mapScrollAnimation {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .map-scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .map-scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};

export default Features;
