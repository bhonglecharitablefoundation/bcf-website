import React, { useState, useEffect } from 'react';
import { 
  Heart, BookOpen, Shield, Users, Mail, Phone, MapPin, 
  ChevronRight, ChevronLeft, Award, Compass, ExternalLink, ArrowUpRight, 
  Info, CheckCircle2, Leaf, FileCheck, Activity, Pill,
  FileText, Calendar, Sparkles, Stethoscope, AlertCircle,
  TreePine, Cpu
} from 'lucide-react';
import Globe from './components/Globe';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DonateModal, VolunteerModal } from './components/Modals';

// Helper Component: Realistic Wing-Flapping, Scroll-Interactive Flying Bird
const FlyingBird = ({ startLeft, startTop, scrollSpeedX, scrollSpeedY, scaleSpeed, flapSpeed, delay, colors }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        left: startLeft,
        top: startTop,
        // Calculate translation (flight movement) and scale expansion (coming closer / getting larger) linked to scroll
        transform: `translate(calc(var(--scroll-y, 0px) * ${scrollSpeedX}), calc(var(--scroll-y, 0px) * ${scrollSpeedY})) scale(calc(0.45 + var(--scroll-y, 0px) * ${scaleSpeed}))`,
        opacity: `calc(1 - var(--scroll-y, 0px) * 0.0012)`, // Gently fade out as they fly off/close
        pointerEvents: 'none',
        zIndex: 1, // Stay in background, behind hero text layer (z-index 2) but above auroras
        transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
        animation: `float ${8 + delay}s infinite ease-in-out alternate`
      }}
    >
      <svg width="65" height="65" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 6px 8px rgba(0,0,0,0.18))' }}>
        <defs>
          {/* Custom unique gradient id for each bird based on color palette */}
          <linearGradient id={`birdGrad-${colors.join('-').replace(/#/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        
        {/* Left Wing (Animated via CSS rotation keyframes) */}
        <path 
          d="M 48,45 C 25,25 10,32 2,38 C 15,48 30,50 48,52 Z" 
          fill={`url(#birdGrad-${colors.join('-').replace(/#/g, '')})`}
          style={{
            transformOrigin: '48px 45px',
            animation: `flapLeft ${flapSpeed}s infinite ease-in-out`
          }}
        />

        {/* Right Wing (Animated via CSS rotation keyframes) */}
        <path 
          d="M 52,45 C 75,25 90,32 98,38 C 85,48 70,50 52,52 Z" 
          fill={`url(#birdGrad-${colors.join('-').replace(/#/g, '')})`}
          style={{
            transformOrigin: '52px 45px',
            animation: `flapRight ${flapSpeed}s infinite ease-in-out`
          }}
        />

        {/* Bird Body */}
        <path 
          d="M 50,58 C 54,52 54,40 50,35 C 46,40 46,52 50,58 Z" 
          fill={colors[0]}
        />
        
        {/* Beak */}
        <polygon points="50,30 48,35 52,35" fill="#fbc02d" />
      </svg>
    </div>
  );
};

function App() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  // High-Quality 4-Second Intro Splash Screen State
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  useEffect(() => {
    // Show splash for 4 seconds, then smoothly fade out
    const fadeTimer = setTimeout(() => {
      setSplashFading(true);
    }, 4000);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Set CSS custom property for scroll value to drive performant scroll animations
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // State for active Focus Area Pillar
  const [activePillar, setActivePillar] = useState(0);

  // State for Contact Form submission
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submissionMethod, setSubmissionMethod] = useState('direct'); // 'direct' or 'mailto'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Top Hero Featured Banner Slides (High-definition, uncropped event photography)
  const heroBannerSlides = [
    { src: '/bcf-event-image-1.png', alt: 'Bhongle Charitable Foundation Field Initiative' },
    { src: '/health-camp-group.jpg', alt: 'Nagpur Police Health Mission Mega Camp' },
    { src: '/bcf-event-image-2.png', alt: 'Community Awareness and Health Literacy Conference' },
    { src: '/health-camp-checkup.jpg', alt: 'Clinical Diagnostics and Medical Screening' }
  ];

  // State for Top Hero Panoramic Banner Carousel
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroSliderHovered, setIsHeroSliderHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Auto-advance banner slides every 3 seconds (pausing on hover)
  useEffect(() => {
    if (isHeroSliderHovered) return;
    const bannerTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroBannerSlides.length);
    }, 3000);
    return () => clearInterval(bannerTimer);
  }, [isHeroSliderHovered, heroBannerSlides.length]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      // Swiped left -> next photo
      setCurrentHeroSlide((prev) => (prev + 1) % heroBannerSlides.length);
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev photo
      setCurrentHeroSlide((prev) => (prev - 1 + heroBannerSlides.length) % heroBannerSlides.length);
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Custom SVG for X (Twitter)
  const XIcon = ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  // Custom SVG for Facebook
  const FacebookIcon = ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
    </svg>
  );

  // Custom SVG for Instagram
  const InstagramIcon = ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  // Strategic Partner & Supporting Organisations - Bar 1 (Civic & Medical Leadership)
  const partnerOrganisationsRow1 = [
    {
      name: "Maharashtra Police",
      subtitle: "State Law Enforcement & Public Safety",
      logo: "/partners/maharashtra-police.png"
    },
    {
      name: "Nagpur Municipal Corporation",
      subtitle: "Nagpur Mahanagar Palika (NMC)",
      logo: "/partners/nagpur-municipal-corporation.png"
    },
    {
      name: "IFPWD",
      subtitle: "International Federation for Social Welfare",
      logo: "/partners/ifpwd.png"
    },
    {
      name: "Nagpur Police",
      subtitle: "Nagpur City Police Department",
      logo: "/partners/nagpur-police.png"
    },
    {
      name: "Indian Medical Association",
      subtitle: "IMA Nagpur & Healthcare Experts",
      logo: "/partners/indian-medical-association.png"
    }
  ];

  // Strategic Partner & Supporting Organisations - Bar 2 (Academic, Medical & Healthcare Partners)
  const partnerOrganisationsRow2 = [
    {
      name: "KDK College of Pharmacy & Research Institute",
      subtitle: "Pharmaceutical Sciences & Healthcare Research",
      logo: "/partners/kdk-college-pharmacy.jpg"
    },
    {
      name: "Indian Medical Association - Junior Doctors Network",
      subtitle: "IMA-JDN Healthcare & Youth Medical Wing",
      logo: "/partners/ima-junior-doctors-network.jpg"
    },
    {
      name: "Bhausaheb Mulak Ayurved Mahavidyalaya & Hospital",
      subtitle: "Ayurvedic Medical Science & Hospital (BCYRC)",
      logo: "/partners/bhausaheb-mulak-ayurved.png"
    },
    {
      name: "Meethas Healthcare Private Limited",
      subtitle: "Monitoring to Management Healthcare Systems",
      logo: "/partners/meethas-healthcare.png"
    }
  ];

  // Focus Area Pillars data
  const pillars = [
    {
      title: "Healthcare & Holistic Wellness",
      tagline: "Bridging the accessibility gap with integrative clinical and natural therapies.",
      icon: <Heart className="text-gold" size={32} />,
      items: [
        { title: "Subsidized Diagnostic Centers", desc: "Setting up accessible clinics, diagnostic labs, and dispensaries for underserved rural areas." },
        { title: "Integrative Medical Sciences", desc: "Promoting preventative health through Yoga, Naturopathy, Ayurveda, and meditation." },
        { title: "Maternal & Child Prophylaxis", desc: "Organizing massive health camps, child immunization drives, and menstrual hygiene campaigns." }
      ]
    },
    {
      title: "Education, Literacy & Skill Development",
      tagline: "Eradicating illiteracy and driving digital/vocational empowerment.",
      icon: <BookOpen className="text-gold" size={32} />,
      items: [
        { title: "Eradication of Illiteracy", desc: "Establishing schools, modern libraries, and digital training programs for adults and kids." },
        { title: "Academic Sponsorships", desc: "Providing merit-cum-means scholarships and educational kits to marginalized students." },
        { title: "Livelihood & Capacity Building", desc: "Industry-aligned IT training and vocational learning to boost youth employability." }
      ]
    },
    {
      title: "Social Welfare, Equality & Inclusivity",
      tagline: "Restoring dignity and constitutional rights to the most vulnerable.",
      icon: <Users className="text-gold" size={32} />,
      items: [
        { title: "Women Empowerment", desc: "Supporting Self-Help Groups (SHGs), vocational training, and legal awareness campaigns." },
        { title: "Abandoned Demographics Protection", desc: "Establishing care homes for senior citizens and supportive pathways for differently-abled citizens." },
        { title: "Civic Reformation & Cultural Heritage", desc: "Character-building (Bal Sanskar Abhiyan), prisoner rehabilitation inside jails, and promotion of indigenous arts." }
      ]
    },
    {
      title: "Environmental Sustainability & Disaster Response",
      tagline: "Restoring biodiversity, conserving resources, and managing crises.",
      icon: <Leaf className="text-gold" size={32} />,
      items: [
        { title: "Ecological Restoration", desc: "Afforestation drives focusing on therapeutic flora (Neem, Tulsi, Peepal) and seed banks." },
        { title: "Resource & Water Conservation", desc: "Promoting community water-harvesting, waste management, and pollution abatement." },
        { title: "Disaster Mitigation & Relief", desc: "Deploying immediate nutrition lines, medical tents, and rehabilitation during crises." }
      ]
    }
  ];

  // Esteemed Advisory Board Members
  const advisoryBoardMembers = [
    {
      id: 1,
      name: "Dr. Sanjeev Deshmukh",
      degrees: "MBBS, MD (Medicine), FICP",
      designation: "Chief Clinical Strategy Advisor",
      pillar: "Healthcare & Clinical Excellence",
      bio: "Distinguished physician with over 28 years of clinical leadership. Guides BCF's clinical diagnostic workflows and preventative medicine camps.",
      avatarBg: "linear-gradient(135deg, #002b49 0%, #004b7a 100%)",
      initials: "SD",
      affiliation: "Senior Member, Indian Medical Association (IMA)"
    },
    {
      id: 2,
      name: "Shri Vijay Kumar Patil",
      degrees: "IPS (Retd.) • M.A., LL.B.",
      designation: "Public Administration & Police Welfare Advisor",
      pillar: "Civic Governance & Police Welfare",
      bio: "Former Special Inspector General of Police. Spearheads inter-agency civic coordination and institutional welfare programs.",
      avatarBg: "linear-gradient(135deg, #0f5132 0%, #198754 100%)",
      initials: "VP",
      affiliation: "Retd. Special Inspector General of Police, Maharashtra"
    },
    {
      id: 3,
      name: "Dr. Yuwaraj Kale",
      degrees: "BAMS, MD (Ayu), Ph.D.",
      designation: "Ayurvedic Sciences & Natural Therapies Advisor",
      pillar: "Integrative Holistic Medicine",
      bio: "Principal at Bhausaheb Mulak Ayurved Mahavidyalaya. Directs integrative clinical outreach, herbal therapeutic protocols, and yoga wellness.",
      avatarBg: "linear-gradient(135deg, #78350f 0%, #b45309 100%)",
      initials: "YK",
      affiliation: "Principal, Bhausaheb Mulak Ayurved Mahavidyalaya & Hospital"
    },
    {
      id: 4,
      name: "Dr. Kamlesh Wadher",
      degrees: "M.Pharm, Ph.D. (Pharmaceutics)",
      designation: "Pharmaceutical Research & Educational Outreach Advisor",
      pillar: "Pharmacy Research & Drug Safety",
      bio: "Principal at KDK College of Pharmacy. Oversees community medicine dispensation safety, clinical pharmacology audits, and youth education.",
      avatarBg: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)",
      initials: "KW",
      affiliation: "Principal, KDK College of Pharmacy & Research Institute"
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    const toEmail = "bhonglecharitablefoundation@gmail.com";
    const subject = `Website Inquiry: ${contactData.subject} - ${contactData.name}`;
    const body = `Dear BCF Secretariat,

I am writing to submit an inquiry through the BCF website contact form.

Here are my contact details:
-------------------------------------
Name: ${contactData.name}
Email Address: ${contactData.email}
Subject: ${contactData.subject}

Message details:
${contactData.message}
-------------------------------------

Kindly respond to my email address listed above.

Thank you,
${contactData.name}`;

    const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    fetch("https://formsubmit.co/ajax/bhonglecharitablefoundation@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "Form Type": "Contact/Inquiry Form",
        Name: contactData.name,
        Email: contactData.email,
        Subject: contactData.subject,
        Message: contactData.message
      })
    })
    .then(res => {
      setIsSubmitting(false);
      if (res.ok) {
        setSubmissionMethod('direct');
        setContactSubmitted(true);
      } else {
        throw new Error("FormSubmit response not ok");
      }
    })
    .catch(err => {
      setIsSubmitting(false);
      console.warn("Direct transmission failed, falling back to mailto client launch.", err);
      setSubmissionMethod('mailto');
      window.location.href = mailtoUrl;
      setContactSubmitted(true);
    });
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      {/* High-Quality Intro Welcome Splash Screen (Visible for 2 seconds on initial opening) */}
      {showSplash && (
        <div 
          className={`splash-overlay ${splashFading ? 'splash-fading' : ''}`}
          onClick={() => { setSplashFading(true); setTimeout(() => setShowSplash(false), 500); }}
        >
          <div className="splash-aurora-glow"></div>
          
          <div className="splash-content">
            {/* Logo with pulsing golden halo */}
            <div className="splash-logo-wrapper">
              <div className="splash-logo-aura"></div>
              <img 
                src="/logo.png" 
                alt="Bhongle Charitable Foundation Logo" 
                className="splash-logo-img" 
              />
            </div>

            {/* Welcome Headings */}
            <div className="splash-headings">
              <h1 className="splash-title-en">
                Welcome
              </h1>
              <h2 className="splash-title-hi">
                आपका हार्दिक स्वागत है
              </h2>
            </div>

            {/* Auspicious Sacred Motto */}
            <div className="splash-tagline">
              <span>✦ ॐ सर्वे भवन्तु सुखिनः ✦</span>
            </div>

            {/* 2-Second Animated Progress Bar */}
            <div className="splash-progress-track">
              <div className="splash-progress-bar"></div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar onOpenDonate={() => setIsDonateOpen(true)} />

      {/* Hero Section */}
      <section 
        id="home"
        style={{
          background: 'radial-gradient(circle at top right, var(--primary-light) 0%, var(--primary-dark) 100%)',
          color: '#fff',
          paddingTop: '105px',
          scrollMarginTop: '105px',
          paddingBottom: '3.5rem',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '100%',
          margin: 0,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Modern Clean Background Aurora Animation Blobs (Scroll-interactive morphing & parallax) */}
        <div 
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '60% 40% 50% 50%',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, rgba(20, 184, 166, 0) 70%)',
            filter: 'blur(60px)',
            // Parallax shift & scale expansion linking to CSS scroll variable
            transform: 'translate(calc(var(--scroll-y, 0px) * 0.25), calc(var(--scroll-y, 0px) * -0.15)) scale(calc(1 + var(--scroll-y, 0px) * 0.0008))',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '40% 60% 30% 70%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)',
            filter: 'blur(70px)',
            // Inverse parallax translation
            transform: 'translate(calc(var(--scroll-y, 0px) * -0.2), calc(var(--scroll-y, 0px) * 0.15)) scale(calc(1 + var(--scroll-y, 0px) * 0.0004))',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'transform 0.1s ease-out'
          }}
        />

        {/* Beautiful Scroll-Interactive Flying Birds (Flap wings, fly and grow larger on scroll) */}
        <FlyingBird 
          startLeft="12%" 
          startTop="30%" 
          scrollSpeedX={0.9} 
          scrollSpeedY={0.3} 
          scaleSpeed={0.0035} 
          flapSpeed={0.65} 
          delay={0} 
          colors={['#14b8a6', '#06b6d4', '#d4af37']} 
        />
        <FlyingBird 
          startLeft="78%" 
          startTop="20%" 
          scrollSpeedX={-0.8} 
          scrollSpeedY={0.4} 
          scaleSpeed={0.003} 
          flapSpeed={0.85} 
          delay={2} 
          colors={['#f97316', '#ff007f', '#f5b041']} 
        />
        <FlyingBird 
          startLeft="60%" 
          startTop="55%" 
          scrollSpeedX={-0.4} 
          scrollSpeedY={-0.1} 
          scaleSpeed={0.0018} 
          flapSpeed={0.55} 
          delay={1.5} 
          colors={['#6366f1', '#0ea5e9', '#d4af37']} 
        />

        {/* Dynamic Interactive Geometric Wireframe Ring (Rotates & shrinks on scroll) */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(calc(var(--scroll-y, 0px) * 0.25deg)) scale(calc(1 - var(--scroll-y, 0px) * 0.0008))',
            width: '550px',
            height: '550px',
            border: '1px dashed rgba(212, 175, 55, 0.14)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Inner organic morphing element */}
          <div 
            style={{
              width: '420px',
              height: '420px',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '40% 60% 55% 45% / 45% 50% 50% 55%',
              animation: 'spinSlow 30s infinite linear'
            }}
          />
        </div>

        {/* Prominent Panoramic Banner Slider (100% Full-Width Screen Fit, Smooth Horizontal Transition) */}
        <div 
          className="hero-slider-container"
          onMouseEnter={() => setIsHeroSliderHovered(true)}
          onMouseLeave={() => setIsHeroSliderHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Slider Frame */}
          <div className="hero-slider-frame">
            <div 
              className="hero-slider-track"
              style={{
                transform: `translateX(-${currentHeroSlide * 100}%)`,
                transition: 'transform 0.85s cubic-bezier(0.25, 1, 0.35, 1)'
              }}
            >
              {heroBannerSlides.map((slide, index) => (
                <div key={index} className="hero-slide">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="hero-slide-img"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Previous Photo Button */}
            <button
              onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroBannerSlides.length) % heroBannerSlides.length)}
              className="hero-slider-btn prev"
              aria-label="Previous Photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Photo Button */}
            <button
              onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroBannerSlides.length)}
              className="hero-slider-btn next"
              aria-label="Next Photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Pagination Indicator Dots */}
            <div className="hero-slider-dots">
              {heroBannerSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentHeroSlide(dotIdx)}
                  className="hero-slider-dot"
                  aria-label={`Go to photo ${dotIdx + 1}`}
                  style={{
                    width: currentHeroSlide === dotIdx ? '32px' : '10px',
                    background: currentHeroSlide === dotIdx ? 'var(--gold)' : 'rgba(255, 255, 255, 0.45)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Hero Heading (Positioned directly below the full-width panoramic banner slider) */}
        <div 
          id="main-content"
          tabIndex="-1"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 1.5rem',
            gap: '1rem',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', padding: '0.35rem 1.1rem', borderRadius: '50px', width: 'fit-content' }}>
            <Shield size={16} style={{ color: 'var(--gold)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.5px' }}>
              Pan-India Humanitarian Initiative
            </span>
          </div>
          
          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
              lineHeight: '1.15',
              fontWeight: 700,
              color: '#fff',
              margin: '0.2rem 0 0 0'
            }}
          >
            Universal Humanism <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>In Action</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#b8c9d6', lineHeight: '1.5', maxWidth: '680px', margin: '0 auto' }}>
            Structured socio-economic, medical, and educational interventions across the Indian subcontinent.
          </p>
        </div>

        {/* Action Buttons & Compliance Snapshot */}
        <div 
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 1.5rem',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => setIsDonateOpen(true)} className="btn btn-gold">
              <Heart size={18} fill="currentColor" />
              Support Our Work
            </button>
            <button onClick={() => setIsVolunteerOpen(true)} className="btn btn-outline-white">
              Volunteer With Us
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Tags / Snapshot */}
          <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 700 }}>12A & 80G</h4>
              <p style={{ fontSize: '0.72rem', color: '#b8c9d6' }}>Tax Exemptions Approved</p>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
              <h4 style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 700 }}>CSR-1</h4>
              <p style={{ fontSize: '0.72rem', color: '#b8c9d6' }}>MCA Registered (Govt. of India)</p>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
              <h4 style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 700 }}>Nagpur, MH</h4>
              <p style={{ fontSize: '0.72rem', color: '#b8c9d6' }}>Headquarters & Registration</p>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
              <h4 style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 700 }}>NGO Darpan</h4>
              <p style={{ fontSize: '0.72rem', color: '#b8c9d6' }}>Central Govt. Registered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic 3D Globe Section (Transitions on scroll) */}
      <section 
        id="global-vision" 
        className="scroll-reveal"
        style={{
          background: 'radial-gradient(circle at center, #051421 0%, #000810 100%)',
          color: '#fff',
          padding: '6rem 1.5rem',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '100%',
          margin: 0
        }}
      >
        {/* Heading & Subtitle overlay */}
        <div style={{ zIndex: 10, textAlign: 'center', maxWidth: '800px', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Global Vision & Local Action</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginTop: '0.5rem', fontWeight: 600 }}>
            Serving Nagpur, Reaching the World
          </h2>
          <p style={{ color: '#b8c9d6', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
            From our secretariat in Nagpur, India, we orchestrate holistic health, educational equity, and environmental restoration programs. Drag the interactive 3D Earth to explore our footprint.
          </p>
        </div>

        {/* Big Full-Screen/Large Globe Container */}
        <div style={{ width: '100%', maxWidth: '1000px', height: '550px', position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center' }}>
          <Globe />
        </div>

        {/* Small coordinate stats overlay */}
        <div style={{ zIndex: 10, display: 'flex', gap: '2rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#b8c9d6', display: 'block' }}>Nagpur Headquarters</span>
            <strong style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>21.1458° N, 79.0882° E</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#b8c9d6', display: 'block' }}>Operational Radius</span>
            <strong style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>Pan-India Interventions</strong>
          </div>
        </div>
      </section>

      {/* Dignitary Message Banner (Guided by National Vision) */}
      <div 
        style={{ 
          background: '#fff', 
          borderBottom: '1px solid rgba(212,175,55,0.2)',
          padding: '5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Portrait and Message wrapper */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Quote details (First in DOM, sits left on desktop) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Guided by National Vision
              </span>
              <p 
                className="serif-font"
                style={{
                  fontSize: '1.25rem',
                  lineHeight: '1.7',
                  color: 'var(--primary)',
                  fontStyle: 'italic',
                  position: 'relative'
                }}
              >
                "For a long time, priority has been given to spread education. This was necessary. But today more than expanding education what is necessary is to improve the quality of education. We will have to shift our priority from literacy campaign to good education. From now onward, more than schooling, we will have to lay stress on learning."
              </p>
              <div>
                <h5 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-light)', fontWeight: 700, fontSize: '1.1rem' }}>
                  — Prime Minister Narendra Modi
                </h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  Mann Ki Baat
                </p>
              </div>
            </div>

            {/* Portrait Image (Second in DOM, sits right on desktop) */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div 
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%', 
                  border: '3px solid var(--gold)', 
                  boxShadow: 'var(--shadow-md)',
                  overflow: 'hidden',
                  background: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src="/narendra_modi_portrait.png" 
                  alt="Shri Narendra Modi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Background branding design */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', fontSize: '10rem', color: 'rgba(0, 43, 73, 0.02)', fontFamily: 'var(--font-serif)', pointerEvents: 'none', fontWeight: 900 }}>“</div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', fontSize: '10rem', color: 'rgba(0, 43, 73, 0.02)', fontFamily: 'var(--font-serif)', pointerEvents: 'none', fontWeight: 900 }}>”</div>
      </div>

      {/* About Us Section */}
      <section id="about" className="scroll-reveal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Column: Genesis & Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Genesis & Legal Heritage</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
                Our Altruistic Roots
              </h2>
            </div>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
              Established on the foundational tenets of universal humanism, Bhongle Charitable Foundation was formally declared as an irrevocable Public Charitable Trust on August 28, 2025, and officially registered on January 21, 2026, in Nagpur, Maharashtra.
            </p>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
              Conceived by our visionary Settlor, Dr. Shaligram Bhongle, the foundation operates under a pan-India mandate. We are legally bound to deliver structured socio-economic, medical, and educational interventions across the subcontinent, irrespective of caste, creed, race, or gender identity. Our work is purely altruistic and non-profit, dedicating every resource exclusively to community empowerment.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'rgba(212,175,55,0.06)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.15)' }}>
              <div>
                <h5 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontWeight: 700 }}>Our Vision</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  An equitable, literate, self-reliant, and ecologically sustainable society where the marginalized live with dignity and purpose.
                </p>
              </div>
              <div>
                <h5 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontWeight: 700 }}>Our Mission</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  To execute high-impact interventions across healthcare, comprehensive literacy, inclusive livelihoods, and ecological preservation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: President word & Image card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ borderLeft: '4px solid var(--gold)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Word from the President</span>
              <p className="serif-font" style={{ fontSize: '1.15rem', color: 'var(--primary-light)', fontStyle: 'italic', marginTop: '1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                "Social transformation is neither a solitary milestone nor an overnight phenomenon; it is a meticulous process of restoring dignity to human life. When we laid the cornerstone of the Bhongle Charitable Foundation, our mandate was crystalline: to create institutional pathways that bridge the socio-economic chasms in our society. By integrating modern science, traditional holistic wellness, and accessible education, we aim to build resilient community ecosystems. We invite global stakeholders, corporate partners, and empathetic citizens to join us in translating this shared humanitarian vision into reality."
              </p>
              <h5 style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: 700 }}>Dr. Shaligram Bhongle</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>President & Chairman</p>
            </div>
          </div>

        </div>

        {/* Governing Board Profiles */}
        <div style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Trustee Governance</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
              Governing Board Profiles
            </h3>
          </div>

          {/* Clean and highly animated cards */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2.5rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {/* Dr. Shaligram Profile */}
            <div className="governing-card" style={boardCardStyle}>
              <div style={boardLineAccent}></div>
              <h4 style={{ color: 'var(--primary)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Dr. Shaligram Bhongle</h4>
              <p style={{ color: 'var(--gold-dark)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.4rem' }}>
                President & Chairman
              </p>
            </div>

            {/* Shri Yash Profile */}
            <div className="governing-card" style={boardCardStyle}>
              <div style={boardLineAccent}></div>
              <h4 style={{ color: 'var(--primary)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Shri Yash Shaligram Bhongle</h4>
              <p style={{ color: 'var(--gold-dark)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.4rem' }}>
                General Secretary
              </p>
            </div>

            {/* Dr. Priti Profile */}
            <div className="governing-card" style={boardCardStyle}>
              <div style={boardLineAccent}></div>
              <h4 style={{ color: 'var(--primary)', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Dr. Priti Shaligram Bhongle</h4>
              <p style={{ color: 'var(--gold-dark)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.4rem' }}>
                Treasurer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas (Core Pillars) Section */}
      <section 
        id="focus" 
        style={{ 
          background: 'rgba(0, 43, 73, 0.02)', 
          borderTop: '1px solid rgba(0,43,73,0.05)', 
          borderBottom: '1px solid rgba(0,43,73,0.05)',
          maxWidth: '100%',
          paddingLeft: '0',
          paddingRight: '0',
          margin: 0
        }}
      >
        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Core Focus Areas</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
              The Four Strategic Pillars
            </h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '1.05rem' }}>
              BCF consolidates its 35 objectives into four strategic pillars representing sustainable, high-impact community milestones.
            </p>
          </div>

          {/* Pillar selector buttons */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1rem', 
              flexWrap: 'wrap', 
              marginBottom: '3rem'
            }}
          >
            {pillars.map((pillar, idx) => (
              <button
                key={idx}
                onClick={() => setActivePillar(idx)}
                style={{
                  padding: '1rem 1.75rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  border: activePillar === idx ? '2px solid var(--primary)' : '2px solid rgba(0, 43, 73, 0.1)',
                  background: activePillar === idx ? 'var(--primary)' : '#fff',
                  color: activePillar === idx ? '#fff' : 'var(--primary)',
                  boxShadow: activePillar === idx ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ display: 'inline-flex', transform: 'scale(0.8)', opacity: activePillar === idx ? 1 : 0.6 }}>
                  {pillar.icon}
                </span>
                Pillar {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Pillar Card Display */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '3rem', 
              borderTop: '4px solid var(--gold)',
              animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(212,175,55,0.1)', padding: '0.75rem', borderRadius: '12px' }}>
                {pillars[activePillar].icon}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 600 }}>
                  {pillars[activePillar].title}
                </h3>
                <p style={{ color: 'var(--gold-dark)', fontWeight: 500, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  {pillars[activePillar].tagline}
                </p>
              </div>
            </div>

            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '2rem',
                marginTop: '2.5rem'
              }}
            >
              {pillars[activePillar].items.map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    background: '#fff', 
                    border: '1px solid rgba(0, 43, 73, 0.06)', 
                    borderRadius: '12px', 
                    padding: '1.75rem',
                    transition: 'all 0.3s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 43, 73, 0.06)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--green-light)' }} />
                    <h5 style={{ color: 'var(--primary)', fontSize: '1.05rem', fontWeight: 700 }}>
                      {item.title}
                    </h5>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Field Initiatives & Milestones: Mega Scientific Plantation Drive 2026 */}
      <section 
        id="initiatives" 
        style={{ 
          scrollMarginTop: '100px',
          borderBottom: '1px solid rgba(16, 185, 129, 0.15)', 
          background: 'linear-gradient(180deg, #f6fbf8 0%, #ffffff 100%)', 
          paddingTop: '5.5rem', 
          paddingBottom: '5.5rem' 
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Quick Event Selector / Timeline Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href="#initiatives" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem', borderRadius: '50px', background: '#064e3b', color: '#a7f3d0', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 8px rgba(6, 78, 59, 0.2)' }}>
              <Leaf size={14} /> Aug 21, 2026 • Mega Scientific Plantation Drive
            </a>
            <a href="#police-health-mission" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem', borderRadius: '50px', background: 'rgba(0, 43, 73, 0.08)', color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(0, 43, 73, 0.15)' }}>
              <Shield size={14} /> Jul 27, 2026 • Nagpur Police Health Mission
            </a>
            <a href="#yoga-milestone" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem', borderRadius: '50px', background: 'rgba(0, 43, 73, 0.08)', color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(0, 43, 73, 0.15)' }}>
              <Award size={14} /> Jun 21, 2026 • International Yoga Day Seminar
            </a>
          </div>

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="plantation-badge-crisp">
              <Leaf size={18} style={{ color: '#34d399', flexShrink: 0 }} />
              <span>
                Mega Ecological Initiative • August 21, 2026
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)', color: 'var(--primary)', fontWeight: 800, lineHeight: '1.25' }}>
              'Mega Scientific Plantation Drive' <br />
              <span style={{ color: '#047857', fontWeight: 800 }}>Inaugurated by Hon'ble Mayor Smt. Neeta Thakre</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', maxWidth: '820px', margin: '1rem auto 0 auto', lineHeight: '1.6' }}>
              In a major push to support the <strong>Nagpur Municipal Corporation’s (NMC)</strong> ambitious <strong>‘5-Lakh Green Nagpur’</strong> target, the <strong>Bhongle Charitable Foundation</strong>, in proud collaboration with the NMC, successfully executed the 'Mega Scientific Plantation Drive 2026' featuring precision number tagging, verified botanical tracking, and binding multi-year institutional care covenants.
            </p>
          </div>

          {/* Mayoral Inauguration & Visionary Guidance Card */}
          <div 
            className="glass-card" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.04) 0%, rgba(212, 175, 55, 0.08) 100%)', 
              border: '1.5px solid rgba(16, 185, 129, 0.35)', 
              borderRadius: '20px', 
              padding: '1.75rem 2rem', 
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#064e3b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px rgba(6, 78, 59, 0.3)' }}>
              <Leaf size={28} style={{ color: '#34d399' }} />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>
                Civic Leadership & Mayoral Commendation
              </span>
              <p style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: 600, margin: 0, lineHeight: '1.5' }}>
                The prestigious drive was officially inaugurated by the Hon'ble Mayor of Nagpur, <strong>Smt. Neeta Thakre</strong>, who highly praised the Bhongle Charitable Foundation for pioneering a scientific, data-driven methodology in urban environmental conservation and guaranteeing 100% post-plantation nurturing.
              </p>
            </div>
            <div style={{ background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#065f46' }}>
              <Award size={18} style={{ color: 'var(--gold)' }} />
              NMC Civic-NGO Alliance
            </div>
          </div>

          {/* Key Impact Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="plantation-stat-card">
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                100
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem' }}>
                Number-Tagged Saplings
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                Each sapling planted with specific individual identification numbers for scientific growth tracking
              </div>
            </div>

            <div className="plantation-stat-card">
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                100%
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem' }}>
                Guaranteed Survival Rate
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                Backed by officially signed 3-Year NMC Maintenance Pledges by both College Principals
              </div>
            </div>

            <div className="plantation-stat-card">
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                2
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem' }}>
                Premier Academic Campuses
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                Bhausaheb Mulak Ayurved Mahavidyalaya (Phase 1) & KDK College of Pharmacy (Phase 2)
              </div>
            </div>

            <div className="plantation-stat-card">
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#047857', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                AI
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem' }}>
                Proprietary AI Protocol
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                Advanced artificial intelligence protocol deployed by the BCF technology team during the function
              </div>
            </div>
          </div>

          {/* Two-Phase Operational Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* Phase 1 Card */}
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '18px', border: '1.5px solid rgba(16, 185, 129, 0.25)', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#047857', fontWeight: 800 }}>
                  01
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Phase 1 Execution
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
                    Bhausaheb Mulak Ayurveda Mahavidyalaya
                  </h4>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '1rem' }}>
                The inaugural phase concentrated on botanical richness and indigenous biodiversity. Climate-resilient, medicinal, and oxygen-rich plant varieties were planted across designated soil beds, linking Ayurvedic heritage with urban forestry.
              </p>
              <div style={{ background: 'rgba(6, 78, 59, 0.03)', padding: '0.85rem 1rem', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Institutional 3-Year Covenant:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                  Principal <strong>Dr. Yuwaraj Kale</strong> formally signed the NMC 3-Year Maintenance Pledge to guarantee perpetual irrigation and protection.
                </div>
              </div>
            </div>

            {/* Phase 2 Card */}
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '18px', border: '1.5px solid rgba(16, 185, 129, 0.25)', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#047857', fontWeight: 800 }}>
                  02
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Phase 2 Execution
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
                    KDK College of Pharmacy
                  </h4>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '1rem' }}>
                The second phase mobilized academic researchers, youth volunteers, and faculty members in expanding campus canopy coverage. Saplings were positioned for optimal shading, ecological health, and atmospheric purification.
              </p>
              <div style={{ background: 'rgba(6, 78, 59, 0.03)', padding: '0.85rem 1rem', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Institutional 3-Year Covenant:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                  Principal <strong>Dr. Kamlesh Wadher</strong> officially signed the 3-Year Maintenance Pledge affirming student-faculty guardianship for 100% survival.
                </div>
              </div>
            </div>
          </div>

          {/* Stage Dignitaries Section */}
          <div className="glass-card" style={{ padding: '2.25rem', borderRadius: '20px', border: '1px solid rgba(0, 43, 73, 0.08)', background: '#ffffff', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Distinguished Dais Guests
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700, marginTop: '0.3rem' }}>
                Dignitaries Present on Stage
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', maxWidth: '700px', margin: '0.5rem auto 0 auto' }}>
                Distinguished civic leaders, institutional directors, academic principals, and foundation trustees joined on dais to inaugurate this historic ecological drive.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(6, 78, 59, 0.03)', borderRadius: '14px', padding: '1.4rem', border: '1px solid rgba(16, 185, 129, 0.18)', textAlign: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                  <Award size={20} style={{ color: '#047857' }} />
                </div>
                <strong style={{ color: 'var(--primary)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>
                  Hon'ble Smt. Neeta Thakre
                </strong>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                  Mayor, Nagpur City
                </span>
              </div>

              <div style={{ background: 'rgba(6, 78, 59, 0.03)', borderRadius: '14px', padding: '1.4rem', border: '1px solid rgba(16, 185, 129, 0.18)', textAlign: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                  <Award size={20} style={{ color: '#047857' }} />
                </div>
                <strong style={{ color: 'var(--primary)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>
                  Shri Dilip Denge
                </strong>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                  Director
                </span>
              </div>

              <div style={{ background: 'rgba(6, 78, 59, 0.03)', borderRadius: '14px', padding: '1.4rem', border: '1px solid rgba(16, 185, 129, 0.18)', textAlign: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                  <Award size={20} style={{ color: '#047857' }} />
                </div>
                <strong style={{ color: 'var(--primary)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>
                  Dr. Yuwaraj Kale
                </strong>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                  Principal, Bhausaheb Mulak Ayurved Mahavidyalaya
                </span>
              </div>

              <div style={{ background: 'rgba(6, 78, 59, 0.03)', borderRadius: '14px', padding: '1.4rem', border: '1px solid rgba(16, 185, 129, 0.18)', textAlign: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                  <Award size={20} style={{ color: '#047857' }} />
                </div>
                <strong style={{ color: 'var(--primary)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>
                  Dr. Kamlesh Wadher
                </strong>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                  Principal, KDK College of Pharmacy
                </span>
              </div>
            </div>

            {/* BCF Dais Trustees Bar */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,43,73,0.06)', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="leader-badge">
                <Users size={15} style={{ color: 'var(--gold)' }} />
                <strong>Dr. Shaligram Bhongle</strong> • President, BCF
              </div>
              <div className="leader-badge">
                <Users size={15} style={{ color: 'var(--gold)' }} />
                <strong>Dr. Priti Bhongle</strong> • Treasurer, BCF
              </div>
              <div className="leader-badge">
                <Users size={15} style={{ color: 'var(--gold)' }} />
                <strong>Yash Bhongle</strong> • Secretary, BCF
              </div>
            </div>
          </div>

          {/* AI Protocol & Technological Innovation Showcase */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', 
              color: '#fff', 
              borderRadius: '20px', 
              padding: '2.5rem', 
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', border: '1.5px solid #34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Cpu size={30} style={{ color: '#34d399' }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>
                  Technological Innovation in Public Service
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#ffffff' }}>
                  Proprietary AI Protocol Deployed by BCF
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', margin: 0, lineHeight: '1.6', maxWidth: '780px' }}>
                  Demonstrating the convergence of modern technology with social responsibility, the Bhongle Charitable Foundation technology team designed and successfully executed a proprietary AI protocol during the function.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Flagship Field Initiatives & Milestones: Nagpur Police Health Mission (Phase 1) */}
      <section 
        id="police-health-mission" 
        style={{ 
          scrollMarginTop: '100px',
          borderBottom: '1px solid rgba(0,43,73,0.05)', 
          backgroundColor: '#fffdf9', 
          paddingTop: '5.5rem', 
          paddingBottom: '5.5rem' 
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="police-badge-crisp">
              <Shield size={18} style={{ color: '#f5b041', flexShrink: 0 }} />
              <span>
                Flagship Healthcare Initiative • July 27, 2026
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.1rem, 3.8vw, 2.85rem)', color: 'var(--primary)', fontWeight: 800, lineHeight: '1.25' }}>
              Successful Conclusion of Phase 1: <br />
              <span style={{ color: '#92400e', fontWeight: 800 }}>'Nagpur Police Health Mission'</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', maxWidth: '780px', margin: '1rem auto 0 auto', lineHeight: '1.6' }}>
              Securing the health and vitality of those who secure the city. A sweeping public health initiative dedicated to providing comprehensive diagnostic screenings, clinical consultations, and free pharmaceutical therapies across Nagpur police personnel.
            </p>
          </div>

          {/* Visionary Patronage Card */}
          <div 
            className="glass-card" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 43, 73, 0.03) 0%, rgba(212, 175, 55, 0.06) 100%)', 
              border: '1.5px solid rgba(212, 175, 55, 0.35)', 
              borderRadius: '20px', 
              padding: '1.75rem 2rem', 
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0, 43, 73, 0.25)' }}>
              <Shield size={28} style={{ color: 'var(--gold)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>
                Visionary Guidance & Patronage
              </span>
              <p style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: 600, margin: 0, lineHeight: '1.5' }}>
                Launched under the visionary guidance of the Hon’ble Police Commissioner of Nagpur, <strong>Shri Vishwas Nangre Patil</strong>, this sweeping initiative is dedicated to ensuring comprehensive healthcare access for police personnel across all DCP zones and the Commissioner’s office.
              </p>
            </div>
          </div>

          {/* Key Quantitative Impact Statistics */}
          <div className="police-stat-grid">
            <div className="police-stat-card">
              <div style={{ color: 'var(--primary)', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                90+
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-dark)', marginTop: '0.2rem' }}>
                Officers Screened
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                Comprehensive 4-tier evaluations for DCP Zone 3 personnel
              </p>
            </div>

            <div className="police-stat-card">
              <div style={{ color: 'var(--primary)', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                82
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-dark)', marginTop: '0.2rem' }}>
                Metabolic Profiles
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                Capillary Blood Glucose & Hemoglobin screenings
              </p>
            </div>

            <div className="police-stat-card">
              <div style={{ color: 'var(--primary)', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                4-Tier
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-dark)', marginTop: '0.2rem' }}>
                Clinical Protocol
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                Vitals, diagnostics, 1-on-1 consultations & medical cards
              </p>
            </div>

            <div className="police-stat-card">
              <div style={{ color: 'var(--primary)', fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                100% Free
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-dark)', marginTop: '0.2rem' }}>
                Medicine Dispensation
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                On-site pharmacy providing premium clinical prescriptions
              </p>
            </div>
          </div>

          {/* Main Grid: Operational Narrative & Clinical Workflow */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start', marginBottom: '3.5rem' }}>
            
            {/* Left Column: Scope & 4-Tier Workflow */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Activity size={22} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary)', fontWeight: 700 }}>
                  Event Highlights & Clinical Workflow
                </h3>
              </div>

              <div style={{ background: 'rgba(0, 43, 73, 0.03)', border: '1px solid rgba(0, 43, 73, 0.08)', borderRadius: '12px', padding: '1.1rem 1.3rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.6', margin: 0 }}>
                  <strong>Venue & Scope:</strong> A mega free health check-up camp was hosted at the <strong>Lakadganj Police Station</strong>, serving <strong>DCP Zone 3</strong>. A robust four-tier clinical workflow ensured thorough evaluations for over <strong>90+ participating police personnel</strong> across Zone 3.
                </p>
              </div>

              {/* 4 Tiers */}
              <div className="police-workflow-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
                  <strong style={{ color: 'var(--primary)', fontSize: '0.98rem' }}>
                    Tier 1: Vital & Cardiovascular Assessments
                  </strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>
                  Screenings included precise Body Mass Index (BMI) calculations, Blood Pressure (BP), Pulse Rate, Respiratory Rate, and SpO2 oxygen saturation monitoring.
                </p>
              </div>

              <div className="police-workflow-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
                  <strong style={{ color: 'var(--primary)', fontSize: '0.98rem' }}>
                    Tier 2: Metabolic & Hematological Profiling
                  </strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>
                  Capillary Blood Glucose and Hemoglobin tests were conducted for 82 officers, revealing critical workforce health trends, such as varying degrees of anaemia in 50% of the screened female personnel—enabling immediate therapeutic care.
                </p>
              </div>

              <div className="police-workflow-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
                  <strong style={{ color: 'var(--primary)', fontSize: '0.98rem' }}>
                    Tier 3: 1-on-1 Expert Consultations
                  </strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>
                  MBBS and specialist doctors from the Indian Medical Association (IMA) provided one-on-one medical consultations to prescribe tailored treatments and preventative lifestyles.
                </p>
              </div>

              <div className="police-workflow-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
                  <strong style={{ color: 'var(--primary)', fontSize: '0.98rem' }}>
                    Tier 4: Comprehensive Medical Records
                  </strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5', margin: 0 }}>
                  Every participating officer was issued a detailed Patient Report Card containing their complete medical profile for future clinical reference and monitoring.
                </p>
              </div>
            </div>

            {/* Right Column: Pharmacy Dispensation & Leadership Commendations */}
            <div>
              {/* Pharmacy Box */}
              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: '18px', border: '1.5px solid rgba(212, 175, 55, 0.3)', background: '#ffffff', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Pill size={22} style={{ color: 'var(--green-light)' }} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
                    Free Medical Dispensation & Pharmacy Services
                  </h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6', margin: 0 }}>
                  A fully stocked, on-site free pharmacy was deployed to dispense high-quality essential medications and therapeutic formulations completely free of cost to police personnel, dispensed strictly according to individual on-site clinical evaluations and expert physician prescriptions.
                </p>
              </div>

              {/* Distinguished Guests & Leadership Commendations */}
              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: '18px', border: '1px solid rgba(0, 43, 73, 0.1)', background: 'linear-gradient(135deg, rgba(255, 253, 249, 0.95) 0%, rgba(255, 248, 235, 0.6) 100%)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Award size={22} style={{ color: 'var(--gold)' }} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
                    Distinguished Guests & Leadership
                  </h4>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text)', lineHeight: '1.5' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', marginTop: '0.45rem', flexShrink: 0 }}></div>
                    <div>
                      The initiative garnered warm appreciation and formal commendation from the Additional Commissioner of Police, <strong>Smt. Vinita Shahu</strong>.
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text)', lineHeight: '1.5' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', marginTop: '0.45rem', flexShrink: 0 }}></div>
                    <div>
                      The camp was honored by the prominent presence of Deputy Commissioner of Police (Zone 3), <strong>Shri Rahul Madane</strong>, alongside Senior Police Inspectors from various stations within Zone 3.
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text)', lineHeight: '1.5' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', marginTop: '0.45rem', flexShrink: 0 }}></div>
                    <div>
                      Exceptional logistical planning and ground support were meticulously executed by Senior Police Inspector <strong>Shri Mukund Kawade</strong> and the dedicated staff of the Lakadganj Police Station.
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Photo Gallery Showcase */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1.75rem', textAlign: 'center', fontWeight: 700 }}>
              Mission Photo Gallery • Lakadganj Police Station
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Photo 1 */}
              <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', borderRadius: '16px' }}>
                <div style={{ borderRadius: '12px', overflow: 'hidden', height: '270px', border: '1px solid rgba(0,43,73,0.08)' }}>
                  <img 
                    src="/health-camp-group.jpg" 
                    alt="Nagpur Police Health Mission Phase 1 Group Photo" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    className="hover-zoom"
                  />
                </div>
                <div style={{ padding: '0.4rem 0.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>
                      Inaugural Delegation
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                      July 27, 2026
                    </span>
                  </div>
                  <h5 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
                    BCF Leadership, Police Dignitaries & IMA Doctors
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.35rem', lineHeight: '1.5' }}>
                    Commemorative group gathering at Lakadganj Police Station featuring Police Leadership, IMA medical team, and BCF Trustees.
                  </p>
                </div>
              </div>

              {/* Photo 2 */}
              <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', borderRadius: '16px' }}>
                <div style={{ borderRadius: '12px', overflow: 'hidden', height: '270px', border: '1px solid rgba(0,43,73,0.08)' }}>
                  <img 
                    src="/health-camp-checkup.jpg" 
                    alt="Clinical Medical Checkup in progress" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    className="hover-zoom"
                  />
                </div>
                <div style={{ padding: '0.4rem 0.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase' }}>
                      Clinical Interventions
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                      DCP Zone 3
                    </span>
                  </div>
                  <h5 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
                    One-on-One Vital Screening & Clinical Diagnosis
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.35rem', lineHeight: '1.5' }}>
                    Doctors conducting blood pressure, sugar, hemoglobin and clinical evaluations for officers on duty.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Organizing Coalition & Medical Leadership Section */}
          <div className="glass-card" style={{ padding: '2.25rem', borderRadius: '20px', border: '1px solid rgba(0, 43, 73, 0.08)', background: '#ffffff', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Collaborative Coalition
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700, marginTop: '0.3rem' }}>
                Partnerships & Organizing Committee
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
                The health camp was a collaborative triumph jointly orchestrated by the <strong>Bhongle Charitable Foundation</strong>, <strong>IFPWD</strong>, <strong>Six Sigma</strong>, and <strong>IMA Nagpur</strong>.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {/* Foundation Organizing Committee */}
              <div style={{ background: 'rgba(0, 43, 73, 0.03)', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(0, 43, 73, 0.06)' }}>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={18} style={{ color: 'var(--gold)' }} />
                  Foundation Organizing Committee
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div className="leader-badge">
                    <strong>Executive Board & Trustees</strong> • Bhongle Charitable Foundation
                  </div>
                  <div className="leader-badge">
                    <strong>Treasury & Statutory Administration</strong> • Bhongle Charitable Foundation
                  </div>
                  <div className="leader-badge">
                    <strong>Secretariat & Operations Directorate</strong> • Bhongle Charitable Foundation
                  </div>
                </div>
              </div>

              {/* Medical Delegation & Clinical Partners */}
              <div style={{ background: 'rgba(0, 43, 73, 0.03)', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(0, 43, 73, 0.06)' }}>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Stethoscope size={18} style={{ color: 'var(--green-light)' }} />
                  Medical Delegation & Clinical Consortium
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div className="leader-badge">
                    <strong>State Executive Leadership</strong> • IMA Junior Doctors Network (JDN)
                  </div>
                  <div className="leader-badge">
                    <strong>District Chapter & Medical Directorate</strong> • IMA JDN Nagpur
                  </div>
                  <div className="leader-badge">
                    <strong>Diagnostic & Operations Team</strong> • Meethas Healthcare Pvt. Ltd.
                  </div>
                </div>
              </div>
            </div>

            {/* Media Acknowledgment */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,43,73,0.06)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Media Acknowledgment
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', maxWidth: '750px', margin: '0.4rem auto 0 auto', lineHeight: '1.6' }}>
                We extend our deepest gratitude to the prominent news channels and print publications for their extensive coverage and massive support in amplifying the reach and impact of this noble healthcare mission.
              </p>
            </div>
          </div>

          {/* Future Roadmap Banner (Phase 2) */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', 
              color: '#fff', 
              borderRadius: '20px', 
              padding: '2.5rem', 
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '0.35rem 1rem', borderRadius: '50px', marginBottom: '1rem' }}>
                <Sparkles size={16} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Upcoming Mission Expansion
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>
                Future Roadmap: Preparing for Phase 2
              </h3>
              <p style={{ fontSize: '1rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                Driven by the clinical success and vital health data gathered during Phase 1, BCF is actively preparing to expand this initiative. The foundation will next execute Phase 2 soon, scaling its ongoing mission to secure the health of those who secure the city.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => setIsDonateOpen(true)} className="btn btn-gold">
                  <Heart size={16} fill="currentColor" />
                  Support Police Health Mission
                </button>
                <button onClick={() => setIsVolunteerOpen(true)} className="btn btn-outline-white">
                  Join as Medical Volunteer
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* International Yoga Day 2026 Milestone Section */}
      <section id="yoga-milestone" className="scroll-reveal" style={{ borderBottom: '1px solid rgba(0,43,73,0.05)', backgroundColor: '#fff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Community Milestone • June 21, 2026</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
            International Yoga Day 2026 Seminar
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
          {/* Left Column: Press Release / Feature Article */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(25, 135, 84, 0.08)', border: '1px solid rgba(25, 135, 84, 0.25)', padding: '0.4rem 1rem', borderRadius: '50px', width: 'fit-content' }}>
              <Award size={16} style={{ color: 'var(--green-light)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--green-light)' }}>
                Holistic Health & Wellness Partnership
              </span>
            </div>

            <p style={{ fontSize: '1.02rem', color: 'var(--text-light)', lineHeight: '1.7', textAlign: 'justify' }}>
              <strong>NAGPUR, MAHARASHTRA – June 21, 2026</strong> – To mark International Yoga Day 2026, the Bhongle Charitable Foundation, in a proud collaboration with IRA International School, organized a high-impact Yoga and Wellness Seminar aimed at combating the rising wave of lifestyle diseases. The specialized seminar was hosted at the IRA International School's Butibori campus for a massive gathering of the institution's dedicated teaching and support staff members.
            </p>

            <p style={{ fontSize: '1.02rem', color: 'var(--text-light)', lineHeight: '1.7', textAlign: 'justify' }}>
              Renowned health expert <strong>Dr. Priti Bhongle</strong> graced the event as the Chief Guest. Rather than focusing solely on routine physical fitness, Dr. Bhongle delivered a comprehensive seminar on essential tips to be followed before beginning Yoga, followed by practical instruction on various asanas, meditation, and pranayama, all tailored around the specific bodily needs of the attendees. By equipping the school's staff with tools to recognize early warning signs of physical strain, her guidance offered a clear roadmap for preventative healthcare.
            </p>

            <p style={{ fontSize: '1.02rem', color: 'var(--text-light)', lineHeight: '1.7', textAlign: 'justify' }}>
              This collaborative initiative was strongly supported by the organization's leadership, including Bhongle Charitable Foundation President, <strong>Dr. Shaligram Bhongle</strong>, and Secretary, <strong>Yash Bhongle</strong>. Joining in solidarity for community wellness were IRA International School dignitaries, including Vice Principal <strong>Archana Tiwari</strong>, Management Head <strong>Mr. Rodney</strong>, and a vast turnout of the school's academic community.
            </p>
          </div>

          {/* Right Column: Keynote & SDG Alignment */}
          <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(212, 175, 55, 0.3)', background: 'rgba(255, 253, 249, 0.9)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Keynote Address
            </span>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              Dr. Priti Bhongle
            </h4>
            
            <blockquote 
              style={{ 
                borderLeft: '3px solid var(--gold)', 
                paddingLeft: '1.25rem', 
                fontSize: '0.95rem', 
                color: 'var(--primary)', 
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
                marginBottom: '1.5rem',
                lineHeight: '1.6',
                margin: 0
              }}
            >
              "A lack of basic knowledge about our own physical requirements is often the root cause of many severe, debilitating lifestyle diseases. By understanding our body's mechanics through mindful practices like yoga, we can actively prevent illness, heal ourselves, and safeguard our long-term health."
            </blockquote>

            <div style={{ borderTop: '1px solid rgba(0,43,73,0.1)', paddingTop: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-light)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                United Nations SDG Alignment
              </span>
              <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                BCF's preventative health operations are aligned with the United Nations Sustainable Development Goals:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ec4b6' }}></span>
                  Goal 3: Good Health & Well-being
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff9f1c' }}></span>
                  Goal 4: Quality Education
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e71d36' }}></span>
                  Goal 17: Partnerships for the Goals
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seminar Event Photo Gallery */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center', fontWeight: 700, borderBottom: '1px solid rgba(0,43,73,0.05)', paddingBottom: '0.75rem' }}>
            Seminar Event Showcase
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Image 1: Event Banner */}
            <div className="glass-card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', height: '220px', border: '1px solid rgba(0,43,73,0.05)' }}>
                <img 
                  src="/yoga-day-banner-1.png" 
                  alt="International Yoga Day 2026 Seminar Banner" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  className="hover-zoom"
                />
              </div>
              <div style={{ padding: '0.5rem 0.25rem' }}>
                <h5 style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 700 }}>Seminar Official Banner</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>Stress-management & wellness seminar invitation details.</p>
              </div>
            </div>

            {/* Image 2: Event Image 1 */}
            <div className="glass-card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', height: '220px', border: '1px solid rgba(0,43,73,0.05)' }}>
                <img 
                  src="/bcf-event-image-1.png" 
                  alt="Mindfulness and Meditation Session" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  className="hover-zoom"
                />
              </div>
              <div style={{ padding: '0.5rem 0.25rem' }}>
                <h5 style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 700 }}>Mindfulness Session</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>Active meditation and yoga instruction led by Dr. Priti Bhongle.</p>
              </div>
            </div>

            {/* Image 3: Event Image 2 */}
            <div className="glass-card" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', height: '220px', border: '1px solid rgba(0,43,73,0.05)' }}>
                <img 
                  src="/bcf-event-image-2.png" 
                  alt="IRA International School Staff and BCF Team" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  className="hover-zoom"
                />
              </div>
              <div style={{ padding: '0.5rem 0.25rem' }}>
                <h5 style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 700 }}>Teaching Staff Group Photo</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>IRA International School staff gathered at the conclusion of the seminar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ESTEEMED ADVISORY BOARD SECTION */}
      <section 
        id="advisory" 
        className="scroll-reveal"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
          borderTop: '1px solid rgba(0, 43, 73, 0.08)',
          borderBottom: '1px solid rgba(0, 43, 73, 0.08)',
          padding: '5rem 0',
          position: 'relative',
          scrollMarginTop: '110px'
        }}
      >
        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '0.35rem 1.1rem', borderRadius: '50px', marginBottom: '0.75rem' }}>
              <Award size={16} style={{ color: 'var(--gold)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Institutional Counsel & Strategic Wisdom
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', color: 'var(--primary)', margin: '0.3rem 0 0.75rem 0', fontWeight: 700 }}>
              Our Esteemed Advisory Board
            </h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Distinguished academic leaders, clinical luminaries, public administrators, and research visionaries guiding the Bhongle Charitable Foundation with ethical oversight and impactful strategy.
            </p>
          </div>

          {/* Advisory Cards Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', 
              gap: '2rem',
              alignItems: 'stretch'
            }}
          >
            {advisoryBoardMembers.map((member) => (
              <div 
                key={member.id}
                className="advisory-card"
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(0, 43, 73, 0.09)',
                  padding: '2.25rem 1.5rem 1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 43, 73, 0.05)',
                  position: 'relative',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* Top decorative accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--gold) 0%, var(--primary) 100%)' }} />

                {/* Avatar / Portrait Frame */}
                <div 
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    background: member.avatarBg,
                    border: '3px solid var(--gold)',
                    boxShadow: '0 8px 22px rgba(0, 43, 73, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    position: 'relative',
                    flexShrink: 0
                  }}
                >
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '1px', fontFamily: 'var(--font-display)' }}>
                    {member.initials}
                  </span>
                  {/* Verified Advisor Star Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                    title="Verified Institutional Advisor"
                  >
                    <Check size={14} style={{ color: '#002b49', strokeWidth: 3 }} />
                  </div>
                </div>

                {/* Name & Qualifications */}
                <h4 style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.25rem 0', fontFamily: 'var(--font-display)' }}>
                  {member.name}
                </h4>
                <span style={{ color: 'var(--text-light)', fontSize: '0.8rem', fontWeight: 600, minHeight: '1.4rem' }}>
                  {member.degrees}
                </span>

                {/* Official Designation Pill */}
                <div 
                  style={{
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    color: 'var(--primary)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '50px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    margin: '0.85rem 0 0.4rem 0',
                    lineHeight: '1.3'
                  }}
                >
                  {member.designation}
                </div>

                {/* Pillar Tag */}
                <span style={{ color: 'var(--gold-dark)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {member.pillar}
                </span>

                {/* Biography */}
                <p style={{ color: 'var(--text-light)', fontSize: '0.86rem', lineHeight: '1.55', margin: '0.9rem 0 1.25rem 0', flexGrow: 1 }}>
                  {member.bio}
                </p>

                {/* Institutional Affiliation Footer */}
                <div 
                  style={{
                    width: '100%',
                    paddingTop: '0.9rem',
                    borderTop: '1px dashed rgba(0, 43, 73, 0.12)',
                    fontSize: '0.76rem',
                    color: 'var(--primary-light)',
                    fontWeight: 600,
                    lineHeight: '1.4'
                  }}
                >
                  {member.affiliation}
                </div>
              </div>
            ))}
          </div>

          {/* Consultative Body Invite Note */}
          <div 
            style={{
              marginTop: '3.5rem',
              background: '#ffffff',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
              boxShadow: '0 4px 15px rgba(0, 43, 73, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Compass size={24} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--primary)', fontSize: '0.95rem', display: 'block' }}>
                  Strategic Consultative Expansion
                </strong>
                <span style={{ color: 'var(--text-light)', fontSize: '0.82rem' }}>
                  The Bhongle Charitable Foundation continually welcomes esteemed luminaries, retired civil administrators, and domain specialists to join our Advisory Council.
                </span>
              </div>
            </div>
            <button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-outline-primary"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
            >
              Express Advisory Interest
            </button>
          </div>
        </div>
      </section>

      {/* Governance & Transparency Section */}
      <section id="governance" className="scroll-reveal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Transparency & Compliance</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
                Statutory Compliance & Fiscal Ethics
              </h2>
            </div>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
              Bhongle Charitable Foundation functions under strict statutory guidelines dictated by the Maharashtra Public Trusts Act, 1950. Governed by an immutable code of professional ethics, our accounts undergo rigorous annual independent audits by certified Chartered Accountants.
            </p>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
              As legally provisioned in our structural mandate, our revenues are derived from transparent public donations, collaborations, government grants, and international development frameworks. Every unit of funding received is directly pumped into optimizing our socio-environmental modules.
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'rgba(15, 81, 50, 0.05)', border: '1px solid rgba(15, 81, 50, 0.15)', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }}>
              <Shield size={20} style={{ color: 'var(--green-light)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--green-dark)', fontWeight: 500 }}>
                Independent annual auditing schedules ensure complete financial compliance and fund transparency.
              </span>
            </div>
          </div>

          {/* Right certificates layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 600, borderBottom: '1px solid rgba(0,43,73,0.1)', paddingBottom: '0.5rem' }}>
              Trust Indicators & Verifiable Details
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={certCardStyle}>
                <Award size={20} style={{ color: 'var(--gold)', marginBottom: '0.5rem' }} />
                <strong>Registration Date</strong>
                <p>January 21, 2026</p>
              </div>
              <div style={certCardStyle}>
                <Shield size={20} style={{ color: 'var(--gold)', marginBottom: '0.5rem' }} />
                <strong>Govt. Registration</strong>
                <p>Officially Certified Entity</p>
              </div>
              <div style={certCardStyle}>
                <Heart size={20} style={{ color: 'var(--gold)', marginBottom: '0.5rem' }} />
                <strong>12A & 80G Certified</strong>
                <p>Tax-Exempt Donations</p>
              </div>
              <div style={certCardStyle}>
                <Compass size={20} style={{ color: 'var(--gold)', marginBottom: '0.5rem' }} />
                <strong>NGO Darpan ID</strong>
                <p>Registered (Govt. of India)</p>
              </div>
              <div style={{ ...certCardStyle, gridColumn: 'span 2', background: 'rgba(212, 175, 55, 0.08)', border: '1.5px solid var(--gold)' }}>
                <FileCheck size={22} style={{ color: 'var(--gold)', marginBottom: '0.5rem' }} />
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary)' }}>MCA Form CSR-1 Registered</strong>
                <p style={{ color: 'var(--text-light)', marginTop: '0.2rem' }}>Ministry of Corporate Affairs • Eligible for Corporate CSR Funding</p>
              </div>
            </div>

            {/* Corporate Partnerships text */}
            <div style={{ background: 'rgba(0, 43, 73, 0.03)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '12px', padding: '1.5rem', marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--primary-light)', lineHeight: '1.6', fontWeight: 500 }}>
                Registered under Sections 12A and 80G of the Income Tax Act and certified under MCA Form CSR-1, we invite corporate partnerships, CSR funding allocations, and philanthropic donations to scale our initiatives in sustainable healthcare, educational drives, and ecological restoration.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Get Involved Section */}
      <section 
        id="involved" 
        style={{ 
          background: 'radial-gradient(circle at bottom left, var(--primary-light) 0%, var(--primary-dark) 100%)', 
          color: '#fff',
          maxWidth: '100%',
          paddingLeft: '0',
          paddingRight: '0',
          margin: 0
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left promo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Join The Movement</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginTop: '0.5rem', fontWeight: 600 }}>
                  Translate Altruistic Vision Into Reality
                </h2>
              </div>
              
              <p style={{ fontSize: '1.05rem', color: '#b8c9d6', lineHeight: '1.7' }}>
                Whether you are an individual wanting to volunteer, a philanthropist, or a corporate organization looking for collaborations, BCF offers transparent and impactful channels to co-create an equitable and self-reliant society.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(212,175,55,0.15)', padding: '0.5rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--gold)' }} />
                  </div>
                  <span style={{ fontSize: '0.95rem', color: '#fff' }}>Transparent annual reporting and compliance access</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(212,175,55,0.15)', padding: '0.5rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--gold)' }} />
                  </div>
                  <span style={{ fontSize: '0.95rem', color: '#fff' }}>50% tax exemption under Section 80G</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(212,175,55,0.15)', padding: '0.5rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--gold)' }} />
                  </div>
                  <span style={{ fontSize: '0.95rem', color: '#fff' }}>Youth-centric leadership training opportunities</span>
                </div>
              </div>
            </div>

            {/* Right card controls (Removed CSR Funding as requested) */}
            <div className="glass-card" style={{ background: 'rgba(5, 20, 33, 0.4)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>
                How would you like to help?
              </h3>
              <p style={{ color: '#b8c9d6', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Choose a channel to start your partnership with BCF. For instant inquiries, coordinate with our support desk at +91-7387498932.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div 
                  onClick={() => setIsDonateOpen(true)}
                  style={involveLinkStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <div>
                    <strong style={{ color: '#fff', display: 'block', fontSize: '1rem' }}>Make a Financial Contribution</strong>
                    <span style={{ color: '#b8c9d6', fontSize: '0.8rem' }}>Direct funding for healthcare, libraries, or afforestation.</span>
                  </div>
                  <ArrowUpRight size={20} style={{ color: 'var(--gold)' }} />
                </div>

                <div 
                  onClick={() => setIsVolunteerOpen(true)}
                  style={involveLinkStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <div>
                    <strong style={{ color: '#fff', display: 'block', fontSize: '1rem' }}>Join as a Field Volunteer</strong>
                    <span style={{ color: '#b8c9d6', fontSize: '0.8rem' }}>Engage in blood donation camps and rural teaching drives.</span>
                  </div>
                  <ArrowUpRight size={20} style={{ color: 'var(--gold)' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="scroll-reveal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Column: Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Get In Touch</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
                We'd Love to Hear From You
              </h2>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
                Contact us regarding partnerships, donations, volunteering, or project verification.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={contactItemStyle}>
                <div style={contactIconStyle}><MapPin size={20} /></div>
                <div>
                  <strong style={{ color: 'var(--primary)', display: 'block' }}>Registered Office Address</strong>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                    Plot No. 181, Venkatesh Nagar Phase-2, Near KDK College Road, Nandanvan, Nagpur, Maharashtra – 440009
                  </span>
                </div>
              </div>

              <div style={contactItemStyle}>
                <div style={contactIconStyle}><Mail size={20} /></div>
                <div>
                  <strong style={{ color: 'var(--primary)', display: 'block' }}>Official Email Address</strong>
                  <a href="mailto:bhonglecharitablefoundation@gmail.com" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>
                    bhonglecharitablefoundation@gmail.com
                  </a>
                </div>
              </div>

              <div style={contactItemStyle}>
                <div style={contactIconStyle}><Phone size={20} /></div>
                <div>
                  <strong style={{ color: 'var(--primary)', display: 'block' }}>Communication Hotlines</strong>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    +91-73874 98932 | +91-82378 84456
                  </span>
                </div>
              </div>

              <div style={contactItemStyle}>
                <div style={contactIconStyle}><FileCheck size={20} /></div>
                <div>
                  <strong style={{ color: 'var(--primary)', display: 'block' }}>CSR & Statutory Compliance</strong>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                    MCA Form CSR-1 Registered • 12A & 80G Certified • Officially Registered Non-Profit
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Connections */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <a href="https://www.facebook.com/Bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={contactSocialStyle}>
                <FacebookIcon size={20} /> Facebook
              </a>
              <a href="https://x.com/BhongleCF" target="_blank" rel="noreferrer" style={contactSocialStyle}>
                <XIcon size={18} /> Twitter / X
              </a>
              <a href="https://www.instagram.com/bhonglecharitablefoundation" target="_blank" rel="noreferrer" style={contactSocialStyle}>
                <InstagramIcon size={20} /> Instagram
              </a>
            </div>

            {/* Map coordinates card */}
            <div style={{ border: '2px solid var(--gold)', borderRadius: '12px', overflow: 'hidden', height: '150px', position: 'relative', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 43, 73, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.25rem' }}>
                <MapPin size={28} style={{ color: 'var(--gold)', marginBottom: '0.25rem' }} />
                <h5 style={{ color: 'var(--primary)', fontWeight: 700 }}>Nagpur, Maharashtra</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Latitude 21.1458° N • Longitude 79.0882° E</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--gold-dark)', fontWeight: 600, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Secretariat Headquarters</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card">
            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.4rem', borderBottom: '1px solid rgba(0,43,73,0.1)', paddingBottom: '0.5rem' }}>
                  Send an Inquiry Message
                </h3>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    placeholder="Enter your name" 
                    value={contactData.name}
                    onChange={(e) => setContactData({...contactData, name: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    className="form-control" 
                    placeholder="name@domain.com" 
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Subject / Purpose *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-control" 
                    placeholder="e.g. CSR partnership, donations, general inquiries" 
                    value={contactData.subject}
                    onChange={(e) => setContactData({...contactData, subject: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Message *</label>
                  <textarea 
                    required 
                    rows="4" 
                    className="form-control" 
                    placeholder="Type your message details here..."
                    style={{ resize: 'vertical' }}
                    value={contactData.message}
                    onChange={(e) => setContactData({...contactData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Sending...' : 'Send Inquiry Message'}
                </button>
              </form>
            ) : (
              /* Contact success */
              <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <CheckCircle2 size={56} style={{ color: 'var(--green-light)' }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                    {submissionMethod === 'direct' ? 'Inquiry Sent Directly!' : 'Email Client Prompted!'}
                  </h4>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {submissionMethod === 'direct' 
                      ? `Your inquiry regarding "${contactData.subject}" has been transmitted successfully to our secretariat. We will get back to you shortly.`
                      : `Your native email application has been launched with a pre-filled template regarding your inquiry: "${contactData.subject}". Please click Send in your email app.`
                    }
                  </p>
                </div>
                {submissionMethod === 'mailto' && (
                  <div style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'rgba(0, 43, 73, 0.05)', fontSize: '0.8rem', color: 'var(--primary)', maxWidth: '350px' }}>
                    If your email app did not open, please manually email your message to <strong>bhonglecharitablefoundation@gmail.com</strong>.
                  </div>
                )}
                <button onClick={() => { setContactSubmitted(false); setContactData({ name: '', email: '', subject: '', message: '' }); }} className="btn btn-outline" style={{ minWidth: '130px' }}>
                  Return to Form
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Strategic Partners & Supporting Organisations Scrolling Section */}
      <section id="partners" style={{ padding: '4.5rem 0 3.5rem 0', background: 'linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%)', borderTop: '1px solid rgba(0, 43, 73, 0.06)', borderBottom: '1px solid rgba(0, 43, 73, 0.08)', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>Collaborative Ecosystem</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 800 }}>
            Our Esteemed Partner Organisations
          </h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem' }}>
            Empowering communities through strategic alliances with government bodies, civic institutions, and premier medical fraternities.
          </p>
        </div>

        {/* First Scrolling Bar (Top Row) */}
        <div className="marquee-container" style={{ padding: '0.75rem 0 1.25rem 0' }}>
          <div className="partner-marquee-track">
            {partnerOrganisationsRow1.concat(partnerOrganisationsRow1).concat(partnerOrganisationsRow1).concat(partnerOrganisationsRow1).map((partner, idx) => (
              <div key={`partner-r1-${idx}`} className="partner-card">
                <div className="partner-logo-box">
                  <img src={partner.logo} alt={partner.name} loading="lazy" />
                </div>
                <h4 className="partner-name">{partner.name}</h4>
                <span className="partner-role">{partner.subtitle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Second Scrolling Bar (Bottom Row - Counter Flow) */}
        <div className="marquee-container" style={{ padding: '0.5rem 0 1.5rem 0' }}>
          <div className="partner-marquee-track-reverse">
            {partnerOrganisationsRow2.concat(partnerOrganisationsRow2).concat(partnerOrganisationsRow2).concat(partnerOrganisationsRow2).concat(partnerOrganisationsRow2).concat(partnerOrganisationsRow2).map((partner, idx) => (
              <div key={`partner-r2-${idx}`} className="partner-card">
                <div className="partner-logo-box">
                  <img src={partner.logo} alt={partner.name} loading="lazy" />
                </div>
                <h4 className="partner-name">{partner.name}</h4>
                <span className="partner-role">{partner.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        onOpenDonate={() => setIsDonateOpen(true)} 
        onOpenVolunteer={() => setIsVolunteerOpen(true)} 
      />

      {/* Modals */}
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <VolunteerModal isOpen={isVolunteerOpen} onClose={() => setIsVolunteerOpen(false)} />
    </div>
  );
}

// Inline Styles
const certCardStyle = {
  background: 'rgba(255, 253, 249, 0.9)',
  border: '1px solid rgba(212, 175, 55, 0.25)',
  borderRadius: '10px',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  fontSize: '0.85rem',
  boxShadow: 'var(--shadow-sm)',
};

const involveLinkStyle = {
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '12px',
  padding: '1.25rem',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
};

const contactItemStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-start',
};

const contactIconStyle = {
  background: 'rgba(0, 43, 73, 0.05)',
  border: '1px solid rgba(212, 175, 55, 0.15)',
  color: 'var(--primary)',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const contactSocialStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--primary-light)',
  textDecoration: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  background: 'rgba(0, 43, 73, 0.03)',
  border: '1px solid rgba(0,43,73,0.08)',
  transition: 'all 0.3s ease',
};

// Trustee Board clean styles
const boardCardStyle = {
  background: '#fff',
  border: '1px solid rgba(212, 175, 55, 0.25)',
  borderRadius: '14px',
  padding: '2.5rem 2rem',
  textAlign: 'center',
  boxShadow: 'var(--shadow-sm)',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  position: 'relative',
  overflow: 'hidden'
};

const boardLineAccent = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '4px',
  background: 'linear-gradient(to right, var(--primary) 0%, var(--gold) 100%)'
};

// Global stylesheet additions for board card animations on hover
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .governing-card:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: var(--gold) !important;
      box-shadow: var(--shadow-lg), 0 15px 30px -10px rgba(212, 175, 55, 0.2) !important;
    }
    
    a[href^="http"]:hover {
      color: var(--gold-dark) !important;
    }
  `;
  document.head.appendChild(styleEl);
}

export default App;
