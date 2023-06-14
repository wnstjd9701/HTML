window.onload = () => {
    totalPrice();
}

// 수정 버튼 클릭시 수정 반영
const updateAmountBtn = (tableRow) => {
    const eventTarget = tableRow;
    var quantity = 0;

    const updateButton = document.getElementById('updateBtn');

    updateButton.addEventListener('click', updateButtonClickHandler);

    function updateButtonClickHandler(event) {
        const quantityInput = document.getElementById('quantity');
        quantity = parseInt(quantityInput.value);
        // 수량 변경에 따른 로직 추가
        var changedAmount = eventTarget.querySelector('.product_amount_text');
        changedAmount.textContent = quantity;

        const modal = document.getElementById('quantity_modal');
        modal.style.display = 'none';

        // Remove the flag after the update is done
        // Remove the event listener
        updateButton.removeEventListener('click', updateButtonClickHandler);
        totalPrice();
    }
};

// 삭제 확인 Modal 열기
function openDeleteProductModal() {
    document.getElementById('delete_modal').style.display = 'block';
    document.querySelector(".modal-overlay").style.display = 'block';
}
// 삭제 확인 Modal 닫기
function closeDeleteProductModal() {
    document.getElementById('delete_modal').style.display = 'none';
    document.querySelector(".modal-overlay").style.display = 'none';
}

// Modal 관련 로직
// 주문 확인 Modal
function openOrderModal() {
    document.getElementById('modal').style.display = 'block';
    document.querySelector(".modal-overlay").style.display = 'block';
}

function closeOrderModal() {
    document.getElementById('modal').style.display = 'none';
    document.querySelector(".modal-overlay").style.display = 'none';
}

function redirectToPayment() {
    window.location.href = '../payments/payments.html';
}

// 상품 Modal
// Modal에 값을 동적으로 저장
const modalProductInfo = (evnet) => {
    const modal = document.getElementById('quantity_modal');
    const tableRow = event.target.closest('tr');

    // 상품 이미지
    const productImage = tableRow.querySelector('.product_image').src;
    const productImageModal = document.querySelector('#product_image_modal');
    productImageModal.setAttribute("src", `${productImage}`);

    // 상품 이름 
    const productKoreanName = tableRow.querySelector('.product_korean_name_text').textContent;
    const productEnglishName = tableRow.querySelector('.product_english_name_text').textContent;

    let productKoreanNameModal = document.getElementById('product_korean_name_modal');
    productKoreanNameModal.innerHTML = productKoreanName;

    let productEnglishNameModal = document.getElementById('product_english_name_modal');
    productEnglishNameModal.innerHTML = productEnglishName;

    // 상품 체크 확인
    let checkProduct = tableRow.querySelector('.product_checkbox').checked;

    // 버튼을 누른 상품의 가격
    const productPrice = tableRow.querySelector('.product_price_text').textContent;
    const productPriceModal = document.getElementById('product_price_modal');
    productPriceModal.innerHTML = productPrice;

    // 버튼을 누른 상품의 수량
    const productAmount = tableRow.querySelector('.product_amount_text').textContent;

    let modalProductQuantity = document.getElementById('quantity');
    modalProductQuantity.value = productAmount;

    modal.style.display = 'flex';
}

// 취소 버튼 클릭 시 모달 창 닫기
const modalCancelBtn = () => {
    document.getElementById('cancelBtn').addEventListener('click', (event) => {
        const modal = document.getElementById('quantity_modal');
        modal.style.display = 'none';
    })
}

// 상품 수량 증가 버튼 클릭 시
document.getElementById('increaseBtn').addEventListener('click', (event) => {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + 1;
    quantityInput.value = newValue;
})

// 상품 수량 감소 버튼 클릭 시
document.getElementById('decreaseBtn').addEventListener('click', (event) => {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue - 1;
    if (newValue >= 1) {
        quantityInput.value = newValue;
    }
})

// 전체 합 구하기
const totalPrice = () => {
    var productCheckedList = document.querySelectorAll('input[name="product_checkbox"]:checked');
    var deliveryFee = 0;
    var total = 0;
    if (productCheckedList.length == 0) {
        document.getElementById('sub_total').textContent = total.toLocaleString();
        document.getElementById('delivery_fee').textContent = deliveryFee;
        document.getElementById('total').textContent = total.toLocaleString();
        return;
    }
    productCheckedList.forEach((productChecked) => {
        const tableRow = productChecked.closest('tr');

        var productPrice = tableRow.querySelector('.product_price_text').textContent;
        var productAmount = tableRow.querySelector('.product_amount_text').textContent;

        total += parseInt(productPrice.replace(/,/g, '')) * parseInt(productAmount.replace(/,/g, ''));
    })

    document.getElementById('sub_total').textContent = total.toLocaleString();
    if (total >= 50000) {
        document.getElementById('delivery_fee').textContent = deliveryFee;
        document.getElementById('total').textContent = total.toLocaleString();
    }
    else if (total < 50000 && total > 0) {
        deliveryFee = 3000;
        document.getElementById('delivery_fee').textContent = deliveryFee.toLocaleString();
        document.getElementById('total').textContent = (total + deliveryFee).toLocaleString();
    }
}

// 상품 체크 확인
const productCheckConfirm = () => {
    const checkBoxes = document.querySelectorAll('input[name="product_checkbox"]');
    // 선택된 체크박스
    const checked = document.querySelectorAll('input[name="product_checkbox"]:checked');
    // 전체 선택 체크박스
    const selectAll = document.querySelector('input[name="select_all"]');
    // 전체 상품이 체크되어 있으면
    if (checkBoxes.length == checked.length) {
        selectAll.checked = true;
    } else {
        selectAll.checked = false;
    }
    totalPrice();
}

// 테이블 이벤트
const tableEvent = (event) => {
    event.stopPropagation();
    const currentTarget = event.target;
    let row = currentTarget.closest('tr');
    console.log(currentTarget.tagName);
    if (row.className === 'product_row' && (currentTarget.textContent == 'Edit' || currentTarget.textContent == 'Delete')) {
        if (currentTarget.textContent == 'Edit') {
            console.log('Edit');
            modalProductInfo(event);
            modalCancelBtn();
            updateAmountBtn(row);
        }
        else if (currentTarget.textContent == 'Delete' && row.querySelector('input[type=checkbox]').checked === true) {
            openDeleteProductModal();
            var deleteProductBtn = document.querySelector('.delete_yes');
            var noDeleteProductBtn = document.querySelector('.delete_no');

            noDeleteProductBtn.addEventListener('click', (noDeleteEvent) => {
                row = '';
                closeDeleteProductModal()
            });

            deleteProductBtn.addEventListener('click', () => handleModalConfirm(row));
        }
    }
    // INPUT 박스 클릭
    else if (row.className === 'product_row' && currentTarget.tagName === 'INPUT') {
        productCheckConfirm();
    }
    // TR 클릭
    else if (row.className === 'product_row') {
        if (row.querySelector('input[type=checkbox]').checked) {
            row.querySelector('input[type=checkbox]').checked = false;
        } else {
            row.querySelector('input[type=checkbox]').checked = true;
        }
        productCheckConfirm();
    }
    else if (currentTarget.className == 'select_all_product') {
        // select all 선택 event
        var selectBox = row.querySelector('input[name="select_all"]');
        selectAllProduct(selectBox);
    }
}

const handleModalConfirm = (row) => {
    // 모달 창 예 버튼 클릭 처리
    row.remove();
    // 모달 창 닫기
    closeDeleteProductModal();
    totalPrice();
    // 모달 창 내 예 버튼 클릭 이벤트 해제
    const modalButton = document.querySelector('.delete_no');
    modalButton.removeEventListener('click', () => handleModalConfirm(row));
};

var table = document.querySelector('table');
table.addEventListener('click', tableEvent);

// 전체 상품 선택
const selectAllProduct = (selectBox) => {
    const checkBoxes = document.querySelectorAll('input[name="product_checkbox"]');
    checkBoxes.forEach(checkBox => {
        checkBox.checked = selectBox.checked;
    });
}
// 특정 상품 선택 
const selectProduct = (checkbox) => {
    checkbox.checked = !checkbox.checked;
}

// Edit 모달창 띄우기
const editButtonClickHandler = (row) => {
    console.log('hello');
}

// Delete 모달창 띄우기
const deleteButtonClickHandler = (row) => {

}