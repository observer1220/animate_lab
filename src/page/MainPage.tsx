import { Parallax, NoiseEffect } from "../components/animations/D_banner";

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

        <NoiseEffect />

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
      <div className="page-layout__route-transition">
        <svg
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            id="wave"
            fill="#40587c"
            d="M35 302.997C76.5 292.764 122 320.497 163.5 315.497C183.5 313.088 207 302.997 300 320.497V328.886C300 332.847 297.851 336.058 295.2 336.058H4.8C2.149 336.058 0 332.847 0 328.886V315.497C12 308.997 17 307.435 35 302.997Z"
          ></path>
        </svg>
        <svg
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path id="rect" fill="#40587C" d="M0 300h300v-0H0z" />
        </svg>
        <div className="page-layout__route-transition-loading">
          <img src="./src/assets/img/loading.svg" alt="loading" />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
