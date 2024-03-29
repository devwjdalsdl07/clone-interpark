/**
 * 작성자 : 홍길동
 * 연락처 : aaa@aaa.net;
 * 작성일 : 23-05-22
 * 기능 : 쇼핑몰 리스트 슬라이드 코드
 * 업데이트 : 각 쇼핑몰 리스트 목록 출력 함수화 작업
 */

window.addEventListener("load", function () {
  // book 데이터 파싱 및 슬라이드 제작
  function parseBooks(_menu) {
    const booksXhttp = new XMLHttpRequest();
    booksXhttp.onreadystatechange = function (event) {
      const req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeBooksSlide(data);
      }
    };

    if (_menu === "MD's Pick") {
      booksXhttp.open("GET", "data/booksdata.json");
    } else if (_cate === "베스트셀러") {
      booksXhttp.open("GET", "data/booksdata1.json");
    } else if (_cate === "신간추천") {
      booksXhttp.open("GET", "data/booksdata2.json");
    } else if (_cate === "특가할인") {
      booksXhttp.open("GET", "data/booksdata3.json");
    }

    booksXhttp.send();
    // html 을 만들어서
    // slide 를 만들어준다.
  }
  parseBooks("MD's Pick");

  let booksSwiper;
  function makeBooksSlide(_data) {
    let swBooksHtml = ``;
    for (let i = 0; i < _data.books_total; i++) {
      let obj = _data[`books_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
                    <a href="${obj.link}" class="books-link">
                      <div class="books-img">
                        <img src="images/${obj.pic}" alt="${obj.alt}" />
                      </div>
                      <div class="books-info">
                        <p class="books-info-title">${obj.title}</p>
                        <p class="books-info-price"><em>${obj.price}</em>원</p>
                      </div>
                    </a>
                  </div>
      `;
      swBooksHtml += temp;
    }

    let swBookswrapper = document.querySelector(".sw-books .swiper-wrapper");
    swBookswrapper.innerHTML = swBooksHtml;

    //   swiper 슬라이더는 만들기 전에 삭제하자.
    if (booksSwiper) {
      booksSwiper.destroy();
    }

    booksSwiper = new Swiper(".sw-books", {
      slidesPerView: 3,
      grid: {
        rows: 4,
        fill: "row",
      },
      spaceBetween: 19,
      navigation: {
        nextEl: ".books .sw-next",
        prevEl: ".books .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 27,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }
  // 버튼 클릭시 카테고리 변경
  // 대상이 1개인 경우는 querySelector
  // 대상이 여러개이면 querySelectorAll
  // a태그가 4개이므로 querySelectorAll
  let btns = document.querySelectorAll(".books .btns a");
  btns[0].onclick = function (event) {
    event.preventDefault();
    parseBooks("MD's Pick");
  };
  btns[1].onclick = function (event) {
    event.preventDefault();
    parseBooks("베스트셀러");
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    parseBooks("신간추천");
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    parseBooks("특가할인");
  };
});
