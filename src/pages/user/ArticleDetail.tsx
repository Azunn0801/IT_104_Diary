import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPostById } from '../../services/postService';
import { createComment } from '../../services/commentService';
import { Post } from '../../types/Post';
import { Comment as CommentType, NewCommentData } from '../../types/Comment';

import './ArticleDetail.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MOCK_CURRENT_USER_ID = 1; 

type CommentItemProps = {
  comment: CommentType;
  allComments: CommentType[];
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, allComments }) => {
  const replies = allComments.filter(c => c.parentId === comment.id);

  return (
    <div className="comment-thread mb-3">
      <div className="comment d-flex align-items-start">
        <img
          src={comment.user?.avatarUrl || '../assets/images/user.png'}
          alt={comment.user?.fullName}
          className="rounded-circle me-3"
          width="40"
          height="40"
        />
        <div className="comment-body p-3 rounded bg-light w-100">
          <strong>{comment.user?.fullName || 'Anonymous'}</strong>
          <p className="mb-1">{comment.content}</p>
          <div className="text-muted small">
            <span>{new Date(comment.date).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {replies.length > 0 && (
        <div className="replies ms-5 mt-3">
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              allComments={allComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};


function ArticleDetail() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const postData = await getPostById(Number(id));
          setPost(postData);
        } catch (err) {
          console.error(err);
          setError('Không thể tải bài viết. Vui lòng thử lại.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handlePostComment = async () => {
    if (!newCommentText.trim() || !post) return;

    const newCommentPayload: NewCommentData = {
      content: newCommentText,
      postId: post.id,
      userId: MOCK_CURRENT_USER_ID,
      date: new Date().toISOString(),
      parentId: null,
      likes: []
    };

    try {
      const savedComment = await createComment(newCommentPayload);

      setPost(prevPost => {
        if (!prevPost) return null;
        
        const updatedComments = [...(prevPost.comments || []), savedComment];
        return { ...prevPost, comments: updatedComments };
      });

      setNewCommentText("");

    } catch (err) {
      console.error("Lỗi khi đăng bình luận:", err);
      alert("Không thể đăng bình luận. Vui lòng thử lại.");
    }
  };

  const rootComments = post?.comments
    ? post.comments.filter(comment => comment.parentId === null)
    : [];

  if (isLoading) {
    return <div className="container py-4">Đang tải bài viết...</div>;
  }

  if (error) {
    return <div className="container py-4 text-danger">{error}</div>;
  }

  if (!post) {
    return <div className="container py-4">Không tìm thấy bài viết.</div>;
  }

  return (
    <div className="article-detail-page">
      <div className="container py-4">
        
        <Link to="/" className="btn btn-link mb-3">← Back</Link>

        <div className="d-flex align-items-start mb-4">
          <img 
            src={post.user?.avatarUrl || '../assets/images/user.png'} 
            alt={post.user?.fullName} 
            className="rounded-circle me-3" 
            width="50" height="50" 
          />
          <div className="article-card p-4 rounded w-100">
            <img 
              id="post-image" 
              src={post.pictureUrl} 
              alt={post.title} 
              className="img-fluid rounded mb-4"
              style={{ display: 'block', margin: '0 auto', maxHeight: '400px', objectFit: 'cover' }} 
            />

            <h2 id="post-title" className="mb-3">{post.title}</h2>
            <p id="post-content" className="mb-4">{post.content}</p>

            <div className="stats text-muted small mb-2">
              <span id="post-date">{new Date(post.date).toLocaleDateString()}</span>
              {/* Thêm `bg-secondary` để category hiển thị đẹp hơn */}
              <span id="post-category" className="badge bg-secondary ms-2">{post.category?.name}</span>
            </div>
            <div className="stats text-muted small mb-3">
              <span id="post-likes">{post.likes.length} Likes</span>
              <span id="post-comments-count" className="ms-3">{post.comments?.length || 0} Comments</span>
            </div>
          </div>
        </div>

        <a 
          href="#" 
          className="text-success small mb-3 d-inline-block" 
          onClick={(e) => {
            e.preventDefault();
            setShowComments(!showComments);
          }}
        >
          {showComments ? 'Hide comments' : 'View all comments'} 
          <i className={`bi ${showComments ? 'bi-chevron-up' : 'bi-chevron-down'} ms-1`}></i>
        </a>

        {showComments && (
          <div id="comments-container">
            {rootComments.length > 0 
              ? rootComments.map(comment => (
                  <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    allComments={post.comments || []}
                  />
                )) 
              : <p>Chưa có bình luận nào.</p>
            }
          </div>
        )}

        <div className="comment-box mt-4">
          <textarea 
            id="newCommentText" 
            className="form-control mb-2" 
            rows="3" 
            placeholder="Viết bình luận..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          ></textarea>
          <button 
            id="postCommentBtn" 
            className="btn btn-primary"
            onClick={handlePostComment}
            disabled={!newCommentText.trim()}
          >
            Đăng bình luận
          </button>
        </div>

      </div>
    </div>
  );
}

export default ArticleDetail;