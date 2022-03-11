const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next");
const prevBtn = document.querySelectorAll("form .prev");
const form = document.querySelector("form");

document.querySelector("#total").innerHTML = steps.length - 1;
document.querySelector("#current").innerHTML = 1;

nextBtn.forEach(button => {
  button.addEventListener("click", () => {
    changeStep("next");
  })
})
prevBtn.forEach(button => {
  button.addEventListener("click", () => {
    changeStep("prev");
  })
})
form.addEventListener("submit", (e) =>{
  e.preventDefault();
  const inputs = [];
  form.querySelectorAll("input").forEach(input => {
    const {name, value} = input;
    inputs.push({name, value});
  })
  console.log(inputs);
  form.reset();
  let index = 0 ;
  const active = document.querySelector("form .step.active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  steps[index++].classList.add("active")
})

function changeStep(btn) {
  let index = 0 ;
  const active = document.querySelector("form .step.active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if(btn === "next"){
    index++;
  }else if(btn === "prev"){
    index--;
  }
  steps[index].classList.add("active");
  document.querySelector("#current").innerHTML = index + 1 ;
}