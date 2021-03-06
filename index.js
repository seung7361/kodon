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

            if (q[2] == 'U') return ['???????????????', 'F', 'Phe'];
            else if (q[2] == 'C') return ['???????????????', 'F', 'Phe'];
            else if (q[2] == 'A') return ['??????', 'L', 'Leu'];
            else if (q[2] == 'G') return ['??????', 'L', 'Leu'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['??????', 'S', 'Ser'];
            else if (q[2] == 'C') return ['??????', 'S', 'Ser'];
            else if (q[2] == 'A') return ['??????', 'S', 'Ser'];
            else if (q[2] == 'G') return ['??????', 'S', 'Ser'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['????????????', 'Y', 'Tyr'];
            else if (q[2] == 'C') return ['????????????', 'Y', 'Tyr'];
            else if (q[2] == 'A') return ['????????????', '(ending)', '(ending)'];
            else if (q[2] == 'G') return ['????????????', '(ending)', '(ending)'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['????????????', 'C', 'Cys'];
            else if (q[2] == 'C') return ['????????????', 'C', 'Cys'];
            else if (q[2] == 'A') return ['????????????', '(ending)', '(ending)'];
            else if (q[2] == 'G') return ['????????????', 'W', 'Trp'];

        }

    } else if (q[0] == 'C') {

        if (q[1] == 'U') {

            if (q[2] == 'U') return ['??????', 'L', 'Leu'];
            else if (q[2] == 'C') return ['??????', 'L', 'Leu'];
            else if (q[2] == 'A') return ['??????', 'L', 'Leu'];
            else if (q[2] == 'G') return ['??????', 'L', 'Leu'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['?????????', 'P', 'Pro'];
            else if (q[2] == 'C') return ['?????????', 'P', 'Pro'];
            else if (q[2] == 'A') return ['?????????', 'P', 'Pro'];
            else if (q[2] == 'G') return ['?????????', 'P', 'Pro'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['????????????', 'H', 'His'];
            else if (q[2] == 'C') return ['????????????', 'H', 'His'];
            else if (q[2] == 'G') return ['????????????', 'Q', 'Gln'];
            else if (q[2] == 'A') return ['????????????', 'Q', 'Gln'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['????????????', 'R', 'Arg'];
            else if (q[2] == 'C') return ['????????????', 'R', 'Arg'];
            else if (q[2] == 'G') return ['????????????', 'R', 'Arg'];
            else if (q[2] == 'A') return ['????????????', 'R', 'Arg'];

        }

    } else if (q[0] == 'A') {

        if (q[1] == 'U') {

            if (q[2] == 'U') return ['???????????????', 'I', 'Ile'];
            else if (q[2] == 'C') return ['???????????????', 'I', 'Ile'];
            else if (q[2] == 'G') return ['???????????????', 'M', 'Met'];
            else if (q[2] == 'A') return ['???????????????', 'I', 'Ile'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['????????????', 'T', 'Thr'];
            else if (q[2] == 'C') return ['????????????', 'T', 'Thr'];
            else if (q[2] == 'G') return ['????????????', 'T', 'Thr'];
            else if (q[2] == 'A') return ['????????????', 'T', 'Thr'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['???????????????', 'N', 'Asn'];
            else if (q[2] == 'C') return ['???????????????', 'N', 'Asn'];
            else if (q[2] == 'G') return ['?????????', 'K', 'Lys'];
            else if (q[2] == 'A') return ['?????????', 'K', 'Lys'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['??????', 'S', 'Ser'];
            else if (q[2] == 'C') return ['??????', 'S', 'Ser'];
            else if (q[2] == 'G') return ['????????????', 'R', 'Arg'];
            else if (q[2] == 'A') return ['????????????', 'R', 'Arg'];

        }

    } else if (q[0] == 'G') {

        if (q[1] == 'U') {

            if (q[2] == 'U') return ['??????', 'V', 'Val'];
            else if (q[2] == 'C') return ['??????', 'V', 'Val'];
            else if (q[2] == 'G') return ['??????', 'V', 'Val'];
            else if (q[2] == 'A') return ['??????', 'V', 'Val'];

        } else if (q[1] == 'C') {

            if (q[2] == 'U') return ['?????????', 'A', 'Ala'];
            else if (q[2] == 'C') return ['?????????', 'A', 'Ala'];
            else if (q[2] == 'G') return ['?????????', 'A', 'Ala'];
            else if (q[2] == 'A') return ['?????????', 'A', 'Ala'];

        } else if (q[1] == 'A') {

            if (q[2] == 'U') return ['???????????????', 'D', 'Asp'];
            else if (q[2] == 'C') return ['???????????????', 'D', 'Asp'];
            else if (q[2] == 'G') return ['????????????', 'E', 'Glu'];
            else if (q[2] == 'A') return ['????????????', 'E', 'Glu'];

        } else if (q[1] == 'G') {

            if (q[2] == 'U') return ['?????????', 'G', 'Gly'];
            else if (q[2] == 'C') return ['?????????', 'G', 'Gly'];
            else if (q[2] == 'G') return ['?????????', 'G', 'Gly'];
            else if (q[2] == 'A') return ['?????????', 'G', 'Gly'];

        }
    }
}

function get_current_answer() {
    return get_codon_info($('.first').text().trim() + $('.second').text().trim() + $('.third').text().trim())[mode];
}