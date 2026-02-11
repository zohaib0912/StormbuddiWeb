import React from 'react';

const ComparisonTable = () => {
  const comparisonData = [
    {
      feature: 'Photo & Video Documentation',
      stormBuddi: '✔️',
      salesRabbit: 'Limited',
      jobber: '✔️',
      spotio: 'Limited'
    },
    {
      feature: 'CRM & Lead Management',
      stormBuddi: '✔️ (built-in)',
      salesRabbit: '✔️ (basic)',
      jobber: '✔️',
      spotio: '✔️ (basic)'
    },
    {
      feature: 'Job/Project Management',
      stormBuddi: '✔️',
      salesRabbit: '❌',
      jobber: '✔️',
      spotio: '❌'
    },
    {
      feature: 'Storm/Hail Tracking',
      stormBuddi: '✔️ (NOAA, real-time)',
      salesRabbit: '❌',
      jobber: '❌',
      spotio: '❌'
    },
    {
      feature: 'Supplement/Estimate Workflow',
      stormBuddi: '✔️ (in-app requests)',
      salesRabbit: '❌',
      jobber: '❌',
      spotio: '❌'
    },
    {
      feature: 'Material Ordering (SRS, ABC, IDAC)',
      stormBuddi: '✔️ (direct integration)',
      salesRabbit: '❌',
      jobber: '❌',
      spotio: '❌'
    },
    {
      feature: 'Homeowner Portal',
      stormBuddi: '✔️ (Harbor Shield 360)',
      salesRabbit: '❌',
      jobber: '❌',
      spotio: '❌'
    },
    {
      feature: 'Canvassing & Sales Tools',
      stormBuddi: '✔️',
      salesRabbit: '✔️',
      jobber: 'Limited',
      spotio: '✔️'
    },
    {
      feature: 'AI Assistant/Automation',
      stormBuddi: '✔️',
      salesRabbit: '❌',
      jobber: 'Limited',
      spotio: 'Limited'
    },
    {
      feature: 'Integrations',
      stormBuddi: '✔️ (CRM, supply, more)',
      salesRabbit: '✔️',
      jobber: '✔️',
      spotio: '✔️'
    },
    {
      feature: 'Minimum Seats Required',
      stormBuddi: '1',
      salesRabbit: '1',
      jobber: '1',
      spotio: '1'
    },
    {
      feature: 'Minimum Monthly Spend',
      stormBuddi: '$75',
      salesRabbit: '$25+',
      jobber: '$49+',
      spotio: '$39+'
    },
    {
      feature: 'Pricing/User/Month',
      stormBuddi: '$75–$90',
      salesRabbit: '$25–$65',
      jobber: '$49–$249',
      spotio: '$39–$129'
    },
    {
      feature: 'Annual Contract Required',
      stormBuddi: 'No',
      salesRabbit: 'No',
      jobber: 'No',
      spotio: 'Yes'
    },
    {
      feature: 'Free Trial',
      stormBuddi: 'Yes',
      salesRabbit: 'Yes',
      jobber: 'Yes',
      spotio: 'Yes'
    }
  ];

  const renderFeatureValue = (value) => {
    if (value === '✔️') {
      return (
        <div className="flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
    if (value === '❌') {
      return (
        <div className="flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
    return <span className="text-[#4C6371] text-sm font-medium break-words">{value}</span>;
  };

  return (
    <section id="comparison" className="comparison-section py-16 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#042D43] text-[42px] font-bold">
            Storm Buddi vs. The Competition
          </h2>
          <p className="text-[#4C6371] text-lg max-w-3xl mx-auto">
            See why Storm Buddi is the only platform that combines full CRM, photo documentation, job management, storm tracking, supplement workflow, material ordering, and a homeowner portal—all in one solution.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(4,45,67,0.12)] border border-[rgba(168,49,25,0.1)] relative">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid md:grid-cols-5 text-white rounded-t-2xl relative overflow-visible">
            <div className="p-6 font-bold text-lg border-r border-white/20 bg-[#042D43] text-center whitespace-nowrap rounded-tl-2xl">
              Feature
            </div>
            <div className="p-6 font-bold text-lg border-r border-white/20 bg-[#A83119] relative text-center whitespace-nowrap overflow-visible z-10">
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-[#042D43] text-xs font-bold px-3 py-1 rounded-full shadow-lg z-[100] whitespace-nowrap">
                BEST
              </div>
              Storm Buddi
            </div>
            <div className="p-6 font-bold text-lg border-r border-white/20 bg-[#042D43] text-center whitespace-nowrap">
              SalesRabbit
            </div>
            <div className="p-6 font-bold text-lg border-r border-white/20 bg-[#042D43] text-center whitespace-nowrap">
              Jobber
            </div>
            <div className="p-6 font-bold text-lg bg-[#042D43] text-center whitespace-nowrap rounded-tr-2xl">
              Spotio
            </div>
          </div>

          {/* Table Header - Mobile */}
          <div className="md:hidden bg-gradient-to-r from-[#042D43] to-[#0A3D5A] text-white p-4">
            <h3 className="text-xl font-bold text-center mb-2">Feature Comparison</h3>
            <p className="text-sm text-center opacity-90">Scroll horizontally to see all platforms</p>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <div className="hidden md:block">
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 border-b border-gray-200 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                  } hover:bg-[#F0F4F8]`}
                >
                  {/* Feature Name */}
                  <div className="p-5 font-semibold text-[#042D43] text-sm md:text-base border-r border-gray-200 flex items-center">
                    {row.feature}
                  </div>
                  
                  {/* Storm Buddi - Highlighted */}
                  <div className="p-5 text-center bg-gradient-to-br from-[#FFF5F3] to-white border-r-2 border-[#A83119] flex items-center justify-center break-words">
                    <div className="w-full">
                      {renderFeatureValue(row.stormBuddi)}
                    </div>
                  </div>
                  
                  {/* SalesRabbit */}
                  <div className="p-5 text-center border-r border-gray-200 flex items-center justify-center break-words">
                    <div className="w-full">
                      {renderFeatureValue(row.salesRabbit)}
                    </div>
                  </div>
                  
                  {/* Jobber */}
                  <div className="p-5 text-center border-r border-gray-200 flex items-center justify-center break-words">
                    <div className="w-full">
                      {renderFeatureValue(row.jobber)}
                    </div>
                  </div>
                  
                  {/* Spotio */}
                  <div className="p-5 text-center flex items-center justify-center break-words">
                    <div className="w-full">
                      {renderFeatureValue(row.spotio)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile Table */}
            <div className="md:hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#042D43] to-[#0A3D5A] text-white">
                    <th className="p-4 font-bold text-sm text-left border-r border-white/20 bg-[#042D43] sticky left-0 z-20">
                      Feature
                    </th>
                    <th className="p-4 font-bold text-sm text-center border-r border-white/20 bg-[#A83119] relative">
                      <div className="hidden absolute -top-2 -right-2 bg-yellow-400 text-[#042D43] text-xs font-bold px-2 py-0.5 rounded-full shadow-lg z-[100] whitespace-nowrap">
                        BEST
                      </div>
                      Storm Buddi
                    </th>
                    <th className="p-4 font-bold text-sm text-center border-r border-white/20 bg-[#042D43]">
                      SalesRabbit
                    </th>
                    <th className="p-4 font-bold text-sm text-center border-r border-white/20 bg-[#042D43]">
                      Jobber
                    </th>
                    <th className="p-4 font-bold text-sm text-center bg-[#042D43]">
                      Spotio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                      } hover:bg-[#F0F4F8]`}
                    >
                      {/* Feature Name */}
                      <td className="p-5 font-semibold text-[#042D43] text-sm sticky left-0 bg-inherit z-10 border-r border-gray-200">
                        {row.feature}
                      </td>
                      
                      {/* Storm Buddi - Highlighted */}
                      <td className="p-5 text-center bg-gradient-to-br from-[#FFF5F3] to-white border-r-2 border-[#A83119] break-words">
                        {renderFeatureValue(row.stormBuddi)}
                      </td>
                      
                      {/* SalesRabbit */}
                      <td className="p-5 text-center break-words">
                        {renderFeatureValue(row.salesRabbit)}
                      </td>
                      
                      {/* Jobber */}
                      <td className="p-5 text-center break-words">
                        {renderFeatureValue(row.jobber)}
                      </td>
                      
                      {/* Spotio */}
                      <td className="p-5 text-center break-words">
                        {renderFeatureValue(row.spotio)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-12 bg-gradient-to-br from-[#042D43] to-[#0A3D5A] rounded-2xl p-8 md:p-12 text-white shadow-[0_20px_60px_rgba(4,45,67,0.2)]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              The Only True All-in-One Solution
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#A83119] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Complete Platform</h4>
                  <p className="text-white/90 text-sm">
                    Storm Buddi delivers a true all-in-one solution for contractors and roofers looking to streamline every part of their business.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#A83119] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Industry-Specific</h4>
                  <p className="text-white/90 text-sm">
                    SalesRabbit and Spotio focus on canvassing and sales, while Jobber is a general field service platform. Storm Buddi is built specifically for roofing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default ComparisonTable;
