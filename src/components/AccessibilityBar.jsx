import React, { useState, useEffect } from 'react';
import { Eye, Volume2, Type, Sliders, X, RotateCcw, Check, Sparkles } from 'lucide-react';

const AccessibilityBar = () => {
  // State for accessibility options with localStorage persistence
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('bcf_a11y_font') || 'normal';
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('bcf_a11y_contrast') === 'true';
  });
  const [readableFont, setReadableFont] = useState(() => {
    return localStorage.getItem('bcf_a11y_readable') === 'true';
  });
  const [highlightLinks, setHighlightLinks] = useState(() => {
    return localStorage.getItem('bcf_a11y_links') === 'true';
  });
  const [extraSpacing, setExtraSpacing] = useState(() => {
    return localStorage.getItem('bcf_a11y_spacing') === 'true';
  });

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isScreenReaderOpen, setIsScreenReaderOpen] = useState(false);

  // Apply classes to root element
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.classList.remove('a11y-text-small', 'a11y-text-large');
    if (fontSize === 'small') root.classList.add('a11y-text-small');
    if (fontSize === 'large') root.classList.add('a11y-text-large');
    localStorage.setItem('bcf_a11y_font', fontSize);

    // Contrast
    if (highContrast) {
      root.classList.add('a11y-high-contrast');
    } else {
      root.classList.remove('a11y-high-contrast');
    }
    localStorage.setItem('bcf_a11y_contrast', highContrast);

    // Readable font
    if (readableFont) {
      root.classList.add('a11y-readable-font');
    } else {
      root.classList.remove('a11y-readable-font');
    }
    localStorage.setItem('bcf_a11y_readable', readableFont);

    // Highlight links
    if (highlightLinks) {
      root.classList.add('a11y-highlight-links');
    } else {
      root.classList.remove('a11y-highlight-links');
    }
    localStorage.setItem('bcf_a11y_links', highlightLinks);

    // Extra spacing
    if (extraSpacing) {
      root.classList.add('a11y-extra-spacing');
    } else {
      root.classList.remove('a11y-extra-spacing');
    }
    localStorage.setItem('bcf_a11y_spacing', extraSpacing);
  }, [fontSize, highContrast, readableFont, highlightLinks, extraSpacing]);

  // Reset all to default
  const handleReset = () => {
    setFontSize('normal');
    setHighContrast(false);
    setReadableFont(false);
    setHighlightLinks(false);
    setExtraSpacing(false);
  };

  return (
    <>
      {/* Top Utility Accessibility Bar (Government Standards / GIGW Compliant) */}
      <div className="a11y-top-bar" role="region" aria-label="Accessibility and Quick Navigation">
        {/* Left: Quick Skip Link & Official Standard Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#main-content" className="a11y-skip-link">
            Skip to Main Content
          </a>
          <span className="a11y-standard-tag hidden md:inline-flex" style={{ color: '#94a3b8', fontSize: '0.72rem', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={11} style={{ color: 'var(--gold)' }} />
            GIGW 3.0 & WCAG 2.1 Compliant
          </span>
        </div>

        {/* Right: Accessibility Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Screen Reader Access Link */}
          <button
            onClick={() => setIsScreenReaderOpen(true)}
            className="a11y-btn hidden sm:inline-flex"
            title="Screen Reader Access Information"
            aria-label="Screen Reader Access Information"
          >
            <Volume2 size={12} />
            <span>Screen Reader</span>
          </button>

          {/* Text Size Stepper: A- | A | A+ */}
          <div className="a11y-font-group" role="group" aria-label="Text Size Adjustment">
            <button
              onClick={() => setFontSize('small')}
              className={`a11y-font-btn ${fontSize === 'small' ? 'active' : ''}`}
              title="Decrease Font Size (A-)"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`a11y-font-btn ${fontSize === 'normal' ? 'active' : ''}`}
              title="Standard Font Size (A)"
              aria-label="Reset to Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`a11y-font-btn ${fontSize === 'large' ? 'active' : ''}`}
              title="Increase Font Size (A+)"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle Button */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`a11y-btn ${highContrast ? 'active' : ''}`}
            title={highContrast ? 'Switch to Standard Theme' : 'Switch to High Contrast Theme'}
            aria-label="Toggle High Contrast Theme"
          >
            <Eye size={12} />
            <span className="hidden xs:inline">{highContrast ? 'Standard' : 'High Contrast'}</span>
          </button>

          {/* Comprehensive Accessibility Options Dialog Trigger */}
          <button
            onClick={() => setIsOptionsOpen(true)}
            className="a11y-btn a11y-btn-gold"
            title="Accessibility Settings & Display Preferences"
            aria-label="Open Accessibility Settings Panel"
          >
            <Sliders size={12} />
            <span>Accessibility</span>
          </button>
        </div>
      </div>

      {/* Screen Reader Information Modal */}
      {isScreenReaderOpen && (
        <div 
          className="a11y-modal-backdrop"
          onClick={() => setIsScreenReaderOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sr-title"
        >
          <div className="a11y-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="a11y-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Volume2 size={20} style={{ color: 'var(--gold)' }} />
                <h3 id="sr-title" style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Screen Reader Access</h3>
              </div>
              <button 
                onClick={() => setIsScreenReaderOpen(false)} 
                className="a11y-modal-close"
                aria-label="Close Screen Reader Dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="a11y-modal-body">
              <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '0.92rem' }}>
                The <strong>Bhongle Charitable Foundation</strong> website complies with the <em>Guidelines for Indian Government Websites (GIGW 3.0)</em> and World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA/AAA standards.
              </p>

              <h4 style={{ color: 'var(--gold)', fontSize: '0.98rem', marginTop: '1rem', marginBottom: '0.4rem' }}>
                Supported Screen Readers & Assistive Tools:
              </h4>
              <ul style={{ color: '#e2e8f0', fontSize: '0.88rem', paddingLeft: '1.25rem', lineHeight: '1.6' }}>
                <li><strong>NVDA (NonVisual Desktop Access):</strong> Free open-source reader for Windows</li>
                <li><strong>JAWS (Job Access With Speech):</strong> Commercial Windows screen reader</li>
                <li><strong>VoiceOver:</strong> Built-in standard on macOS and iOS devices</li>
                <li><strong>TalkBack:</strong> Built-in Android screen reader</li>
                <li><strong>Narrator:</strong> Standard Windows assistive voice reader</li>
              </ul>

              <h4 style={{ color: 'var(--gold)', fontSize: '0.98rem', marginTop: '1rem', marginBottom: '0.4rem' }}>
                Keyboard Navigation Shortcuts:
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.5' }}>
                Press <kbd style={{ background: '#002b49', border: '1px solid var(--gold)', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Tab</kbd> to move forward through interactive elements, and <kbd style={{ background: '#002b49', border: '1px solid var(--gold)', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Shift + Tab</kbd> to move backward. Press <kbd style={{ background: '#002b49', border: '1px solid var(--gold)', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Enter</kbd> to activate links and buttons.
              </p>
            </div>

            <div className="a11y-modal-footer">
              <button onClick={() => setIsScreenReaderOpen(false)} className="btn btn-gold" style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}>
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Accessibility Settings Panel */}
      {isOptionsOpen && (
        <div 
          className="a11y-modal-backdrop"
          onClick={() => setIsOptionsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-settings-title"
        >
          <div className="a11y-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="a11y-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sliders size={20} style={{ color: 'var(--gold)' }} />
                <h3 id="a11y-settings-title" style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Accessibility Preferences</h3>
              </div>
              <button 
                onClick={() => setIsOptionsOpen(false)} 
                className="a11y-modal-close"
                aria-label="Close Accessibility Preferences"
              >
                <X size={18} />
              </button>
            </div>

            <div className="a11y-modal-body">
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Customize your reading and visual preferences. All choices are automatically saved for your subsequent visits.
              </p>

              {/* 1. Font Size Control */}
              <div className="a11y-setting-row">
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '0.95rem' }}>Text Sizing</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Adjust default page typography scale</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setFontSize('small')}
                    className={`a11y-choice-btn ${fontSize === 'small' ? 'active' : ''}`}
                  >
                    Smaller (90%)
                  </button>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`a11y-choice-btn ${fontSize === 'normal' ? 'active' : ''}`}
                  >
                    Default (100%)
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`a11y-choice-btn ${fontSize === 'large' ? 'active' : ''}`}
                  >
                    Larger (115%)
                  </button>
                </div>
              </div>

              {/* 2. High Contrast Theme */}
              <div className="a11y-setting-row">
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '0.95rem' }}>High Contrast Theme</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pure dark background with vibrant yellow & white accents</span>
                </div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`a11y-toggle-btn ${highContrast ? 'active' : ''}`}
                  aria-pressed={highContrast}
                >
                  {highContrast ? <Check size={14} /> : null}
                  <span>{highContrast ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>

              {/* 3. Dyslexia / Clean Readability Font */}
              <div className="a11y-setting-row">
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '0.95rem' }}>Dyslexia-Friendly Typography</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Switch all fonts to highly legible neutral sans-serif</span>
                </div>
                <button
                  onClick={() => setReadableFont(!readableFont)}
                  className={`a11y-toggle-btn ${readableFont ? 'active' : ''}`}
                  aria-pressed={readableFont}
                >
                  {readableFont ? <Check size={14} /> : null}
                  <span>{readableFont ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>

              {/* 4. Highlight Links */}
              <div className="a11y-setting-row">
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '0.95rem' }}>Highlight Clickable Links</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Add prominent underlines and outlines to all interactive links</span>
                </div>
                <button
                  onClick={() => setHighlightLinks(!highlightLinks)}
                  className={`a11y-toggle-btn ${highlightLinks ? 'active' : ''}`}
                  aria-pressed={highlightLinks}
                >
                  {highlightLinks ? <Check size={14} /> : null}
                  <span>{highlightLinks ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>

              {/* 5. Expanded Line Spacing */}
              <div className="a11y-setting-row">
                <div>
                  <strong style={{ color: '#fff', display: 'block', fontSize: '0.95rem' }}>Expanded Text Spacing</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Enhance line height and letter spacing for relaxed reading</span>
                </div>
                <button
                  onClick={() => setExtraSpacing(!extraSpacing)}
                  className={`a11y-toggle-btn ${extraSpacing ? 'active' : ''}`}
                  aria-pressed={extraSpacing}
                >
                  {extraSpacing ? <Check size={14} /> : null}
                  <span>{extraSpacing ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>
            </div>

            <div className="a11y-modal-footer">
              <button onClick={handleReset} className="a11y-reset-btn" title="Reset all accessibility preferences">
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
              <button onClick={() => setIsOptionsOpen(false)} className="btn btn-gold" style={{ padding: '0.5rem 1.4rem', fontSize: '0.9rem' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityBar;
