const app = document.querySelector('#app');
const toast = document.querySelector('.toast');

const LESSONS = [
  { id:'home', module:'Fondations', icon:'⌨', title:'La ligne de départ', subtitle:'F et J sont tes repères', keys:'fj', drill:'fff jjj fjf jfj', minutes:3, xp:80, level:'Débutant', tip:'Pose tes index sur F et J. Les petits reliefs te permettent de retrouver ta position sans regarder.' },
  { id:'home-row', module:'Fondations', icon:'◉', title:'Les huit pilotes', subtitle:'A S D F · J K L M', keys:'asdfjklm', drill:'asdf jklm fj dk sl am', minutes:4, xp:100, level:'Débutant', tip:'Chaque doigt garde sa touche. Après chaque frappe, reviens doucement à la ligne du milieu.' },
  { id:'vowels', module:'Fondations', icon:'A', title:'Turbo voyelles', subtitle:'Les voyelles fréquentes', keys:'aeiou', drill:'ami oui eau aile mou', minutes:4, xp:110, level:'Débutant', tip:'Va chercher la touche avec le doigt le plus proche, puis reviens à ta position de départ.' },
  { id:'top-row', module:'Contrôle', icon:'↟', title:'La ligne haute', subtitle:'Z E R T · Y U I O P', keys:'zertyuiop', drill:'zeste route type roue prix', minutes:5, xp:130, level:'Intermédiaire', tip:'Les doigts montent, les poignets restent calmes. Cherche la régularité avant la vitesse.' },
  { id:'bottom-row', module:'Contrôle', icon:'↡', title:'Le virage bas', subtitle:'Q S D · G H · W X C V B N', keys:'wxcvbnqgh', drill:'wagon boxe vague banc choc', minutes:5, xp:140, level:'Intermédiaire', tip:'Pour la ligne basse, replie légèrement les doigts sans déplacer toute la main.' },
  { id:'accents', module:'Contrôle', icon:'É', title:'Accents et apostrophes', subtitle:'Écrire un français propre', keys:'éèàç\'', drill:'été à côté c’est déjà prêt', minutes:5, xp:150, level:'Intermédiaire', tip:'Ralentis sur les signes rares : une frappe juste vaut mieux qu’une correction.' },
  { id:'capitals', module:'Maîtrise', icon:'⇧', title:'Majuscules', subtitle:'Coordonner avec Maj', keys:'AZERTY', drill:'Paris Zoé Karim France', minutes:6, xp:170, level:'Avancé', tip:'Utilise la touche Maj opposée à la lettre pour garder tes mains stables.' },
  { id:'punctuation', module:'Maîtrise', icon:'!?', title:'Ponctuation rapide', subtitle:'Respirer dans un texte', keys:'.,;:!?', drill:'Prêt, pilote ? Oui : départ !', minutes:6, xp:180, level:'Avancé', tip:'La ponctuation fait partie du rythme. Ne la traite pas comme un obstacle.' },
  { id:'master', module:'Maîtrise', icon:'🏁', title:'Course complète', subtitle:'Tout combiner sur un texte', keys:'all', drill:'La précision construit la vitesse, une touche après l’autre.', minutes:7, xp:240, level:'Boss', tip:'Lis deux ou trois caractères en avance pendant que tes doigts terminent le mot actuel.' }
];

const QWERTY_LESSON_OVERRIDES = {
  home:{ subtitle:'F and J are your anchors', drill:'fff jjj fjf jfj', tip:'Place your index fingers on F and J. The small bumps let you find home position without looking.' },
  'home-row':{ subtitle:'A S D F · J K L ;', keys:'asdfjkl;', drill:'asdf jkl; fj dk sl a;', tip:'Each finger owns one key. After every stroke, return gently to the home row.' },
  vowels:{ subtitle:'Common English vowels', drill:'aim oil use idea audio', tip:'Reach with the nearest finger, then return to your home position.' },
  'top-row':{ title:'La ligne QWERTY', subtitle:'Q W E R T · Y U I O P', keys:'qwertyuiop', drill:'quiet type power write route', tip:'Your fingers travel upward while your wrists stay relaxed. Build rhythm before speed.' },
  'bottom-row':{ subtitle:'Z X C V · B N M', keys:'zxcvbnm', drill:'zoom cabin move box calm', tip:'Curl your fingers slightly toward the bottom row without moving the whole hand.' },
  accents:{ title:'Ponctuation QWERTY', subtitle:'Apostrophes and common symbols', keys:"',.!?", drill:"it's ready, pilot. go now!", tip:'Slow down on punctuation. One accurate stroke is faster than a correction.' },
  capitals:{ subtitle:'Coordinate letters with Shift', drill:'London Maya Karim Rocket', tip:'Use the Shift key opposite the letter to keep both hands stable.' },
  punctuation:{ subtitle:'Give English text its rhythm', drill:'Ready, pilot? Yes: go now!', tip:'Punctuation is part of the rhythm, not an obstacle.' },
  master:{ subtitle:'Combine every QWERTY row', drill:'Accuracy builds speed, one confident key at a time.', tip:'Read two or three characters ahead while your fingers finish the current word.' }
};

const CHALLENGES = [
  { id:'daily', icon:'☀', tag:'Défi du jour', title:'Le tour parfait', desc:'Termine une course à 96 % de précision minimum.', mode:'precision', reward:180, goal:'96 % précision', color:'lime' },
  { id:'sprint', icon:'⚡', tag:'Vitesse', title:'Sprint 30 secondes', desc:'Un texte court, deux rivaux rapides et aucun temps mort.', mode:'sprint', reward:140, goal:'45 MPM', color:'coral' },
  { id:'precision', icon:'◎', tag:'Contrôle', title:'Zéro sortie de piste', desc:'Trois erreurs maximum. Chaque faute rapproche les rivaux.', mode:'precision', reward:200, goal:'≤ 3 erreurs', color:'cyan' },
  { id:'endurance', icon:'∞', tag:'Endurance', title:'Les trois tours', desc:'Trois paragraphes, des tours de plus en plus rapides.', mode:'endurance', reward:260, goal:'3 tours', color:'violet' },
  { id:'comeback', icon:'↗', tag:'Progression', title:'Bats ton record', desc:'Dépasse ta meilleure vitesse personnelle.', mode:'record', reward:220, goal:'Nouveau record', color:'lime' },
  { id:'zen', icon:'◌', tag:'Concentration', title:'Conduite zen', desc:'Pas de chrono visible : garde une cadence propre.', mode:'zen', reward:160, goal:'95 % précision', color:'cyan' }
];

const TEXTS = {
  fr: { kids: [
    'Le petit renard file sous les étoiles.',
    'Zoé range son casque puis démarre en douceur.',
    'Chaque bonne touche donne du turbo à la voiture.',
    'Sur la piste bleue, le pilote garde son calme.',
    'Un chat curieux regarde les bolides passer.'
  ], pro: [
    'La régularité transforme peu à peu chaque mouvement en réflexe.',
    'Un pilote précis anticipe le prochain virage sans perdre sa cadence.',
    'La vitesse durable naît d’un geste détendu et parfaitement maîtrisé.',
    'Garder les yeux sur le texte permet aux doigts de mémoriser leur trajet.',
    'Une respiration calme aide à maintenir un rythme rapide et constant.'
  ]},
  en: { kids: [
    'The little fox races under the bright stars.',
    'Maya checks her helmet and starts the blue car.',
    'Every correct key gives the engine more power.',
    'Keep your eyes on the road and your hands relaxed.',
    'A curious cat watches the racing cars fly past.'
  ], pro: [
    'Steady practice turns every careful movement into a natural reflex.',
    'A precise driver reads the next turn without losing a smooth rhythm.',
    'Lasting speed grows from relaxed hands and controlled movement.',
    'Keeping your eyes on the text helps your fingers learn each path.',
    'Calm breathing makes a fast and consistent typing rhythm easier.'
  ]}
};

const MODE_CONFIG = {
  quick:{ name:'Course éclair', kicker:'Course libre', laps:1, seconds:60, rivals:[2.45,2.15], reward:120 },
  sprint:{ name:'Sprint 30 secondes', kicker:'Défi vitesse', laps:1, seconds:30, rivals:[3.1,2.8], reward:140 },
  precision:{ name:'Zéro sortie de piste', kicker:'Défi précision', laps:1, seconds:75, rivals:[2.55,2.35], reward:200, maxErrors:3 },
  endurance:{ name:'Les trois tours', kicker:'Défi endurance', laps:3, seconds:150, rivals:[2.65,2.4], reward:260 },
  record:{ name:'Chasse au record', kicker:'Défi personnel', laps:2, seconds:90, rivals:[2.8,2.55], reward:220 },
  zen:{ name:'Conduite zen', kicker:'Défi concentration', laps:2, seconds:120, rivals:[2.3,2.1], reward:160, hiddenTimer:true },
  lesson:{ name:'Course d’application', kicker:'Fin de cours', laps:1, seconds:75, rivals:[2.1,1.95], reward:100 }
};

const initialState = {
  path:'kids', bestWpm:0, accuracy:100, streak:1, xp:120, coins:240, completed:0,
  completedLessons:[], selectedCar:'bolt', ownedCars:['bolt'], challengeWins:[], history:[], sound:false,
  keyboardLayout:'auto', detectedLayout:null, textLanguage:'auto'
};
let state;
try { state = {...initialState, ...JSON.parse(localStorage.getItem('dact-furirous-state') || '{}')}; }
catch { state = {...initialState}; }
state.completedLessons = Array.isArray(state.completedLessons) ? state.completedLessons : [];
state.ownedCars = Array.isArray(state.ownedCars) ? state.ownedCars : ['bolt'];
state.challengeWins = Array.isArray(state.challengeWins) ? state.challengeWins : [];
state.history = Array.isArray(state.history) ? state.history : [];

const previewParams = new URLSearchParams(location.search);
const allowedRoutes = ['home','courses','challenges','garage','profile','race','lesson'];
let route = allowedRoutes.includes(previewParams.get('view')) ? previewParams.get('view') : 'home';
let currentLessonId = previewParams.get('lesson') || 'home';
let raceMode = MODE_CONFIG[previewParams.get('mode')] ? previewParams.get('mode') : 'quick';
let cleanupActive = null;
let audioContext = null;
let layoutDetectionStarted = false;

function activeLayout() { return state.keyboardLayout === 'auto' ? (state.detectedLayout || 'qwerty') : state.keyboardLayout; }
function activeLanguage() { return state.textLanguage === 'auto' ? (activeLayout() === 'qwerty' ? 'en' : 'fr') : state.textLanguage; }
function adaptLesson(lesson) { return activeLayout() === 'qwerty' ? {...lesson, ...(QWERTY_LESSON_OVERRIDES[lesson.id] || {})} : lesson; }
async function detectKeyboardLayout() {
  if (layoutDetectionStarted || state.keyboardLayout !== 'auto') return;
  layoutDetectionStarted = true;
  try {
    if (!navigator.keyboard?.getLayoutMap) return;
    const map = await navigator.keyboard.getLayoutMap();
    const keyQ = (map.get('KeyQ') || '').toLowerCase();
    const keyA = (map.get('KeyA') || '').toLowerCase();
    const detected = keyQ === 'a' && keyA === 'q' ? 'azerty' : keyQ === 'q' && keyA === 'a' ? 'qwerty' : null;
    if (detected && detected !== state.detectedLayout) {
      state.detectedLayout = detected; save();
      if (['home','courses','lesson'].includes(route)) render();
      showToast(`${detected.toUpperCase()} détecté · textes ${activeLanguage().toUpperCase()}`);
    }
  } catch { /* La calibration manuelle reste disponible. */ }
}

function save() { localStorage.setItem('dact-furirous-state', JSON.stringify(state)); }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
}
function beep(frequency=440, duration=.05, volume=.035) {
  if (!state.sound) return;
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'square'; oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(); oscillator.stop(audioContext.currentTime + duration);
}
function setRoute(next) {
  if (cleanupActive) { cleanupActive(); cleanupActive = null; }
  route = next;
  render();
  window.scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  setTimeout(() => app.focus({preventScroll:true}), 0);
}
function startRace(mode='quick') { raceMode = MODE_CONFIG[mode] ? mode : 'quick'; setRoute('race'); }
function carMarkup(kind=state.selectedCar, extra='') {
  return `<div class="race-car car-${kind} ${extra}" aria-hidden="true"><i class="car-cabin"></i><i class="wheel wheel-a"></i><i class="wheel wheel-b"></i><i class="wheel wheel-c"></i><i class="wheel wheel-d"></i><i class="car-light light-a"></i><i class="car-light light-b"></i></div>`;
}
function button(label, variant='primary', action='', attrs='') {
  return `<button class="button ${variant}" ${action ? `data-action="${action}"` : ''} ${attrs}>${label}</button>`;
}
function progressPercent() { return Math.round(state.completedLessons.length / LESSONS.length * 100); }
function keyboardProfile(compact=false) {
  const layout=activeLayout().toUpperCase();
  const language=activeLanguage().toUpperCase();
  const detected=Boolean(state.detectedLayout);
  return `<section class="keyboard-profile ${compact?'compact':''}" aria-label="Configuration du clavier">
    <div class="keyboard-profile-icon"><span>${layout.slice(0,1)}</span><i></i><i></i><i></i></div>
    <div><span>${detected?'Clavier détecté':'Disposition estimée'}</span><strong>${layout} · textes ${language}</strong></div>
    <div class="keyboard-profile-actions"><button data-action="calibrate-keyboard">${detected?'Recalibrer':'Détecter mon clavier'}</button><button data-action="toggle-language">Passer en ${language==='FR'?'EN':'FR'}</button></div>
  </section>`;
}

function homeView() {
  const nextLessonBase = LESSONS.find(l => !state.completedLessons.includes(l.id)) || LESSONS.at(-1);
  const nextLesson = adaptLesson(nextLessonBase);
  return `<div class="page home-page">
    <section class="pilot-strip" aria-label="Progression du pilote">
      <div><span class="status-dot"></span><strong>Pilote en ligne</strong><span>${state.path === 'kids' ? 'Parcours junior' : 'Parcours expert'}</span></div>
      <div class="pilot-strip-stats"><span><b>${state.bestWpm || '—'}</b> MPM record</span><span><b>${state.accuracy}%</b> précision</span><span><b>${state.streak}</b> jour${state.streak>1?'s':''} de série</span></div>
    </section>
    ${keyboardProfile(true)}
    <section class="hero-grid">
      <div class="race-stage">
        <div class="skyline" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="stage-copy">
          <p class="kicker">Saison 02 · Plein régime</p>
          <h1>Ton clavier.<br><em>Ton moteur.</em></h1>
          <p class="lede">Apprends un geste, maîtrise une ligne puis défie la piste. Chaque touche juste te rapproche du podium.</p>
          <div class="hero-actions">${button('Lancer la course <span>→</span>','primary','start-race','data-mode="quick"')}${button('Continuer mon cours','secondary','open-lesson',`data-lesson="${nextLesson.id}"`)}</div>
        </div>
        <div class="hero-speed-lines" aria-hidden="true"></div>
        <div class="hero-road" aria-hidden="true"><i></i></div>
        <div class="hero-car-wrap">${carMarkup(state.selectedCar,'hero-car')}</div>
        <div class="hero-finish" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
        <div class="stage-footer"><span>PROCHAINE COURSE · <strong>PORT AZUR</strong></span><span>CONDITIONS · <strong>PISTE SÈCHE</strong></span></div>
      </div>
      <aside class="mission-console">
        <div class="console-top"><span class="console-label">Mission active</span><span class="reward-chip">+${nextLesson.xp} XP</span></div>
        <div class="mission-glyph">${nextLesson.icon}</div>
        <p class="mission-module">${nextLesson.module}</p>
        <h2>${nextLesson.title}</h2>
        <p>${nextLesson.subtitle}. Une leçon courte suivie d’une course d’application.</p>
        <div class="course-progress"><div><span>Parcours</span><strong>${progressPercent()}%</strong></div><div class="progress-track"><i style="transform:scaleX(${progressPercent()/100})"></i></div></div>
        ${button('Commencer la leçon','dark','open-lesson',`data-lesson="${nextLesson.id}"`)}
      </aside>
    </section>
    <section class="quick-stats" aria-label="Statistiques">
      <div><span class="stat-icon">↗</span><p>Meilleure vitesse<strong>${state.bestWpm || '—'} <small>MPM</small></strong></p></div>
      <div><span class="stat-icon">◎</span><p>Précision moyenne<strong>${state.accuracy}<small>%</small></strong></p></div>
      <div><span class="stat-icon">⚑</span><p>Courses terminées<strong>${state.completed}</strong></p></div>
      <div><span class="stat-icon">◆</span><p>Crédits garage<strong>${state.coins}<small>CR</small></strong></p></div>
    </section>
    <section class="home-split">
      <div class="next-lessons">
        <div class="section-title"><div><p class="kicker">Académie</p><h2>Prochains cours</h2></div><button class="text-link" data-route="courses">Tout le parcours →</button></div>
        ${LESSONS.slice(Math.max(0, LESSONS.indexOf(nextLessonBase)), Math.max(0, LESSONS.indexOf(nextLessonBase))+3).map((lesson, index) => lessonRow(lesson,index)).join('')}
      </div>
      <div class="daily-challenge">
        <div class="challenge-glow"></div><span class="challenge-day">Aujourd’hui</span><span class="challenge-icon">◎</span>
        <h2>Le tour parfait</h2><p>Atteins 96 % de précision. Trois erreurs sont permises, pas une de plus.</p>
        <div class="challenge-reward"><span>Récompense</span><strong>+180 XP · +60 CR</strong></div>
        ${button('Accepter le défi','light','challenge','data-mode="precision" data-challenge="daily"')}
      </div>
    </section>
  </div>`;
}

function lessonRow(lesson, index) {
  const lessonIndex = LESSONS.findIndex(item=>item.id===lesson.id);
  const done = state.completedLessons.includes(lesson.id);
  const unlockedIndex = Math.min(state.completedLessons.length, LESSONS.length-1);
  const locked = lessonIndex > unlockedIndex + 1;
  lesson = adaptLesson(lesson);
  return `<article class="lesson-row ${done?'done':''} ${locked?'locked':''}">
    <span class="lesson-order">${done?'✓':String(lessonIndex+1).padStart(2,'0')}</span>
    <div class="lesson-row-icon">${lesson.icon}</div><div class="lesson-row-copy"><span>${lesson.module} · ${lesson.minutes} min</span><h3>${lesson.title}</h3><p>${lesson.subtitle}</p></div>
    <div class="lesson-row-meta"><span>+${lesson.xp} XP</span><button data-action="open-lesson" data-lesson="${lesson.id}" ${locked?'disabled':''} aria-label="Ouvrir ${lesson.title}">${locked?'🔒':'→'}</button></div>
  </article>`;
}

function coursesView() {
  const modules = [...new Set(LESSONS.map(l => l.module))];
  return `<div class="page courses-page">
    <header class="page-head"><div><p class="kicker">Académie de pilotage</p><h1>Apprends le geste.<br><em>Libère la vitesse.</em></h1><p class="lede">Un parcours complet en trois modules. Chaque cours explique un mouvement, te fait pratiquer, puis ouvre une course.</p></div><div class="path-switch" role="group" aria-label="Choix du parcours"><button data-path="kids" class="${state.path==='kids'?'active':''}">Junior · -13</button><button data-path="pro" class="${state.path==='pro'?'active':''}">Expert · +13</button></div></header>
    ${keyboardProfile()}
    <div class="academy-progress"><div><span>Progression générale</span><strong>${state.completedLessons.length}/${LESSONS.length} cours</strong></div><div class="progress-track"><i style="transform:scaleX(${progressPercent()/100})"></i></div></div>
    ${modules.map((module, moduleIndex) => `<section class="course-module"><div class="module-heading"><span>${String(moduleIndex+1).padStart(2,'0')}</span><div><p>${moduleIndex===0?'Construire les repères':moduleIndex===1?'Étendre le contrôle':'Taper sans réfléchir'}</p><h2>${module}</h2></div></div><div class="module-list">${LESSONS.filter(l=>l.module===module).map((lesson,index)=>lessonRow(lesson,index)).join('')}</div></section>`).join('')}
  </div>`;
}

function lessonView() {
  const baseLesson = LESSONS.find(l => l.id === currentLessonId) || LESSONS[0];
  const lesson = adaptLesson(baseLesson);
  return `<div class="lesson-page page">
    <button class="back-link" data-route="courses">← Retour aux cours</button>
    <div class="lesson-layout">
      <aside class="lesson-theory"><p class="kicker">${lesson.module} · Cours ${LESSONS.indexOf(baseLesson)+1}</p><div class="lesson-hero-glyph">${lesson.icon}</div><h1>${lesson.title}</h1><p class="lesson-subtitle">${lesson.subtitle}</p><div class="coach-note"><span>Conseil du coach</span><p>${lesson.tip}</p></div><div class="lesson-goals"><span>Objectif</span><strong>Terminer l’exercice sans regarder le clavier</strong><small>+${lesson.xp} XP à la validation</small></div></aside>
      <section class="lesson-practice">
        <div class="practice-head"><div><span>Exercice guidé</span><h2>Suis la trajectoire</h2></div><div class="practice-count"><strong id="lesson-count">0</strong> / ${lesson.drill.length}</div></div>
        <p class="practice-instruction">Tape le caractère éclairé. Une erreur ne te fait pas reculer : replace simplement ton doigt.</p>
        <div class="drill-text" id="drill-text" aria-live="polite"></div>
        <div class="keyboard" id="keyboard" aria-label="Clavier visuel">
          ${keyboardMarkup()}
        </div>
        <input id="lesson-input" class="capture-input" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Zone de frappe du cours" />
        <div class="practice-footer"><span id="finger-hint">Place tes mains, puis commence.</span><button class="button primary" data-action="focus-lesson">Commencer à taper</button></div>
      </section>
    </div>
  </div>`;
}

function keyboardMarkup() {
  const rows = activeLayout()==='qwerty' ? ['QWERTYUIOP','ASDFGHJKL;','ZXCVBNM'] : ['AZERTYUIOP','QSDFGHJKLM','WXCVBN'];
  return rows.map(row => `<div class="key-row">${[...row].map(k=>`<span class="key" data-key="${k.toLowerCase()}">${k}</span>`).join('')}</div>`).join('') + '<div class="key-row"><span class="key space-key" data-key=" ">ESPACE</span></div>';
}

function challengesView() {
  return `<div class="page challenges-page"><header class="page-head challenge-head"><div><p class="kicker">Centre d’épreuves</p><h1>Change les règles.<br><em>Teste tes réflexes.</em></h1><p class="lede">Chaque défi entraîne une qualité différente. Les récompenses sont enregistrées sur cet appareil.</p></div><div class="trophy-block"><span>Défis remportés</span><strong>${state.challengeWins.length}<small> / ${CHALLENGES.length}</small></strong></div></header>
    <div class="challenge-grid">${CHALLENGES.map((challenge,index)=>`<article class="challenge-card challenge-${challenge.color} ${state.challengeWins.includes(challenge.id)?'won':''}"><div class="challenge-card-top"><span class="challenge-number">${String(index+1).padStart(2,'0')}</span><span class="challenge-symbol">${challenge.icon}</span></div><span class="challenge-tag">${challenge.tag}</span><h2>${challenge.title}</h2><p>${challenge.desc}</p><div class="challenge-goal"><span>Objectif</span><strong>${challenge.goal}</strong></div><div class="challenge-card-bottom"><span>+${challenge.reward} XP</span>${button(state.challengeWins.includes(challenge.id)?'Rejouer':'Lancer','small-light','challenge',`data-mode="${challenge.mode}" data-challenge="${challenge.id}"`)}</div></article>`).join('')}</div>
  </div>`;
}

const CARS = [
  {id:'bolt',name:'La Flèche',desc:'Équilibrée et nerveuse',price:0,color:'Citron'},
  {id:'ember',name:'Braise GT',desc:'Taillée pour les sprints',price:320,color:'Corail'},
  {id:'aqua',name:'Aqua Pulse',desc:'Silencieuse et précise',price:480,color:'Cyan'},
  {id:'phantom',name:'Phantom X',desc:'Réservée aux maîtres',price:750,color:'Violet'}
];
function garageView() {
  return `<div class="page garage-page"><header class="page-head"><div><p class="kicker">Collection locale</p><h1>Choisis ton<br><em>bolide.</em></h1><p class="lede">Gagne des crédits en course, débloque de nouveaux véhicules et prends le départ avec ton favori.</p></div><div class="credit-display"><span>Solde garage</span><strong>${state.coins}<small> CR</small></strong></div></header><div class="garage-floor">${CARS.map(car=>{const owned=state.ownedCars.includes(car.id),selected=state.selectedCar===car.id;return `<article class="garage-car ${selected?'selected':''}"><div class="car-showcase"><span>${selected?'Sélectionnée':car.color}</span>${carMarkup(car.id,'display-car')}<i class="car-shadow"></i></div><div class="garage-car-info"><div><h2>${car.name}</h2><p>${car.desc}</p></div>${owned?button(selected?'En piste':'Choisir',selected?'disabled':'small-light',selected?'':'select-car',`data-car="${car.id}" ${selected?'disabled':''}`):button(`${car.price} CR`,'small-light','buy-car',`data-car="${car.id}"`)}</div></article>`}).join('')}</div></div>`;
}

function profileView() {
  const history = state.history.length ? state.history.slice(0,5).map(item=>`<div class="history-row"><span>${item.won?'🏁':'◆'}</span><div><strong>${item.mode}</strong><small>${item.date}</small></div><b>${item.wpm} MPM · ${item.accuracy}%</b></div>`).join('') : '<p class="empty-copy">Ta première course apparaîtra ici.</p>';
  return `<div class="page profile-page"><header class="profile-hero"><span class="avatar big">Z</span><div><p class="kicker">Licence locale</p><h1>Zoé</h1><p>${state.path==='kids'?'Pilote junior':'Pilote expert'} · Niveau ${Math.max(1,Math.floor(state.xp/500)+1)}</p></div></header><div class="profile-dashboard"><section><h2>Statistiques de carrière</h2><div class="career-grid"><div><span>XP total</span><strong>${state.xp}</strong></div><div><span>Record</span><strong>${state.bestWpm || '—'} <small>MPM</small></strong></div><div><span>Précision</span><strong>${state.accuracy}%</strong></div><div><span>Courses</span><strong>${state.completed}</strong></div></div></section><section><h2>Dernières courses</h2>${history}</section></div></div>`;
}

function raceView() {
  const config = MODE_CONFIG[raceMode];
  return `<div class="race-page"><header class="race-hud-top"><div><button class="race-exit" data-route="home" aria-label="Quitter la course">×</button><div><p class="kicker">${config.kicker}</p><h1>${config.name}</h1></div></div><div class="race-meta"><span>Tour <b id="lap-label">1/${config.laps}</b></span><span id="race-clock" class="race-clock">${config.hiddenTimer?'--:--':formatTime(config.seconds)}</span><button class="pause-button" data-action="pause-race" aria-label="Mettre la course en pause">Ⅱ</button></div></header>
    <section class="circuit" id="circuit" aria-label="Piste de course animée">
      <div class="race-sky"><span class="moon"></span><div class="city"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <div class="speed-lines" aria-hidden="true"></div>
      <div class="race-road" id="race-road"><div class="road-markers"></div><div class="finish-line"></div></div>
      <div class="racer rival rival-one" id="rival-one"><span class="racer-name">PIXEL</span>${carMarkup('ember')}</div>
      <div class="racer rival rival-two" id="rival-two"><span class="racer-name">NOVA</span>${carMarkup('aqua')}</div>
      <div class="racer player-racer" id="player-racer"><span class="racer-name">ZOÉ</span>${carMarkup(state.selectedCar)}</div>
      <div class="countdown" id="countdown"><span>3</span><small>Prépare tes doigts</small></div>
      <div class="position-badge"><strong id="position-number">3e</strong><span>POSITION</span></div>
      <div class="race-particles" id="race-particles"></div>
    </section>
    <section class="typing-cockpit" id="typing-cockpit">
      <div class="telemetry"><div><span>Vitesse</span><strong id="live-wpm">0<small> MPM</small></strong></div><div><span>Précision</span><strong id="live-accuracy">100<small>%</small></strong></div><div><span>Combo</span><strong id="live-combo">×0</strong></div><div class="nitro-block"><span>Nitro · Entrée pour activer</span><div class="nitro-track"><i id="nitro-fill"></i></div></div></div>
      <div class="race-copy"><div class="copy-progress"><i id="copy-progress-fill"></i></div><div class="text-to-type" id="prompt-text" aria-live="polite"></div><input id="race-input" class="capture-input" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Zone de frappe de la course" /><button class="focus-race" data-action="focus-race">Clique ici puis tape la phrase</button></div>
      <div class="cockpit-footer"><span id="race-status"><i></i> Départ imminent…</span><span class="race-layout">${activeLayout().toUpperCase()} · ${activeLanguage().toUpperCase()}</span><span id="error-counter">0 erreur</span></div>
    </section>
    <div class="pause-overlay" id="pause-overlay" hidden><div><span>Ⅱ</span><h2>Course en pause</h2><p>Respire, replace tes doigts et repars quand tu veux.</p>${button('Reprendre','primary','pause-race')}${button('Quitter','ghost','home')}</div></div>
  </div>`;
}

function formatTime(seconds) { return `${Math.floor(seconds/60)}:${String(Math.max(0,seconds%60)).padStart(2,'0')}`; }
function render() {
  const views = {home:homeView,courses:coursesView,lesson:lessonView,challenges:challengesView,garage:garageView,profile:profileView,race:raceView};
  app.innerHTML = (views[route] || homeView)();
  document.querySelector('#nav-xp').textContent = state.xp;
  document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.route === route || (route==='lesson' && el.dataset.route==='courses')));
  document.querySelector('.sound-button').setAttribute('aria-pressed', String(state.sound));
  document.querySelector('.sound-button').classList.toggle('active', state.sound);
  bind();
}

function bind() {
  document.querySelectorAll('[data-route]').forEach(el => el.addEventListener('click', () => setRoute(el.dataset.route)));
  document.querySelectorAll('[data-path]').forEach(el => el.addEventListener('click', () => { state.path=el.dataset.path; save(); render(); showToast(`Parcours ${state.path==='kids'?'junior':'expert'} activé`); }));
  document.querySelectorAll('[data-action]').forEach(el => el.addEventListener('click', () => handleAction(el)));
  if (route === 'lesson') initLesson();
  if (route === 'race') initRace();
}

function handleAction(el) {
  const action = el.dataset.action;
  if (action === 'start-race' || action === 'challenge') {
    if (el.dataset.challenge) sessionStorage.setItem('active-challenge',el.dataset.challenge);
    else sessionStorage.removeItem('active-challenge');
    startRace(el.dataset.mode || 'quick');
  }
  else if (action === 'open-lesson') { currentLessonId=el.dataset.lesson; setRoute('lesson'); }
  else if (action === 'focus-lesson') document.querySelector('#lesson-input')?.focus();
  else if (action === 'focus-race') document.querySelector('#race-input')?.focus();
  else if (action === 'pause-race') window.toggleRacePause?.();
  else if (action === 'toggle-sound') { state.sound=!state.sound; save(); render(); beep(560,.08); showToast(state.sound?'Son activé':'Son désactivé'); }
  else if (action === 'calibrate-keyboard') openKeyboardCalibration();
  else if (action === 'toggle-language') { state.textLanguage=activeLanguage()==='fr'?'en':'fr'; save(); render(); showToast(`Textes de frappe en ${activeLanguage()==='fr'?'français':'anglais'}`); }
  else if (action === 'select-car') { state.selectedCar=el.dataset.car; save(); render(); showToast('Bolide sélectionné'); }
  else if (action === 'buy-car') buyCar(el.dataset.car);
  else if (action === 'home') setRoute('home');
}

function openKeyboardCalibration() {
  const overlay=document.createElement('div');
  overlay.className='calibration-overlay';
  overlay.innerHTML=`<div class="calibration-card" role="dialog" aria-modal="true" aria-labelledby="calibration-title"><button class="calibration-close" aria-label="Fermer">×</button><p class="kicker">Détection du clavier</p><div class="calibration-key">A</div><h2 id="calibration-title">Appuie sur la touche marquée A</h2><p id="calibration-status">Une seule touche suffit pour distinguer automatiquement AZERTY et QWERTY.</p><div class="manual-layout"><span>Ou choisis manuellement</span><button data-layout="azerty">AZERTY</button><button data-layout="qwerty">QWERTY</button></div></div>`;
  document.body.appendChild(overlay);
  const close=()=>{document.removeEventListener('keydown',listen,true);overlay.remove();};
  const applyLayout=(layout,automatic=true)=>{state.detectedLayout=layout;state.keyboardLayout=automatic?'auto':layout;state.textLanguage='auto';save();close();render();showToast(`${layout.toUpperCase()} configuré · textes ${activeLanguage().toUpperCase()}`);};
  const listen=event=>{
    if(event.key.toLowerCase()!=='a') { document.querySelector('#calibration-status').textContent='Cherche la touche avec la lettre A imprimée dessus.'; return; }
    event.preventDefault();
    if(event.code==='KeyA') applyLayout('qwerty');
    else if(event.code==='KeyQ') applyLayout('azerty');
    else document.querySelector('#calibration-status').textContent='Disposition inhabituelle détectée. Choisis AZERTY ou QWERTY ci-dessous.';
  };
  document.addEventListener('keydown',listen,true);
  overlay.querySelector('.calibration-close').addEventListener('click',close);
  overlay.addEventListener('click',event=>{if(event.target===overlay)close();});
  overlay.querySelectorAll('[data-layout]').forEach(button=>button.addEventListener('click',()=>applyLayout(button.dataset.layout,false)));
  overlay.querySelector('.calibration-card').focus?.();
}

function buyCar(id) {
  const car = CARS.find(item=>item.id===id);
  if (!car) return;
  if (state.coins < car.price) { showToast(`Il te manque ${car.price-state.coins} CR`); return; }
  state.coins -= car.price; state.ownedCars.push(id); state.selectedCar=id; save(); render(); showToast(`${car.name} rejoint ton garage !`);
}

function initLesson() {
  const lesson = adaptLesson(LESSONS.find(l=>l.id===currentLessonId) || LESSONS[0]);
  const input = document.querySelector('#lesson-input');
  const drill = document.querySelector('#drill-text');
  let index = 0;
  let mistakes = 0;
  const paint = () => {
    drill.innerHTML = [...lesson.drill].map((char,i)=>`<span class="${i<index?'done':i===index?'current':''}">${char===' '?'·':char}</span>`).join('');
    document.querySelector('#lesson-count').textContent = index;
    document.querySelectorAll('.key').forEach(key => key.classList.toggle('active', key.dataset.key === lesson.drill[index]?.toLowerCase()));
    const expected = lesson.drill[index];
    document.querySelector('#finger-hint').textContent = expected === ' ' ? 'Pouce sur la barre espace' : expected ? `Prochaine touche : ${expected.toUpperCase()}` : 'Exercice terminé !';
  };
  input.addEventListener('keydown', event => {
    if (event.key.length !== 1) return;
    event.preventDefault();
    if (event.key.toLowerCase() === lesson.drill[index]?.toLowerCase()) {
      index++; beep(520 + index*5,.025,.018);
      const key = document.querySelector(`.key[data-key="${CSS.escape(event.key.toLowerCase())}"]`);
      key?.animate([{transform:'translateY(0)'},{transform:'translateY(4px) scale(.96)'},{transform:'translateY(0)'}],{duration:160,easing:'cubic-bezier(.16,1,.3,1)'});
      if (index >= lesson.drill.length) completeLesson(lesson, mistakes);
    } else {
      mistakes++; beep(150,.08,.04);
      document.querySelector('.lesson-practice').animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(7px)'},{transform:'translateX(0)'}],{duration:300,easing:'ease-in-out'});
    }
    paint();
  });
  paint(); input.focus();
}

function completeLesson(lesson, mistakes) {
  const firstCompletion = !state.completedLessons.includes(lesson.id);
  if (firstCompletion) { state.completedLessons.push(lesson.id); state.xp += lesson.xp; state.coins += 30; save(); }
  const practice = document.querySelector('.lesson-practice');
  practice.innerHTML = `<div class="lesson-complete"><div class="success-burst"><span>✓</span><i></i><i></i><i></i><i></i></div><p class="kicker">Cours validé</p><h2>Le geste est dans les doigts.</h2><p>${mistakes ? `${mistakes} erreur${mistakes>1?'s':''}, corrigée${mistakes>1?'s':''} sans perdre le rythme.` : 'Un passage parfait, propre du début à la fin.'}</p><div class="lesson-rewards"><span>+${firstCompletion?lesson.xp:25} XP</span><span>+${firstCompletion?30:10} CR</span></div>${button('Course d’application →','primary','start-race','data-mode="lesson"')}${button('Cours suivants','ghost','home')}</div>`;
  practice.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>handleAction(el)));
  beep(760,.2,.05); setTimeout(()=>beep(980,.24,.04),120);
}

function buildRaceText(config) {
  const pool = [...TEXTS[activeLanguage()][state.path]];
  const count = config.laps === 3 ? 5 : config.laps === 2 ? 4 : 2;
  return Array.from({length:count},(_,i)=>pool[i%pool.length]).join(' ');
}

function initRace() {
  const config = MODE_CONFIG[raceMode];
  const text = buildRaceText(config);
  const input = document.querySelector('#race-input');
  const prompt = document.querySelector('#prompt-text');
  const circuit = document.querySelector('#circuit');
  const cockpit = document.querySelector('#typing-cockpit');
  const countdown = document.querySelector('#countdown');
  let index=0, errors=0, combo=0, maxCombo=0, nitro=0, nitroActive=false;
  let started=false, paused=false, finished=false, startTime=0, pausedAt=0, pauseTotal=0;
  let raceFrame=0, countdownTimers=[], opponentProgress=[0,0];

  const paintText = () => {
    const before = text.slice(0,index);
    const current = text[index] || '';
    const after = text.slice(index+1);
    prompt.innerHTML = `<span class="typed">${escapeHTML(before)}</span><span class="current">${escapeHTML(current)}</span>${escapeHTML(after)}`;
    const currentEl = prompt.querySelector('.current');
    if (currentEl && currentEl.offsetLeft > prompt.clientWidth*.7) prompt.scrollLeft = Math.max(0,currentEl.offsetLeft-prompt.clientWidth*.35);
  };
  const setCountdown = (value, sub='') => { countdown.innerHTML=`<span>${value}</span><small>${sub}</small>`; countdown.classList.remove('pop'); void countdown.offsetWidth; countdown.classList.add('pop'); beep(value==='GO!'?760:300 + Number(value||0)*80,.12,.04); };
  setCountdown('3','Prépare tes doigts');
  countdownTimers.push(setTimeout(()=>setCountdown('2','Regarde le texte'),700));
  countdownTimers.push(setTimeout(()=>setCountdown('1','Reste précis'),1400));
  countdownTimers.push(setTimeout(()=>{setCountdown('GO!','Tape maintenant'); circuit.classList.add('racing'); started=true; startTime=performance.now(); input.focus(); document.querySelector('#race-status').innerHTML='<i></i> Course en cours'; countdownTimers.push(setTimeout(()=>countdown.classList.add('hidden'),500)); raceFrame=requestAnimationFrame(tick);},2100));

  function tick(now) {
    if (finished) return;
    if (!paused && started) {
      const elapsed=(now-startTime-pauseTotal)/1000;
      const remaining=Math.ceil(config.seconds-elapsed);
      if (!config.hiddenTimer) document.querySelector('#race-clock').textContent=formatTime(remaining);
      opponentProgress = config.rivals.map((speed,i)=>clamp((elapsed*speed + Math.sin(elapsed*(.8+i*.14))*1.8)/text.length*100,0,100));
      updateRaceVisuals(elapsed);
      if (remaining<=0 || (config.maxErrors && errors>config.maxErrors)) finishRace(false, config.maxErrors && errors>config.maxErrors ? 'Trop d’erreurs pour ce défi' : 'Le chrono est terminé');
      else raceFrame=requestAnimationFrame(tick);
    } else raceFrame=requestAnimationFrame(tick);
  }

  function updateRaceVisuals(elapsed=0) {
    const playerProgress=index/text.length*100;
    const positions=[{who:'player',value:playerProgress},{who:'r1',value:opponentProgress[0]},{who:'r2',value:opponentProgress[1]}].sort((a,b)=>b.value-a.value);
    const place=positions.findIndex(p=>p.who==='player')+1;
    document.querySelector('#position-number').textContent=place===1?'1er':`${place}e`;
    document.querySelector('#player-racer').style.setProperty('--race-x',`${clamp(playerProgress*.68,3,68)}vw`);
    document.querySelector('#rival-one').style.setProperty('--race-x',`${clamp(opponentProgress[0]*.68,5,68)}vw`);
    document.querySelector('#rival-two').style.setProperty('--race-x',`${clamp(opponentProgress[1]*.68,4,68)}vw`);
    document.querySelector('#copy-progress-fill').style.transform=`scaleX(${playerProgress/100})`;
    const lap=Math.min(config.laps,Math.floor(playerProgress/(100/config.laps))+1);
    document.querySelector('#lap-label').textContent=`${lap}/${config.laps}`;
    const effectiveElapsed=Math.max(1,elapsed || ((performance.now()-startTime-pauseTotal)/1000));
    document.querySelector('#live-wpm').innerHTML=`${Math.round(index/5/(effectiveElapsed/60))}<small> MPM</small>`;
    const attempts=index+errors;
    document.querySelector('#live-accuracy').innerHTML=`${attempts ? Math.round(index/attempts*100) : 100}<small>%</small>`;
    document.querySelector('#live-combo').textContent=`×${combo}`;
    document.querySelector('#nitro-fill').style.transform=`scaleX(${nitro/100})`;
    document.querySelector('#error-counter').textContent=`${errors} erreur${errors>1?'s':''}`;
  }

  input.addEventListener('keydown', event => {
    if (!started || paused || finished) return;
    if (event.key === 'Enter') { event.preventDefault(); activateNitro(); return; }
    if (event.key.length !== 1) return;
    event.preventDefault();
    if (event.key === text[index]) {
      index++; combo++; maxCombo=Math.max(maxCombo,combo); nitro=clamp(nitro+(combo>=10?5:3),0,100);
      beep(360+Math.min(combo,20)*12,.025,.015);
      circuit.classList.toggle('hot-streak',combo>=10);
      spawnKeyParticle(event.key);
      if (combo===10 || combo===25) flashMessage(combo===10?'COMBO ×10':'PLEIN RÉGIME');
      if (index>=text.length) finishRace(true,'Ligne d’arrivée franchie');
    } else {
      errors++; combo=0; nitro=clamp(nitro-15,0,100); opponentProgress=opponentProgress.map(v=>clamp(v+1.3,0,100));
      circuit.classList.remove('hot-streak'); cockpit.classList.remove('input-error'); void cockpit.offsetWidth; cockpit.classList.add('input-error');
      beep(120,.09,.045); flashMessage('FAUTE · GARDE LE CAP','error');
    }
    paintText(); updateRaceVisuals();
  });

  function activateNitro() {
    if (nitro<100 || nitroActive) { flashMessage(nitro<100?'NITRO PAS ENCORE PRÊTE':'NITRO ACTIVE'); return; }
    nitroActive=true; nitro=0; circuit.classList.add('nitro-active'); flashMessage('NITRO !'); beep(920,.3,.05);
    opponentProgress=opponentProgress.map(v=>clamp(v-4,0,100));
    setTimeout(()=>{nitroActive=false;circuit?.classList.remove('nitro-active');},2800);
  }
  function spawnKeyParticle(char) {
    const layer=document.querySelector('#race-particles'); if(!layer) return;
    const particle=document.createElement('i'); particle.textContent=char===' '?'·':char; layer.appendChild(particle);
    particle.animate([{transform:'translate(0,0) scale(.7)',opacity:1},{transform:`translate(${40+Math.random()*60}px,${-35-Math.random()*55}px) rotate(${Math.random()*30-15}deg) scale(1.1)`,opacity:0}],{duration:520,easing:'cubic-bezier(.16,1,.3,1)'}).onfinish=()=>particle.remove();
  }
  function flashMessage(message,type='') {
    let flash=document.querySelector('.race-flash');
    if(!flash){flash=document.createElement('div');flash.className='race-flash';circuit.appendChild(flash);}
    flash.textContent=message;flash.className=`race-flash ${type}`;void flash.offsetWidth;flash.classList.add('show');
  }
  function finishRace(completed, reason) {
    if(finished) return; finished=true; cancelAnimationFrame(raceFrame); circuit.classList.remove('racing','hot-streak','nitro-active');
    const elapsed=Math.max(1,(performance.now()-startTime-pauseTotal)/1000);
    const wpm=Math.round(index/5/(elapsed/60)); const accuracy=Math.round(index/(index+errors||1)*100);
    const playerProgress=index/text.length*100; const won=completed && playerProgress>=Math.max(...opponentProgress);
    const previousBest=state.bestWpm;
    const xp=completed ? config.reward + Math.min(maxCombo*2,80) : 35; const coins=completed ? 45 + (won?25:0) : 10;
    state.completed++; state.bestWpm=Math.max(state.bestWpm,wpm); state.accuracy=Math.round((state.accuracy*(state.completed-1)+accuracy)/state.completed); state.xp+=xp; state.coins+=coins;
    const challengeId=sessionStorage.getItem('active-challenge');
    const challengePassed = completed && (!challengeId || (
      challengeId==='daily' ? accuracy>=96 :
      challengeId==='sprint' ? wpm>=45 :
      challengeId==='precision' ? errors<=3 :
      challengeId==='comeback' ? wpm>previousBest :
      challengeId==='zen' ? accuracy>=95 : true
    ));
    if(challengePassed && challengeId && !state.challengeWins.includes(challengeId)) state.challengeWins.push(challengeId);
    sessionStorage.removeItem('active-challenge');
    state.history.unshift({mode:config.name,wpm,accuracy,won,date:new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'short'})}); state.history=state.history.slice(0,12); save();
    setTimeout(()=>showRaceResult({won,completed,reason,wpm,accuracy,xp,coins,maxCombo,challengeId,challengePassed}),350);
  }
  function showRaceResult(result) {
    const rank=result.won?'1er':result.completed?'2e':'—';
    app.innerHTML=`<div class="result-page ${result.won?'victory':''}"><div class="result-confetti" aria-hidden="true">${Array.from({length:20},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><div class="podium-scene"><span class="result-rank">${rank}</span>${carMarkup(state.selectedCar,'podium-car')}<div class="podium-floor"></div></div><section class="result-panel"><p class="kicker">${result.won?'Victoire':'Course terminée'}</p><h1>${result.won?'Tu as dompté la piste.':result.reason}</h1><p>${result.challengeId&&!result.challengePassed?'Course terminée, mais l’objectif du défi reste à battre. ':''}${result.won?'Précision, rythme et sang-froid : le combo gagnant.':'Chaque tour construit les bons réflexes. Le prochain sera plus rapide.'}</p><div class="result-numbers"><div><span>Vitesse</span><strong>${result.wpm}<small> MPM</small></strong></div><div><span>Précision</span><strong>${result.accuracy}<small>%</small></strong></div><div><span>Meilleur combo</span><strong>×${result.maxCombo}</strong></div></div><div class="reward-line"><span>${result.challengePassed&&result.challengeId?'Défi remporté':'Récompenses'}</span><strong>+${result.xp} XP · +${result.coins} CR</strong></div><div class="result-actions">${button('Rejouer','primary','start-race',`data-mode="${raceMode}"`)}${button('Retour au paddock','secondary','home')}</div></section></div>`;
    app.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>handleAction(el))); beep(result.won?840:420,.25,.05); if(result.won)setTimeout(()=>beep(1080,.3,.04),120);
  }

  window.toggleRacePause = () => {
    if(!started || finished) return; paused=!paused; const overlay=document.querySelector('#pause-overlay'); overlay.hidden=!paused;
    if(paused){pausedAt=performance.now();circuit.classList.remove('racing');input.blur();}
    else{pauseTotal+=performance.now()-pausedAt;circuit.classList.add('racing');input.focus();}
  };
  cleanupActive=()=>{countdownTimers.forEach(clearTimeout);cancelAnimationFrame(raceFrame);window.toggleRacePause=null;};
  paintText(); updateRaceVisuals();
}

function escapeHTML(value) { return value.replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }
render();
detectKeyboardLayout();
