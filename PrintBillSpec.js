describe("打印小票", function() {
  var bill;
  var code, products;
  beforeAll(function() {
    codes = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    //promotion:1 = 买二赠一, 0 = 无优惠
    products = [
      {
        "name":"可乐",
        "price":3.00,
        "unit":"瓶",
        "type":"baverage",
        "code":"ITEM000005",
        "promotion":1,
        "discount":0
      },
      {
        "name":"羽毛球",
        "price":1.00,
        "unit":"个",
        "type":"sportsGoods",
        "code":"ITEM000001",
        "promotion":1,
        "discount":0
      },
      {
        "name":"苹果",
        "price":5.50,
        "unit":"斤",
        "type":"fruit",
        "code":"ITEM000003-2",
        "promotion":1,
        "discount":0
      },
      {
        "name":"香蕉",
        "price":6.50,
        "unit":"斤",
        "type":"fruit",
        "code":"ITEM000006-2",
        "promotion":0,
        "discount":95
      }
    ];
  });

  it("有符合买二赠一条件商品", function() {
    bill = new PrintBill(codes, products);
    bill.printAll();
    expect(bill.save).toEqual(4);
  });
  it("没有符合买二赠一条件商品", function() {
    var p = [];
    for (var i = 0; i < products.length; i++) {
      products[i].promotion = 0;
      p.push(products[i]);
    };
    bill = new PrintBill(codes, p);
    bill.printAll();
    expect(bill.toPay).toEqual(25);
  });
  it("有95折商品", function() {
    var p = [];
    for (var i = 0; i < products.length; i++) {
      products[i].promotion = 0;
      if (i == 2) {products[i].discount = 95};
      p.push(products[i]);
    };
    bill = new PrintBill(codes, p);
    bill.printAll();
    expect(bill.toPay).toEqual(24.45);
  });
  it("有买二赠一又有95折商品", function() {
    codes.push('ITEM000001');
    var p = [];
    for (var i = 0; i < products.length; i++) {
      products[i].promotion = 0;
      if (i == 0 || i == 1) {products[i].promotion = 1};
      if (i == 2) {products[i].discount = 95};
      p.push(products[i]);
    };
    bill = new PrintBill(codes, p);
    bill.printAll();
    expect(bill.toPay).toEqual(20.45);
  });
});
