import React, { useState } from 'react';
import { X, CheckCircle, Heart, Phone, Mail, Award, Info, MessageSquare } from 'lucide-react';

export const DonateModal = ({ isOpen, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState('direct'); // 'direct' or 'mailto'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    txId: '',
    pillar: 'General Fund',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.amount || !formData.txId) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Generate formatted mailto link for fallback
    const toEmail = "bhonglecharitablefoundation@gmail.com";
    const subject = `Donation Confirmation Report - ${formData.name}`;
    const body = `Dear Bhongle Charitable Foundation Finance Team,

I have completed a bank transfer donation and would like to report my transaction details to receive my 80G Tax Exemption Receipt.

Here are my donation details:
-------------------------------------
Donor Name: ${formData.name}
Email Address: ${formData.email}
Mobile Number: ${formData.phone || 'Not provided'}
Donation Amount: INR ${formData.amount}
Transaction Reference ID: ${formData.txId}
Directed Funding Pillar: ${formData.pillar}
-------------------------------------

Please find the bank transfer record in your logs. Kindly issue the 80G Receipt and certificate.

Thank you,
${formData.name}`;

    const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    fetch("https://formsubmit.co/ajax/bhonglecharitablefoundation@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "Form Type": "Donation Report (80G Request)",
        "Donor Name": formData.name,
        "Email Address": formData.email,
        "Mobile Number": formData.phone || "Not provided",
        "Donation Amount": `INR ${formData.amount}`,
        "Transaction Ref ID": formData.txId,
        "Directed Funding Pillar": formData.pillar
      })
    })
    .then(res => {
      setIsSubmitting(false);
      if (res.ok) {
        setSubmissionMethod('direct');
        setFormSubmitted(true);
      } else {
        throw new Error("FormSubmit response error");
      }
    })
    .catch(err => {
      setIsSubmitting(false);
      console.warn("Direct submission failed, using mailto fallback", err);
      setSubmissionMethod('mailto');
      window.location.href = mailtoUrl;
      setFormSubmitted(true);
    });
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle} className="glass-modal">
        {/* Header */}
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Heart size={24} style={{ color: 'var(--gold)' }} fill="var(--gold)" />
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.4rem' }}>
              Support Our Mission
            </h3>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {!formSubmitted ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxHeight: '75vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
            
            {/* Left Column: Bank Details & WhatsApp */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Direct Bank Transfer */}
              <div style={{ background: 'rgba(0, 43, 73, 0.03)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontWeight: 600, fontSize: '1rem' }}>
                  Direct Bank Transfer Details
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-light)', display: 'block' }}>Account Holder Name</strong>
                    <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Bhongle Charitable Foundation</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-light)', display: 'block' }}>Bank Name</strong>
                    <p style={{ color: 'var(--primary)', fontWeight: 600 }}>State Bank of India</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-light)', display: 'block' }}>Account Number</strong>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.5px' }}>44993192603</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-light)', display: 'block' }}>Branch Name</strong>
                    <p style={{ color: 'var(--primary)', fontWeight: 600 }}>CHHAPRUNAGAR (NAGPUR)</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-light)', display: 'block' }}>IFSC Code</strong>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.5px' }}>SBIN0005461</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '8px', padding: '0.75rem', marginTop: '0.5rem' }}>
                  <Info size={14} style={{ color: 'var(--gold-dark)', marginTop: '0.1rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', lineHeight: '1.3' }}>
                    <strong>80G Benefit:</strong> Contributions are 50% tax exempt. Submit the transfer record details to receive your official certificate.
                  </span>
                </div>
              </div>

              {/* WhatsApp QR Code */}
              <div style={{ border: '1px solid rgba(0,43,73,0.1)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff' }}>
                <img 
                  src="/whatsapp-qr.png" 
                  alt="WhatsApp Join QR" 
                  style={{
                    width: '90px',
                    height: '90px',
                    border: '2px solid var(--gold)',
                    borderRadius: '8px',
                    padding: '2px',
                    background: '#fff'
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <h5 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700 }}>
                    Join Us on WhatsApp
                  </h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', lineHeight: '1.3' }}>
                    Scan this QR code with your phone camera to join our official volunteer and support group directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Donation Submission Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontWeight: 600, borderBottom: '1px solid rgba(0,43,73,0.1)', paddingBottom: '0.5rem', fontSize: '1rem' }}>
                Report Donation (Get 80G Receipt)
              </h4>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    className="form-control" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Mobile Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="10-digit mobile" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Donation Amount (INR) *</label>
                  <input 
                    type="number" 
                    required 
                    className="form-control" 
                    placeholder="e.g. 5000" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Transaction Ref ID *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    placeholder="Ref No / Txn ID" 
                    value={formData.txId}
                    onChange={(e) => setFormData({...formData, txId: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Direct Funding to Pillar</label>
                <select 
                  className="form-control"
                  value={formData.pillar}
                  onChange={(e) => setFormData({...formData, pillar: e.target.value})}
                >
                  <option value="General Fund">General Fund (Wherever needed)</option>
                  <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                  <option value="Education & Skill Development">Education & Skill Development</option>
                  <option value="Social Welfare & Inclusivity">Social Welfare & Inclusivity</option>
                  <option value="Environmental Sustainability">Environmental Sustainability</option>
                </select>
              </div>

              <button type="submit" className="btn btn-gold" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? 'Submitting...' : 'Submit Donation Report'}
              </button>
            </form>
          </div>
        ) : (
          /* Submission success */
          <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <CheckCircle size={60} style={{ color: 'var(--green-light)' }} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                {submissionMethod === 'direct' ? 'Donation Report Sent!' : 'Email Client Prompted!'}
              </h3>
              <p style={{ color: 'var(--text-light)', maxWidth: '450px', margin: '0 auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {submissionMethod === 'direct'
                  ? `Your donation report for ₹${formData.amount} has been submitted directly. Our finance team will review the transaction reference (ID: ${formData.txId}) and issue your 80G tax exemption receipt shortly.`
                  : `Your native email application has been launched with a pre-filled template to report your ₹${formData.amount} donation. Please click Send in your email app to deliver it to BCF.`
                }
              </p>
            </div>
            {submissionMethod === 'mailto' && (
              <div style={{ padding: '0.85rem 1.25rem', borderRadius: '8px', background: 'rgba(15, 81, 50, 0.05)', border: '1px solid rgba(15, 81, 50, 0.15)', fontSize: '0.8rem', color: 'var(--green-dark)', maxWidth: '450px' }}>
                If your email app did not open, please manually send details of transaction ID <strong>{formData.txId}</strong> to <strong>bhonglecharitablefoundation@gmail.com</strong>.
              </div>
            )}
            <button onClick={() => { setFormSubmitted(false); onClose(); }} className="btn btn-primary" style={{ minWidth: '130px' }}>
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const VolunteerModal = ({ isOpen, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState('direct'); // 'direct' or 'mailto'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Grassroots Support');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    const toEmail = "bhonglecharitablefoundation@gmail.com";
    const subject = `Volunteer Application - ${name}`;
    const body = `Dear BCF Secretariat,

I am writing to submit my application to join Bhongle Charitable Foundation as a field volunteer.

My application details:
-------------------------------------
Full Name: ${name}
Email Address: ${email}
Mobile Number: ${phone}
Primary Interest Area: ${interest}

Skills & Message:
${message || 'Not provided'}
-------------------------------------

I look forward to coordinating with your team.

Thank you,
${name}`;

    const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    fetch("https://formsubmit.co/ajax/bhonglecharitablefoundation@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "Form Type": "Volunteer Application",
        "Full Name": name,
        "Email Address": email,
        "Mobile Number": phone,
        "Primary Interest Area": interest,
        "Skills & Message": message || "Not provided"
      })
    })
    .then(res => {
      setIsSubmitting(false);
      if (res.ok) {
        setSubmissionMethod('direct');
        setFormSubmitted(true);
      } else {
        throw new Error("FormSubmit error");
      }
    })
    .catch(err => {
      setIsSubmitting(false);
      console.warn("Direct submission failed, using mailto fallback", err);
      setSubmissionMethod('mailto');
      window.location.href = mailtoUrl;
      setFormSubmitted(true);
    });
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle} className="glass-modal">
        {/* Header */}
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={24} style={{ color: 'var(--gold)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.4rem' }}>
              Join as a Volunteer
            </h3>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {!formSubmitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '75vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
              Bhongle Charitable Foundation welcomes volunteers across India. Lend your skills, time, or energy to empower those in need. Coordinate with our office at <strong>+91-7387498932</strong>.
            </p>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                required 
                className="form-control" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  required 
                  className="form-control" 
                  placeholder="your.email@domain.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Mobile Number *</label>
                <input 
                  type="tel" 
                  required 
                  className="form-control" 
                  placeholder="10-digit phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Primary Interest Area</label>
              <select 
                className="form-control"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="Grassroots Support">Grassroots Field Mobilization (Nagpur Region)</option>
                <option value="Healthcare Assistance">Subsidized Health & Naturopathy Camps</option>
                <option value="Academic Support">Adult & Child Literacy Teaching</option>
                <option value="Environmental Drives">Afforestation & Seed Bank Management</option>
                <option value="Digital Media">Website, Copywriting & Media Communication</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Skills & Message</label>
              <textarea 
                rows="3" 
                className="form-control" 
                placeholder="Tell us about yourself, your background, or any skills you'd like to share..."
                style={{ resize: 'vertical' }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        ) : (
          /* Submission success */
          <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <CheckCircle size={60} style={{ color: 'var(--green-light)' }} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                {submissionMethod === 'direct' ? 'Application Submitted!' : 'Email Client Prompted!'}
              </h3>
              <p style={{ color: 'var(--text-light)', maxWidth: '450px', margin: '0 auto', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {submissionMethod === 'direct'
                  ? `Thank you, ${name}! Your application to volunteer for "${interest}" has been submitted successfully. Our coordinators will reach out to you soon.`
                  : `Your native email application has been launched with a pre-filled volunteer application template. Please click Send in your email app to complete submission to BCF.`
                }
              </p>
            </div>
            {submissionMethod === 'mailto' && (
              <div style={{ padding: '0.85rem 1.25rem', borderRadius: '8px', background: 'rgba(0, 43, 73, 0.05)', border: '1px solid rgba(0, 43, 73, 0.15)', fontSize: '0.8rem', color: 'var(--primary)', maxWidth: '450px' }}>
                If your email app did not open, please manually email your interest in <strong>{interest}</strong> to <strong>bhonglecharitablefoundation@gmail.com</strong>.
              </div>
            )}
            <button onClick={() => { setFormSubmitted(false); onClose(); }} className="btn btn-outline" style={{ minWidth: '130px' }}>
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 25, 43, 0.75)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  padding: '1.5rem',
};

const modalContentStyle = {
  background: '#fffdf9',
  border: '2px solid var(--gold)',
  borderRadius: '20px',
  width: '100%',
  maxWidth: '750px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(212, 175, 55, 0.15)',
  padding: '2.5rem',
  position: 'relative',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgba(0, 43, 73, 0.1)',
  paddingBottom: '1.25rem',
  marginBottom: '1.5rem',
};

const closeButtonStyle = {
  background: 'rgba(0, 43, 73, 0.05)',
  border: 'none',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'var(--primary)',
  transition: 'all 0.3s ease',
};
