import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section className={`${styles["page-not-found"]}`}>
      <h1 style={{ margin: "10px" }}>Vart är du på väg?</h1>
      <button onClick={() => navigate(-1)}>Åk tillbaka</button>
    </section>
  );
}

export default PageNotFound;
