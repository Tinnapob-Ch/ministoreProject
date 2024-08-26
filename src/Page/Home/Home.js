import Reccommended from "../../components/Reccommended/Reccommended";
import "./Home.css";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <section className="card-container-home">
        <img
          src="https://shorturl.asia/v6lJS"
          alt="shoe"
          className="card-image-rec"
        />
        <button className="button-buy">
        <Link to="/store" style={{ color: 'your_color_here' }}>BUY NOW</Link>
        </button>
      </section>
      <h1 className="home-title">Campaign</h1>
      <section className="card-container-home">
        <img
          src="https://shorturl.asia/8qf5F"
          alt="shoe"
          className="card-image-rec"
        />
      </section>
      <Reccommended/>
    </>
  );
}
export default Home;
