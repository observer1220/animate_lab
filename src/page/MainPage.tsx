import "./MainPage.css";
import BannerComponent from "../components/animations/D_banner/BannerComponent";

const MainPage = () => {
  return (
    <main>
      <div className="page-index" data-route="index">
        <div className="m-card">
          <span className="m-card__line -left"></span>
          <span className="m-card__line -right"></span>
          <div className="m-card__main">
            <div className="m-card__title">
              <span data-text data-text-duration="1" data-text-delay="2.5">
                It was also called spiritual and work songs.
              </span>
            </div>
            <div className="m-card__desc">
              <span data-text data-text-duration="1" data-text-delay="3.5">
                由太平洋環抱的美麗島嶼，台北最大基隆河吊橋舊址，滙集了流行音樂、電子音樂、世界音樂三音現象大爆發的聽覺饗宴，在這座城市的一角留戀忘返的星球。
              </span>
            </div>
          </div>
        </div>

        <BannerComponent mode="noise" />

        <div className="m-section">
          <div className="m-section__title-en">
            <span
              data-text
              data-text-first
              data-text-duration="0.25"
              data-text-delay="2.5"
            >
              Block Studio
            </span>
          </div>
          <div className="m-section__title-en">
            <span data-text data-text-duration="0.25" data-text-delay="2.75">
              Music Festival
            </span>
          </div>
          <div className="m-section__title">
            <span data-text data-text-duration="0.5" data-text-delay="3">
              前港音樂祭
            </span>
          </div>
          <div>
            <span data-text data-text-duration="1" data-text-delay="3.5">
              Talking about music can be really simple, but it can also get
              really deep. Music, like any art, is subjective!
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
