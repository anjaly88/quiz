const quizContainer=document.getElementById("quiz");
const resultContainer=document.getElementById("result");
const submitButton=document.getElementById("submit");
const previousButton=document.getElementById("previous");
const nextButton=document.getElementById("next");
const tryButton=document.getElementById("try");

let currentQuestion,questionNumber;
    let currentSlide = 0;
const myQuestions=[{
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }]
  function buildQuiz(){
    const output=[];
    myQuestions.forEach((currentQuestion,questionNumber)=>{
        const answers=[];
        for(var letter in currentQuestion.answers){
            answers.push( 
                `<div><label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                   ${letter}  :
                   ${currentQuestion.answers[letter]}
                   </label></div>`
                 
             );
        }
        output.push(
            `<div class="slide">
            <div class="question"> ${currentQuestion.question}</div>
            <div class="answers"> ${answers.join(" ")}</div>
            </div>`
          );
    }
    )
    quizContainer.innerHTML=output.join(' ');

}
buildQuiz();
showSlide(currentSlide);

function showResults(){
const answerContainers=quizContainer.querySelectorAll('.answers');
let numCorrect=0;
myQuestions.forEach((currentQuestion,questionNumber)=>{
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if(userAnswer===currentQuestion.correctAnswer){
    numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  quizContainer.innerHTML = `Your score is ${numCorrect} out of ${myQuestions.length}`;
  tryButton.style.display = 'inline-block';

}
function showSlide(n) {
    var slides = document.querySelectorAll(".slide");
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
      tryButton.style.display = 'none';

    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      previousButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
      tryButton.style.display = 'none';

    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
    document.getElementById("questionNumber").innerHTML=`Question ${currentSlide+1} of 3`;
  }
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  function refreshPage(){
    window.location.reload();
} 
submitButton.addEventListener("click",showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
tryButton.addEventListener("click",refreshPage);