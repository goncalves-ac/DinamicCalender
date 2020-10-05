let monthList = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
    'Agosto', 'Setembro','Outubro', 'Novembro', 'Dezembro'
];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('callendar-days');
let month = document.getElementById('month');
let year = document.getElementById('year');
let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthList[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', ()=>lastMonth());
nextMonthDOM.addEventListener('click', ()=>nextMonth());



const writeMonth = (month) => {
    let lastDays = 0;

    for(let i = startDay()+1; i>0;i--){
        dates.innerHTML += ` <div class="day">
            ${getTotalDays(monthNumber-1)-(i-1)}
        </div>`;
            lastDays++;
    }

    for(let i=1; i<=getTotalDays(month); i++){
        if(i===currentDay) {
            dates.innerHTML += ` <div class="day">${i}</div>`;
        }else{
            dates.innerHTML += ` <div class="day">${i}</div>`;
        }
    }
    
   for (let i = 1; i <= 42 - (lastDays+getTotalDays(month)); i++) {
        dates.innerHTML += ` <div class="day">${i}</div>`;
   }

   const days = document.querySelectorAll('.day');

for (let i = 0; i <= days.length; i++) {
    if (i == 0 || i == 6 || i == 7 || i == 13 || i == 14 || i == 20 || 
        i == 21 || i == 27 || i == 28 || i == 34 || i == 35 || i == 41) {
        console.log(i)
        days[i].className = "day weekEnd";
    }
}
    
}

const getTotalDays = month => {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return isLeap() ? 29:28;
    }
}

const isLeap = () => {
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

const startDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

const lastMonth = () => {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

const nextMonth = () => {
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }

    setNewDate();
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthList[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

writeMonth(monthNumber);



/** função para ocultar  menu de navegação*/
function windowScreen() {
    const screen = window.innerWidth;
    let menu = document.querySelector('nav');
    let callendarDay = document.querySelector('#callendar-days');
    let callendar = document.querySelector('.callendar');
   
    if (screen <= 1179) {
      menu.className = 'navbar-close';
    } else {
      menu.className = 'navbar-open';
    }
  }

  windowScreen();

  window.addEventListener('resize', ()=>{
    windowScreen();
  });

  const btnMenu = document.querySelector('img.btn-icon');
  
  btnMenu.addEventListener('click',()=>{
    let menu = document.querySelector('nav');
  //  let callendarDay = document.querySelector('#callendar-days');
   // let callendar = document.querySelector('.callendar');

    if (menu.className === 'navbar-close') {
        menu.className = 'navbar-open';
       // callendarDay.style.width = 100+'%';
       // callendar.style.width = 100+'%';
    } else {
       // callendarDay.style.width = 93+'%';
       // callendar.style.width = 93+'%';
        menu.className = 'navbar-close'; 
    }
  })