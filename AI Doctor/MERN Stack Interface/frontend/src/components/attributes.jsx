export default function attributes() {
  function handleEnter(e) {
    let value = e.target.children[1].classList.value;
    let heading = e.target.children[0];
    let desc = document.querySelector(`.${value}`);
    desc.style.transition = "transform 1s ease-out ";
    desc.style.transform = "translateY(30px)";
    heading.style.transition = "color 1s ease ,transform 1s ease-out ";
    heading.style.transform = "translateY(-260px)";
    heading.style.color = "white";
  }
  function handleLeave(e) {
    let value = e.target.children[1].classList.value;
    let heading = e.target.children[0];
    let desc = document.querySelector(`.${value}`);
    desc.style.transform = "translateY(500px)";
    heading.style.transform = "translateY(5px)";
    heading.style.color = "#000080";
  }
  return (
    <section className="ai-doctor-attributes">
      <div className="grid-attributes">
        <div className="attr first">
          <div
            className="attr-content"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <h2 className="attr-heading">Accessibility</h2>
            <div className="description">
              <p>
                AI DOCTOR is designed for efficiency, enabling seamless
                operation on devices with limited computational power. This
                ensures widespread accessibility, even on low-end technology
                platforms.
              </p>
            </div>
          </div>
        </div>
        <div className="attr second">
          <div
            className="attr-content"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <h2 className="attr-heading">Reliability</h2>
            <div className="second-description">
              <p>
                AI DOCTOR is powered by a machine learning model that has
                undergone rigorous testing, ensuring reliable and accurate
                diagnoses across a wide range of medical conditions.
              </p>
            </div>
          </div>
        </div>
        <div className="attr third">
          <div
            className="attr-content"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <h2 className="attr-heading">Efficiency</h2>
            <div className="third-description">
              <p>
                AI DOCTOR utilizes advanced algorithms to deliver swift and
                precise medical diagnoses, significantly reducing wait times and
                improving the efficiency of healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
