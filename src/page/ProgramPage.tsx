import ScrollAnimation from "../components/animations/rolling/ScrollAnimation";

const ProgramPage = () => {
  return (
    <div className="page-program" data-route="program">
      <div className="container">
        <div className="page-program__title">
          <p>前港音樂祭 ─ 節目表</p>
        </div>
        <ScrollAnimation animationMode="fadeside">
          <div className="page-program__cards">
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="-25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="10"
            >
              <p className="m-program-card__title">好樂團</p>
              <p className="m-program-card__title-en">GoodBand</p>
              <p className="m-program-card__desc">
                好樂團是由主唱許瓊文及吉他手張子慶所組成的臺灣音樂組合，以單曲《我把我的青春給你》獲得廣大好評。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>10:00-10:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="-10"
              data-scroll-origin="right top"
              data-scroll-delay="0.15"
            >
              <p className="m-program-card__title">拍謝少年</p>
              <p className="m-program-card__title-en">Sorry Youth</p>
              <p className="m-program-card__desc">
                初期創作以樂器演奏為主，現在心繫台語搖滾，目標寫出阿公阿嫲點頭稱讚的台語金曲，拎著啤酒樂器穿梭於南北縱貫現場，音樂靈魂來自現場表演氣味。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>11:00-11:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="-25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="10"
            >
              <p className="m-program-card__title">美秀集團</p>
              <p className="m-program-card__title-en">AMAZING SHOW</p>
              <p className="m-program-card__desc">
                美秀集團是台灣嘉義的獨立樂團，曲風特色是帶有復古台味的搖滾和民謠，樂團採用自製樂器進行演出。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>12:00-12:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="-10"
              data-scroll-origin="right top"
              data-scroll-delay="0.15"
            >
              <p className="m-program-card__title">滅火器</p>
              <p className="m-program-card__title-en">FIRE EX.</p>
              <p className="m-program-card__desc">
                來自臺灣高雄的臺語龐克樂團，成立於2000年。創作歌曲《島嶼天光》，該作品《島嶼天光》隨後在臺灣主流音樂圈受到廣泛注目。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>13:00-13:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="-25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="10"
            >
              <p className="m-program-card__title">告五人</p>
              <p className="m-program-card__title-en">Accusefive</p>
              <p className="m-program-card__desc">
                團員為男主唱兼木吉他手潘雲安、女主唱犬青及鼓手哲謙。
                Bass老師展哥、Jason哥，還有客座吉他手豆漿哥不設限曲風的音樂風格。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>14:00-14:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="-10"
              data-scroll-origin="right top"
              data-scroll-delay="0.15"
            >
              <p className="m-program-card__title">茄子蛋</p>
              <p className="m-program-card__title-en">EggPlantEgg</p>
              <p className="m-program-card__desc">
                2012年成立於台北，由主唱兼鍵盤手阿斌、吉他手阿德及阿任組成，歌曲風格涵蓋經典搖滾、藍調、Fusion交織著街頭卡拉OK和流行金曲風格。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>15:00-15:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="-25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="10"
            >
              <p className="m-program-card__title">好樂團</p>
              <p className="m-program-card__title-en">GoodBand</p>
              <p className="m-program-card__desc">
                好樂團是由主唱許瓊文及吉他手張子慶所組成的臺灣音樂組合，以單曲《我把我的青春給你》獲得廣大好評。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>16:00-16:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="-10"
              data-scroll-origin="right top"
              data-scroll-delay="0.15"
            >
              <p className="m-program-card__title">拍謝少年</p>
              <p className="m-program-card__title-en">Sorry Youth</p>
              <p className="m-program-card__desc">
                初期創作以樂器演奏為主，現在心繫台語搖滾，目標寫出阿公阿嫲點頭稱讚的台語金曲，拎著啤酒樂器穿梭於南北縱貫現場，音樂靈魂來自現場表演氣味。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>17:00-17:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="-25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="10"
            >
              <p className="m-program-card__title">麋先生</p>
              <p className="m-program-card__title-en">MIXER</p>
              <p className="m-program-card__desc">
                由主唱吳聖皓、木吉他手林子安、電吉他手余柏羲、貝斯手張以諾、和鼓手盧逸凡所組成。麋先生淋漓暢快的曲風，搭配著如詩迷幻意識張顯的詞曲風格。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>18:00-18:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="-10"
              data-scroll-origin="right top"
              data-scroll-delay="0.15"
            >
              <p className="m-program-card__title">四分衛</p>
              <p className="m-program-card__title-en">QUARTERBACK</p>
              <p className="m-program-card__desc">
                四分衛樂團成立於1995年，團員為吉他手兼團長虎神、主唱阿山、吉他手小郭、貝斯手三太。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>19:00-19:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="-25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="10"
            >
              <p className="m-program-card__title">宇宙人</p>
              <p className="m-program-card__title-en">Cosmospeople</p>
              <p className="m-program-card__desc">
                2004年9月於玩家練團室師大店發跡，成員都是建國中學畢業生組成，隔年參加於墾丁的春天吶喊音樂祭，之後樂團開始頻繁活動，擅長用獨特的放客舞曲帶動氣氛。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>20:00-20:40</p>
              </div>
            </div>
            <div
              className="m-program-card"
              data-scroll
              data-scroll-x="25"
              data-scroll-y="50"
              data-scroll-opacity="0"
              data-scroll-ease="power1.out"
              data-scroll-duration="0.5"
              data-scroll-rotate="-10"
              data-scroll-origin="right top"
              data-scroll-delay="0.15"
            >
              <p className="m-program-card__title">甜約翰</p>
              <p className="m-program-card__title-en">Sweet John</p>
              <p className="m-program-card__desc">
                前身為Natural
                Outcome自然發聲樂團，成員包含主唱浚瑋、吉他手罐頭、貝斯手阿獎以及鼓手小J，
                於2016年與鍵盤手Mandark組成甜約翰樂團。
              </p>
              <div className="m-program-card__time">
                <span></span>
                <p>21:00-21:40</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default ProgramPage;
