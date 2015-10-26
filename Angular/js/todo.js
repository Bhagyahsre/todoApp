var todo = angular.module('todoApp', []);
todo.controller('todoController', ['$scope', function($scope) {
    $scope.todos = [];
    $scope.count = 0;
    $scope.remain = 0;
    $scope.checke = 0;

    $scope.checked = function() {
        $scope.remaining = $scope.todos.filter(function(item) {
            return item.done
        });
        $scope.checke = $scope.remaining.length;
        $scope.remain = $scope.remains();

    }
    $scope.archive = function() {

        $scope.todos.filter(function(item) {
            return item.done;
        }).forEach(function(item) {
            item.archive = true;
            item.unarchive = false;
        });
        $scope.remain = $scope.remains();
        $scope.count = $scope.todos.length;
        $scope.checke = 0;
    }
    $scope.unarchive = function() {

        $scope.todos.filter(function(item) {
            return item.archive;
        }).forEach(function(item) {
            item.unarchive = true;
            item.archive = false;
            item.done = false;
        });
        $scope.remain = $scope.remains();
        $scope.count = $scope.todos.length;
        $scope.checke = $scope.count - $scope.remain;
    }
    $scope.remains = function() {
        $scope.remaining = $scope.todos.filter(function(item) {
            return !item.done
        });
        return $scope.remaining.length;
    }

    $scope.addTodo = function() {
        $scope.todos.push({
            'title': $scope.todoItem,
            'done': false,
            'archive': false,
            'unarchive': false

        });
        $scope.todoItem = '';
        $scope.count = $scope.todos.length;
        $scope.remain = $scope.remains();


    };
    $scope.remove = function() {
        $scope.todos = $scope.todos.filter(function(item) {
            return (!item.done);
        });
        $scope.remain = $scope.remains();
        $scope.count = $scope.todos.length;
        $scope.checke = 0;

    };

    $scope.toggle = function() {
        flag = true;
        $scope.todos.forEach(function loop(item) {
            if (!item.done) {

                $scope.todos.forEach(function loop(i) {
                    i.done = true;
                    flag = false;
                });
            }
        });
        if (flag) {
            $scope.todos.forEach(function loop(item) {
                item.done = false;
            });
        }
        $scope.remain = $scope.remains();
        $scope.count = $scope.todos.length;
        $scope.checke = $scope.count - $scope.remain;

    };


    $scope.total = function() {
        $scope.count = $scope.todos.length + 1;

    }


}]);
