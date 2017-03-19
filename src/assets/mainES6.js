let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let results = document.getElementById('results');
let answerHidden = Math.floor(Math.random() * 9999) + 0;
let answerString = answerHidden.toString();
let answerValue = answer.value;
let attemptValue = attempt.value;
let message = document.getElementById('message');

let guess = () => {
    let input = document.getElementById('user-guess');
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
let getResults = (input) => {
    let values = input.value.toString();
    let answerSplit = answer.value.toString().split("");
    let glyphicon = '';
    let temp = answer.value.toString().split("");
    let correct = 0;

    for (let i = 0, x = input.value.length; i < x; i++) {
        console.log(i);
        let valueSplit = values.split("");
        console.log(`${values} : ${valueSplit[i]} : ${answerSplit[i]}`);
        if (valueSplit[i] == answerSplit[i]) {
            //let index = temp.indexOf(valueSplit[i]);
            console.log('before' + temp);
            // if (index > -1) {
            //     temp.splice(index, 1);
            // }

            console.log('after' + temp);
            glyphicon += `<span class="glyphicon glyphicon-ok"></span>`;
            correct += 1;

        } else {
            let count = 0;
            for (let j = 0, anwserLength = answer.value.length; j < anwserLength; j++) {
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

    let result = `
        <div class="row">
        <span class="col-md-6">${input.value}</span>
        <div class="col-md-6">
        ${glyphicon}
        </div>
        </div>
        `;
    results.innerHTML += result;


    if (correct == answerHidden.toString().length) {
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


let showReplay = () => {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}

let code = document.getElementById('code');

let showAnswer = (boolean) => {
    code.innerHTML = answer.value;
    if (boolean) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
}



let validateInput = (input) => {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long. " + input);
        return false;
    }
    return true;
}

let setMessage = (messageContent) => {
    message.innerHTML = messageContent;
}

let setHiddenFields = () => {
    attempt.value = 0;
    if (answerString.length < 4) {
        answerString = "0" + answerString;
    }
    answer.value = answerString;
    console.log(answerString + ' / ' + answerHidden.toString().length);
}