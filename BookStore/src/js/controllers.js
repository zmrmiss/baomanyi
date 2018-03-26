/**
 * 这里是书籍列表模块
 * @type {[type]}
 */
var bookListModule = angular.module("BookListModule", []);
bookListModule.controller('BookListCtrl', function($scope, $http, $state, $stateParams) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        // console.log(pagedData)
        $scope.books = pagedData;

        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    //这里可以根据路由上传递过来的bookType参数加载不同的数据
    // console.log($stateParams);
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;

            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('src/data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });

                        $scope.setPagingData(data, page, pageSize);

                    });
            } else {
                // alert('22')
                $http.get('../src/data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);

                    });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'books',
        rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>',
        multiSelect: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 60,
            pinnable: false,
            sortable: false
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 220
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="booklist.bookdetail.home({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
});


/**
 * 这里是书籍详情模块
 * @type {[type]}
 */
var bookDetailModule = angular.module("BookDetailModule", []);
bookDetailModule.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {
    // $scope.setPagingData = function(data, page, pageSize) {
    //     var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    //     // console.log(pagedData)
    //     $scope.books = pagedData;
    //
    //     $scope.totalServerItems = data.length;
    //     if (!$scope.$$phase) {
    //         $scope.$apply();
    //     }
    // };
    // console.log($stateParams)
    var bookIds=$stateParams.bookId-1;

    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' + 0 + '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[bookIds].name;
            $scope.price=largeLoad[bookIds].price;
            $scope.pubTime=largeLoad[bookIds].pubTime;
            $scope.author=largeLoad[bookIds].author;
            // console.log(largeLoad[bookIds])
        });
    
});



var apis = angular.module("apis", []);
apis.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[bookIds].name;
            $scope.price=largeLoad[bookIds].price;
            $scope.pubTime=largeLoad[bookIds].pubTime;
            $scope.author=largeLoad[bookIds].author;
            // console.log(largeLoad[bookIds])
        });
});

apis.controller('BookDetailCtrl1', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[0].name;
            $scope.price=largeLoad[0].price;
            $scope.pubTime=largeLoad[0].pubTime;
            $scope.author=largeLoad[0].author;
            // console.log(largeLoad[bookIds])
        });
});
apis.controller('BookDetailCtrl2', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[1].name;
            $scope.price=largeLoad[1].price;
            $scope.pubTime=largeLoad[1].pubTime;
            $scope.author=largeLoad[1].author;
            // console.log(largeLoad[bookIds])
        });
});
apis.controller('BookDetailCtrl3', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[2].name;
            $scope.price=largeLoad[2].price;
            $scope.pubTime=largeLoad[2].pubTime;
            $scope.author=largeLoad[2].author;
            // console.log(largeLoad[bookIds])
        });
});
apis.controller('BookDetailCtrl4', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[3].name;
            $scope.price=largeLoad[3].price;
            $scope.pubTime=largeLoad[3].pubTime;
            $scope.author=largeLoad[3].author;
            // console.log(largeLoad[bookIds])
        });
});
apis.controller('BookDetailCtrl5', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[4].name;
            $scope.price=largeLoad[4].price;
            $scope.pubTime=largeLoad[4].pubTime;
            $scope.author=largeLoad[4].author;
            // console.log(largeLoad[bookIds])
        });
});
apis.controller('BookDetailCtrl6', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[5].name;
            $scope.price=largeLoad[5].price;
            $scope.pubTime=largeLoad[5].pubTime;
            $scope.author=largeLoad[5].author;
            // console.log(largeLoad[bookIds])
        });
});


apis.controller('BookDetailCtrl6', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[6].name;
            $scope.price=largeLoad[6].price;
            $scope.pubTime=largeLoad[6].pubTime;
            $scope.author=largeLoad[6].author;
            // console.log(largeLoad[bookIds])
        });
});
apis.controller('BookDetailCtrl7', function($scope, $http, $state, $stateParams) {
    var bookIds=$stateParams.id-1;
    var id=$stateParams.id-1;
    console.log(bookIds)
    // 请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $http.get('../src/data/books' +id+ '.json')
        .success(function(largeLoad) {
            // $scope.setPagingData(largeLoad);
            // console.log(largeLoad);
            $scope.name=largeLoad[6].name;
            $scope.price=largeLoad[6].price;
            $scope.pubTime=largeLoad[6].pubTime;
            $scope.author=largeLoad[6].author;
            // console.log(largeLoad[bookIds])
        });
});