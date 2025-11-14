import React, { useState, useEffect, useRef } from "react";
import styles from "./ManagerPost.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./ManagerUser.css"; 

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import { 
  getAllPosts, 
  createPost, 
  updatePost, 
  deletePost 
} from "../../services/postService";
import { getAllCategories } from "../../services/categoryService";
import type { Post, NewPostData } from "../../types/Post";
import type { Category } from "../../types/Category";

import { getAuth } from "../../utils/auth";
import { showToast } from "../../utils/toastHelper";

const PAGE_SIZE = 10;

const getBase64 = (file: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(file);
};

const ManagerPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | string>('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'Public' | 'Private'>('Public');
  
  const [pictureUrl, setPictureUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  const currentUser = getAuth();

  const fetchPostsAndCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const postResponse = await getAllPosts(currentPage, PAGE_SIZE, null, '');
      const categoryResponse = await getAllCategories();
      
      setPosts(postResponse.data);
      setTotalItems(postResponse.totalCount);
      setCategories(categoryResponse);
    } catch (err) {
      setError("Không thể tải dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsAndCategories();
  }, [currentPage]);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = (post: Post | null) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setCategoryId(post.categoryId);
      setContent(post.content);
      setStatus(post.status);
      setPictureUrl(post.pictureUrl);
      setPreviewImage(post.pictureUrl);
    } else {
      setEditingPost(null);
      setTitle('');
      setCategoryId('');
      setContent('');
      setStatus('Public');
      setPictureUrl('');
      setPreviewImage('');
    }
  };

  const handleBrowseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      getBase64(file, (url) => {
        setPreviewImage(url);
        setPictureUrl(url);
      });
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentUser) return showToast("error", "You need to sign in.");
    if (!title || !categoryId || !content || !pictureUrl) {
      showToast("error", "Please fill full the fields.");
      return;
    }

    const postData: Omit<NewPostData, 'userId' | 'date' | 'likes'> = {
      title,
      categoryId: Number(categoryId),
      content,
      status,
      pictureUrl,
    };

    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
        showToast("success", "Updated successfully!");
      } else {
        const finalData: NewPostData = { ...postData, userId: currentUser.id, date: new Date().toISOString(), likes: [] };
        await createPost(finalData);
        showToast("success", "Added successfully!");
      }
      fetchPostsAndCategories();
      modalCloseBtnRef.current?.click();
    } catch (err) {
      showToast("error", "Error, cannot save the post.");
    }
  };
  
  const handleDelete = async (post: Post) => {
    if (currentUser?.id !== post.userId) {
      showToast("error", "You cannot delete this post.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        await deletePost(post.id);
        showToast("success", "Xóa bài viết thành công!");
        fetchPostsAndCategories();
      } catch (err) {
        showToast("error", "Lỗi, không thể xóa bài viết.");
      }
    }
  };

  const handleStatusChange = async (post: Post, newStatus: "Public" | "Private") => {
    if (currentUser?.id !== post.userId) {
      showToast("error", "Bạn không có quyền sửa bài này.");
      fetchPostsAndCategories();
      return;
    }
    try {
      await updatePost(post.id, { status: newStatus });
      showToast("success", "Cập nhật trạng thái thành công.");
      fetchPostsAndCategories();
    } catch (err) {
      showToast("error", "Lỗi, không thể cập nhật.");
    }
  };


  return (
    <div className="main-content flex-grow-1">
      <div className={styles.postsContainer}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className={styles.pageTitle}>Quản lý bài viết</h1>
          <button
            type="button"
            className={styles.addButton}
            data-bs-toggle="modal"
            data-bs-target="#addArticleModal"
            onClick={() => handleShowModal(null)}
          >
            + Thêm mới bài viết
          </button>
        </div>

        <table className={`table ${styles.tableWrapper}`}>
          <thead>
            <tr>
              <th scope="col">Ảnh</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Chủ đề</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chỉnh sửa trạng thái</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7} className="text-center">Đang tải...</td></tr>
            ) : error ? (
              <tr><td colSpan={7} className="text-center text-danger">{error}</td></tr>
            ) : posts.map((post) => {
              const isOwner = currentUser?.id === post.userId;
              
              return (
                <tr key={post.id}>
                  <td><img src={post.pictureUrl} alt={post.title} width="100" height="70" style={{objectFit: 'cover'}} /></td>
                  <td>{post.title}</td>
                  <td>{post.category?.name}</td>
                  <td>{post.content.substring(0, 30)}...</td>
                  <td>{post.status}</td>
                  <td>
                    <select 
                      className="form-select" 
                      value={post.status}
                      disabled={!isOwner}
                      onChange={(e) => handleStatusChange(post, e.target.value as "Public" | "Private")}
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-warning me-2"
                      disabled={!isOwner}
                      data-bs-toggle="modal"
                      data-bs-target="#addArticleModal"
                      onClick={() => handleShowModal(post)}
                    >
                      Sửa
                    </button>
                    <button 
                      className="btn btn-danger"
                      disabled={!isOwner}
                      onClick={() => handleDelete(post)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

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
      </div>

      <div className="modal fade" id="addArticleModal" tabIndex={-1} aria-labelledby="addArticleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addArticleModalLabel">
                {editingPost ? "📝 Edit Article" : "📝 Add New Article"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    placeholder="Enter title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="categories" className="form-label">Article Categories</label>
                  <select 
                    className="form-select" 
                    id="categories"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                  >
                    <option value="">Chọn chủ đề</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="mood" className="form-label">Mood</label>
                  <input type="text" className="form-control" id="mood" defaultValue="Happy" readOnly />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea 
                    className="form-control" 
                    id="content" 
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="status" 
                        id="public" 
                        value="Public" 
                        checked={status === 'Public'}
                        onChange={() => setStatus('Public')}
                      />
                      <label className="form-check-label" htmlFor="public">Public</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="status" 
                        id="private" 
                        value="Private" 
                        checked={status === 'Private'}
                        onChange={() => setStatus('Private')}
                      />
                      <label className="form-check-label" htmlFor="private">Private</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="fileUpload" className="form-label">File Upload</label>
                  <div className="custom-file-upload text-center border p-3 rounded">
                    {previewImage && (
                       <img 
                         src={previewImage} 
                         alt="Preview" 
                         className="img-thumbnail d-block mb-2 mx-auto" 
                         style={{ maxWidth: '200px', maxHeight: '200px' }} 
                       />
                    )}
                    <p>Browse and choose the files you want to upload from your computer</p>
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      onChange={handleImageChange}
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary mt-2" 
                      onClick={handleBrowseClick}
                    >
                      Browse
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                ref={modalCloseBtnRef}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-success" 
                onClick={handleSave}
              >
                {editingPost ? 'Save Changes' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPost;