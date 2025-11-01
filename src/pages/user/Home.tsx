import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import './Home.module.css';

import { getAllPosts } from '../../services/postService';
import { getAllCategories } from '../../services/categoryService'; // Import mới
import type { Post } from '../../types/Post';
import type { Category } from '../../types/Category'; // Import mới
import Footer from '../../layouts/Footer';

const PAGE_SIZE = 6;

const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-CA');
};

function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]); // State cho 2 bài mới nhất
  const [posts, setPosts] = useState<Post[]>([]); // State cho "All Posts"
  const [categories, setCategories] = useState<Category[]>([]); // State cho các nút lọc
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // State mới: lưu category đang được chọn
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // useEffect này sẽ chạy 1 LẦN để lấy 2 bài mới nhất và danh sách category
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 1. Lấy 2 bài mới nhất (page=1, pageSize=2, không lọc)
        const recentResponse = await getAllPosts(1, 2, null);
        setRecentPosts(recentResponse.data);

        // 2. Lấy tất cả category
        const categoriesResponse = await getAllCategories();
        setCategories(categoriesResponse);
        
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
        setError("Không thể tải trang.");
      }
    };
    
    fetchInitialData();
  }, []); // [] = Chỉ chạy 1 lần

  // useEffect này sẽ chạy MỖI KHI 'currentPage' hoặc 'selectedCategory' thay đổi
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Gọi API với trang và category đã chọn
        const response = await getAllPosts(currentPage, PAGE_SIZE, selectedCategory);
        
        setPosts(response.data);
        setTotalItems(response.totalCount);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Không thể tải bài viết.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, selectedCategory]); // Chạy lại khi 2 giá trị này thay đổi

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  // Hàm mới: xử lý khi bấm nút lọc
  const handleFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Quay về trang 1 khi lọc
  };

  // Hàm render card bài viết (để tái sử dụng)
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
        
        {/* === SECTION RECENT POSTS (Động) === */}
        <section className="recent-posts">
          <h2 className="text-center mb-4">Recent blog posts</h2>
          <div className="row">
            {recentPosts.length > 0 ? (
              recentPosts.map(post => renderPostCard(post))
            ) : (
              <p className="text-center">Chưa có bài viết gần đây.</p>
            )}
          </div>
        </section>

        <div className="text-center my-4">
          <Link to="/admin/post-manager" style={{ textDecoration: 'none', color: 'white' }}>
            <button className="btn btn-danger">ADD NEW ARTICLE</button>
          </Link>
        </div>

        {/* === SECTION ALL POSTS (Động + Lọc) === */}
        <section className="all-posts">
          
          {/* === Nút Lọc Category (Động) === */}
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
            <div className="text-center">Đang tải bài viết...</div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : (
            <div className="row">
              {posts.length === 0 ? (
                <p className="text-center">Không tìm thấy bài viết nào.</p>
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

      <Footer />
    </>
  );
}

export default Home;