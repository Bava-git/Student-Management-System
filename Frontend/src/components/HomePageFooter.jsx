import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Homepage() {

  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        // console.log("Escape key pressed!");
        // Perform your desired action here
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>MR International School</span></h1>
          <p>Empowering Excellence, Inspiring Futures</p>
          <a href="#admissions" className="cta-button">Apply Now</a>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="stat-box">
          <h2>📍 18 States</h2>
          <p>Expanding across the nation</p>
        </div>
        <div className="stat-box">
          <h2>🏫 528 Schools</h2>
          <p>Providing quality education</p>
        </div>
        <div className="stat-box">
          <h2>👨‍🏫 22,306 Staff</h2>
          <p>Dedicated educators</p>
        </div>
        <div className="stat-box">
          <h2>🎓 680,869 Students</h2>
          <p>Shaping future leaders</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>🏫 About Our School</h2>
        <p>Founded in 2025, <strong>MR International School</strong> is committed to academic excellence, innovation, and character development.</p>
        <ul>
          <li><strong>Affiliated to:</strong> IGCSE</li>
          <li><strong>Grades Offered:</strong> Pre-KG to Grade 12</li>
          <li><strong>Core Values:</strong> Integrity, Knowledge, Leadership</li>
        </ul>
      </section>

      {/* Academics Section */}
      <section className="academics">
        <h2>📖 Academics & Learning</h2>
        <p>Our curriculum integrates **modern learning techniques** with **traditional values** to create a balanced education system.</p>
        <ul>
          <li>✅ Well-Structured Subjects: Mathematics, Science, Humanities, Languages, Technology</li>
          <li>✅ Smart Classrooms & Interactive Lessons</li>
          <li>✅ Experienced Faculty & Hands-On Learning Approach</li>
        </ul>
      </section>


      {/* Results & Achievements */}
      <section className="results">
        <h2>🏆 Academic Excellence</h2>
        <p>We take pride in our students' outstanding performances in academics and extracurricular achievements.</p>
        <ul>
          <li><strong>Board Exam Results:</strong> 98% pass percentage</li>
          <li><strong>Top Performers:</strong> Mohamed 98.5%</li>
          <li><strong>Competitions:</strong> Olympiads, Science Fairs, Sports Championships</li>
        </ul>
        <p>📢 <strong>Latest Results:</strong> Check your scores <a href="#">here</a>!</p>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="admissions">
        <h2 className="admissions_h2">📢 Admissions Open!</h2>
        <p>🚀 Join <strong>MR International School</strong> today for a transformative learning journey!</p>
        <ul>
          <li><strong>Admission Process:</strong> Online application & campus visit</li>
          <li><strong>Eligibility:</strong> Age between 3 to 18</li>
          <li><strong>Scholarships Available:</strong> Merit-based awards</li>
        </ul>
        <a href="#" className="cta-button">Apply Now</a>
      </section>

      {/* Facilities Section */}
      <section className="facilities">
        <h2>🏫 Campus & Facilities</h2>
        <p>We provide a **state-of-the-art learning environment** designed for student success.</p>
        <ul>
          <li>🎓 Smart Classrooms with Digital Boards</li>
          <li>📚 Extensive Library & Research Labs</li>
          <li>⚽ Sports Grounds & Athletic Training</li>
          <li>🚌 Secure School Transport Services</li>
        </ul>
      </section>

      {/* Events & Activities */}
      <section className="events">
        <h2>📅 Student Life & Activities</h2>
        <p>Engaging students beyond academics through **extracurricular events**.</p>
        <ul>
          <li>🎭 Annual Day Celebration</li>
          <li>🏅 Inter-School Competitions</li>
          <li>🎓 Career Counseling Workshops</li>
          <li>🌍 Educational Field Trips</li>
        </ul>
        <p>📌 <strong>Upcoming Event:</strong> Sports day on 09-Jun! Register now.</p>
      </section>

      <section className="footer" id="footer">
        <h3>🌐 Connect With Us</h3>
        <p>📍 <strong>Address:</strong> 123, MR road, India</p>
        <p>📞 <strong>Contact:</strong> 9988776655</p>
        <p>✉ <strong>Email:</strong> contactmrschool@mrschools.com</p>
        <p>🔗 <strong>Website:</strong> <a href="#">www.mrschools.com</a></p>
        <p>📱 Follow Us: <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a></p>
      </section>
    </div>
  );
}

const Footer = () => {
  const [loading, setLoading] = useState(true); // State to track loading

  return (
    <div className="footer">
      <h2>🌐 Connect With Us</h2>
      <p>📍 <strong>Address:</strong> 123, MR road, India</p>
      <p>📞 <strong>Contact:</strong> 9988776655</p>
      <p>✉ <strong>Email:</strong> contactmrschool@mrschools.com</p>
      <p>🔗 <strong>Website:</strong> <a href="#">www.mrschools.com</a></p>
      <p>📱 Follow Us: <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a></p>
    </div>
  )
}

export { Homepage };