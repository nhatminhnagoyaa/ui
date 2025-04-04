const toggleMenu = () => {
  const navigation = document.querySelector(".navigation");

  const burgerMenu = document.querySelector(".menu-icon");
  const src = burgerMenu.getAttribute("src");

  const isBurger = src === "././assets/images/images/burger-menu.svg";
  const iconName = isBurger ? "././assets/images/images/close.svg" : "././assets/images/images/burger-menu.svg";

  burgerMenu.setAttribute("src", iconName);

  if (!isBurger) {
    navigation.classList.add("navigation--mobile--fadeout");
    setTimeout(() => {
      navigation.classList.toggle("navigation--mobile");
    }, 300);
  } else {
    navigation.classList.remove("navigation--mobile--fadeout");
    navigation.classList.toggle("navigation--mobile");
  }
};

const body = document.body;
			const progressBar = document.querySelector('.progress__bar');
			console.log(progressBar)
            const updateProgress = () => {
				let scrollPos =
					(window.scrollY / (body.scrollHeight - window.innerHeight)) * 100;
                console.log(scrollPos)
                progressBar.style.width = `${scrollPos}%`;
				requestAnimationFrame(updateProgress);
			};

			updateProgress()

// Card
const likeButtons = document.querySelectorAll(".card__btn");

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__btn--like");
  });
});


// table
const stocks = [
  {
      src: './assets/images/shell.png',
      name: 'Shell plc',
      ticker: 'SHEL',
      price: 64.53,
      change: 0.45,
      marketCap: '215.6B',
      peRatio: 7.88,
      dividendYield: 4.08,
      volume: '5.2M',
  },
  {
      src: './assets/images/apple.png',
      name: 'Apple Inc',
      ticker: 'AAPL',
      price: 194.39,
      change: 0.12,
      marketCap: '2.732T',
      peRatio: 29.32,
      dividendYield: '0.54',
      volume: '42M',
  },
  {
      src: './assets/images/tesla.png',
      name: 'Tesla Inc',
      ticker: 'TSLA',
      price: 254.33,
      change: -5.08,
      marketCap: '816B',
      peRatio: 73.01,
      dividendYield: 'N/A',
      volume: '8.4M',
  },
  {
      src: './assets/images/nvidia.png',
      name: 'NVidia Corporation',
      ticker: 'NVDA',
      price: 495.22,
      change: -2.20,
      marketCap: '1.223T',
      peRatio: 65.33,
      dividendYield: '0.03',
      volume: '38M',
  },

]


let tableRowCount = document.getElementsByClassName('table-row-count');
tableRowCount[0].innerHTML = `(${stocks.length}) Stocks`;

let tableBody = document.getElementById('table-rows');

const mappedRecords = stocks
.map(
(stock) => {
  return `<tr>
  <td class="stock sticky-left">
      <div class="stock-wrapper">
          <img src="${stock.src}" alt="${stock.name}">
          <div class="stock-info">
              <span class="stock-info__ticker">
                  ${stock.ticker}
              </span>
              <span class="stock-info__name">
                  ${stock.name}
              </span>
          </div>
      </div>
  </td>
  <td>${stock.price}</td>
  <td class="price ${stock.change >= 0 ? 'up' : 'down'}">${stock.change}</td>
  <td class="price ${stock.change >= 0 ? 'up' : 'down'}">
      ${parseFloat(stock.change / stock.price * 100).toFixed(2)}
  </td>
  <td>
      ${stock.marketCap}
  </td>
  <td>
      ${stock.volume}
  </td>
  <td>
      ${stock.peRatio}
  </td>
  <td>
      ${stock.dividendYield}
  </td>
  <td class="sticky-right">
      <button class="btn btn--primary">Trade</button>
  </td>
</tr>`;
});

const tableWrapper = document.querySelector('.table-wrapper');

tableWrapper.innerHTML = DOMPurify.sanitize(`
  <table>
      <thead>
          <tr>
              <th class="sticky-left">Ticker</th>
              <th>Price [$]</th>
              <th>Change [$]</th>
              <th>Change (%)</th>
              <th>Market Cap</th>
              <th>Volume</th>
              <th>PE Ratio</th>
              <th>Dividend (%)</th>
              <th class="sticky-right"></th>
          </tr>
      </thead>
      <tbody id="table-rows">
          ${mappedRecords.join('')}
      </tbody>
      <!-- <tfoot>
              My footer
      </tfoot> -->
  </table>
`);


// Contact Form

// Hàm kiểm tra và hiển thị thông báo lỗi
function validateForm() {
    let errors = [];
    const form = document.getElementById("registrationForm");
    const requiredFields = form.querySelectorAll("[required]");
    const submitButton = document.querySelector('button[type="submit"]');
    let isValid = true;
  
    // Xóa các lỗi và làm lại kiểm tra trước khi bắt đầu
    const errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = ""; // Xóa thông báo lỗi trước khi kiểm tra
  
    requiredFields.forEach(function (input) {
      // Lấy tên trường và thêm thông báo lỗi
      const labelText = input.previousElementSibling.textContent
        .replace("必須", "")
        .trim();
      const errorMessage = "※" + labelText + " が入力されていません";
  
      // Kiểm tra nếu trường input trống
      let errorSpan = input.nextElementSibling;
      if (!input.value.trim()) {
        isValid = false;
        // Thêm thông báo lỗi
        errors.push(`<div class="error-message">${errorMessage}</div>`);
  
        // Thêm class để thay đổi border thành đỏ
        input.classList.add("input-error");
  
        // Hiển thị thông báo lỗi
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
          errorSpan = document.createElement("span");
          errorSpan.classList.add("error-message");
          input.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = errorMessage;
        errorSpan.style.display = "block";
      } else {
        // Xóa class nếu trường hợp hợp lệ
        input.classList.remove("input-error");
  
        if (errorSpan && errorSpan.classList.contains("error-message")) {
          errorSpan.textContent = "";
          errorSpan.style.display = "none";
        }
      }
    });
  
    // Hiển thị thông báo lỗi nếu không hợp lệ
    if (!isValid) {
      errorMessages.style.display = "block";
      errorMessages.innerHTML = errors.join("");
      submitButton.classList.remove("enabled");
      submitButton.classList.add("disabled");
    } else {
      errorMessages.style.display = "none"; // Ẩn thông báo lỗi nếu form hợp lệ
      submitButton.classList.remove("disabled");
      submitButton.classList.add("enabled");
    }
  
    return isValid;
  }
  
  // Lắng nghe sự kiện input để cập nhật ngay lập tức trạng thái lỗi
  document
    .getElementById("registrationForm")
    .addEventListener("input", function () {
      validateForm();
    });
  
  // Lắng nghe sự kiện submit để kiểm tra form trước khi gửi
  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      if (!validateForm()) {
        event.preventDefault(); // Nếu form không hợp lệ thì không gửi
      }
    });
  
  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      let hasError = false;
  
      // Kiểm tra email
      let email = document.getElementById("email").value;
      let emailConfirm = document.getElementById("email-confirm").value;
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
      if (!email || !emailPattern.test(email)) {
        document.getElementById("email-error").style.display = "block";
        hasError = true;
      } else {
        document.getElementById("email-error").style.display = "none";
      }
  
      // Kiểm tra email xác nhận
      if (!emailConfirm || emailConfirm !== email) {
        document.getElementById("email-confirm-error").style.display = "block";
        hasError = true;
      } else {
        document.getElementById("email-confirm-error").style.display = "none";
      }
  
      // Kiểm tra các trường khác (ví dụ: địa chỉ, v.v.)
      let address = document.getElementById("address").value;
      if (!address) {
        document.getElementById("address-error").style.display = "block";
        hasError = true;
      } else {
        document.getElementById("address-error").style.display = "none";
      }
  
      // Nếu có lỗi, ngừng submit form
      if (hasError) {
        event.preventDefault();
        document.getElementById("errorMessages").style.display = "block";
        document.getElementById("errorMessages").innerText =
          "いくつかの必須項目が未入力です。";
      } else {
        document.getElementById("errorMessages").style.display = "none";
      }
    });
  
  //  Thêm sự kiện oninput cho ô nhập mã bưu điện
    document.getElementById("zipcode").addEventListener("blur", function () {
  
      let zipcode = this.value.replace(/[^0-9]/g, "");// Xóa ký tự không phải số
  
      if (zipcode.length === 7) {
          fetch("get_address.php?zipcode=" + zipcode)
              .then(response => response.json)
              .then(data => {
                  if (data.succuss) {
                      document.getElementById("prefecture").value = data.prefecture;
                      document.getElementById("city").value = data.city;
  
                  } else {
                      alert("郵便番号が見つかりません");
                  }
              })
      }
  });
  