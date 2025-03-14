'use client';
import React, { useEffect } from 'react';
import { Layout, Menu, Button, Image } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUser } from '@/store/userSlice';
import { logout } from '@/store/authSlice';
import './styles.css';

const { Header } = Layout;

const CustomHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const isAuthenticated = userInfo.email !== null;

  const handleLogout = async () => {
    try {
      dispatch(deleteUser());
      dispatch(logout());
      router.refresh();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Define menu items
  const menuItems = [
    { label: 'Home', key: 'home', onClick: () => router.push('/') },
    { label: 'About', key: 'about', onClick: () => router.push('/about') },
    { label: 'Pages', key: 'pages', onClick: () => router.push('/pages') },
    { label: 'Blog', key: 'blog', onClick: () => router.push('/blog') },
    {
      label: 'Gallery',
      key: 'gallery',
      onClick: () => router.push('/gallery'),
    },
    {
      label: 'Contacts',
      key: 'contacts',
      onClick: () => router.push('/contacts'),
    },
    ...(isAuthenticated
      ? [
          {
            label: (
              <Button type="primary" danger onClick={handleLogout}>
                Logout
              </Button>
            ),
            key: 'logout',
          },
        ]
      : [
          {
            label: 'Login',
            key: 'login',
            onClick: () => router.push('/login'),
          },
          {
            label: 'Signup',
            key: 'signup',
            onClick: () => router.push('/signup'),
          },
        ]),
  ];

  return (
    <main>
      <Header
        style={{
          background: '#fff',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="header-wrapper">
          <Image src="logo.jpeg" alt="Logo" style={{ height: '60px' }} />
          <Menu
            mode="horizontal"
            style={{ flex: 1, justifyContent: 'flex-end', border: 'none' }}
            items={menuItems}
          />
        </div>
      </Header>

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
