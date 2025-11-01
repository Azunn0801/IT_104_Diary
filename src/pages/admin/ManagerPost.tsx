import React, { useRef } from "react";
import styles from "./ManagerPost.module.css";

const ManagerPost: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Main Content */}
      <div className={styles.postsContainer}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className={styles.pageTitle}>Quản lý bài viết</h1>
          <button
            type="button"
            className={styles.addButton}
            data-bs-toggle="modal"
            data-bs-target="#addArticleModal"
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
            <tr>
              <td><img src="../assets/images/thumbnail1.jpg" alt="" width="100" height="70" /></td>
              <td>Học nấu cá sốt cà chua</td>
              <td>Nấu ăn</td>
              <td>tôi đã học được cách nấu ăn...</td>
              <td>Public</td>
              <td>
                <select className="form-select">
                  <option value="public" selected>Public</option>
                  <option value="private">Private</option>
                </select>
              </td>
              <td>
                <button className="btn btn-warning me-2">Sửa</button>
                <button className="btn btn-danger">Xóa</button>
              </td>
            </tr>
            <tr>
              <td><img src="../assets/images/thumbnail2.jpg" alt="" width="100" height="70" /></td>
              <td>Bí kíp viết CV ngành IT</td>
              <td>IT</td>
              <td>Chia sẻ cách viết CV ấn tượng...</td>
              <td>Private</td>
              <td>
                <select className="form-select">
                  <option value="public">Public</option>
                  <option value="private" selected>Private</option>
                </select>
              </td>
              <td>
                <button className="btn btn-warning me-2">Sửa</button>
                <button className="btn btn-danger">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>

      {/* Add Article Modal */}
      <div className="modal fade" id="addArticleModal" tabIndex={-1} aria-labelledby="addArticleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addArticleModalLabel">📝 Add New Article</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" placeholder="Enter title" />
                </div>

                <div className="mb-3">
                  <label htmlFor="categories" className="form-label">Article Categories</label>
                  <select className="form-select" id="categories">
                    <option value="">Chọn chủ đề</option>
                    <option value="IT">IT</option>
                    <option value="Nấu ăn">Nấu ăn</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="mood" className="form-label">Mood</label>
                  <input type="text" className="form-control" id="mood" defaultValue="Happy" readOnly />
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea className="form-control" id="content" rows={5}></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="status" id="public" value="public" />
                      <label className="form-check-label" htmlFor="public">Public</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="status" id="private" value="private" />
                      <label className="form-check-label" htmlFor="private">Private</label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="fileUpload" className="form-label">File Upload</label>
                  <div className="custom-file-upload text-center border p-3 rounded">
                    <p>Browse and choose the files you want to upload from your computer</p>
                    <input ref={fileInputRef} type="file" accept="image/*" hidden />
                    <button type="button" className="btn btn-secondary mt-2" onClick={handleBrowseClick}>
                      Browse
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Add</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerPost;