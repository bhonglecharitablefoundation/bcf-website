import React, { useState, useEffect } from 'react';
import { 
  Heart, BookOpen, Shield, Users, Mail, Phone, MapPin, 
  ChevronRight, Award, Compass, ExternalLink, ArrowUpRight, 
  Info, CheckCircle2, Leaf
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
      {/* Navbar */}
      <Navbar onOpenDonate={() => setIsDonateOpen(true)} />

      {/* Hero Section */}
      <section 
        id="home"
        style={{
          background: 'radial-gradient(circle at top right, var(--primary-light) 0%, var(--primary-dark) 100%)',
          color: '#fff',
          paddingTop: '9rem',
          minHeight: '100vh',
          display: 'flex',
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
            gap: '2rem',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Hero text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', padding: '0.4rem 1.2rem', borderRadius: '50px', width: 'fit-content' }}>
              <Shield size={16} style={{ color: 'var(--gold)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.5px' }}>
                Pan-India Public Charitable Trust • Reg No: E-0004363NGP
              </span>
            </div>
            
            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                lineHeight: '1.15',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              Universal Humanism In <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Service</span> & Action
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#b8c9d6', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto' }}>
              Bhongle Charitable Foundation is committed to delivering structured socio-economic, medical, and educational interventions across the Indian subcontinent. We stand for equity, literacy, and ecological preservation.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
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
            <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.5rem', fontWeight: 700 }}>12A & 80G</h4>
                <p style={{ fontSize: '0.75rem', color: '#b8c9d6' }}>Tax Exemptions Approved</p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.5rem', fontWeight: 700 }}>Nagpur, MH</h4>
                <p style={{ fontSize: '0.75rem', color: '#b8c9d6' }}>Headquarters & Registration</p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.5rem', fontWeight: 700 }}>NGO Darpan</h4>
                <p style={{ fontSize: '0.75rem', color: '#b8c9d6' }}>Central Govt. Registered</p>
              </div>
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

      {/* International Yoga Day 2026 Milestone Section */}
      <section id="yoga-milestone" className="scroll-reveal" style={{ borderBottom: '1px solid rgba(0,43,73,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>Recent Initiatives & Milestones</span>
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
                <strong>Reg. ID Number</strong>
                <p>E-0004363NGP</p>
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
            </div>

            {/* Replaced Corporate Partnerships text */}
            <div style={{ background: 'rgba(0, 43, 73, 0.03)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '12px', padding: '1.5rem', marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--primary-light)', lineHeight: '1.6', fontWeight: 500 }}>
                Registered under Sections 12A and 80G of the Income Tax Act, we invite corporate partnerships, grants, and philanthropic donations to scale our initiatives in sustainable healthcare, educational drives, and ecological restoration.
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
                    placeholder="e.g. general inquiries, partnerships" 
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
