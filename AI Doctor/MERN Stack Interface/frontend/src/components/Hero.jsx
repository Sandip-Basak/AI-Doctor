import { Link } from "react-router-dom";
import "../App.css";

export default function Hero() {

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-section-info">
          <div className="hero-info">
            <span className="info">
              Empowering Your Health
              <br />
              Through Cutting-Edge. Artificial
              <br />
              Intelligence.
            </span>
            <p className="details">
              Discover AI Doctor: Your AI-powered healthcare companion for
              precise diagnoses and personalized treatment recommendations,
              revolutionizing the way you prioritize your well-being.
            </p>
            <Link to='/login'><button className="gettingIn">Get Diagnosed</button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
