const courses = [
      ["Math-1", "English-1", "Physics", "Information-system"],
      ["C-sharp", "Discrete-structure", "Ethics", "Math-2"],
      ["Database-2", "Math-3", "Operating-system", "Report-writing"],
      ["Image-processing", "Network-2", "Math-4"]
];

const check_courses = document.querySelector('#courses');
const get_grades = document.querySelector('#grade');
const radio_button = document.querySelectorAll('[type="radio"]');

/*---------------------------------------------------------------------------------------------------------*/
// Choosing year
radio_button.forEach(function (input) {
      input.addEventListener('click', function (e) {
            checkCourses((e.target.value) - 1);
            document.querySelector('#main').className += '-not';
            document.querySelector('#first-screen').className += ' up';
            document.querySelector('#header').style.opacity = '0';

            if (document.querySelector('#first-row').className === 'appear') {
                  document.querySelector('.appear').className += '-not';
            }
            get_grades.querySelectorAll('[type="number"]').forEach(function (input) {
                  get_grades.removeChild(input);
            })
            get_grades.querySelectorAll('.grade-text').forEach(function (p) {
                  p.parentNode.removeChild(p);
            })
            if (get_grades.querySelector('#enter-your-grade').className !== 'd-none') {
                  document.querySelector('#enter-your-grade').className = 'd-none';
            }
            if (document.querySelector('[type="submit"]').className !== 'd-none') {
                  document.querySelector('[type="submit"]').className = 'd-none';
            }
            if (document.querySelector('#again').className !== 'd-none') {
                  document.querySelector('#again').className = 'd-none';
            }
            if (document.querySelector('#total-gpa').className !== 'd-none') {
                  document.querySelector('#total-gpa').className = 'd-none';
            }



      })
})

/*---------------------------------------------------------------------------------------------------------*/
// Adding course list
function checkCourses(no) {
      check_courses.innerHTML = '';
      courses[no].map(function (course) {
            check_courses.innerHTML += `<div class="row my-3">
            <div class="form-check">
                  <input class="form-check-input" type="checkbox" onclick="getGrades(this)" value="${course}" id="${course}">
                  <label class="form-check-label mx-2" for="${course}">
                        ${course.replace('-', ' ')}
                  </label>
            </div>
      </div>`;
      });
}

/*---------------------------------------------------------------------------------------------------------*/
// Getting grades of the course list
function getGrades(event) {
      get_grades.querySelector('h2').className = 'display-6 my-5';
      document.querySelector('[type=submit]').className = 'btn btn-primary';
      if (event.checked) {
            get_grades.innerHTML += `
            <input type="number" autocomplete="off" class="form-control mt-3" name="${event.value}" id="${event.value}"
            placeholder="Please enter ( ${event.value.replace('-', ' ')} ) grade" required>
            <p class="text-muted grade-text ${event.value}"></p>
            `
      }
      else {
            const element = get_grades.querySelector(`#${event.value}`);
            const p = get_grades.querySelector(`.${event.value}`)
            element.parentNode.removeChild(element);
            p.parentNode.removeChild(p);
            if (document.querySelector('#again').className !== 'd-none') {
                  document.querySelector('#again').className = 'd-none';
            }
            if (document.querySelector('#total-gpa').className !== 'd-none') {
                  document.querySelector('#total-gpa').className = 'd-none';
            }
      }
      // console.log(document.querySelectorAll('input[type="checkbox"]:checked').length)
      if (document.querySelectorAll('input[type="checkbox"]:checked').length == 0) {
            get_grades.querySelector('h2').className = 'd-none';
            document.querySelector('[type=submit]').className = 'd-none';
      }
}


/*---------------------------------------------------------------------------------------------------------*/
// Calculating grades and GPA
document.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      const inputs = get_grades.querySelectorAll('input')
      let total_grades = 0;
      let validation = 1;
      inputs.forEach(function (input) {
            const grade = input.value
            const grade_text = get_grades.querySelector(`.${input.id}`)
            grade_text.innerHTML = "Your grade in this course is ";
            switch (grade <= 100 && grade >= 0) {
                  case grade >= 90:
                        grade_text.innerHTML += "A";
                        total_grades += 4;
                        break;
                  case grade >= 80:
                        grade_text.innerHTML += "B";
                        total_grades += 3;
                        break;
                  case grade >= 70:
                        grade_text.innerHTML += "C";
                        total_grades += 2;
                        break;
                  case grade >= 60:
                        grade_text.innerHTML += "D";
                        total_grades += 1;
                        break;
                  case grade >= 0:
                        grade_text.innerHTML += "F";
                        break;
                  default:
                        grade_text.innerHTML = "Please Enter a valid grade <small>Range from (0 : 100)</small>"
                        grade_text.style.color = "red";
            }
            if (grade <= 100 && grade >= 0) {
                  validation *= 1
            }
            else {
                  validation *= 0
            }
      })
      if (validation === 1) {
            document.querySelector('#total-gpa').innerHTML = `Your GPA is: ${(total_grades / inputs.length).toFixed(2)}`;
            document.querySelector('#total-gpa').className = "display-6 fs-5 p-2 my-3 text-warning";

            document.querySelector('#again').className = "btn btn-warning mx-5"
      }
});

/*---------------------------------------------------------------------------------------------------------*/
// Resting form
document.querySelector('#again').addEventListener('click', function () {
      document.querySelector('.was-validated').reset()
      document.querySelector('#again').className = "d-none";
      document.querySelector('#total-gpa').className = "d-none";
})