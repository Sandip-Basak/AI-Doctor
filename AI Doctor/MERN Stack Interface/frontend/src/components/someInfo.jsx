import logo from '../../public/logo.png'
import stheto from '../../public/stheto.png'

export default function someinfo() {
  return (
    <section className="site-introduction">
      <div className="site-introduction-container">
        <div className="ai-doctor-intro-info">
          <div className="ai-doctor-info">
            <h2>Empowering Doctors to Reach Beyond Boundaries.</h2>
          </div>
          <div className="ai-doctor-fact">
            <p>
              Roughly half the world lacks essential healthcare, with 70%
              residing in rural areas, exacerbating morbidity and mortality
              rates due to limited access.
            </p>
          </div>
          <div className="ai-doctor-service-types">
            <div className="item">
              <div className="ai-doctor-service-icon">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div className="ai-doctor-service-text">
                <p>Mental traumas</p>
              </div>
            </div>
            <div className="item">
              <div className="ai-doctor-service-icon">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div className="ai-doctor-service-text">
                <p>Heart diseases</p>
              </div>
            </div>
            <div className="item">
              <div className="ai-doctor-service-icon">
                <i class="fa fa-light fa-capsules"></i>
              </div>
              <div className="ai-doctor-service-text">
                <p>Detailed  Prescription</p>
              </div>
            </div>
            <div className="item">
              <div className="ai-doctor-service-icon">
                <i class="fa-solid fa-bacterium"></i>
              </div>
              <div className="ai-doctor-service-text">
                <p>Bacterial diseases</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-doctor-medicine">
          <div className="ai-doctor-solution">
            <h2>AI Doctor: Pioneering hope in rural areas.</h2>
          </div>
          <div className="ai-doctor-solution-fact">
            <p>
              AI's impact on healthcare is profound, with studies showing up to
              a 50% reduction in medical errors and a 30% increase in treatment
              efficiency, revolutionizing patient care worldwide.
            </p>
          </div>
          <div className="ai-doctor-solution-logo">
            <img className="cross" src={logo}></img>
            <img className="stheto" src={stheto}></img>
          </div>
        </div>
      </div>
    </section>
  );
}
