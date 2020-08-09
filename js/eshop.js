/*
let cart = {};


$('document').ready(function(){
	loadGoods();
	checkCart();
	showMiniCart();
});

function loadGoods () {
	//Загружаю товары на страницу
	$.getJSON('goods.json', function(data) {
		//console.log(data);
		let out = ' ';
		for ( let key in data){
		out+=  '<div class="single-goods">';
		out+=  '<h3>'+data[key].name+'<h3/>';
		out+=  '<p>Цена :' +data[key].cost+'<p>';
		out+=  '<img src="' +data[key]['image']+'">';
		out+='<button class="add" data-art="'+key+'">Купить</button>';	
		out+='</div>';
			
		}
		
		$('#goods').html(out);
		$('button.add').on('click',addToCart);
		
	});
}


function addToCart () {
	//добавляем товар в корзину
	let articul = $(this).attr('data-art');
	if (cart[articul]!=undefined) {
		cart[articul]++;
		
	}
	
	else {
	cart[articul] = 1;
		}
	//запись масива в localStorage
	localStorage.setItem('cart', JSON.stringify(cart));
	//console.log(cart);
	
}


function checkCart() {
	//Проверяю наличие корзины в localStorage;
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'));
		///console.log(localStorage.getItem('cart'));
	}
}

function showMiniCart(){
	//показываем содержимое корзыины
	var out = ' ';
	for (var w in cart){
		out+= w + '---'+ cart[w] + '<br>';
	}
	out+='<br><a href="cart.html">Корзина</a>';
	$('#mini-cart').html(out);
} */

var cart = {}; //корзина

$(document).ready(function() {
	init();
	loadCart ();
});
function init() {
	//вычитуем файл goods.json
	//$.getJSON("goods.json", goodsOut);
	$.post (
		"admin/core.php",
		{
			"action" : "loadGoods"
		},
		goodsOut
	);
}


function goodsOut(data) {
	//вывод на страницу
	data = JSON.parse(data);
	//console.log(data);
	var out='';
	for (var key in data){
		out +='<div class="cart">';
		//out += `<button class="later" data-id="${key}">&hearts;</button>`;
		out +=`<p class="name">${data[key].name}</p>`;
		//out+=`<img src="images/${data[key]['image']}">`;
		out+= `<a   class="photo" href="${data[key].images}"  data-fancybox="images"><img src="${data[key].image}"/></a>`;
		//out+=  '<img   src="' +data[key]['image']+'">';
		//out += `<div class="cost">${data[key].cost}</div>`;
		out += `<a href="cart.html"><button class="add-to-cart" data-id="${key}">Купить</button></a>`;
		//out+='<button class="add-to-cart" data-art="'+key+'">Купить</button>';
		out +='</div>';
		//console.log(`${key}`);
		
	}
	$('.goods-out').html(out);
	$('.add-to-cart').on('click', addToCart);
	//$('.later').on('click', addToLater);
}

/*
function addToLater (){
	//добавляю товар в желание
	var later = {};
	if (localStorage.getItem('later') != null) {
		later = JSON.parse(localStorage.getItem('later'));
		}
	alert('Добавлено в Желание');
	var id = $(this).attr('data-id');
	later[id] = 1;
	localStorage.setItem('later', JSON.stringify(later)); //корзину в строку
	
} */

function addToCart() {
	//добавить товар в корзину
	var id = $(this).attr('data-id');
	console.log(cart[id]);
	if (cart[id]==undefined){
		cart[id] = 1; //если нет товара - делаем равным 1;
	}
	else {
		cart[id]++;//если такой есть увеличиваем на 1;
	}
	//console.log(id);
	showMiniCart();
	savaCart();
}
function savaCart() {
	localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
	//console.log(cart);
}

 


function loadCart (){
	//Проверяю наличие корзины в localStorage;
	if (localStorage.getItem('cart') != null) {
		//если есть розшефровавию и саписиваю в переменою cart
		cart = JSON.parse(localStorage.getItem('cart'));
		showMiniCart();
		}
}///console.log(localStorage.getItem('cart'));
       
function showMiniCart(){
	//показываем содержимое корзыины
	var out = '';
	var sum = 0;
	for (var key in cart){
		//if (cart.hasOwnProperty(key)){
		//out+= sum + parseFloat(cart[key]) +   '<br>';
		  // out += `<div class="minCart>`
		   sum += cart[key] ;
		  
			// out += `</div>`;
	}
	  $('.mini-cart').html(sum);
		
	}
     //alert (showMiniCart(cart));
	
	
	
	
	