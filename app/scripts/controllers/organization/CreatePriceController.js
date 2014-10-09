(function(module) {
  mifosX.controllers = _.extend(module, {
    CreatePriceController: function(scope, routeParams, resourceFactory, location,$rootScope) {
        
    	scope.chargeDatas = [];
        scope.chargevariants = [];
        scope.discountdatas = [];
        scope.priceRegionDatas = [];
        scope.serviceDatas=[];
        scope.priceDatas=[];
        scope.formData = {};
        scope.planId = routeParams.id;
        
        resourceFactory.priceTemplateResource.get({planId: routeParams.id} , function(data) {
        	 scope.formData.planCode=data.planCode;
        	 scope.formData.isPrepaid=data.isPrepaid;
        	scope.chargeDatas = data.chargeData;
            scope.chargevariants = data.chargevariant;
            scope.discountdatas = data.discountdata;
            scope.priceRegionDatas = data.priceRegionData;
            scope.subscriptiondata = data.contractPeriods;
            scope.serviceDatas = data.serviceData;
            scope.serviceDatas.push({"id":0,"serviceCode":"none","serviceDescription":"None"});
            
            
        });
        
        scope.addPriceData = function(){
        	console.log(scope.formData);
        	if(scope.formData.chargeCode && scope.formData.chargevariant && scope.formData.discountId && scope.formData.serviceCode &&
        			scope.formData.isPrepaid && scope.formData.planCode && scope.formData.price && scope.formData.priceregion ){
        		 if(scope.formData.isPrepaid == 'Y'){
        			 if(scope.formData.duration){
        				 scope.priceDatas.push(scope.formData);
        				 var planCode = scope.formData.planCode;
        		        	var isPrepaid = scope.formData.isPrepaid;
        		        	scope.formData = {};
        		        	scope.formData.planCode = planCode;
        		        	scope.formData.isPrepaid = isPrepaid;
        		        	console.log(scope.priceDatas);
        			 }
        		 }else{
        			 scope.priceDatas.push(scope.formData);
        			 var planCode = scope.formData.planCode;
        	        	var isPrepaid = scope.formData.isPrepaid;
        	        	scope.formData = {};
        	        	scope.formData.planCode = planCode;
        	        	scope.formData.isPrepaid = isPrepaid;
        	        	console.log(scope.priceDatas);
        		 }
        	}
        	
        	
        };
        
        scope.removePriceData = function (index) {
            scope.priceDatas.splice(index, 1);
        };
        
        priceDataSendingOneByOneFun = function(val){
        	resourceFactory.priceResource.save({'planId':routeParams.id},scope.priceDatas[val],function(data){
				 if(val == scope.priceDatas.length-1){
					 location.path('viewplan/'+routeParams.id);
				 }else{
					 val += 1;
					 priceDataSendingOneByOneFun(val);
			 	 }
			 });
		 };
        
        scope.submit = function() {
             
        	console.log(scope.priceDatas);
        	for(var i in scope.priceDatas){
        		scope.priceDatas[i].locale = $rootScope.locale.code;
        		if(i==scope.priceDatas.length-1){
        			priceDataSendingOneByOneFun(0);
        		}
        	}
        	 //this.formData.locale = $rootScope.locale.code;
        	/* resourceFactory.priceResource.save({'planId':routeParams.id},this.formData,function(data){
                 location.path('/viewprice/' + data.resourceId+'/'+routeParams.id);
          });*/
        };
    }
  });
  mifosX.ng.application.controller('CreatePriceController', ['$scope', '$routeParams', 'ResourceFactory', '$location','$rootScope', mifosX.controllers.CreatePriceController]).run(function($log) {
    $log.info("CreatePriceController initialized");
  });
}(mifosX.controllers || {}));
