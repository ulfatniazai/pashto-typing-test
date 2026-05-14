// PARAGRAPHS

const paragraphs = [

`زما نوم احمد دی او زه په کابل کې ژوند کوم. زه هر سهار ښوونځي ته ځم.`,

`پښتو زموږ خوږه ژبه ده. موږ باید خپله ژبه وساتو.`,

`افغانستان ښکلی هېواد دی.`,

`زه هره ورځ کتاب لولم.`,

`ښوونکی زموږ لارښود دی.`,

`ورزش د انسان روغتیا ښه ساتي.`,

`انټرنېټ د معلوماتو لویه سرچینه ده.`,

`سفر کول تجربه زیاتوي.`,

`پاکوالی د روغتیا لپاره مهم دی.`

];

// ELEMENTS

const typingArea =
document.getElementById("typingArea");

const input =
document.getElementById("hiddenInput");

const timerEl =
document.getElementById("timer");

const resultBox =
document.getElementById("resultBox");

// STATE

let index = 0;

let text = "";

let selectedTime = 15;

let time = 15;

let timerStarted = false;

let interval = null;

let startTime = 0;

let endTime = 0;

// NAVIGATION BUTTONS

const navWrap =
document.createElement("div");

navWrap.className = "result-buttons";

const prevBtn =
document.createElement("button");

prevBtn.innerText = "Previous";

prevBtn.className = "nav-btn";

const nextBtn =
document.createElement("button");

nextBtn.innerText = "Next";

nextBtn.className = "nav-btn";

const restartBtn =
document.createElement("button");

restartBtn.innerText = "Restart";

restartBtn.className = "nav-btn";

navWrap.appendChild(prevBtn);

navWrap.appendChild(nextBtn);

navWrap.appendChild(restartBtn);

// LOAD TEXT

function load(){

    text = paragraphs[index];

    typingArea.innerHTML = "";

    text.split("").forEach((char, i)=>{

        const span =
        document.createElement("span");

        span.innerText = char;

        span.classList.add("char");

        if(i === 0){
            span.classList.add("current");
        }

        typingArea.appendChild(span);

    });

    input.value = "";

    clearInterval(interval);

    timerStarted = false;

    time = selectedTime;

    timerEl.innerText = time;

    typingArea.classList.remove("hidden");

    resultBox.classList.add("hidden");

    focusInput();

}

load();

// FOCUS

function focusInput(){
    input.focus();
}

document.addEventListener(
    "click",
    focusInput
);

// TIME BUTTONS

document.querySelectorAll(".time")
.forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".time")
        .forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedTime =
        parseInt(button.dataset.time);

        time = selectedTime;

        timerEl.innerText = time;

        clearInterval(interval);

        timerStarted = false;

        input.value = "";

        focusInput();

    });

});

// TIMER

function startTimer(){

    startTime = Date.now();

    clearInterval(interval);

    interval = setInterval(()=>{

        time--;

        timerEl.innerText = time;

        if(time <= 0){
            finish();
        }

    },1000);

}

// INPUT

input.addEventListener("input",()=>{

    if(!timerStarted){

        startTimer();

        timerStarted = true;

    }

    const typed = input.value;

    const chars =
    document.querySelectorAll(".char");

    let correctChars = 0;

    chars.forEach((char,i)=>{

        char.classList.remove(
            "correct",
            "incorrect",
            "current"
        );

        if(i === typed.length){
            char.classList.add("current");
        }

        if(!typed[i]) return;

        if(typed[i] === text[i]){

            char.classList.add("correct");

            correctChars++;

        }else{

            char.classList.add("incorrect");

        }

    });

    const accuracy =
    typed.length > 0
    ? Math.round(
        (correctChars / typed.length) * 100
    )
    : 100;

    const wordsTyped =
    typed.trim().length > 0
    ? typed.trim().split(" ").length
    : 0;

    const wpm =
    Math.round(
        wordsTyped * (60 / selectedTime)
    );

    document.getElementById("wpm")
    .innerText = wpm;

    document.getElementById("accuracy")
    .innerText = accuracy;

    if(typed.trim() === text.trim()){
        finish();
    }

});

// ENTER

input.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        e.preventDefault();

        finish();

    }

});

// FINISH

function finish(){

    clearInterval(interval);

    endTime = Date.now();

    const typed =
    input.value.trim();

    const wordsTyped =
    typed.length > 0
    ? typed.split(" ").length
    : 0;

    const wpm =
    Math.round(
        wordsTyped * (60 / selectedTime)
    );

    let correctChars = 0;

    for(let i = 0; i < typed.length; i++){

        if(typed[i] === text[i]){
            correctChars++;
        }

    }

    const accuracy =
    typed.length > 0
    ? Math.round(
        (correctChars / typed.length) * 100
    )
    : 100;

    // TEXT COMPLETION

    const completion =
    Math.min(
        100,
        Math.round(
            (typed.length / text.length) * 100
        )
    );

    typingArea.classList.add("hidden");

    resultBox.classList.remove("hidden");

    resultBox.innerHTML = `

    <div class="modern-result">

        <!-- LEFT -->

        <div class="result-left">

            <h2 class="result-title">
                🏁 Typing Result
            </h2>

            <div class="result-grid">

                <div class="result-item speed">

                    <div class="icon">⚡</div>

                    <div class="label">
                        Speed
                    </div>

                    <div class="value">
                        ${wpm} WPM
                    </div>

                </div>

                <div class="result-item accuracy">

                    <div class="icon">🎯</div>

                    <div class="label">
                        Accuracy
                    </div>

                    <div class="value">
                        ${accuracy}%
                    </div>

                </div>

                <div class="result-item time-card">

                    <div class="icon">⏱</div>

                    <div class="label">
                        Time
                    </div>

                    <div class="value">
                        ${selectedTime}s
                    </div>

                </div>

                <div class="result-item finish">

                    <div class="icon">📝</div>

                    <div class="label">
                        Completed
                    </div>

                    <div class="value">
                        ${completion}%
                    </div>

                </div>

            </div>

        </div>

        <!-- RIGHT -->

        <div class="result-right">

            <div class="graph-card">

                <div class="graph-top">

                    <span>Typing Speed</span>

                    <span>${wpm} WPM</span>

                </div>

                <div class="graph">

                    <div class="graph-fill speed-fill"
                    style="width:${Math.min(wpm,100)}%">
                    </div>

                </div>

            </div>

            <div class="graph-card">

                <div class="graph-top">

                    <span>Accuracy</span>

                    <span>${accuracy}%</span>

                </div>

                <div class="graph">

                    <div class="graph-fill accuracy-fill"
                    style="width:${accuracy}%">
                    </div>

                </div>

            </div>

            <div class="graph-card">

                <div class="graph-top">

                    <span>Text Completion</span>

                    <span>${completion}%</span>

                </div>

                <div class="graph">

                    <div class="graph-fill finish-fill"
                    style="width:${completion}%">
                    </div>

                </div>

            </div>

        </div>

    </div>

    `;

    resultBox.appendChild(navWrap);

    prevBtn.style.display =
    index === 0
    ? "none"
    : "inline-block";

    nextBtn.style.display =
    index === paragraphs.length - 1
    ? "none"
    : "inline-block";

}

// NAVIGATION

nextBtn.addEventListener("click",()=>{

    if(index < paragraphs.length - 1){

        index++;

        load();

    }

});

prevBtn.addEventListener("click",()=>{

    if(index > 0){

        index--;

        load();

    }

});

restartBtn.addEventListener("click",()=>{

    load();

});