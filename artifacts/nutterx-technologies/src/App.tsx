import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Mail,
  Menu,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Phone,
  Settings2,
  UsersRound,
  Wifi,
  X,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();
const whatsappUrl = 'https://wa.me/254758891491';
const phoneHref = 'tel:+254758891491';
const emailAddresses = ['nutterxconnect@gmail.com', 'nutterxtech@gmail.com'];
const emailHref = `mailto:${emailAddresses.join(',')}`;
const socialLinks: { label: string; href: string; icon: IconType }[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nutterx_?stkn=MTkwcWNya2Y0bTgzcw==',
    icon: FaInstagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61589267831004',
    icon: FaFacebookF,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@nutter.001?_r=1&_t=ZS-99XBnc6KSBw',
    icon: FaTiktok,
  },
  {
    label: 'X',
    href: 'https://x.com/Billnutter43778',
    icon: FaXTwitter,
  },
];

const serviceItems = [
  {
    number: '01',
    title: 'Web Development',
    text: 'We build fast, secure and responsive websites tailored to your business needs.',
    cta: 'Get Started',
    audience: 'Digital presence',
    destination: '/contact',
    icon: Code2,
  },
  {
    number: '02',
    title: 'WhatsApp Bot Deployment',
    text: 'Powerful WhatsApp bots with advanced features to automate communication and grow your business.',
    cta: 'Deploy a Bot',
    audience: 'Business automation',
    destination: '/whatsapp-bot',
    icon: MessageCircle,
  },
  {
    number: '03',
    title: 'WiFi Solutions',
    text: 'Reliable and fast internet solutions for homes, businesses and organizations.',
    cta: 'Get Connected',
    audience: 'Home + business',
    destination: '/wifi',
    icon: Wifi,
  },
  {
    number: '04',
    title: 'System Solutions',
    text: 'Customized software and system solutions designed to streamline your operations.',
    cta: 'Discuss a Project',
    audience: 'Practical systems',
    destination: '/contact',
    icon: Settings2,
  },
];

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Social App', href: '/community-app' },
  { label: 'WhatsApp Bot', href: '/whatsapp-bot' },
  { label: 'WiFi', href: '/wifi' },
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
];

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'NutterX Technologies | Technology & WiFi Solutions in Kenya',
    description: 'NutterX Technologies provides web development, WhatsApp bot deployment, WiFi solutions and system solutions for people and businesses in Kenya.',
  },
  '/services': {
    title: 'Technology Services | NutterX Technologies',
    description: 'Explore NutterX web development, WhatsApp bot deployment, WiFi and custom system solutions in Kenya.',
  },
  '/community-app': {
    title: 'Social App | NutterX Technologies',
    description: 'Find new friends, advertise products and vibe chat in the NutterX WhatsApp-style community web app.',
  },
  '/whatsapp-bot': {
    title: 'WhatsApp Bot Deployment | NutterX Technologies',
    description: 'Automate customer communication with WhatsApp bot deployment from NutterX Technologies in Kenya.',
  },
  '/wifi': {
    title: 'WiFi Solutions | NutterX Technologies',
    description: 'Explore reliable NutterX Connect WiFi packages for homes, families and businesses in Kenya.',
  },
  '/about': {
    title: 'About NutterX Technologies',
    description: 'Learn about NutterX Technologies, a Kenya-based provider of digital, connectivity and technology solutions.',
  },
  '/how-it-works': {
    title: 'How It Works | NutterX Technologies',
    description: 'Learn how to start a conversation with NutterX Technologies and find the right solution for your needs.',
  },
  '/why-us': {
    title: 'Why Choose NutterX Technologies',
    description: 'See why people and businesses choose NutterX for technology and connectivity solutions in Kenya.',
  },
  '/contact': {
    title: 'Contact NutterX Technologies',
    description: 'Contact NutterX Technologies in Kenya by WhatsApp, phone, email or social media.',
  },
};

const packages = {
  hotspot: [
    { name: 'FREE 3 MINUTES', price: 'KSH 0', free: true },
    { name: '1 HR', price: 'KSH 10' },
    { name: '3 HRS', price: 'KSH 20' },
    { name: '6 HRS', price: 'KSH 30' },
    { name: '12 HRS', price: 'KSH 40' },
    { name: '24 HRS', price: 'KSH 50' },
    { name: '1 WEEK', price: 'KSH 250' },
    { name: '1 MONTH', price: 'KSH 600' },
  ],
  family: [
    { name: '4 Mbps', price: 'KSH 800', suffix: '/ MONTH' },
    { name: '7 Mbps', price: 'KSH 1000', suffix: '/ MONTH' },
  ],
} as const;

function Reveal({
  children,
  className = '',
  delay = 0,
  ariaHidden = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  ariaHidden?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-hidden={ariaHidden}
      ref={(node) => {
        if (!node || visible) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.08 },
        );
        observer.observe(node);
      }}
    >
      {children}
    </div>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link className="brand" href="/" aria-label="NutterX Technologies home" onClick={onClick}>
      <span className="brand-logo-crop" aria-hidden="true">
        <img src="/nutterx-logo.png" alt="" />
      </span>
      <span>NutterX Technologies</span>
    </Link>
  );
}

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [packageType, setPackageType] = useState<'hotspot' | 'family'>('hotspot');
  const [selectedPackage, setSelectedPackage] = useState('FREE 3 MINUTES');
  const [location] = useLocation();
  const currentRoute = location.replace(/\/+$/, '') || '/';

  const closeMenu = () => setMenuOpen(false);
  const openWhatsApp = (message: string) => {
    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const metadata = pageMetadata[currentRoute] ?? {
      title: 'Page Not Found | NutterX Technologies',
      description: 'This NutterX Technologies page could not be found.',
    };
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.title = metadata.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const siteOrigin = new URL(canonical.href).origin;
      canonical.href = `${siteOrigin}${currentRoute === '/' ? '/' : currentRoute}`;
      document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', canonical.href);
    }
  }, [currentRoute]);

  return (
    <div className="site-shell">
      <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
        <div className="container">
          <div className="nav-wrap">
            <Brand onClick={closeMenu} />
            <nav className="nav-links" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={currentRoute === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              className="button button-primary"
              type="button"
              onClick={() => openWhatsApp('Hello NutterX Technologies, I would like to enquire about your services.')}
            >
              Contact Us <ArrowUpRight size={16} />
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {menuOpen && (
            <nav className="mobile-nav" id="site-mobile-nav" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={currentRoute === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <button
                className="button button-primary"
                type="button"
                onClick={() => {
                  closeMenu();
                  openWhatsApp('Hello NutterX Technologies, I would like to enquire about your services.');
                }}
              >
                Contact Us <ArrowUpRight size={16} />
              </button>
            </nav>
          )}
        </div>
      </header>

      {menuOpen && (
        <button
          className="mobile-menu-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}

      <main>
        {currentRoute === '/' && (
        <section className="hero" id="home">
          <div className="container hero-content">
            <Reveal className="hero-copy">
              <span className="eyebrow">A Kenya-based technology partner</span>
              <h1>TECHNOLOGY THAT CONNECTS YOU TO A <em>BETTER FUTURE.</em></h1>
              <p className="hero-intro">
                NutterX Technologies provides reliable digital, connectivity and technology solutions designed for individuals, homes, businesses and organizations.
              </p>
              <div className="hero-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => openWhatsApp('Hello NutterX Technologies, I would like to make a general enquiry.')}
                >
                  Talk to us on WhatsApp <MessageCircle size={17} />
                </button>
                <a className="button button-outline" href={phoneHref}>Call Us <Phone size={16} /></a>
              </div>
            </Reveal>

             <Reveal className="hero-signal" delay={110} ariaHidden>
               <div className="signal-topline">
                 <span>NUTTERX / CONNECTED</span>
                 <span className="signal-live"><i /> LIVE</span>
               </div>
               <div className="signal-core">
                 <span className="signal-ring ring-one" />
                 <span className="signal-ring ring-two" />
                 <span className="signal-node node-top">WEB</span>
                 <span className="signal-node node-right">BOT</span>
                 <span className="signal-node node-bottom">WIFI</span>
                 <span className="signal-node node-left">SYSTEMS</span>
                 <span className="signal-center">NX</span>
               </div>
               <div className="signal-foot">
                 <span>FOUR WAYS TO MOVE FORWARD</span>
                 <span>01 — 04</span>
               </div>
             </Reveal>

             <Reveal className="hero-footer" delay={180}>
              <span className="hero-note">Web. WhatsApp. WiFi. Systems.</span>
               <Link className="hero-scroll" href="/services">Explore our services <ArrowDown size={15} /></Link>
            </Reveal>
          </div>
        </section>
        )}

        {currentRoute === '/services' && (
        <section className="section services" id="services">
          <div className="container">
            <Reveal className="section-header">
              <div>
                <span className="eyebrow">What we do</span>
                <h2 className="section-heading">Useful technology.<br /><span>Less complication.</span></h2>
              </div>
              <p className="section-description">The right digital tool should make the next step clearer. That is where we start.</p>
            </Reveal>
            <div className="service-grid">
              {serviceItems.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Reveal key={service.number} className="service-card" delay={index * 90}>
                    <div>
                      <span className="service-number">{service.number} / {String(serviceItems.length).padStart(2, '0')}</span>
                      <div className="service-icon"><Icon size={22} strokeWidth={1.7} /></div>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                       <span className="service-audience">{service.audience}</span>
                    </div>
                    <Link className="service-link" href={service.destination}>
                      {service.cta} <ChevronRight size={15} />
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {currentRoute === '/community-app' && (
        <section className="new-app-section" id="community-app" aria-labelledby="new-app-title">
          <div className="container">
            <Reveal className="new-app-card">
              <div className="new-app-copy">
                <span className="new-app-badge"><i aria-hidden="true" /> NEW</span>
                <span className="eyebrow">Meet. Share. Chat.</span>
                <h2 id="new-app-title">A new way to <span>connect.</span></h2>
                <p>
                  Explore a WhatsApp-style web app where you can find new friends,
                  advertise your products, and vibe chat—all in one place.
                </p>
                <a
                  className="button new-app-button"
                  href="https://nutterx-connect.vercel.app/"
                >
                  Open the app <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="new-app-features" aria-label="What you can do in the new web app">
                <div className="new-app-feature">
                  <span className="new-app-feature-icon"><UsersRound size={20} /></span>
                  <div>
                    <span className="new-app-feature-label">01 / CONNECT</span>
                    <h3>Find new friends</h3>
                    <p>Meet people and make new connections.</p>
                  </div>
                </div>
                <div className="new-app-feature">
                  <span className="new-app-feature-icon"><Megaphone size={20} /></span>
                  <div>
                    <span className="new-app-feature-label">02 / PROMOTE</span>
                    <h3>Advertise products</h3>
                    <p>Showcase what you sell to the community.</p>
                  </div>
                </div>
                <div className="new-app-feature">
                  <span className="new-app-feature-icon"><MessagesSquare size={20} /></span>
                  <div>
                    <span className="new-app-feature-label">03 / CHAT</span>
                    <h3>Vibe chat</h3>
                    <p>Join conversations and enjoy the chat.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        )}

        {currentRoute === '/whatsapp-bot' && (
         <section className="bot-section" id="bot">
          <div className="container">
            <Reveal className="bot-card">
              <div className="bot-content">
                <span className="eyebrow">AUTOMATE. ENGAGE. GROW.</span>
                <h2>POWERFUL WHATSAPP BOTS. JUST KSH 70/MONTH.</h2>
                <p>Get your WhatsApp Bot up and running and take your communication and business automation to the next level.</p>
                <button
                  className="button button-light"
                  type="button"
                  onClick={() => openWhatsApp('Hello NutterX Technologies, I would like to get the WhatsApp bot for KSH 70 / MONTH.')}
                >
                  Deploy Now <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="bot-visual" aria-label="Illustration of a WhatsApp bot conversation">
                <div className="bot-orbit" />
                <div className="bot-phone">
                  <span className="phone-speaker" />
                  <div className="phone-status"><span /> NutterX bot</div>
                  <div className="chat-bubble">Hello. How can we help you today?</div>
                  <div className="chat-bubble user">I&apos;d like to get started.</div>
                  <div className="chat-bubble">Let&apos;s connect you to the right solution.</div>
                </div>
                <div className="price-stamp"><strong>KSH 70</strong><span>/ MONTH</span></div>
              </div>
            </Reveal>
          </div>
        </section>
        )}

        {currentRoute === '/wifi' && (
        <section className="section wifi-section" id="wifi">
          <div className="container">
            <div className="wifi-layout">
              <Reveal className="wifi-heading">
                <span className="eyebrow">NutterX Connect</span>
                <h2>FAST. SECURE. <span>STABLE. AFFORDABLE.</span></h2>
                <p>Stay connected with reliable internet solutions for homes, families and businesses.</p>
                <ul className="wifi-features">
                  <li><Check size={15} /> Fast Internet</li>
                  <li><Check size={15} /> Secure Connection</li>
                  <li><Check size={15} /> Stable Network</li>
                  <li><Check size={15} /> Affordable Prices</li>
                </ul>
              </Reveal>

              <Reveal className="pricing-panel" delay={120}>
                <div className="pricing-head">
                  <div className="wifi-tabs" role="tablist" aria-label="WiFi package type">
                    <button
                      className={`wifi-tab ${packageType === 'hotspot' ? 'active' : ''}`}
                      type="button"
                      role="tab"
                      aria-selected={packageType === 'hotspot'}
                      onClick={() => {
                        setPackageType('hotspot');
                        setSelectedPackage('FREE 3 MINUTES');
                      }}
                    >
                      Hotspot packages
                    </button>
                    <button
                      className={`wifi-tab ${packageType === 'family' ? 'active' : ''}`}
                      type="button"
                      role="tab"
                      aria-selected={packageType === 'family'}
                      onClick={() => {
                        setPackageType('family');
                        setSelectedPackage('4 Mbps');
                      }}
                    >
                      Family packages
                    </button>
                  </div>
                  <p>{packageType === 'hotspot' ? 'Pay as you connect' : 'Home connectivity'}</p>
                </div>
                <div className="package-grid">
                  {packages[packageType].map((item) => (
                    <button
                      className={`package-card ${'free' in item && item.free ? 'free' : ''} ${selectedPackage === item.name ? 'selected' : ''}`}
                      type="button"
                      key={item.name}
                      onClick={() => setSelectedPackage(item.name)}
                      aria-pressed={selectedPackage === item.name}
                    >
                      <span className="package-name">{item.name}</span>
                      <span className="package-price">
                        {item.price}
                        {'suffix' in item && <small>{item.suffix}</small>}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  className="button button-primary"
                  type="button"
                  style={{ marginTop: '24px' }}
                  onClick={() => openWhatsApp(`Hello NutterX Technologies, I would like to ask about the ${selectedPackage} NutterX Connect package.`)}
                >
                  Ask about {selectedPackage} <ArrowUpRight size={16} />
                </button>
              </Reveal>
            </div>
          </div>
        </section>
        )}

        {currentRoute === '/why-us' && (
        <section className="section why-section" id="why-us">
          <div className="container why-grid">
             <Reveal className="why-art">
               <div className="why-art-frame">
                 <img
                   className="why-logo"
                   src="/nutterx-why-choose.png"
                   alt="NutterX Technologies logo"
                 />
                 <span className="why-contact-pill">
                   <Phone size={16} aria-hidden="true" />
                   +254 758 891 491
                 </span>
               </div>
            </Reveal>
            <Reveal className="why-copy" delay={110}>
              <span className="eyebrow">Why NutterX</span>
               <h2 className="section-heading">WHY CHOOSE <span>NUTTERX?</span></h2>
              <div className="why-list">
                <div className="why-item">
                  <span className="why-item-index">01</span>
                   <div><h3>QUALITY SERVICE</h3><p>Professional solutions built with quality in mind.</p></div>
                </div>
                <div className="why-item">
                  <span className="why-item-index">02</span>
                   <div><h3>RELIABLE &amp; SECURE</h3><p>Reliable technology and connectivity solutions.</p></div>
                </div>
                <div className="why-item">
                  <span className="why-item-index">03</span>
                   <div><h3>SUPPORT</h3><p>Friendly support when you need assistance.</p></div>
                 </div>
                 <div className="why-item">
                   <span className="why-item-index">04</span>
                   <div><h3>INNOVATIVE SOLUTIONS</h3><p>Modern solutions designed to solve real problems.</p></div>
                 </div>
                 <div className="why-item">
                   <span className="why-item-index">05</span>
                   <div><h3>CLIENT SATISFACTION</h3><p>We focus on delivering solutions that meet our clients&apos; needs.</p></div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        )}

        {currentRoute === '/about' && (
         <section className="section about-section" id="about">
           <div className="container about-layout">
             <Reveal>
               <span className="eyebrow">Who we are</span>
               <h2 className="section-heading">ABOUT NUTTERX <span>TECHNOLOGIES</span></h2>
             </Reveal>
             <Reveal className="about-copy" delay={110}>
               <p>NutterX Technologies is a Kenya-based technology brand providing digital, connectivity and technology solutions. From websites and WhatsApp automation to WiFi and customized systems, we help individuals, businesses and organizations use technology more effectively.</p>
               <span className="about-badge">BASED IN KENYA</span>
             </Reveal>
           </div>
         </section>
        )}

        {currentRoute === '/how-it-works' && (
        <section className="section process-section" id="how-it-works">
          <div className="container">
            <Reveal className="section-header">
              <div>
                <span className="eyebrow">How we work</span>
                <h2 className="section-heading">From first message<br />to <span>next step.</span></h2>
              </div>
              <p className="section-description">Start with what you need. We will help make the route forward practical.</p>
            </Reveal>
            <div className="process-bar">
              <Reveal className="process-item" delay={80}>
                <span className="process-item-number">01</span>
                <h3>Tell us what you need</h3>
                <p>Reach out on WhatsApp, phone, or email.</p>
              </Reveal>
              <Reveal className="process-item" delay={160}>
                <span className="process-item-number">02</span>
                <h3>Find the right fit</h3>
                <p>We focus the conversation around a useful solution.</p>
              </Reveal>
              <Reveal className="process-item" delay={240}>
                <span className="process-item-number">03</span>
                <h3>Connect to better</h3>
                <p>Move ahead with technology that does its job.</p>
              </Reveal>
            </div>
          </div>
        </section>
        )}

        {currentRoute === '/contact' && (
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-grid">
              <Reveal>
                <span className="eyebrow">Let&apos;s connect</span>
                 <h2>LET&apos;S BUILD SOMETHING BETTER.</h2>
                 <p className="contact-intro">Have a project, need reliable WiFi, or want to automate your business with a WhatsApp bot? Talk to us today.</p>
                 <div className="social-links" aria-label="NutterX Technologies social media profiles">
                   <span className="social-links-label">Follow NutterX</span>
                   <div className="social-links-list">
                     {socialLinks.map(({ label, href, icon: Icon }) => (
                       <a
                         className="social-link"
                         href={href}
                         target="_blank"
                         rel="noreferrer"
                         aria-label={`NutterX Technologies on ${label}`}
                         key={label}
                       >
                         <Icon aria-hidden="true" />
                       </a>
                     ))}
                   </div>
                 </div>
              </Reveal>
              <Reveal className="contact-actions" delay={120}>
                 <span className="contact-actions-label">DIRECT CONTACT</span>
                 <button className="contact-item contact-cta" type="button" onClick={() => openWhatsApp('Hello NutterX Technologies, I would like to enquire about your services.')}><MessageCircle size={19} /> CHAT ON WHATSAPP <span className="contact-detail">+254 758 891 491</span> <ArrowUpRight size={15} /></button>
                 <a className="contact-item contact-cta" href={phoneHref}><Phone size={19} /> CALL US <span className="contact-detail">+254 758 891 491</span> <ArrowUpRight size={15} /></a>
                 <a className="contact-item contact-email" href={emailHref}>
                   <Mail size={19} />
                   <span><strong>EMAIL</strong><br />{emailAddresses[0]}<br />{emailAddresses[1]}</span>
                   <ArrowUpRight size={15} />
                 </a>
                 <span className="contact-item"><span className="contact-location">KENYA</span></span>
              </Reveal>
            </div>
          </div>
        </section>
        )}

        {!navigationItems.some((item) => item.href === currentRoute) && (
          <section className="section not-found-section">
            <div className="container">
              <Reveal>
                <span className="eyebrow">404 · PAGE NOT FOUND</span>
                <h1 className="section-heading">That page isn&apos;t here.</h1>
                <p className="section-description">Choose a page from the navigation or return to the NutterX home page.</p>
                <Link className="button button-primary" href="/">Back to Home <ArrowUpRight size={16} /></Link>
              </Reveal>
            </div>
          </section>
        )}
      </main>
      <div className="site-footer-shell">
        <div className="container">
          <footer className="footer">
            <div className="footer-brand">
              <Brand />
              <span className="footer-tagline">Connecting you to a better future</span>
            </div>
            <div className="footer-content">
              <nav className="footer-nav" aria-label="Footer navigation">
                {navigationItems.map((item) => (
                  <Link key={item.href} href={item.href}>{item.label}</Link>
                ))}
              </nav>
              <div className="footer-details">
                <span className="footer-detail-label">SERVICES · WHATSAPP · PHONE · KENYA</span>
                <span>{emailAddresses[0]} · {emailAddresses[1]}</span>
                <span>© 2026 NutterX Technologies. All rights reserved.</span>
                <span>NutterX Connect WiFi is a product of NutterX Technologies.</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;