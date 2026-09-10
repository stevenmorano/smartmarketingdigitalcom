// src/components/preact/IntakeModal.jsx
import { useState, useEffect, useRef } from 'preact/hooks';

const FORMSPREE_FORM_ID = import.meta.env.PUBLIC_FORMSPREE_FORM_ID?.trim();

const isValidWebsiteUrl = (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue || /\s/.test(trimmedValue)) return false;

  try {
    const url = new URL(trimmedValue);
    return (url.protocol === 'http:' || url.protocol === 'https:') &&
           url.hostname.includes('.') &&
           !url.username &&
           !url.password;
  } catch {
    return false;
  }
};

export default function IntakeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const modalRef = useRef(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    businessType: "E-Commerce",
    challenge: "Scaling Ad Spend",
    services: [],
    monthlySpend: "$1k - $5k",
    improvements: "",
    message: ""
  });

  // Listen to global open event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setSuccess(false);
      setErrorMsg("");
      document.body.classList.add('modal-open');
    };
    window.addEventListener('open-intake', handleOpen);
    return () => window.removeEventListener('open-intake', handleOpen);
  }, []);

  // Handle focus trapping and auto-focus when modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Auto-focus the name input field
    const focusTimeout = setTimeout(() => {
      const nameInput = document.getElementById('intake-name');
      if (nameInput) {
        nameInput.focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        
        const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = Array.from(modalRef.current.querySelectorAll(focusableSelectors));
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab (Backwards)
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab (Forwards)
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (serviceName) => {
    setFormData(prev => {
      const services = prev.services.includes(serviceName)
        ? prev.services.filter(s => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services };
    });
  };

  const getStep1Error = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.website.trim()) {
      return "Please fill out all fields before proceeding.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return "Please enter a valid work email address.";
    }

    if (!isValidWebsiteUrl(formData.website)) {
      return "Please enter a complete website URL beginning with http:// or https://.";
    }

    return "";
  };

  const nextStep = () => {
    if (step === 1) {
      const validationError = getStep1Error();
      if (validationError) {
        setErrorMsg(validationError);
        return;
      }
    }

    setErrorMsg("");
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setErrorMsg("");
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = getStep1Error();
    if (validationError) {
      setStep(1);
      setErrorMsg(validationError);
      return;
    }

    if (!FORMSPREE_FORM_ID) {
      setErrorMsg("Form submission is not configured. Add PUBLIC_FORMSPREE_FORM_ID and restart the site before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name.trim());
      submissionData.append("email", formData.email.trim());
      submissionData.append("website", formData.website.trim());
      submissionData.append("businessType", formData.businessType);
      submissionData.append("challenge", formData.challenge);
      submissionData.append("services", formData.services.join(", "));
      submissionData.append("monthlySpend", formData.monthlySpend);
      submissionData.append("improvements", formData.improvements.trim());
      submissionData.append("message", formData.message.trim());

      const response = await fetch(`https://formspree.io/f/${encodeURIComponent(FORMSPREE_FORM_ID)}`, {
        method: "POST",
        body: submissionData,
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const providerError = Array.isArray(result?.errors)
          ? result.errors.map(error => error.message).filter(Boolean).join(" ")
          : typeof result?.error === "string" ? result.error : "";

        throw new Error(providerError || "Formspree could not accept the request. Please try again.");
      }

      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error && err.message
        ? err.message
        : "We couldn’t send your request. Please check your connection and try again.";

      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div class="modal-overlay" onClick={closeModal}>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 8, 17, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
          overflow-y: auto;
        }

        .modal-container {
          background: #0d1222;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          width: 100%;
          max-width: 600px;
          padding: 2.25rem;
          position: relative;
          color: var(--color-text-dark-primary);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.1);
          animation: modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          color: var(--color-text-dark-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.4rem;
          transition: var(--transition-smooth);
          outline: none;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--color-text-dark-primary);
        }

        .modal-close-btn:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .modal-close-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-spinner-content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner-svg {
          width: 1rem;
          height: 1rem;
          animation: modalSpinnerRotate 1.5s linear infinite;
        }

        @keyframes modalSpinnerRotate {
          to {
            transform: rotate(360deg);
          }
        }

        /* Form Header & Steps Indicator */
        .modal-header {
          margin-bottom: 1.75rem;
        }

        .modal-title {
          font-family: var(--font-headings);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: var(--gradient-blue-cyan);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .modal-subtitle {
          font-size: 0.85rem;
          color: var(--color-text-dark-secondary);
        }

        .steps-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .step-pill {
          height: 6px;
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
          transition: var(--transition-smooth);
        }

        .step-pill.active {
          background: var(--color-primary);
        }

        .step-label {
          font-family: var(--font-headings);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-dark-secondary);
          letter-spacing: 0.05em;
        }

        /* Form Inputs & Fields */
        .form-group {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-dark-secondary);
        }

        .form-input, .form-select, .form-textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: var(--color-text-dark-primary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition-smooth);
          width: 100%;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--color-primary);
          background: rgba(59, 130, 246, 0.03);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        /* Service checklist grid */
        .checklist-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-top: 0.25rem;
        }

        .check-card {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          padding: 0.6rem 0.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          transition: var(--transition-smooth);
          position: relative;
        }

        .check-card.checked {
          border-color: var(--color-primary);
          background: rgba(59, 130, 246, 0.05);
        }

        .check-card:focus-within {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .check-input {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .checkbox-custom {
          width: 16px;
          height: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.65rem;
          color: #ffffff;
        }

        .check-card.checked .checkbox-custom {
          background: var(--color-primary);
          border-color: var(--color-primary);
        }

        /* Footer buttons */
        .modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          gap: 1rem;
        }

        .error-banner {
          background: rgba(244, 63, 94, 0.1);
          border: 1px solid rgba(244, 63, 94, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          color: #f43f5e;
          margin-bottom: 1.25rem;
        }

        /* Success Card styling */
        .success-box {
          text-align: center;
          padding: 1.5rem 0.5rem;
        }

        .success-icon {
          width: 4rem;
          height: 4rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: var(--color-accent-teal);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
        }

        .success-desc {
          color: var(--color-text-dark-secondary);
          font-size: 0.9rem;
          margin-top: 0.75rem;
          line-height: 1.6;
        }

        @media (max-width: 500px) {
          .checklist-grid {
            grid-template-columns: 1fr;
          }
          .modal-container {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div ref={modalRef} class="modal-container" onClick={(e) => e.stopPropagation()}>
        <button class="modal-close-btn" aria-label="Close" onClick={closeModal} disabled={isSubmitting}>×</button>

        {success ? (
          <div class="success-box animate-float">
            <div class="success-icon">✓</div>
            <h3 class="modal-title" style="-webkit-text-fill-color: initial; color: #ffffff;">Review Request Received</h3>
            <p class="success-desc">
              Thank you for sharing your project details, <strong>{formData.name}</strong>. 
              <br/><br/>
              Steven Morano will personally review your business model, current marketing system, and website details. If it looks like we are a fit, you'll receive a detailed assessment and scheduling link in your inbox.
            </p>
            <button class="btn btn-primary" style="margin-top: 1.75rem;" onClick={closeModal}>Close Window</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div class="modal-header">
              <h3 class="modal-title">Request a Strategy Review</h3>
              <p class="modal-subtitle">Share your metrics. I'll review your channels before recommending steps.</p>
            </div>

            <div class="steps-indicator">
              <span class="step-label">Step {step} of 3</span>
              <div class={`step-pill ${step >= 1 ? 'active' : ''}`}></div>
              <div class={`step-pill ${step >= 2 ? 'active' : ''}`}></div>
              <div class={`step-pill ${step >= 3 ? 'active' : ''}`}></div>
            </div>

            {errorMsg && <div class="error-banner" role="alert">{errorMsg}</div>}

            {/* STEP 1: Contact & Brand */}
            {step === 1 && (
              <div class="step-content">
                <div class="form-group">
                  <label class="form-label" for="intake-name">Your Full Name</label>
                  <input class="form-input" type="text" id="intake-name" name="name" placeholder="Steven Morano"
                    value={formData.name} onInput={handleInputChange} required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="intake-email">Work Email Address</label>
                  <input class="form-input" type="email" id="intake-email" name="email" placeholder="smart@stevenmorano.com"
                    value={formData.email} onInput={handleInputChange} required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="intake-website">Website or Business URL</label>
                  <input class="form-input" type="url" id="intake-website" name="website" placeholder="https://smart.stevenmorano.com"
                    value={formData.website} onInput={handleInputChange} required />
                </div>
              </div>
            )}

            {/* STEP 2: Business & Project */}
            {step === 2 && (
              <div class="step-content">
                <div class="form-group">
                  <label class="form-label" for="intake-type">Business Model Type</label>
                  <select class="form-select" id="intake-type" name="businessType" value={formData.businessType} onChange={handleInputChange}>
                    <option value="E-Commerce">E-Commerce Brand</option>
                    <option value="Service Provider">B2B / Service Provider</option>
                    <option value="Local Brand">Local / Retail Business</option>
                    <option value="SaaS">SaaS / Tech Startup</option>
                    <option value="Other">Other Business Model</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="intake-challenge">Main Marketing Challenge</label>
                  <select class="form-select" id="intake-challenge" name="challenge" value={formData.challenge} onChange={handleInputChange}>
                    <option value="Scaling Ad Spend">Scaling Paid Ad Spend Profitably</option>
                    <option value="Lead Quality">Improving Lead Capture & Lead Quality</option>
                    <option value="Tracking & Attribution">Analytics, Tracking & Data Attribution</option>
                    <option value="Funnel Drop-off">Funnel Conversions & Page Drops</option>
                    <option value="CRM & CRM Setup">Email CRM automation / Nurture Sequences</option>
                    <option value="Other">Other Challenge</option>
                  </select>
                </div>
                <div class="form-group">
                  <span class="form-label" id="systems-interest-label">Systems of Interest (Check all that apply)</span>
                  <div class="checklist-grid" role="group" aria-labelledby="systems-interest-label">
                    {[
                      "Full Marketing Audit",
                      "Priorities & Action Plan",
                      "Websites, Offers & Conversion Paths",
                      "Acquisition & Channel Strategy",
                      "CRM, Follow-Up & Customer Journeys",
                      "Analytics, Reporting & Smarter Workflows"
                    ].map(srv => (
                      <label class={`check-card ${formData.services.includes(srv) ? 'checked' : ''}`}>
                        <input
                          class="check-input"
                          type="checkbox"
                          name="services"
                          value={srv}
                          checked={formData.services.includes(srv)}
                          onChange={() => handleCheckboxChange(srv)}
                        />
                        <span class="checkbox-custom" aria-hidden="true">
                          {formData.services.includes(srv) && "✓"}
                        </span>
                        <span>{srv}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Business Scope & Message */}
            {step === 3 && (
              <div class="step-content">
                <div class="form-group">
                  <label class="form-label" for="intake-spend">Monthly Marketing / Paid Ad Spend</label>
                  <select class="form-select" id="intake-spend" name="monthlySpend" value={formData.monthlySpend} onChange={handleInputChange}>
                    <option value="Under $1k">Under $1,000 / month</option>
                    <option value="$1k - $5k">$1,000 - $5,000 / month</option>
                    <option value="$5k - $20k">$5,000 - $20,000 / month</option>
                    <option value="$20k+">$20,000+ / month</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="intake-improvements">What are your primary optimization goals?</label>
                  <textarea class="form-textarea" id="intake-improvements" name="improvements" rows="2" 
                    placeholder="Tell me what is not working, where growth feels constrained, and what you would like help improving."
                    value={formData.improvements} onInput={handleInputChange}></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label" for="intake-message">Additional Context (Optional)</label>
                  <textarea class="form-textarea" id="intake-message" name="message" rows="2" 
                    placeholder="Anything else I should know before reviewing your site?"
                    value={formData.message} onInput={handleInputChange}></textarea>
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div class="modal-footer">
              {step > 1 ? (
                <button type="button" class="btn btn-light-secondary" onClick={prevStep} disabled={isSubmitting}>Back</button>
              ) : (
                <button type="button" class="btn btn-light-secondary" onClick={closeModal} disabled={isSubmitting}>Cancel</button>
              )}

              {step < 3 ? (
                <button type="button" class="btn btn-primary" onClick={nextStep}>Next Step</button>
              ) : (
                <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span class="btn-spinner-content">
                      <svg class="spinner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
                      </svg>
                      Submitting...
                    </span>
                  ) : "Request Free Review"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
