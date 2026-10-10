import SingleFileUploader from "../SingleFileUploader/SingleFileUploader";

const Home = () => {
  return (
    <div className="home">
      <section className="home-intro">
        <div className="eyebrow"><span /> SESSION DATA / OVERVIEW</div>
      </section>
      <SingleFileUploader />
    </div>
  )
};

export default Home;