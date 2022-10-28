var quiz = document.getElementById("quiz"),
  Qusetion = document.getElementById("Qusetion"),
  answer = document.querySelectorAll(".answer"),
  a_text = document.getElementById("a_text"),
  b_text = document.getElementById("b_text"),
  c_text = document.getElementById("c_text"),
  d_text = document.getElementById("d_text"),
  submit = document.getElementById("submit"),
  label  = document.querySelectorAll(".ab"),
  quiz_header = document.querySelector(".quiz-header");

let currentQuiz = 0;
let score = 0;

function getquestion() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let qobject = JSON.parse(this.responseText);

      loadQuiz();
      function loadQuiz() {
        deselect();
        checke();
        var currentQuizData = qobject[currentQuiz];
        Qusetion.innerHTML = currentQuizData.question;
        a_text.innerHTML = currentQuizData.a;
        b_text.innerHTML = currentQuizData.b;
        c_text.innerHTML = currentQuizData.c;
        d_text.innerHTML = currentQuizData.d;
      }

      function deselect() {
        answer.forEach((element) => (element.checked = false));
        submit.setAttribute("disabled", "");
        submit.style.backgroundColor = "transparent";
        submit.style.cursor = "none";
        submit.style.color = "var(--primary-color)";
      }

      function checke() {
        answer.forEach((e) => {
          e.onclick = function () {
            submit.removeAttribute("disabled");
            submit.style.backgroundColor = " var(--primary-color)";
            submit.style.cursor = "pointer";
            submit.style.color = "white";
          };
        });
      }

      function getSelected() {
        let ans;
        answer.forEach((answe) => {
          if (answe.checked) {
            ans = answe.id;
          }
        });
        return ans;
      }

      submit.addEventListener("click", () => {
        var ans = getSelected();
        if (ans) {
          if (ans === qobject[currentQuiz].correct) {
            score++;
          }
        }
        currentQuiz++;
        if (currentQuiz < qobject.length) {
          loadQuiz();
        } else if (score >= 4) {
          quiz.innerHTML = `
                    <h2>you got <span> ${score}</span> out of <span> ${qobject.length} </span></h2>
                    <video width="200" height="200" autoplay >
                    <source src="video/clap.mp4" type="video/mp4"></video>
                    <button class="back" style="display:block;"><a href="index.html">&leftarrow;</a></button>
                    `;
        } else if (score <= 3) {
          quiz.innerHTML = `<h2>you got <span> ${score}</span> out of <span> ${qobject.length} </span></h2>
                    <button class="back" style="display:block;"><a href="index.html">&leftarrow;</a></button> 
                    `;
        }
      });
    }
  };
  request.open("GET", "Question.json", true);
  request.send();
}
var start = document.querySelector(".start"),
  categories = document.querySelector(".categories");
start.onclick = function () {
  getquestion();
  quiz_header.style.display = "flex";
  start.style.display = "none";
};
