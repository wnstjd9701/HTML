export let productsList = [
    {
        id: 1,
        name: 'atomheartmother',
        price: 14000,
        info: 'atomheartmother 입니다.',
        isCart: 0
    },
    {
        id: 2,
        name: 'avobath',
        price: 15000,
        info: 'avobath 입니다.',
        isCart: 0
    },
    {
        id: 3,
        name: 'bigblue',
        price: 19000,
        info: 'bigblue 입니다.',
        isCart: 0
    },
    {
        id: 4,
        name: 'blackrose',
        price: 20000,
        info: 'blackrose 입니다.',
        isCart: 0
    }
];
console.log(productsList[0].name);
const changeProductAmount = (event) => {
    let labelClick = document.getElementByClass(product_amount);
    event.target.childNodes;
}