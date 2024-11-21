import { Link } from "react-router-dom";
import plus from "../../public/plus.png";
import syringe from "../../public/syringe.png";
import vecStheto from "../../public/vector-stheto.png";

export default function researchBacked() {
  return (
    <section className="research-section">
      <div className="research-section-container">
        <div className="research-text">
          <h1 className="research-info">Backed by Research</h1>
        </div>
        <div className="research-additional-info">
          <p>
            AI doctor is not some random weekend project. It is backed by
            research and is fine-tuned for optimal results through rigorous testing with
            cutting edge technology.
          </p>
        </div>
        <div className="research-paper">
          <Link href="https://stackoverflow.com/questions/33434853/html-open-local-pdf-in-a-new-window-using-a-button"  className="research-paper-button">Read Research</Link>
        </div>

        <span className="picTwo">
          <img className="two" src={syringe} />
        </span>
        <span className="picThree">
          <img className="three" src={vecStheto} />
        </span>
      </div>
    </section>
  );
}
