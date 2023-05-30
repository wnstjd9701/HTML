const addAmount = () => {
    document.getElementById("product_amount").value = ++document.getElementById("product_amount").value;
    const elements = document.getElementsByClassName("table_row");
    for(i=0; i<elements.length; i++){
        console.log(elements[i])
        const product_name = elements[i].getElementById("product_information");
        console.log(product_name);
    }
}

const minusAmount = () => {
    var amount = document.getElementById("product_amount").value;
    if(amount <= 0){
        alert("수량이 0보다 작을 수 없습니다.");
    }else{
        document.getElementById("product_amount").value = --amount;
    }
}

