'use client';
import React from 'react';

import CustomHeader from './Header';
import Features from './components/Features';
import CTA from './components/CTA';
import Manufactures from './components/Manufacturer';
import Advantages from './components/Advantages';
import Blog from './components/Blog';


const MainPage = () => {
  return (
    <div style={{ margin: '0 auto', width: '100%' }}>
      <CustomHeader />
      <Features />
      <CTA />
      <Manufactures />
      <Advantages />
      <Blog />
    </div>
  );
};

export default MainPage;
