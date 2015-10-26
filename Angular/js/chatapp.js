    var messagesRef = new Firebase('https://tj9557bm2lq.firebaseio-demo.com/');


    var messageField = $('#messageInput');

    var messageList = $('#example-messages');


    messageField.keypress(function(e) {
        if (e.keyCode == 13) {


            var message = messageField.val();


            messagesRef.push({
                text: message
            });
            messageField.val('');
        }
    });


    messagesRef.limitToLast(5).on('child_added', function(snapshot) {


        var data = snapshot.val();
        var message = data.text;

        var messageElement = $("<li>");
        var nameElement = $("<strong class='example-chat-username'></strong>")

        messageElement.text(message);

        messageList.append(messageElement)


        messageList[0].scrollTop = messageList[0].scrollHeight;
    });
    var chatapp = angular.module('typingmodule', []);
    chatapp.controller('chatAppController', ['$scope', function($scope) {
    
        $scope.typing = function() {
       
           
            document.getElementsByClassName('person-typing')[0].innerHTML="person typing";
        }

    }]);
