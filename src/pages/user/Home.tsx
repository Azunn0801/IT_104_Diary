import React from 'react';
// QUAN TRỌNG: Khi bạn dùng React Router, hãy import Link
import { Link } from 'react-router-dom';
import './Home.module.css'

function Home() {
  return (
    <>
      <main className="container my-5">
        <section className="recent-posts">
          <h2 className="text-center mb-4">Recent blog posts</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <img src="https://placehold.co/600x400" className="card-img-top" alt="Post image" />
                <div className="card-body">
                  <p className="card-text text-muted small">Date: 2023-02-25</p>
                  <h5 className="card-title">A Productive Day at Work</h5>
                  <p className="card-text">Today was a really productive day at work. I managed to finish a report
                    ahead of schedule and received positive feedback from my manager.</p>
                  <a href="#" className="btn btn-primary">Read more</a>
                  <span className="badge bg-success">Daily Journal</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <img src="https://placehold.co/600x400" className="card-img-top" alt="Post image" />
                <div className="card-body">
                  <p className="card-text text-muted small">Date: 2023-02-24</p>
                  <h5 className="card-title">My First Job Interview Experience</h5>
                  <p className="card-text">I had my first job interview today. I was nervous at first, but as the
                    conversation went on, I felt more confident.</p>
                  <a href="#" className="btn btn-primary">Read more</a>
                  <span className="badge bg-primary">Work & Career</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center my-4">
          {/* Sửa đổi: Dùng <Link> thay cho <a> */}
          <a href="./pages/article_manager.html" style={{ textDecoration: 'none', color: 'white' }}>
            <button className="btn btn-danger">ADD NEW ARTICLE</button>
          </a>
          {/* Ví dụ:
          <Link to="/admin/manage-articles" style={{ textDecoration: 'none', color: 'white' }}>
            <button className="btn btn-danger">ADD NEW ARTICLE</button>
          </Link>
          */}
        </div>

        <section className="all-posts">
          <h2 className="mb-4"><small>Daily Journal Work & Career Personal Thoughts Emotions &
            Feelings</small></h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <img src="https://placehold.co/600x400" className="card-img-top" alt="Post image" />
                <div className="card-body">
                  <p className="card-text text-muted small">Date: 2023-02-23</p>
                  <h5 className="card-title">Overthinking Everything</h5>
                  <p className="card-text">Lately, I have been overthinking everything, from small decisions to
                    bigger life choices. I know I should trust myself!</p>
                  <a href="#" className="btn btn-primary">Read more</a>
                  <span className="badge bg-info">Personal Thoughts</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <img src="https://placehold.co/600x400" className="card-img-top" alt="Post image" />
                <div className="card-body">
                  <p className="card-text text-muted small">Date: 2023-02-16</p>
                  <h5 className="card-title">How collaboration makes us better designers</h5>
                  <p className="card-text">Collaboration can make our teams stronger, and our individual designs
                    better.</p>
                  <a href="#" className="btn btn-primary">Read more</a>
                  <span className="badge bg-primary">Work & Career</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <img src="https://placehold.co/600x400" className="card-img-top" alt="Post image" />
                <div className="card-body">
                  <p className="card-text text-muted small">Date: 2023-02-15</p>
                  <h5 className="card-title">Our top 10 JavaScript frameworks to use</h5>
                  <p className="card-text">JavaScript frameworks make development easy with extensive features and
                    functionalities.</p>
                  <a href="#" className="btn btn-primary">Read more</a>
                  <span className="badge bg-primary">Work & Career</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <img src="https://placehold.co/600x400" className="card-img-top" alt="Post image" />
                <div className="card-body">
                  <p className="card-text text-muted small">Date: 2023-02-05</p>
                  <h5 className="card-title">Podcast: Creating a better CX Community</h5>
                  <p className="card-text">Starting a community doesn’t need to be complicated, but how do you get
                    started?</p>
                  <a href="#" className="btn btn-primary">Read more</a>
                  <span className="badge bg-warning">Emotions & Feelings</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </main>

      {/* Footer */}
      <footer className="footer bg-light">
        <div className="container footer-content">
          <div className="footer-col footer-logo">
            <h4 className="site-logo">MY BLOG</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum aliquet accumsan porta lectus
              ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="list-unstyled">
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul className="list-unstyled">
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="list-unstyled">
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Development Tutorial</a></li>
              <li><a href="#">How to - Blog</a></li>
              <li><a href="#">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-social text-center mt-3">
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