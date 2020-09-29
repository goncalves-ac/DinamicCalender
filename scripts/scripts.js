console.log('Aparece mensagem')

/* Mudar a cor do modal */

var GetColor = document.querySelector('#getColor');

var Change = document.querySelector('#changeColor');
var ChangeBtn = document.querySelector('#changeColorBtn');
var ChangeBackground = document.querySelector('#changeColorBackground');
var ChangeColorBoxShadow = document.querySelector('#changeColorBoxShadow');

Change.style.backgroundColor = GetColor.value;
ChangeBtn.style.backgroundColor = GetColor.value;
ChangeBackground.style.backgroundColor = GetColor.value;
//ChangeColorBoxShadow.style.boxShadow = `0 0 0 10px ${GetColor.value}`;

GetColor.addEventListener('input', function(e) {
    Change.style.backgroundColor = e.target.value;
    ChangeBtn.style.backgroundColor = e.target.value;
    ChangeBackground.style.backgroundColor = e.target.value;
    //ChangeColorBoxShadow.style.boxShadow = `0 0 0 10px ${e.target.value}`;
}, false);

/* Fim mudar cor */

/* JS modal */

function iniciaModal(modalID){
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('open');
        modal.addEventListener('click', (e) => {
            if(e.target.id == modalID || e.target.className == 'close'){
                modal.classList.remove('open');
            }
        });
    }
}

function abreModal () {
    iniciaModal('addEvent');
}

/* Fim JS modal */