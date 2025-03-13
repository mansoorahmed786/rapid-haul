import React from 'react';
import './styles.css';
import { Image } from 'antd';

const blogPosts = [
  {
    date: 'FEB 19, 2015',
    title: 'The North American Auto Show will take place in Chicago',
    image: 'scroll-image1.jpeg',
    alt: 'Auto show',
  },
  {
    date: 'APR 29, 2014',
    title: 'New Drilling Method Opens Vast Oil Fields In Us',
    image: 'scroll-image2.jpeg',
    alt: 'Oil field',
  },
  {
    date: 'FEB 17, 2015',
    title: "Demanding 'Big Oil' pay its fair share",
    image: 'scroll-image3.jpeg',
    alt: 'Gas station',
  },
  {
    date: 'FEB 15, 2015',
    title: 'Sending oil prices up and down',
    image: 'scroll-image3.jpeg',
    alt: 'Oil rig',
  },
  {
    date: 'FEB 15, 2015',
    title: 'Sending oil prices up and down',
    image: 'scroll-image2.jpeg',
    alt: 'Oil rig',
  },
  {
    date: 'FEB 15, 2015',
    title: 'Sending oil prices up and down',
    image: 'scroll-image1.jpeg',
    alt: 'Oil rig',
  },
];

const Blog = () => {
  return (
    <section className="blog">
      <div className="blog-container">
        <h2 className="blog-heading">LATEST FROM THE BLOG</h2>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div className="card-wrapper" key={index}>
              <div className="blog-card">
                <Image
                  src={post.image}
                  alt={post.alt}
                  className="blog-image"
                  width={400}
                  height={300}
                />
                <div className="blog-overlay">
                  <p className="blog-date">{post.date}</p>
                  <h3 className="blog-title">{post.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
