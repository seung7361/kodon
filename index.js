$('#icon').click(function() {
    $('.settings').css('transform', 'translate(0, 5%)');
    $('.total').css({
        'filter': 'blur(5px)',
        '-webkit-filter': 'blur(5px)'
    });
});

$('#Xicon').click(function() {
    $('.settings').css('transform', 'translate(0, 200%)');
    $('.total').css({
        'filter': 'blur(0)',
        '-webkit-filter': 'blur(0)'
    });
});


let mode = '0';
$('#kr').click(function() {
    mode = '0';
    $('#kr').removeClass('active');
    $('#eng3').removeClass('active');
    $('#eng1').removeClass('active');

    $('#kr').addClass('active');
    taketurn();
});

$('#eng3').click(function() {
    mode = '2';
    $('#kr').removeClass('active');
    $('#eng3').removeClass('active');
    $('#eng1').removeClass('active');

    $('#eng3').addClass('active');
    taketurn();
});

$('#eng1').click(function() {
    mode = '1';
    $('#kr').removeClass('active');
    $('#eng3').removeClass('active');
    $('#eng1').removeClass('active');

    $('#eng1').addClass('active');
    taketurn();
});

$('#one').click(function() { answer($(this).text(), 1); });
$('#two').click(function() { answer($(this).text(), 2); });
$('#three').click(function() { answer($(this).text(), 3); });
$('#four').click(function() { answer($(this).text(), 4); });

let animation = false;

function answer(user_ans, num) {
    if (animation) return 0;


    if (user_ans == (get_current_answer())) {
        taketurn();
    } else {
        $('#' + num_to_text(num)).css('background-color', '#FF4841');
        setTimeout(function() {
            $('#' + num_to_text(num)).css('background-color', '#0072de')
        }, 300);
    }
}

const codon = ['A', 'U', 'C', 'G'];

function taketurn() {
    animation = true;

    $('#' + num_to_text(1)).css('background-color', '#5DD9BE');
    $('#' + num_to_text(2)).css('background-color', '#5DD9BE');
    $('#' + num_to_text(3)).css('background-color', '#5DD9BE');
    $('#' + num_to_text(4)).css('background-color', '#5DD9BE');

    for (let i = 0; i < 30; i++) {
        setTimeout(function() {
            $('.first').html(codon[Math.round(rng(0, 4))]);
            $('.second').html(codon[Math.round(rng(0, 4))]);
            $('.third').html(codon[Math.round(rng(0, 4))]);
        }, Math.pow(1.3, i));
    }

    setTimeout(function() {
        callback();
    }, Math.pow(1.3, 30));

}

function callback() {
    let random_answers = make_answers();

    $('#one').html(random_answers[0]);
    $('#two').html(random_answers[1]);
    $('#three').html(random_answers[2]);
    $('#four').html(random_answers[3]);

    $('#' + num_to_text(1)).css('background-color', '#0072de');
    $('#' + num_to_text(2)).css('background-color', '#0072de');
    $('#' + num_to_text(3)).css('background-color', '#0072de');
    $('#' + num_to_text(4)).css('background-color', '#0072de');

    animation = false;
}

function rng(min, max) {
    return Math.random() * (max - min) + min;
}

function make_answers() {
    let curr_que = $('.first').text().trim() + $('.second').text().trim() + $('.third').text().trim();
    let curr_ans = get_codon_info(curr_que)[mode];
    curr_que = curr_que.split('');
    let answers = new Array();

    for (let i = 0; i < curr_que.length; i++) {

        for (let j = 0; j < codon.length; j++) {
            if (i == 0) {

                if (!answers.includes(get_codon_info(codon[i] + curr_que[1] + curr_que[2])[mode]) && get_codon_info(codon[i] + curr_que[1] + curr_que[2])[mode] != curr_ans) answers.push(get_codon_info(codon[i] + curr_que[1] + curr_que[2])[mode]);

            } else if (i == 1) {

                if (!answers.includes(get_codon_info(curr_que[0] + codon[i] + curr_que[2])[mode]) && get_codon_info(curr_que[0] + codon[i] + curr_que[2])[mode] != curr_ans) answers.push(get_codon_info(curr_que[0] + codon[i] + curr_que[2])[mode]);

            } else if (i == 2) {

                if (!answers.includes(get_codon_info(curr_que[0] + curr_que[1] + codon[i])[mode]) && get_codon_info(curr_que[0] + curr_que[1] + codon[i])[mode] != curr_ans) answers.push(get_codon_info(curr_que[0] + curr_que[1] + codon[i])[mode]);

            }
        }

    }

    if (answers.length == 3) {
        answers.push(get_current_answer());
        return shuffle(answers);
    } else if (answers.length < 3) {

        while (answers.length != 3) {
            let tempcodon = get_codon_info(randomelement(codon) + randomelement(codon) + randomelement(codon))[mode];
            if (!answers.includes(tempcodon)) answers.push(tempcodon);
        }
        answers.push(get_current_answer());
        return shuffle(answers);

    } else if (answers.length > 3) {

        let finalanswer = new Array();
        while (finalanswer.length != 3) {
            b = randomelement(answers);
            if (!finalanswer.includes(b)) {
                finalanswer.push(b);
            }
        }
        finalanswer.push(get_current_answer());
        return shuffle(finalanswer);

    }
}

function randomelement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function text_to_num(string) {
    if (string == 'one') {
        return 1;
    } else if (string == 'two') {
        return 2;
    } else if (string == 'three') {
        return 3;
    } else if (string == 'four') {
        return 4;
    }
}

function num_to_text(num) {
    if (num == 1) {
        return 'one';
    } else if (num == 2) {
        return 'two';
    } else if (num == 3) {
        return 'three';
    } else if (num == 4) {
        return 'four';
    }
}

function get_codon_info(q) {
    q = q.toString().split('');

    if (q[0] == 'U') {

        if (q[1] == 'U') {

            if (q[2] == 'U') return ['페닐알라닌', 'F', 'Phe'];
            else if (q[2] == 'C') return ['페닐알라닌', 'F', 'Phe'];
            else if (q[2] == 'A') return ['류신', 'L', 'Leu'];
            else if (q[2] == 'G') return ['류신', 'L', 'Leu'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['세린', 'S', 'Ser'];
            else if (q[2] == 'C') return ['세린', 'S', 'Ser'];
            else if (q[2] == 'A') return ['세린', 'S', 'Ser'];
            else if (q[2] == 'G') return ['세린', 'S', 'Ser'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['타이로신', 'Y', 'Tyr'];
            else if (q[2] == 'C') return ['타이로신', 'Y', 'Tyr'];
            else if (q[2] == 'A') return ['종결코돈', '(ending)', '(ending)'];
            else if (q[2] == 'G') return ['종결코돈', '(ending)', '(ending)'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['시스테인', 'C', 'Cys'];
            else if (q[2] == 'C') return ['시스테인', 'C', 'Cys'];
            else if (q[2] == 'A') return ['종결코돈', '(ending)', '(ending)'];
            else if (q[2] == 'G') return ['트립토판', 'W', 'Trp'];

        }

    } else if (q[0] == 'C') {

        if (q[1] == 'U') {

            if (q[2] == 'U') return ['류신', 'L', 'Leu'];
            else if (q[2] == 'C') return ['류신', 'L', 'Leu'];
            else if (q[2] == 'A') return ['류신', 'L', 'Leu'];
            else if (q[2] == 'G') return ['류신', 'L', 'Leu'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['프롤린', 'P', 'Pro'];
            else if (q[2] == 'C') return ['프롤린', 'P', 'Pro'];
            else if (q[2] == 'A') return ['프롤린', 'P', 'Pro'];
            else if (q[2] == 'G') return ['프롤린', 'P', 'Pro'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['히스티딘', 'H', 'His'];
            else if (q[2] == 'C') return ['히스티딘', 'H', 'His'];
            else if (q[2] == 'G') return ['글루타민', 'Q', 'Gln'];
            else if (q[2] == 'A') return ['글루타민', 'Q', 'Gln'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['아르지닌', 'R', 'Arg'];
            else if (q[2] == 'C') return ['아르지닌', 'R', 'Arg'];
            else if (q[2] == 'G') return ['아르지닌', 'R', 'Arg'];
            else if (q[2] == 'A') return ['아르지닌', 'R', 'Arg'];

        }

    } else if (q[0] == 'A') {

        if (q[1] == 'U') {

            if (q[2] == 'U') return ['아이소류신', 'I', 'Ile'];
            else if (q[2] == 'C') return ['아이소류신', 'I', 'Ile'];
            else if (q[2] == 'G') return ['메싸이오닌', 'M', 'Met'];
            else if (q[2] == 'A') return ['아이소류신', 'I', 'Ile'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['트레오닌', 'T', 'Thr'];
            else if (q[2] == 'C') return ['트레오닌', 'T', 'Thr'];
            else if (q[2] == 'G') return ['트레오닌', 'T', 'Thr'];
            else if (q[2] == 'A') return ['트레오닌', 'T', 'Thr'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['아스파라진', 'N', 'Asn'];
            else if (q[2] == 'C') return ['아스파라진', 'N', 'Asn'];
            else if (q[2] == 'G') return ['라이신', 'K', 'Lys'];
            else if (q[2] == 'A') return ['라이신', 'K', 'Lys'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['세린', 'S', 'Ser'];
            else if (q[2] == 'C') return ['세린', 'S', 'Ser'];
            else if (q[2] == 'G') return ['아르지닌', 'R', 'Arg'];
            else if (q[2] == 'A') return ['아르지닌', 'R', 'Arg'];

        }

    } else if (q[0] == 'G') {

        if (q[1] == 'U') {

            if (q[2] == 'U') return ['발린', 'V', 'Val'];
            else if (q[2] == 'C') return ['발린', 'V', 'Val'];
            else if (q[2] == 'G') return ['발린', 'V', 'Val'];
            else if (q[2] == 'A') return ['발린', 'V', 'Val'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['알라닌', 'A', 'Ala'];
            else if (q[2] == 'C') return ['알라닌', 'A', 'Ala'];
            else if (q[2] == 'G') return ['알라닌', 'A', 'Ala'];
            else if (q[2] == 'A') return ['알라닌', 'A', 'Ala'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['아스파트산', 'D', 'Asp'];
            else if (q[2] == 'C') return ['아스파트산', 'D', 'Asp'];
            else if (q[2] == 'G') return ['글루탐산', 'E', 'Glu'];
            else if (q[2] == 'A') return ['글루탐산', 'E', 'Glu'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['글리신', 'G', 'Gly'];
            else if (q[2] == 'C') return ['글리신', 'G', 'Gly'];
            else if (q[2] == 'G') return ['글리신', 'G', 'Gly'];
            else if (q[2] == 'A') return ['글리신', 'G', 'Gly'];

        }
    }
}

function get_current_answer() {
    return get_codon_info($('.first').text().trim() + $('.second').text().trim() + $('.third').text().trim())[mode];
}