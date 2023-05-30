window.addEventListener("load", function () {
  // live Swiper
  let liveData;

  this.fetch("data/livedata.json")
    .then((res) => res.json())
    .then((result) => makeLiveSlide(result))
    .catch((err) => console.log(err));

  function makeLiveSlide(_data) {
    liveData = _data;
    let swLiveHtml = ``;
    for (i = 0; i < liveData.live_count; i++) {
      let obj = liveData[`live_${i + 1}`];
      let temp = `
          <div class="swiper-slide">
            <a href="${obj.link}" class="live-link">
              <div class="live-img">
                <img src="images/${obj.pic}" alt="${obj.alt}" />
              </div>
              <div class="live-info">
                <div class="live-info-top">
                  <span class="live-info-cate">${obj.category}</span>
                  <p class="live-info-title">${obj.title}</p></p>
                </div>
                <div class="live-info-main">
                  <p class="live-info-date">${obj.date}</p>
                  <p class="live-info-time">${obj.time}</p>
                </div>
                <div class="live-info-bottom clearfix">
                  <div class="live-info-thumb" ${
                    obj.thumbImg
                      ? "style='display:block'"
                      : "style='display:none'"
                  }>
                    <img src="images/${obj.thumbImg}" alt="${obj.thumbAlt}" />
                  </div>
                  <div class="live-info-desc" ${
                    obj.descTitle
                      ? "style='display:block'"
                      : "style='display:none'"
                  }>
                    <p class="live-info-desc-title">
                      ${obj.descTitle}
                    </p>
                    <p class="live-info-desc-price" ${
                      obj.ratio
                        ? "style='display:block'"
                        : "style='display:none'"
                    }>
                      <em>${obj.ratio}%</em><b>${obj.price}</b>원
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
      swLiveHtml += temp;
    }

    let swLiveWrapper = document.querySelector(".sw-live .swiper-wrapper");
    swLiveWrapper.innerHTML = swLiveHtml;

    let liveSwiper = new Swiper(".sw-live", {
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: ".live .sw-next",
        prevEl: ".live .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }
});
