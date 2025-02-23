'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import './styles.css';
import { Link } from 'react-router-dom';

const CustomHeader = () => {
  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <header className="header">
        <div className="header-wrapper">
          <Link href="/" className="logo">
            <Image
              src="https://livedemo00.template-help.com/joomla_63689/images/logo.png"
              width={200}
              height={50}
              alt="logo"
            />
          </Link>
          <nav className="nav-links">
            <Link href="#" className="nav-link">
              HOME
            </Link>
            <Link href="#" className="nav-link">
              ABOUT
            </Link>
            <Link href="#" className="nav-link">
              PAGES
            </Link>
            <Link href="#" className="nav-link">
              BLOG
            </Link>
            <Link href="#" className="nav-link">
              GALLERY
            </Link>
            <Link href="#" className="nav-link">
              CONTACTS
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">WELCOME TO OUR COMPANY!</p>
          <h1 className="hero-title">
            Recognized company for
            <br />
            <span style={{ fontWeight: 'bold' }}>QUALITY</span>, performance
            <br />
            and technology
          </h1>
          <Link href="#" className="hero-button">
            READ MORE
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CustomHeader;
