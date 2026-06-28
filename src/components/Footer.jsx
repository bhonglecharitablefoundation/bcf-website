import React from 'react';
import { Mail, Phone, MapPin, Heart, Shield } from 'lucide-react';

const Footer = ({ onOpenDonate, onOpenVolunteer }) => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom SVG for X (Twitter)
  const XIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  // Custom SVG for Facebook
  const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
    </svg>
  );

  // Custom SVG for Instagram
  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  return (
    <footer
      style={{
        backgroundColor: 'var(--primary-dark)',
        color: '#fff',
        borderTop: '2px solid var(--gold)',
        padding: '5rem 2rem 2rem 2rem',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}
      >
        {/* About column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src="/logo.png"
              alt="BCF Logo"
              style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                border: '1.5px solid var(--gold)',
              }}
            />
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                BHONGLE
              </h4>
              <span style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.5px' }}>
                CHARITABLE FOUNDATION
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5', filter: 'brightness(1.5)' }}>
            Empowering marginalized communities across India through holistic healthcare, education, sustainable livelihoods, and environmental restoration.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={onOpenDonate}
              className="btn btn-gold"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Heart size={14} fill="currentColor" />
              Donate
            </button>
            <button
              onClick={onOpenVolunteer}
              className="btn btn-outline-white"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              Volunteer
            </button>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a href="https://www.facebook.com/Bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={socialIconStyle}>
              <FacebookIcon />
            </a>
            <a href="https://x.com/BhongleCF" target="_blank" rel="noreferrer" style={socialIconStyle}>
              <XIcon />
            </a>
            <a href="https://www.instagram.com/bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={socialIconStyle}>
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Quick Links column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 600 }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            {['home', 'about', 'focus', 'governance', 'involved', 'contact'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => handleScrollTo(id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-light)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize',
                    textAlign: 'left',
                    filter: 'brightness(1.4)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={(e) => e.target.style.color = 'inherit'}
                >
                  {id === 'focus' ? 'Our Focus' : id === 'involved' ? 'Get Involved' : id === 'contact' ? 'Contact Us' : id === 'about' ? 'About Us' : id}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Focus Areas column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 600 }}>
            Core Pillars
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            {[
              'Healthcare & Holistic Wellness',
              'Education & Skill Development',
              'Social Welfare & Inclusivity',
              'Ecological Preservation',
            ].map((pillar, index) => (
              <li
                key={index}
                style={{
                  color: 'var(--text-light)',
                  fontSize: '0.9rem',
                  filter: 'brightness(1.4)',
                }}
              >
                {pillar}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact/Statutory column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 600 }}>
            Compliance & Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-light)', filter: 'brightness(1.4)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <MapPin size={16} style={{ color: 'var(--gold)', marginTop: '0.2rem', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                Plot No. 181, Venkatesh Nagar Phase-2, Near KDK College Road, Nandanvan, Nagpur, MH – 440009
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Mail size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <a href="mailto:bhonglecharitablefoundation@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                bhonglecharitablefoundation@gmail.com
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Phone size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span>+91-7387498932</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
              <Shield size={16} style={{ color: 'var(--gold)', marginTop: '0.1rem', flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem' }}>
                Reg No: E-0004363NGP<br />
                12A & 80G Certified Trust
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-light)',
          filter: 'brightness(1.3)',
        }}
      >
        <p>© {currentYear} Bhongle Charitable Foundation. All Rights Reserved.</p>
        <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>
          Bhongle Charitable Foundation operates as an irrevocable Public Charitable Trust registered in Nagpur, Maharashtra under the Maharashtra Public Trusts Act, 1950. All donations are tax-exempted under sections 12A & 80G.
        </p>
      </div>
    </footer>
  );
};

const socialIconStyle = {
  color: 'var(--text-light)',
  opacity: 0.8,
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  filter: 'brightness(1.4)',
};

export default Footer;
