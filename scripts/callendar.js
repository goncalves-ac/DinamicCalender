let monthList = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
    'Agosto', 'Setembro','Outubro', 'Novembro', 'Dezembro'
];

let weekList = [
    'Domingo','Segunda-feira','Terça-feira','Quarta-feira',
    'Quinta-feira','Sexta-feira','Sábado'
];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('callendar-month');
let month = document.getElementById('currentMonth');
let year = document.getElementById('currentYear');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthList[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', ()=>lastMonth());
nextMonthDOM.addEventListener('click', ()=>nextMonth());

let weekNumber = 1;
let dayNumber = currentDay;

const table = document.querySelector('table');
const btnEvent = document.querySelectorAll('.btn-event');

for (let i = 0; i < btnEvent.length; i++){
    btnEvent[i].addEventListener('click',() => {
       activeBtn(btnEvent[i]);
    });
}    

const activeBtn = (events) => {
    for (let i = 0; i < btnEvent.length; i++) {
        btnEvent[i].className = 'btn btn-primary btn-event';
    }
    events.className = 'btn btn-primary active btn-event';
    titleCallendar(events.innerText);
}

const titleCallendar = (param) => {

    if (param === 'Dia') {
       
        month.textContent = monthList[monthNumber];
        dates.innerHTML = '';
        table.style.display = 'none';
        writeDay(monthNumber,dayNumber);

    } else if (param === 'Semana') {
        
        month.textContent = monthList[monthNumber];
        dates.innerHTML = '';
        table.style.display = 'table';
        writeWeek(monthNumber,weekNumber);

    } else {
        
        month.textContent = monthList[monthNumber];
        year.textContent = currentYear.toString();
        dates.innerHTML = '';
        table.style.display = 'table';
        writeMonth(monthNumber);

    }
}

const activeWeek  = () => {
    let lastDays = 0;
    let temp = 0;
    let aux = 0;
    let count = 1;

    for (let i = startDay()+1; i>0;i--){    
        lastDays++;
    }

    for (let i = 1;  i <= (7 - lastDays);  i++) {
        temp++;
    }

    for(let i=1; i<= getTotalDays(month); i++){
        
        if (i===currentDay) {
           return count;
        }

        if (aux == 7 || aux == 14 || aux == 21 || aux == 28 ) {
            count++;
        }

        aux++;
    }
}
let activeDay = currentDate.getDay();
const writeDay = (month,dayNumber) => {

    let count = 0;
    
    if (currentDay === dayNumber) {
        for (let i =1; i <=getTotalDays(month); i++) {
            if(i === currentDay) {        
                dates.innerHTML += ` <div class="currentDay">${weekList[activeDay]}</div>`;  
                dates.innerHTML += ` <div id="callendar-day">${i}</div>`;
            }        
        }
        
    } else if (dayNumber > currentDay){
        for (let i = dayNumber; i <=getTotalDays(month); i++) {
            if (count === 0) {  
                dates.innerHTML += ` <div class="currentDay">${weekList[activeDay]}</div>`;
                dates.innerHTML += ` <div id="callendar-day">${i}</div>`;
            }
            count++;
        }

    } else {
        for (let i = getTotalDays(month); i >= dayNumber; i--) {
            if (dayNumber === i) {
                dates.innerHTML += ` <div class="currentDay">${weekList[activeDay]}</div>`;  
                dates.innerHTML += ` <div id="callendar-day">${i}</div>`;
                
            }
        }

    }
    
    return getTotalDays(month);

}

const readWeek = (month,weekNumber) =>{

    let lastDays = 0;
    let temp = 0;
    let aux = 0;

    switch (weekNumber) {
        case 1:
            for(let i = startDay()+1; i>0;i--){
                lastDays++;
            }

            if (lastDays < 7) {
                temp = 7 - lastDays;
                    for(let i = startDay()+1; i>0;i--){
                        dates.innerHTML += ` <div class="day-week">
                                ${getTotalDays(monthNumber-1)-(i-1)}
                            </div>`;
                        lastDays++;
                    }
               
            } else {
                temp = 7;
            }

            for (let i = 1; i <= temp; i++) {
                if(i===currentDay) {
                    dates.innerHTML += ` <div class="day-week active">${i}</div>`;
                }else{
                    dates.innerHTML += ` <div class="day-week">${i}</div>`;
                    dayLast = i;
                }
            }
           
           if (month === 1|| month === 2 || month === 5 || month === 8 || month === 10) {
               return weekNumber = 5;
           } else {
               return weekNumber = 4;
           }

        break;
        
        case 2:
            
            for(let i = startDay()+1; i>0;i--){
                lastDays++;
            }

            if (lastDays < 7) {
                temp = 7 - lastDays;
            } else {
                temp = 7;
            }

            for (let i =temp+1; i <=getTotalDays(month); i++) {
                if (aux < 7) {
                    if(i===currentDay) {
                        dates.innerHTML += ` <div class="day-week active">${i}</div>`;
                    }else{
                        dates.innerHTML += ` <div class="day-week">${i}</div>`;
                        
                    }
                }
                aux++;
            }
            
        break;

        case 3:
            for(let i = startDay()+1; i>0;i--){
                lastDays++;
            }

            if (lastDays < 7) {
                temp = 7 - lastDays;
            } else {
                temp = 7;
            }

            for (let i =temp+1+7; i <=getTotalDays(month); i++) {
                if (aux < 7) {
                    if(i===currentDay) {
                        dates.innerHTML += ` <div class="day-week active">${i}</div>`;
                    }else{
                        dates.innerHTML += ` <div class="day-week">${i}</div>`;
                    }
                }
                aux++;
            }

        break;

        case 4:
            for(let i = startDay()+1; i>0;i--){
                lastDays++;
            }

            if (lastDays < 7) {
                temp = 7 - lastDays;
            } else {
                temp = 7;
            }

            for (let i =temp+1+7+7; i <=getTotalDays(month); i++) {
                if (aux < 7) {
                    if(i===currentDay) {
                        dates.innerHTML += ` <div class="day-week active">${i}</div>`;
                    }else{
                        dates.innerHTML += ` <div class="day-week">${i}</div>`;
                    }
                }
                aux++;
            }

        break;

        case 5:
            for(let i = startDay()+1; i>0;i--){
                lastDays++;
            }

            if (lastDays < 7) {
                temp = 7 - lastDays;
            } else {
                temp = 7;
            }

            for (let i =temp+1+7+7+7; i <=getTotalDays(month); i++) {
                if (aux < 7) {
                    if(i===currentDay) {
                        dates.innerHTML += ` <div class="day-week active">${i}</div>`;
                    }else{
                        dates.innerHTML += ` <div class="day-week">${i}</div>`;
                    }
                }
                aux++;
            }
           
            if (aux <= 6) {
                aux = 7 - aux;
               
                for(let i = 1; i <= aux; i++) {
                    if(i===currentDay) {
                        dates.innerHTML += ` <div class="day-week active">${i}</div>`;
                    }else{
                        dates.innerHTML += ` <div class="day-week">${i}</div>`;
                    }
                }
                return weekNumber = 2
            } else {
                return weekNumber = 1;
            }  
              
        break;
        
    }

}


const writeWeek = (month,weekNumber) => {

    switch (month) {
        case 0: 
          readWeek(month,weekNumber);  
        break;

        case 1:
            readWeek(month,weekNumber);      
        break;

        case 2:
            readWeek(month,weekNumber);      
        break;

        case 3:
            readWeek(month,weekNumber);      
        break;

        case 4:
            readWeek(month,weekNumber);      
        break;

        case 5:
            readWeek(month,weekNumber);      
        break;

        case 6:
            readWeek(month,weekNumber);      
        break;

        case 7:
            readWeek(month,weekNumber);      
        break;

        case 8:
            readWeek(month,weekNumber);      
        break;

        case 9:
            readWeek(month,weekNumber);      
        break;

        case 10:
            readWeek(month,weekNumber);      
        break;

        case 11:
            readWeek(month,weekNumber);      
        break;
    }
     
}

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
            dates.innerHTML += ` <div class="day active">${i}</div>`;
        }else{
            dates.innerHTML += ` <div class="day">${i}</div>`;
        }
    }
    
   for (let i = 1; i <= 42 - (lastDays + getTotalDays(month)); i++) {
        dates.innerHTML += ` <div class="day">${i}</div>`;
   }

   const days = document.querySelectorAll('.day');

    for (let i = 0; i <= days.length; i++) {
        if (i == 0 || i == 6 || i == 7 || i == 13 || i == 14 || i == 20 || 
            i == 21 || i == 27 || i == 28 || i == 34 || i == 35 || i == 41) {
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
let active =  document.querySelector('.btn-event.active');
    switch(active.innerText) {
        case 'Dia':
            if (dayNumber !== 1) {
                dayNumber--;
            } else {
                dayNumber = writeDay(monthNumber,dayNumber);
                
                if(monthNumber !== 0){
                    monthNumber--;
                }else{
                    monthNumber = 11;
                    currentYear--;
                }
            }

            if (activeDay !== 0) {
                activeDay--;
            } else {
                activeDay = 6;
            }
            setNewDay();
        break;

        case 'Semana':
            if(weekNumber !== 1){
                weekNumber--;
            }else{
                if (5 === readWeek(monthNumber,weekNumber)) {
                    weekNumber = 5;
                } else if (4 === readWeek(monthNumber,weekNumber)){
                    weekNumber = 4;
                }
                if(monthNumber !== 0){
                    monthNumber--;
                }else{
                    monthNumber = 11;
                    currentYear--;
                }
            }
            setNewWeek();
        break;
        default: 
            if(monthNumber !== 0){
                monthNumber--;
            }else{
                monthNumber = 11;
                currentYear--;
            }
            setNewDate();
        break;
    }

}

const nextMonth = () => {
    let active =  document.querySelector('.btn-event.active');
    switch(active.innerText) {
        case 'Dia':
            if (dayNumber !== writeDay(monthNumber,dayNumber)) {
                dayNumber++;
            } else {
                dayNumber = 1;
                if(monthNumber !== 11){
                    monthNumber++;
                }else{
                    monthNumber = 0;
                    currentYear++;
                }
            }

            if (activeDay !== 6) {
                activeDay++;
            } else {
                activeDay = 0;
            }

            setNewDay();
        break;

        case 'Semana':

            if(weekNumber !== 5){
                weekNumber++;
            }else{
                weekNumber = readWeek(monthNumber,weekNumber);
                if (monthNumber !== 11) {
                    monthNumber++;
                } else {
                    monthNumber = 0;
                    currentYear++; 
                }
            }
            setNewWeek();
        break;
        default: 
            if(monthNumber !== 11){
                monthNumber++;
            }else{
                monthNumber = 0;
                currentYear++;
            }
            setNewDate();
        break;
    }
}

const setNewDay = () => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthList[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeDay(monthNumber,dayNumber);
} 

const setNewWeek = () => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthList[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeWeek(monthNumber,weekNumber);
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthList[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

writeMonth(monthNumber);

const screen = window.innerWidth;
/** função para ocultar  menu de navegação*/
function windowScreen() {
    
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

    if (menu.className === 'navbar-close') {
        menu.className = 'navbar-open';
    } else {
        menu.className = 'navbar-close'; 
    }
  });

  