/**
 * 작성자 : 홍길동
 * 연락처 : aaa@aaa.net;
 * 작성일 : 23-05-22
 * 기능 : 쇼핑몰 리스트 슬라이드 코드
 * 업데이트 : 각 쇼핑몰 리스트 목록 출력 함수화 작업
 */

window.addEventListener("load", function () {
  // Ticket Swiper
  function parseTicket(_menu) {
    // 전달된 매개변수 _menu 에 따라서
    // 관련된 json 데이터를 불러들이고,
    if (_menu === "뮤지컬") {
      // xhr.open("GET", "data/ticketdata.json");
      fetch("data/ticketdata.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "콘서트") {
      // xhr.open("GET", "data/ticketdata1.json");
      fetch("data/ticketdata1.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "연극") {
      // xhr.open("GET", "data/ticketdata2.json");
      fetch("data/ticketdata2.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "클래식/무용") {
      // xhr.open("GET", "data/ticketdata3.json");
      fetch("data/ticketdata3.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "스포츠") {
      // xhr.open("GET", "data/sports.json");
      fetch("data/sports.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "레저/캠핑") {
      // xhr.open("GET", "data/ticketdata5.json");
      fetch("data/ticketdata5.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "전시/행사") {
      // xhr.open("GET", "data/ticketdata6.json");
      fetch("data/ticketdata6.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "아동/가족") {
      // xhr.open("GET", "data/ticketdata7.json");
      fetch("data/ticketdata7.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    }

    // html 을 만들어서
    // slide 를 만들어준다.
  }
  parseTicket("뮤지컬");

  //   swiper 슬라이더는 만들기 전에 삭제하자.
  let ticketSwiper;
  function makeTicketSlide(_data) {
    swticketHtml = ``;
    for (let i = 0; i < _data.ticket_total; i++) {
      let obj = _data[`ticket_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="ticket-link">
          <div class="ticket-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
            <span class="ticket-rank">${obj.rank}</span>
          </div>
          <div class="ticket-info">
            <ul class="ticket-info-list">
              <li>
                <span class="ticket-title"
                  ><b>${obj.title}</b></span
                >
              </li>
              <li>
                <span class="ticket-hall">${obj.place}</span>
              </li>
              <li>
                <span class="ticket-date"
                  >${obj.date}</span
                >
              </li>
              <li>
                <span class="ticket-sale">${obj.sale}</span>
              </li>
            </ul>
          </div>
        </a>
      </div>
    `;

      swticketHtml += temp;
    }
    let swticketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swticketWrapper.innerHTML = swticketHtml;

    // 새로 생성 전에 swiper API 를 이용해서 삭제한다.
    if (ticketSwiper) {
      ticketSwiper.destroy();
    }

    ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
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
  // 버튼 클릭시 카테고리 변경
  // 대상이 1개인 경우는 querySelector
  // 대상이 여러개이면 querySelectorAll
  // a태그가 4개이므로 querySelectorAll
  const btns = document.querySelectorAll(".ticket .btns a");
  let cateName = [
    "뮤지컬",
    "콘서트",
    "연극",
    "클래식/무용",
    "스포츠",
    "레저/캠핑",
    "전시/행사",
    "아동/가족",
  ];
  for (let i = 0; i < cateName.length; i++) {
    btns[i].onclick = function (event) {
      event.preventDefault();
      parseTicket(cateName[i]);
      for (let j = 0; j < btns.length; j++) {
        btns[j].classList.remove("btns-active");
      }
      // 포커스 적용
      this.classList.add("btns-active");
    };
  }
  // 포커스 적용
  btns[0].classList.add("btns-active");

  // btns[0].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("뮤지컬");
  // };
  // btns[1].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("콘서트");
  // };
  // btns[2].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("연극");
  // };
  // btns[3].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("클래식/무용");
  // };
  // btns[4].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("스포츠");
  // };
  // btns[5].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("레저/캠핑");
  // };
  // btns[6].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("전시/행사");
  // };
  // btns[7].onclick = function (event) {
  //   // a 태그의 기본 동작인 href를 막는다.
  //   event.preventDefault();
  //   parseTicket("아동/가족");
  // };
});
