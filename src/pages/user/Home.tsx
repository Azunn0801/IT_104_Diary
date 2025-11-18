import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import styles from './Home.module.css';

import { getAllPosts } from '../../services/postService';
import { getAllCategories } from '../../services/categoryService';
import type { Post } from '../../types/Post';
import type { Category } from '../../types/Category';

const PAGE_SIZE = 10;

const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-CA');
};

function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const recentResponse = await getAllPosts(1, 2, null, undefined, "Public");
        setRecentPosts(recentResponse.data);

        const categoriesResponse = await getAllCategories();
        setCategories(categoriesResponse);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
        setError("Failed to fetch initial data.");
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAllPosts(currentPage, PAGE_SIZE, selectedCategory, undefined, "Public");

        setPosts(response.data);
        setTotalItems(response.totalCount);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Cannot load article.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, selectedCategory]);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const renderPostCard = (post: Post) => (
    <div className="col-md-6 mb-4" key={post.id}>
      <div className="card h-100">
        <img
          src={post.pictureUrl}
          className="card-img-top"
          alt={post.title}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <p className="card-text text-muted small">Date: {formatDate(post.date)}</p>
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{truncateText(post.content, 100)}</p>
          <Link
            to={`/posts/${post.id}`}
            className="btn btn-primary mt-auto"
          >
            Read more
          </Link>
          <span
            className="badge bg-primary mt-2"
            style={{ alignSelf: 'flex-start' }}
          >
            {post.category?.name}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <main className="container my-5">

        <section className="recent-posts">
          <h2 className="text-center mb-4">Recent blog posts</h2>
          <div className="row">
            {recentPosts.length > 0 ? (
              recentPosts.map(post => renderPostCard(post))
            ) : (
              <p className="text-center">No recent posts.</p>
            )}
          </div>
        </section>

        <div className="text-center my-4">
          <Link to="/admin/post-manager" style={{ textDecoration: 'none', color: 'white' }}>
            <button className={`btn ${styles['btn-white']}`}>ADD NEW ARTICLE</button>
          </Link>
        </div>

        <section className="all-posts">
          <h2 className="mb-4 d-flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${!selectedCategory ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilter(null)}
            >
              All Posts
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleFilter(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </h2>

          {isLoading ? (
            <div className="text-center">Loading article...</div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : (
            <div className="row">
              {posts.length === 0 ? (
                <p className="text-center">No article found.</p>
              ) : (
                posts.map(post => renderPostCard(post))
              )}
            </div>
          )}
        </section>

        <nav aria-label="Page navigation" className="d-flex justify-content-center mt-4">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            showSizeChanger={false}
            disabled={isLoading}
          />
        </nav>
      </main>

      <footer className={`${styles.footer} bg-light`}>
        <div className={`container ${styles['footer-content']}`}>
          
          <div className={`${styles['footer-col']} ${styles['footer-logo']}`}>
            <h4 className={styles['site-logo']}>MY BLOG</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum aliquet accumsan porta lectus
              ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.
            </p>
          </div>

          <div className={styles['footer-col']}>
            <h4>Company</h4>
            <ul className="list-unstyled">
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>

          <div className={styles['footer-col']}>
            <h4>Help</h4>
            <ul className="list-unstyled">
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className={styles['footer-col']}>
            <h4>Resources</h4>
            <ul className="list-unstyled">
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Development Tutorial</a></li>
              <li><a href="#">How to - Blog</a></li>
              <li><a href="#">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>

        <div className={`${styles['footer-social']} text-center mt-3`}>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-github"></i></a>
        </div>
      </footer>
    </>
  );
}

export default Home;