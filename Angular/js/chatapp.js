    var ref = new Firebase('https://kato-typing.firebaseio-demo.com/');


    var messageField = $('#messageInput');

    var messageList = $('#example-messages');

    var to;
    $('#messageInput').keydown(isTyping);
    ref.on('value', logValue);

    function isTyping() {

        if (to) {
            clearTimeout(to);
            to = null;
        }
        ref.set('Is typing');
        to = $('#messageInput').enter(stoppedTyping);
    }

    function stoppedTyping(snapshot) {
        to = null;
        ref.remove();
    }

    function logValue(snapshot) {
        // if (!snapshot.val())
        $('.person-typing').text(snapshot.val());

    }


    messageField.keypress(function(e) {
        if (e.keyCode == 13) {
            var message = messageField.val();
            ref
                .push({
                    text: message
                });
            messageField.val('');
        }
    });

    ref.limitToLast(5).on('child_added', function(snapshot) {


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


            // document.getElementsByClassName('person-typing')[0].innerHTML = "person typing";
        }

    }]);
