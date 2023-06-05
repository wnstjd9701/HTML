window.onload = () => {
  // const test = new TypeIt(".top_name", {
  //   strings: "결제 페이지",
  //   speed: 200,
  //   waitUntilVisible: true,
  // }).go();
  // const productNameList = document.querySelectorAll('.product_name');
  // console.log(productNameList);

  // productNameList.forEach((productName) => {
  //   console.log(productName.id);
  //   new TypeIt(`#${productName.id}`, {
  //     strings: `${productName.id}`,
  //     speed: 200,
  //     waitUntilVisible: true,
  //   }).go();
  // })
};

const autoHyphen = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, '')
   .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
 }
