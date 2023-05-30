const addAmount = () => {
  var tmp = document.getElementById('amount').value;
  tmp++;
  document.getElementById('amount').value = tmp;
};

const minusAmount = () => {
  var tmp = document.getElementById('amount').value;
  tmp--;
  if (tmp < 0) {
    alert('수량이 0보다 작을 수 없습니다.');
  } else {
    document.getElementById('amount').value = tmp;
  }
};
