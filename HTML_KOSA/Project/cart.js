const addAmount = (event) => {
    // const productsList = document.getElementsByClassName("table_row");
    // console.log(productsList.length); // 다음에 추가할 때 product_(length+1)
    const btnId = event.target.id.split('_');
    const productId = btnId[2];
    const amount = document.getElementById("product_" + "amount_" + productId);

    const checkBox = document.querySelectorAll("input[name=product]");
    // 체크가 안되어 있는데 상품 수량을 변경할 경우 체크 해줌 / 상품 인덱스는 1부터 시작하므로 checkBox의 인덱스는 productId - 1
    if (checkBox[productId - 1].checked === false) {
        checkBox[productId - 1].checked = true;
        checkSelectAll();
    }
    amount.innerHTML = parseInt(amount.innerHTML) + 1;
    // 총 금액 변경
    totalPriceCalculate();
}

const minusAmount = (event) => {
    const btnId = event.target.id.split('_');
    const productId = btnId[2];
    const amount = document.getElementById("product_" + "amount_" + productId);

    const checkBox = document.querySelectorAll("input[name=product]");
    // 체크가 안되어 있는데 상품 수량을 변경할 경우 체크 해줌 / 상품 인덱스는 1부터 시작하므로 checkBox의 인덱스는 productId - 1
    if (checkBox[productId - 1].checked === false) {
        checkBox[productId - 1].checked = true;
        checkSelectAll();
    }
    if (amount.innerHTML <= 0) {
        alert("수량이 0보다 작습니다.");
    }
    else {
        amount.innerHTML = parseInt(amount.innerHTML) - 1;
        if (amount.innerHTML == 0) {
            checkBox[productId - 1].checked = false;
            checkSelectAll();
        }
        // 총 금액 변경
        totalPriceCalculate();
    }
}

const totalPriceCalculate = () => {
    const productsList = document.getElementsByClassName("table_row");

    let selectProductPrice = 0;
    let checkBoxes = document.querySelectorAll("input[name=product]:checked");
    checkBoxes.forEach((checkBox) => {
        // 상품 아이디 가져오기
        const productId = checkBox.id.split('_')[2];

        let productPrice = productsList[productId - 1].children[5].innerHTML.split(/>|</)[2]
        // productPrice.split(',').join('');
        productPrice = productPrice.replace(/,/g, '');

        // 상품 수량 가져오기
        let productAmount = document.getElementById("product_" + "amount_" + productId);

        // 총 금액 = 상품 수량 * 상품 가격
        selectProductPrice += parseInt(productPrice) * parseInt(productAmount.innerHTML);
        console.log(selectProductPrice);
    })

    // 배송비 
    let deliveryFee = document.getElementById("delivery_fee");
    if (selectProductPrice > 500000) {
        deliveryFee.innerHTML = "배송비 0";
    } else {
        deliveryFee.innerHTML = "배송비 3,000";
    }

    let price = document.getElementById("total_price");
    price.innerHTML = selectProductPrice.toLocaleString();
}

const checkSelectAll = () => {
    // 모든 체크박스
    const checkBoxes = document.querySelectorAll('input[name="product"]');

    // 선택된 체크박스
    const checked = document.querySelectorAll('input[name="product"]:checked');

    // 전체 선택 체크박스
    const selectAll = document.querySelector('input[name="selectAll"]');

    // 모든 체크박스(선택됨)와 선택된 체크박스의 길이가 같으면  
    if (checkBoxes.length === checked.length) {
        //전체 선택 체크박스 체크
        selectAll.checked = true;
    } else {
        // 전체 선택 체크박스 해제
        selectAll.checked = false;
    }
}

const selectAll = (selectBox) => {
    // selectBox 가 check 되어 있으면 true, 아니면 false
    const checkBoxes = document.getElementsByName('product');
    checkBoxes.forEach((checkBox) => {
        checkBox.checked = selectBox.checked;
    })
}