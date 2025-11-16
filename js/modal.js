document.addEventListener("DOMContentLoaded", () => {
  const noticeItems = document.querySelectorAll(".notice-item");
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".close");
  const closeButton = document.querySelector(".closeBtn button");
  const noMoreCheckbox = document.querySelector(".noMore");

  const passwordInput = document.getElementById("userPW");
  const toggleButton = document.querySelector(".toggle-password");
  const toggleButtonImg = toggleButton.querySelector("img");

  // 2. 토글 버튼에 클릭 이벤트를 추가합니다.
  toggleButton.addEventListener("click", function () {
    // 3. 현재 input의 type을 확인합니다.
    const currentType = passwordInput.getAttribute("type");

    // 4. type을 전환합니다.
    if (currentType === "password") {
      // 현재 password이면 text로 변경하여 비밀번호를 보이게 합니다.
      passwordInput.setAttribute("type", "text");
      toggleButtonImg.src = "./images/preview_off.svg"
      

      // *추가: 아이콘도 변경하려면 여기에 로직을 추가하세요.
      // 예: this.querySelector('img').src = './images/hide_icon.svg';
    } else {
      // 현재 text이면 password로 변경하여 비밀번호를 숨깁니다.
      passwordInput.setAttribute("type", "password");
      toggleButtonImg.src = "./images/preview_icon.svg"

      // *추가: 아이콘도 변경하려면 여기에 로직을 추가하세요.
      // 예: this.querySelector('img').src = './images/preview_icon.svg';
    }
  });

  // 각 공지사항 항목에 클릭 이벤트 추가
  noticeItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // 오늘 하루 열지 않기가 체크되어 있는지 확인
      const dontShowToday = localStorage.getItem("dontShowModalToday");
      const today = new Date().toDateString();

      if (dontShowToday === today) {
        return; // 오늘은 모달을 띄우지 않음
      }

      modal.classList.add("active");
    });
  });

  // X 버튼으로 모달 닫기
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // 닫기 버튼으로 모달 닫기
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");

    // "오늘 하루 열지 않기" 체크 확인
    if (noMoreCheckbox.checked) {
      const today = new Date().toDateString();
      localStorage.setItem("dontShowModalToday", today);
    }
  });

  // 모달 외부 클릭시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });
});
