angular.module("ssApp",['customFilters'])

.constant('productListActiveClass',"btn-primary")
.constant('productListPageCount',2)

.controller('SSController',['$scope','$http',
function($scope,$http){
	$scope.data = {};
	$http.get("http://localhost:8082/ssapi/products").success(function(data){
		$scope.data.products= data;
	});
}])

.controller("productListController",['$scope','$filter','productListActiveClass','productListPageCount',
function($scope,$filter,productListActiveClass,productListPageCount){

	var selectedCategory = null;
	
	$scope.selectedPage=1;
	$scope.pageSize = productListPageCount;
	
	$scope.selectCategory = function(newCategory){
		selectedCategory = newCategory;
		$scope.selectedPage=1;
	}
	
	$scope.selectPage = function(newPage){
		$scope.selectedPage = newPage;
	}
	
	$scope.categoryFilterFn = function(product){
		return selectedCategory == null || product.category==selectedCategory;
	}
	
	$scope.getCategoryClass = function(category){
		return selectedCategory ==category ? productListActiveClass : "";
	}
	
	$scope.getPageClass = function(page){
		return $scope.selectedPage == page ? productListActiveClass : "";
	}
}]);