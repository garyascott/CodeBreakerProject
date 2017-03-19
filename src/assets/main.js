var answer = document.getElementById('answer');
var attempt = document.getElementById('attempt');
var results = document.getElementById('results');
// var answerHidden = Math.floor(Math.random() * 9999) + 0;
// var answerString = answerHidden.toString();
var answerValue = answer.value;
var attemptValue = attempt.value;
var message = document.getElementById('message');

var guess = function() {
    var input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' || attempt.value == '') {
        //alert('firstPart');
        setHiddenFields();

    }

    if (!validateInput(input.value)) {
        //alert('nice');
        return false;
    } else {
        attempt.value = parseInt(attempt.value) + 1;
        getResults(input);
        //alert('last');

    }
}

//implement new functions here
var getResults = function(input) {
    var values = input.value.toString();
    var answerSplit = answer.value.toString().split("");
    var glyphicon = '';
    var temp = answer.value.toString().split("");
    var correct = 0;

    for (var i = 0, x = input.value.length; i < x; i++) {
        console.log(i);
        var valueSplit = values.split("");
        console.log(`${values} : ${valueSplit[i]} : ${answerSplit[i]}`);
        if (valueSplit[i] == answerSplit[i]) {
            //var index = temp.indexOf(valueSplit[i]);
            console.log('before' + temp);
            // if (index > -1) {
            //     temp.splice(index, 1);
            // }

            console.log('after' + temp);
            glyphicon += `<span class="glyphicon glyphicon-ok"></span>`;
            correct += 1;

        } else {
            var count = 0;
            for (var j = 0, anwserLength = answer.value.length; j < anwserLength; j++) {
                if (valueSplit[i] == answer.value[j]) {
                    console.log('no');
                    count = 1;
                }
            }

            if (count > 0) {
                glyphicon += `<span class="glyphicon glyphicon-transfer"></span>`;

            } else {
                glyphicon += `<span class="glyphicon glyphicon-remove"></span>`;
            }

        }
    }

    var result = `
        <div class="row">
        <span class="col-md-6">${input.value}</span>
        <div class="col-md-6">
        ${glyphicon}
        </div>
        </div>
        `;
    results.innerHTML += result;


    if (correct == 4) {
        console.log(correct);
        setMessage('You Win! :)');
        showReplay();
        return showAnswer(true);
    } else {
        if (attempt.value < 10) {
            setMessage('Incorrect, try again.');
        } else {
            setMessage('You Lose! :(');
            showReplay();
            return showAnswer(false);
        }

    }


}


var showReplay = function() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
    setHiddenFields();
}

var code = document.getElementById('code');

var showAnswer = function(boolean) {
    code.innerHTML = answer.value;
    if (boolean) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
}



var validateInput = function(input) {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long. " + input);
        return false;
    }
    return true;
}

var setMessage = function(messageContent) {
    message.innerHTML = messageContent;
}

var setHiddenFields = function() {
    var answerHidden = Math.floor(Math.random() * 9999) + 0;
    var answerString = answerHidden.toString();

    attempt.value = 0;
    if (answerString.length < 4) {
        answerString = "0" + answerString;
    }
    answer.value = answerString;
    console.log(answerString + ' / ' + answerHidden.toString().length);
}