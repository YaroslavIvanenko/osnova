

$(document).ready(function() {
	init();
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
	console.log(data);
	var out='';
	var later = {};
	if (localStorage.getItem('later') != null) {
		later = JSON.parse(localStorage.getItem('later'));
		for (var key in later){
		out +='<div class="cart">';
		out += `<button class="later" data-id="${key}">&hearts;</button>`;
		out +=`<p class="name">${data[key].name}</p>`;
		//out+=`<img src="images/${data[key]['image']}">`;
		out+= '<a   class="photo" href="' +data[key]['images']+'" title="" data-fancybox="images"><img   src="' +data[key]['image']+'"></a>'
		//out+=  '<img   src="' +data[key]['image']+'">';
		//out += `<div class="cost">${data[key].cost}</div>`;
		out += `<button class="add-to-cart" data-id="${key}">Купить</button>`;
		//out+='<button class="add-to-cart" data-art="'+key+'">Купить</button>';
		out +='</div>';
		}
		$('.goods-out').html(out);
	}
	else{
		$('.goods-out').html("Добавти товар");
	}
}

