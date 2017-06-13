app.controller("myCtrl", function($scope) {
	
	$scope.expression = "word";
	$scope.name = "name";
	
	$scope.goodsFlag = false;
	$scope.flavorsFlag = false;
	$scope.totalFlag = false;
	$scope.galleryView = false;
	$scope.orderView = true;
	$scope.orderFlag = false;
	$scope.contactFormFlag = false;
	
	$scope.bakedGoodSelected = "";
	$scope.flavors = [];
	$scope.flavorSelected = "";
	$scope.quantPrice = [];
	$scope.ttl;
	$scope.totalCost =0.00;
	
	$scope.bakedGoods = [{treat: "muffin", flavors: ["blueberry", "chocolate chip", "raisin"] }, {treat: "cupcake" 
	, flavors: ["vanilla", "red velvet", "carrot cake"]}];//treats and flavors
	
	$scope.cupcakes = [{quantity: 6, price: 7.99}, {quantity: 12, price: 12.99}, {quantity: 24, price: 24.99}];//prices
	$scope.muffins = [{quantity: 6, price: 7.99}, {quantity: 12, price: 12.99}, {quantity: 24, price: 24.99}];//prices
	
	$scope.photos = [{key: "blueberry muffin", value: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Vegan_Blueberry_Muffins_%284972870642%29.jpg"},
		{key: "raisin muffin", value: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Blueberry_muffins%2C_whole_and_partial.jpg"},
		{key: "chocolate chip muffin", value: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Profile_of_muffin_%285398771984%29.jpg"},
		{key: "vanilla cupcake", value: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Cupcakes_%286772905183%29.jpg"},
		{key: "red velvet cupcake", value: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Cupcakes_%286772905183%29.jpg"},
		{key: "carrot cake cupcake", value: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Carrotcake_cupcakes_with_candied_ginger_icing.jpg"}
		
		];
	
	$scope.orders = [];
	
	$scope.index = 0;
	$scope.MAX = $scope.photos.length;//moved this up from 6
	$scope.carouselPic = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Vegan_Blueberry_Muffins_%284972870642%29.jpg";
	$scope.description = "blueberry muffin";
	
	$scope.contactInfo = {firstName: "", lastName: "", email: "", phoneNumber: ""};

	
	$scope.getView = function(param){
		
		if (param == "gallery"){
			$scope.galleryView = true;
			$scope.orderView = false;
			$scope.contactFormFlag = false;
		}
		else{
			if($scope.orders.length > 0){
				$scope.orderFlag = true;
			}
			$scope.galleryView = false;
			$scope.orderView = true;
			$scope.contactFormFlag = false;
		}
	}
	/**
	*Retrieves all the flavors for the front end.
	*/
	$scope.getFlavors = function(){
		
		
		if($scope.bakedGoodSelected.treat === "muffin"){
			$scope.flavors = $scope.bakedGoods[0].flavors;
			
		}
		else{
			$scope.flavors = $scope.bakedGoods[1].flavors;
			
		}
		$scope.goodsFlag = true;
	}
	/**
	*Quantity
	*/
	$scope.getQuantity = function(x){
		var temp = "";
		$scope.quantPrice = [];
		
		$scope.flavorSelected = x;
		if($scope.bakedGoodSelected.treat === "muffin"){
			
			for(var i =0; i < $scope.cupcakes.length; i++){
				
				temp = $scope.cupcakes[i].quantity + " @ $"+ $scope.cupcakes[i].price;
				//console.log(temp);
				$scope.quantPrice.push(temp);
			} 
			
		}
		else{
			for(var i =0; i < $scope.muffins.length; i++){
				temp = $scope.muffins[i].quantity + " @ $"+ $scope.muffins[i].price;
				$scope.quantPrice.push(temp);
			} 
		}
		//console.log($scope.quantPrice);
		$scope.flavorsFlag = true;
	}
	/**
	*Gets the total for an order
	*/
	$scope.getTotal = function(arg){
		
		var temp = arg.split(" ");
		var temp2 = temp[2];
	
		$scope.ttl = temp2;
		$scope.totalFlag = true;
		
	}
	
	/**
	*Adds an order
	*/
	$scope.addOrder = function(){
		alert("your order has been added");
		
		$scope.orders.push({active: false, good: $scope.bakedGoodSelected.treat, flavor: $scope.flavorSelected, price: $scope.ttl, pic: $scope.getImage($scope.flavorSelected + " "+$scope.bakedGoodSelected.treat)});
		
		$scope.goodsFlag = false;
		$scope.flavorsFlag = false;
		$scope.totalFlag = false;
		var temp = 0;
		$scope.totalCost =0.0;
		for(var i =0; i < $scope.orders.length;i++){
			temp = $scope.orders[i].price.slice(1);
			$scope.totalCost += parseFloat(temp);
		}
		$scope.bakedGoodSelected ="";//resets the first dropdown
		
		if($scope.orders.length > 0){$scope.orderFlag = true}
		else $scope.orderFlag = false;
		//console.log($scope.orderFlag);
	}
	/**
	*Removes an order
	*/
	$scope.remove = function(){
		var oldList = $scope.orders;
        $scope.orders = [];
        angular.forEach(oldList, function(x) {
            if (!x.active) $scope.orders.push(x);
        });
		
		$scope.totalCost = 0.0;
		var temp = 0;
		for(var i =0; i < $scope.orders.length;i++){
			temp = $scope.orders[i].price.slice(1);
			$scope.totalCost += parseFloat(temp);
		}	
		
		if($scope.orders.length > 0){$scope.orderFlag = true}
		else $scope.orderFlag = false;
	}
	/**
	*Gets the image associated with the baked good
	*/
	$scope.getImage = function(key){
		for(var i =0; i < $scope.photos.length;i++){
			if($scope.photos[i].key === key){
				return $scope.photos[i].value;
			}
		}
	}
	
	$scope.getDescription = function(val){
		for(var i =0; i < $scope.photos.length;i++){
			if($scope.photos[i].value === val){
				$scope.description = $scope.photos[i].key;
			}
		}
	}
	/*
	*Next handler
	*/
	$scope.next = function(){
		$scope.index = $scope.index+1;
		if ($scope.index < $scope.MAX){
			$scope.carouselPic = $scope.photos[$scope.index].value;
		}
		else{
			$scope.index = 0;
			$scope.carouselPic = $scope.photos[$scope.index].value;
		}
		$scope.getDescription($scope.carouselPic);

	}
	/*
	*Previous handler
	*/
	$scope.prev = function(){
		
		$scope.index = $scope.index-1;
		if ($scope.index >= 0){
			$scope.carouselPic = $scope.photos[$scope.index].value;
		}
		else{
			$scope.index = $scope.MAX-1;
			$scope.carouselPic = $scope.photos[$scope.index].value;
		}
		$scope.getDescription($scope.carouselPic);

	}
	
	$scope.order = function(){
		
		if(!$scope.contactFormFlag){
			$scope.contactFormFlag = true;
			$scope.orderFlag = false;
			$scope.orderView =false;
			return;
		}
		var order = "";
		for(var i = 0; i < $scope.orders.length;i++){
			order += $scope.orders[i].flavor + " "+$scope.orders[i].good + " " + $scope.orders[i].price + "\n";
		}
	
		//code below is if you wanted to draft an email
		/*var link = "mailto:williammason876@gmail.com" 
             + "?cc=" +$scope.contactInfo.email
             + "&subject=" + escape("Order")
             + "&body=" + escape(order);

		window.location.href = link;*/
		alert("The following order has been placed:\n"+ order + "\nfor:\n"+ $scope.contactInfo.firstName + "\n" + $scope.contactInfo.lastName + "\n"+$scope.contactInfo.email + "\n"+ $scope.contactInfo.phoneNumber);
		location.reload();
		
	}
	
	});