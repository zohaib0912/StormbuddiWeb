import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const EventPopupModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignUp = () => {
    window.location.href = 'https://stormbuddi.com/signup';
  };

  return createPortal(
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes imageFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .modal-overlay {
          animation: fadeIn 0.3s ease-in-out;
        }
        .modal-content {
          animation: slideUpFade 0.4s ease-out;
        }
        .modal-image {
          animation: imageFadeIn 0.6s ease-in-out 0.2s both;
        }
      `}</style>
      <div
        className="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="modal-content relative bg-white rounded-2xl shadow-2xl w-auto max-w-[90vw] mx-4 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Event Image */}
          <div className="flex-shrink-0">
            <img
              src="/images/Event.png"
              alt="Storm Buddi Luncheon & Live Demo Event"
              className="modal-image h-auto object-contain rounded-t-2xl max-h-[70vh] max-w-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-2xl flex items-center justify-center">
                    <div class="text-center text-[#4C6371] text-lg">
                      <div class="text-5xl mb-2">📅</div>
                      <div>Event Image</div>
                    </div>
                  </div>
                `;
              }}
            />
          </div>

          {/* Sign Up Button */}
          <div className="p-6 bg-white rounded-b-2xl flex-shrink-0">
            <button
              onClick={handleSignUp}
              className="w-full bg-gradient-to-br from-[#A83119] to-[#D1452A] text-white py-4 px-8 rounded-xl text-lg font-bold shadow-[0_6px_20px_rgba(168,49,25,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(168,49,25,0.4)]"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default EventPopupModal;

