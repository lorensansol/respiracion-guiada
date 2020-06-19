// class Round {
//   constructor(roundNumber, breaths, inspirationTime, expirationTime, apneaExpirationTime, apneaInspirationTime, relaxationTime, increaseApneaTimeEachRound, soundGuidesEachBreath, soundGuidesRemainingBreath, soundGuidesEachApneaTime, soundGuidesRemainingApneaTime) {
//     this.roundNumber = roundNumber;
//     this.breaths = breaths;
//     this.inspirationTime = inspirationTime;
//     this.expirationTime = expirationTime;
//     this.apneaExpirationTime = apneaExpirationTime;
//     this.apneaInspirationTime = apneaInspirationTime;
//     this.relaxationTime = relaxationTime;
//     this.increaseApneaTimeEachRound = increaseApneaTimeEachRound;

//     this.soundGuidesEachBreath = soundGuidesEachBreath;
//     this.soundGuidesRemainingBreath = soundGuidesRemainingBreath;
//     this.soundGuidesEachApneaTime = soundGuidesEachApneaTime;
//     this.soundGuidesRemainingApneaTime = soundGuidesRemainingApneaTime;
//   }
//   // roundTime(){
//   //   return breaths * (breathTime + 1) + apneaExpirationTime + increaseApneaTimeEachRound * roundNumber + apneaInspirationTime + relaxationTime;
//   // }
// }

// Función tiempo de segundos a MM:SS
function timeMMSS(totalSeconds) {
  totalSeconds = Math.floor(totalSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${seconds}`;
}

// Función actualizar progresos
function refreshProgress(id, progressTime, restTime) {
  document.querySelector(`#${id} .progress`).innerHTML = timeMMSS(progressTime);
  document.querySelector(`#${id} .progress-bar`).setAttribute('value', progressTime);
  document.querySelector(`#${id} .progress-rest`).innerHTML = '-' + timeMMSS(restTime);
}

// Desplegar opciones avanzadas
const advancedOptions = document.getElementById('advanced-options');
advancedOptions.addEventListener('click', () => {
  let aO = advancedOptions.innerHTML;
  aO === 'Avanzadas' ? aO = 'Básicas' : aO = 'Avanzadas';
  Array.from(document.querySelectorAll('.advanced-option')).map( o => o.classList.toggle('hidden'));
});

// Variables globales
let rounds;
let breaths;
let inspirationTime;
let expirationTime;
let apneaExpirationTime;
let apneaInspirationTime;
let relaxationTime;
let increaseApneaTimeEachRound;
let soundGuidesEachBreath;
let soundGuidesRemainingBreath;
let soundGuidesEachApneaTime;
let soundGuidesRemainingApneaTime;
const startRounds = [];
const restRoundTime = [];

// Función obtener valores enteros de inputs mediante ID
function valueInput(id) {
  return parseFloat(document.getElementById(id).value);
}

// Función actualizar datos
function refreshAll() {
  // Obtener valores del formulario
  rounds = valueInput('rounds');
  breaths = valueInput('breaths');
  inspirationTime = valueInput('inspiration-time');
  expirationTime = valueInput('expiration-time');
  apneaExpirationTime = valueInput('apnea-expiration-time');
  apneaInspirationTime = valueInput('apnea-inspiration-time');
  relaxationTime = valueInput('relaxation-time');
  increaseApneaTimeEachRound = valueInput('increase-apnea-time-each-round');
  // Guías sonoras
  soundGuidesEachBreath = valueInput('sound-guides-each-breath');
  soundGuidesRemainingBreath = valueInput('sound-guides-remaining-breath');
  soundGuidesEachApneaTime = valueInput('sound-guides-each-apnea-time');
  soundGuidesRemainingApneaTime = valueInput('sound-guides-remaining-apnea-time');
  // Ciclo por ronda
  let increaseApneaTotal = 0;
  let totalTime = 0;
  let roundTotalTime = (breaths + 1) * (inspirationTime + expirationTime) + apneaExpirationTime + apneaInspirationTime + relaxationTime;
  let roundTable = '';
  for (let i = 0; i < rounds; i++) {
    // HTML de tabla de rondas
    roundTable += `
      <tr id="round-${i + 1}">
        <th>${i + 1}</th>
        <td>${timeMMSS(apneaExpirationTime + increaseApneaTotal)}</td>
        <td>
          <span class="progress">0:00</span>
          <progress class="progress-bar" value="0" max="${roundTotalTime}"></progress>
          <span class="progress-rest">-${timeMMSS(roundTotalTime)}</span>
        </td>
      </tr>
    `;
    // Tiempo de inicio de cada ronda
    startRounds[i] = totalTime;
    // Tiempo total
    totalTime += roundTotalTime;
    // Tiempo total de ronda restante
    restRoundTime[i] = roundTotalTime;
    // Tiempo total de ronda
    roundTotalTime += increaseApneaTimeEachRound;
    // Total de tiempo de apnea incrementado en cada ronda
    increaseApneaTotal += increaseApneaTimeEachRound;
  }
  // HTML de tabla de totales
  totalTable = `
    <tr id="round-total">
      <th>Total</th>
      <th>-</th>
      <th>
        <span class="progress">0:00</span>
        <progress class="progress-bar" value="0" max="${totalTime}"></progress>
        <span class="progress-rest">-${timeMMSS(totalTime)}</span>
      </th>
    </tr>
  `;
  // Añadir tablas al DOM
  document.querySelector('#round-list tbody').innerHTML = roundTable;
  document.querySelector('#round-list tfoot').innerHTML = totalTable;
}

// Funciones de respiración
const lungs = document.getElementById('lungs');
const lungsInterior = lungs.querySelector('div');
const breathStep = lungs.querySelector('span');
// Función de inspiración
function inspirationAction() {
  if (breathStep.innerHTML !== breaths) {
    // Sonido de inspiración
    /// ////////////////////////////////////////////////////////////////////////////////
  } else {
    // Sonido de inspiración profunda
    /// ////////////////////////////////////////////////////////////////////////////////
  }
  // Se actualiza el nº de respiración
  breathStep.innerHTML = parseInt(breathStep.innerHTML, 10) + 1;
  // El círculo y la gradiente crecen
  lungs.style.animationDuration = `${inspirationTime}s`;
  lungsInterior.style.animationDuration = `${inspirationTime}s`;
  lungs.className = 'inspire';
}
// Función de espiración
function expirationAction() {
  if (breathStep.innerHTML !== breaths) {
    // Sonido de espiración
    // /////////////////////////////////////////////////////////////////////////////////
  } else {
    // Sonido de espiración profunda
    // /////////////////////////////////////////////////////////////////////////////////
  }
  // El círculo y la gradiente decrecen
  lungs.style.animationDuration = `${expirationTime}s`;
  lungsInterior.style.animationDuration = `${expirationTime}s`;
  lungs.className = 'expire';
}
// Función de respiración completa
function breathAction() {
  inspirationAction();
  setTimeout(expirationAction, inspirationTime * 1000);
  lungs.classList.remove('expire');
}

// Actualizar todo al cargar la página y al cambiar formulario
refreshAll();
document.forms[0].addEventListener('change', () => refreshAll());

// Empezar
let starTimeInterval;
let starTimeRound = [];
let progressApneaTime;
let restApneaTime;
document.getElementById('start').addEventListener('click', () => {
  // Oculta y muestra elementos
  document.getElementById('start').classList.add('hidden');
  document.getElementById('pause').classList.remove('hidden');
  document.getElementById('end').classList.remove('hidden');
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('options').classList.add('hidden');

  // Comienza a correr la guía de tiempo total
  let progressTime = 0;
  let restTime = document.querySelector('#round-total .progress-bar').getAttribute('max');
  let roundTitle = document.getElementById('round-title');
  const starTimeRound = [];
  breathStep.innerHTML = 0;
  starTimeInterval = setInterval( starTime, 500);
  // Comienza cada ronda
  function starTime() {
    for (let i in startRounds) {
      if (startRounds[i] == progressTime) {
        // Comienzan a correr las guías sonoras de respiraciones
        // /////////////////////////////////////////////////////////////////////////////////
        // Actualizar título de ronda
        roundTitle.innerHTML = `Ronda ${parseInt(i) + 1}`;
        if (progressTime == 0) breathAction();
        // A cada medio segundo
        starTimeRound[i] = setInterval( () => {
          // Actualizar progreso de ronda activa
          refreshProgress( 'round-'+(parseInt(i)+1), progressTime - startRounds[i], restRoundTime[i] -= .5);
          // Respiración
          if(progressTime % (inspirationTime + expirationTime) == 0) {
            breathAction();
          }
          // Al finalizar la ronda
          if(breathStep.innerHTML == breaths) {
            clearInterval(starTimeRound[i]);
            // Paran las guías sonoras de respiración
            ///////////////////////////////////////////////////////////////////////////////////
            breathStep.innerHTML = 0;
            // Desaparece el círculo
            lungs.className = 'hidden';
            // Apnea con espiración
            // Comienzan a correr las guías sonoras de apnea
            ///////////////////////////////////////////////////////////////////////////////////
            // Aparece una guía de cuenta atrás + se activa con el "Tiempo de apnea con espiración base" + un corazón latiendo
            let progressApneaExpiration = lungs.insertAdjacentHTML('afterend', `<p>¡Aguanta la respiración!</p><span class="progress">0:00</span><progress id="progress-apnea-expiration" value="0" max="${apneaExpirationTime}"></progress><span class="progress-rest">-${timeMMSS(apneaExpirationTime)}</span>`);
            let heart = lungs.insertAdjacentHTML('afterend', `<svg id="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><path stroke="white" stroke-width="32" d="M80 141c35-25 52-48 60-65 10-21 1-46-20-54-24-10-40 13-40 13S64 12 39 22c-20 8-29 33-19 54 8 17 25 40 60 65z"/><path d="M80 141c35-25 52-48 60-65 10-21 1-46-20-54-24-10-40 13-40 13S64 12 39 22c-20 8-29 33-19 54 8 17 25 40 60 65z"/></svg>`);
            progressApneaTime = 0;
            restApneaTime = apneaExpirationTime;
            let starTimeApneaExpiration = setInterval( () => {
              // Actualizar progreso de apnea
              refreshProgress( 'progress-apnea-expiration', progressApneaTime += 1, restApneaTime -= 1);
              // Parar y eliminar cuando llegue a cero
              if(restApneaTime == 0) {
                clearInterval(starTimeApneaExpiration);
                progressApneaExpiration.className = 'hidden';
                setTimeout( () => {
                  // Paran las guías sonoras de apnea
                  ///////////////////////////////////////////////////////////////////////////////////
                  // Desaparece el progreso de apnea
                  progressApneaExpiration.remove();
                }, 500);
              }
            }, 1000);
            // Reaparece el círculo
            lungs.className = 'hidden';
            // Inspiración (profunda)
            inspirationAction();
            // Apnea con inspiración
            let progressApneaInspiration = lungs.insertAdjacentHTML('afterend', `<p>¡Aguanta la respiración!</p><span class="progress">0:00</span><progress id="progress-apnea-inspiration" value="0" max="${apneaInspirationTime}"></progress><span class="progress-rest">-${timeMMSS(apneaInspirationTime)}</span>`);
            progressApneaTime = 0;
            restApneaTime = apneaInspirationTime;
            let starTimeApneaInspiration = setInterval( () => {
              // Actualizar progreso de apnea
              refreshProgress( 'progress-apnea-inspiration', progressApneaTime += 1, restApneaTime -= 1);
              // Parar y eliminar cuando llegue a cero
              if(restApneaTime == 0) {
                clearInterval(starTimeApneaInspiration);
                progressApneaInspiration.className = 'hidden';
                setTimeout( () => {
                  // Paran las guías sonoras de apnea
                  ///////////////////////////////////////////////////////////////////////////////////
                  // Desaparece el progreso de apnea
                  progressApneaInspiration.remove();
                  // Desaparece el corazón
                  heart.remove();
                }, 500);
              }
            }, 1000);
            // La guía de cuenta atrás se reinicia (o desaparece y e crea otra visualmente distinta) con el "Tiempo de apnea con inspiración"
            ///////////////////////////////////////////////////////////////////////////////////
            // Espiración
            expirationAction();
            // Pausa tras apneas
            starRelaxationTime = setInterval( () => {

            }, relaxationTime * 1000);
          };
        }, 500);
      }
    }
    progressTime += 0.5;
    restTime -= 0.5;
    if (progressTime % 1 === 0) refreshProgress('round-total', progressTime, restTime);
    if (restTime === 0) clearInterval(starTimeInterval);
  }
});

// Pausar
document.getElementById('pause').addEventListener('click', () => {
  
});

// Terminar
document.getElementById('end').addEventListener('click', () => {
  for(let sT of starTimeRound) clearInterval(sT);
  clearInterval(starTimeInterval);
  document.getElementById('start').classList.remove('hidden');
  document.getElementById('pause').classList.add('hidden');
  document.getElementById('end').classList.add('hidden');
  document.getElementById('options').classList.remove('hidden');
  document.forms[0].reset();
  refreshAll();
});
