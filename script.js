let totalTime = 2*60*60; // 2 hours
const timerEl = document.getElementById("timer");

setInterval(() => {
  if(totalTime <=0) submitExam();
  totalTime--;
  let h = Math.floor(totalTime/3600);
  let m = Math.floor((totalTime%3600)/60);
  let s = totalTime%60;
  timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
},1000);

function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }

shuffle(questions);
questions.forEach(q=>shuffle(q.options));

let index=0;
let answers=new Array(questions.length).fill(null);
const box=document.getElementById("question-box");
const nextBtn=document.getElementById("nextBtn");
const prevBtn=document.getElementById("prevBtn");
const submitBtn=document.getElementById("submitBtn");

function loadQuestion(){
  let q=questions[index];
  box.innerHTML=`<p><strong>Question ${index+1} of ${questions.length}</strong></p>
  <p>${q.q}</p>
  ${q.options.map(o=>`<div><input type="radio" name="opt" value="${o}" ${answers[index]===o?'checked':''}>${o}</div>`).join("")}`;
  submitBtn.style.display = index===questions.length-1?"inline":"none";
}

nextBtn.onclick = ()=>{
  let selected = document.querySelector("input[name='opt']:checked");
  if(selected) answers[index]=selected.value;
  if(index<questions.length-1) index++;
  loadQuestion();
};

prevBtn.onclick = ()=>{
  if(index>0) index--;
  loadQuestion();
};

submitBtn.onclick = submitExam;

function submitExam(){
  let score=0;
  let review="";
  questions.forEach((q,i)=>{
    if(answers[i]===q.answer) score++;
    review+=`<p><b>Q${i+1}:</b> ${q.q}<br>Your Answer: ${answers[i]||"None"}<br>Correct Answer: ${q.answer}</p>`;
  });
  document.body.innerHTML=`<div class="container">
  <h2>Exam Completed</h2>
  <h3>Score: ${score}/${questions.length}</h3>
  ${review}
  <button onclick="location.reload()">Retry Exam</button>
  </div>`;
}

loadQuestion();
