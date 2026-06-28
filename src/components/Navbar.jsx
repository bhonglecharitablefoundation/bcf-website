import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = ({ onOpenDonate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check active section
      const sections = ['home', 'about', 'focus', 'governance', 'involved', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Our Focus', id: 'focus' },
    { name: 'Governance', id: 'governance' },
    { name: 'Get Involved', id: 'involved' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom SVG for X (Twitter)
  const XIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  // Custom SVG for Facebook
  const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
    </svg>
  );

  // Custom SVG for Instagram
  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '0.6rem 2.5rem' : '1.2rem 2.5rem',
        background: isScrolled ? 'rgba(0, 43, 73, 0.98)' : 'linear-gradient(to bottom, rgba(0,25,43,0.75) 0%, rgba(0,25,43,0) 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '2px solid var(--gold)' : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Brand Logo & Standout Text */}
      <div 
        onClick={() => handleNavClick('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          cursor: 'pointer',
        }}
      >
        <img 
          src="/logo.png" 
          alt="BCF Logo" 
          style={{
            height: isScrolled ? '64px' : '88px',
            width: isScrolled ? '64px' : '88px',
            borderRadius: '50%',
            border: '2.5px solid var(--gold)',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.25)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span 
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: isScrolled ? '1.4rem' : '1.8rem',
              color: '#fff',
              letterSpacing: '1px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            BHONGLE
          </span>
          <span 
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: isScrolled ? '0.85rem' : '1rem',
              color: 'var(--gold)',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              marginTop: '1px',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            CHARITABLE FOUNDATION
          </span>
        </div>
      </div>

      {/* Desktop Navigation & Actions */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
        className="hidden md:flex"
      >
        <ul 
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '1.5rem',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: activeSection === link.id ? 'var(--gold)' : '#fff',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.25rem 0',
                  transition: 'color 0.3s ease',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {link.name}
                {activeSection === link.id && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--gold)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Social Media Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1rem' }}>
          <a href="https://www.facebook.com/Bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={socialLinkStyle} title="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://x.com/BhongleCF" target="_blank" rel="noreferrer" style={socialLinkStyle} title="X (Twitter)">
            <XIcon />
          </a>
          <a href="https://www.instagram.com/bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={socialLinkStyle} title="Instagram">
            <InstagramIcon />
          </a>
        </div>

        <button
          onClick={onOpenDonate}
          className="btn btn-gold"
          style={{
            padding: '0.65rem 1.6rem',
            fontSize: '0.95rem',
          }}
        >
          <Heart size={16} fill="currentColor" />
          Donate Now
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'none',
        }}
        className="md:hidden-toggle"
      >
        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--primary-dark)',
            borderBottom: '2px solid var(--gold)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            animation: 'fadeInUp 0.3s ease-out forwards',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1.2rem',
                color: activeSection === link.id ? 'var(--gold)' : '#fff',
                cursor: 'pointer',
                padding: '0.5rem 0',
              }}
            >
              {link.name}
            </button>
          ))}
          
          {/* Social Icons for Mobile */}
          <div style={{ display: 'flex', gap: '1.5rem', margin: '0.5rem 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            <a href="https://www.facebook.com/Bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>
              <FacebookIcon />
            </a>
            <a href="https://x.com/BhongleCF" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>
              <XIcon />
            </a>
            <a href="https://www.instagram.com/bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>
              <InstagramIcon />
            </a>
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenDonate();
            }}
            className="btn btn-gold"
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '0.5rem',
            }}
          >
            <Heart size={18} fill="currentColor" />
            Donate Now
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .hidden.md\\:flex {
            display: none !important;
          }
          .md\\:hidden-toggle {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .md\\:hidden-toggle {
            display: none !important;
          }
        }
      `}} />
    </nav>
  );
};

const socialLinkStyle = {
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.8,
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  padding: '0.25rem',
};

// Add hover effects for socials
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    a[href^="https://www.facebook"]:hover, a[href^="https://x.com"]:hover, a[href^="https://www.instagram"]:hover {
      color: var(--gold) !important;
      opacity: 1 !important;
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(styleEl);
}

export default Navbar;
