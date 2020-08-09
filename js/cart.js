var cart = {};
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}



/*function showCartIcon () {
	if (cart[id]>0) {
		
	}
}*/



function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
		$.post (
		"admin/core.php",
		{
			"action" : "loadGoods"
		},
		goodsOut
	);
       // $.getJSON('goods.json',
		function goodsOut (data) {
			
			//console.log(cart);
			data = JSON.parse(data);
			///console.log(data);			
            var goods = data;
			console.log(goods);
            var out = '';
		
			
		
			
            for (var id in cart) {
					
	 
		        out += `<div class="shopping-cart">`;
				
				
				
				out += `<div class="item">`;
				
                out +=  `<div class="buttons">
                <button data-id="${id}" class="del-goods">x</button>
				    </div>`;
				
				
				//${goods[id].name}
				out += `<div class="image">
                <img src="${goods[id].image}">
                </div>`;
				
				 out += `<div class="description">
                <span>${goods[id].name}</span>
                <span>${goods[id].description}</span>
				 </div>` ;
               
				
				
                out += `<div class="quantity">`;
                out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
                out += `<div class="count"> ${cart[id]} </div> `;
                out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
				out += `</div>`;
				
                //out += cart[id]*goods[id].cost;
				out += `</div>`;
		       out += `</div>`;
                out += '<br>';
				
				
            }
			$('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        };
    }
}

function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var ephone = $('#ephone').val();
    if (ename!='' &&  ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
					if(data==1){
						alert('Заказ отправлен');
					}
					else{
						alert('Повторите заказ');
					}
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }

}


$(document).ready(function () {
   loadCart();
   $('#send').on('click', sendEmail); // отправить письмо с заказом
});