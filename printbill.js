'use strict';

function PrintBill(cData, pData){
	var _this = this;
		this.pData = pData;
		this.cart = {};
		this.save = 0;
		this.toPay = 0;
		this.promote_products_name = [];
		this.promote_products_quan = [];
		this.promote_products_unit = [];

	for (var i = 0; i < cData.length; i++) {
		(!this.cart[cData[i]])?this.cart[cData[i]] = 1:this.cart[cData[i]]++;
	};
	console.log("***<没钱赚商店>购物清单***");
}
PrintBill.prototype.printProduct = function(){
	for (var i = 0; i < this.pData.length; i++) {
		if(this.cart[this.pData[i].code]){
			var code_quan, cart_quantity, pay_quantity, pay_total, after_discount, saveTx;
				code_quan = this.pData[i].code.substring(11); //获取条形码提供的商品数量
			if (this.pData[i].code.length == 10) { code_quan = 1 }; //条形码未提供数量时商品为1个单位
				cart_quantity = this.cart[this.pData[i].code]*code_quan; //购物车的商品数量
				pay_quantity = cart_quantity; //需要付款的商品数量
				pay_total = pay_quantity*this.pData[i].price; //需要付款的金额
			if (this.pData[i].promotion == 1) {//属于买二赠一时需要付款的商品数量
				pay_quantity = 2*Math.floor(cart_quantity/(2+1)) + cart_quantity%(2+1);//实际需要付款的商品数量
				pay_total = pay_quantity*this.pData[i].price;//实际需要支付的金额
				if (cart_quantity - pay_quantity > 0) {
					this.promote_products_name.push(this.pData[i].name);
					this.promote_products_quan.push(cart_quantity-pay_quantity);
					this.promote_products_unit.push(this.pData[i].unit);
				};
			};
				after_discount = (this.pData[i].discount == 0 || this.pData[i].promotion == 1)?pay_total:pay_total*this.pData[i].discount/100; //优惠后金额
			
				saveTx = "，节省：" + (pay_total - after_discount).toFixed(2) + "(元)";
			if (pay_total - after_discount == 0) {saveTx = ''};

			console.log("名称："+this.pData[i].name + "，数量：" + cart_quantity + this.pData[i].unit + "，单价：" + this.pData[i].price.toFixed(2) + "(元)，小计：" + after_discount.toFixed(2) + "(元)" + saveTx);
			this.toPay += after_discount;
			if (this.pData[i].promotion == 1) {
				this.save += (cart_quantity - pay_quantity)*this.pData[i].price;
			}else{
				this.save += (pay_total - after_discount);
			};
		}
	};
}
PrintBill.prototype.printPromotion = function(){
	if (this.promote_products_name.length > 0) {
		console.log("-------------------------");
		console.log("买二赠一商品：");
		for (var i = 0; i < this.promote_products_name.length; i++) {
			console.log("名称：" + this.promote_products_name[i] + "，数量：" + this.promote_products_quan[i] + this.promote_products_unit[i]);
		};
	};
}
PrintBill.prototype.printSumary = function(){
	console.log("-------------------------");
	console.log("总计：" + this.toPay.toFixed(2) + "(元)");
	if (this.save > 0) {
		console.log("节省：" + this.save.toFixed(2) + "(元)");
	};
	console.log("*************************");
}
PrintBill.prototype.printAll = function(){
	this.printProduct();
	this.printPromotion();
	this.printSumary();
}