import React, { useState } from 'react';
import './Contact.css';
import type { ContactFormData } from '../../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: '',
    gdprConsent: false,
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'Zustimmung zur Datenverarbeitung ist erforderlich' as any;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredDate: '',
        gdprConsent: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="contact section">
        <div className="container">
          <div className="contact-success">
            <h2>Vielen Dank für Ihre Nachricht!</h2>
            <p>Ich melde mich zeitnah bei Ihnen zurück.</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="btn btn-primary"
            >
              Neue Nachricht senden
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-header">
          <h2>Bereit für Veränderung?</h2>
          <p>Gemeinsam finden wir heraus, was Dich bremst – und wie du es verändern kannst.</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  E-Mail <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredDate" className="form-label">
                  Terminwunsch (optional)
                </label>
                <input
                  type="text"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="z.B. nächste Woche vormittags"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Nachricht/Anliegen <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
                  rows={5}
                  required
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleInputChange}
                    className="checkbox-input"
                    required
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    Ich stimme der Verarbeitung meiner Daten gemäß der <a href="#datenschutz" className="privacy-link">Datenschutzerklärung</a> zu. <span className="required">*</span>
                  </span>
                </label>
                {errors.gdprConsent && <span className="error-message">{String(errors.gdprConsent)}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary contact-submit"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h3>Direkter Kontakt</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Kostenloses Erstgespräch</strong>
                <p>Lernen Sie mich und meine Arbeitsweise kennen – unverbindlich und kostenfrei.</p>
              </div>
              
              <div className="contact-item">
                <strong>Schnelle Antwort</strong>
                <p>Ich melde mich in der Regel innerhalb von 24 Stunden zurück.</p>
              </div>
              
              <div className="contact-item">
                <strong>Flexible Termine</strong>
                <p>Auch abends und am Wochenende möglich – nach Vereinbarung.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;