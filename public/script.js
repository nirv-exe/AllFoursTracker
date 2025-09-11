const firebaseConfig = {
    apiKey: "AIzaSyDSzflwqfyQjjQUv9SmNKQqtI44wON4uDg",
    authDomain: "all-fours-tracker.firebaseapp.com",
    projectId: "all-fours-tracker",
    storageBucket: "all-fours-tracker.firebasestorage.app",
    messagingSenderId: "500056857098",
    appId: "1:500056857098:web:854059605c682660ec9df3"
};

let team1Score = 0;
let team2Score = 0;
let team1Name = "Team 1";
let team2Name = "Team 2";
let game = 1;

function initGame(){
    team1Score = 0;
    team2Score = 0;
    team1Name = "Team 1";
    team2Name = "Team 2";
    document.getElementById('team1-name').textContent = team1Name;
    document.getElementById('team2-name').textContent = team2Name;
    document.getElementById('team-1-score').textContent = "0";
    document.getElementById('team-2-score').textContent = "0";
    document.getElementById('points').style.display = 'none';
    document.getElementById('check').checked = true;

    const allPointButtons = document.querySelectorAll('button[id*="team1"], button[id*="team2"]');

    allPointButtons.forEach(btn => {
        if (btn.id.includes('team1')) {
            btn.disabled = false;
        } else if (btn.id.includes('team2')) {
            btn.disabled = false;
        }
    });

    leftClick();
    updateScoreDisplay();
    updateButtonStates();
    updateSettings();
}

function resetGame(){
    team1Score = 0;
    team2Score = 0;
    document.getElementById('team-1-score').textContent = "0";
    document.getElementById('team-2-score').textContent = "0";
    document.getElementById('points').style.display = 'none';

    const allPointButtons = document.querySelectorAll('button[id*="team1"], button[id*="team2"]');

    allPointButtons.forEach(btn => {
        if (btn.id.includes('team1')) {
            btn.disabled = false;
        } else if (btn.id.includes('team2')) {
            btn.disabled = false;
        }
    });

    updateScoreDisplay();
    updateButtonStates();
}

function updateScoreDisplay() {
    document.getElementById('team-1-score').textContent = team1Score;
    document.getElementById('t1-score').textContent = team1Score;
    document.getElementById('team-2-score').textContent = team2Score;
    document.getElementById('t2-score').textContent = team2Score;
}

function updateButtonStates() {
    const addOneTeam1 = document.getElementById('add-one-team1');
    const minusOneTeam1 = document.getElementById('minus-one-team1');

    const addOneTeam2 = document.getElementById('add-one-team2');
    const minusOneTeam2 = document.getElementById('minus-one-team2');

    addOneTeam1.disabled = team1Score >= 14;
    minusOneTeam1.disabled = team1Score <= 0;

    addOneTeam2.disabled = team2Score >= 14;
    minusOneTeam2.disabled = team2Score <= 0;

    const allPointButtons = document.querySelectorAll('button[id*="team1"], button[id*="team2"]');

    allPointButtons.forEach(btn => {

        if (btn.id.includes('add-one') || btn.id.includes('minus-one')) return;

        if (btn.id.includes('team1')) {
            btn.disabled = team1Score >= 14;
        } else if (btn.id.includes('team2')) {
            btn.disabled = team2Score >= 14;
        }
    });
}

function updateSettings(){
    if ((team1Score > 0 || team2Score > 0) && toggle()){
        document.getElementById('points').style.display = 'block';
    }
    else{
        document.getElementById('points').style.display = 'none';
    }

    const gameis2 = document.getElementById('check-game').checked;

    if (gameis2){
        rightClick();
    }
    else{
        leftClick();
    }

    backToSettings();
    closeMenu();
}

function changeTeam1Score(amount) {
    team1Score += amount;

    if (team1Score > 14)
        team1Score = 14;

    updateScoreDisplay();
    updateButtonStates();
}

function changeTeam2Score(amount) {
    team2Score += amount;

    if (team2Score > 14)
        team2Score = 14;
    
    updateScoreDisplay();
    updateButtonStates();
}

document.addEventListener('DOMContentLoaded', () => {
    initGame();

    updateScoreDisplay();
    updateButtonStates();
});

window.addPoints = function(type, team, points) {
    console.log(points, type);

    if (type === 'game')
        points = game;

    if (team == 1)
        changeTeam1Score(points);
    else if (team == 2)
        changeTeam2Score(points);

    checkWin(team);
    updateScoreDisplay();
    updateSettings();
    updateButtonStates();
};

function checkWin(){    
    if(team1Score === 14){
        showModal('victoryTeamModal');

        confetti({
            particleCount: 150,
            spread : 100,
            origin: {y: 0.5},
            zIndex: 1000
        })

        document.getElementById('win-team').textContent = `${team1Name} Wins!`;
        document.getElementById('team1-scores').textContent = `${team1Name} - ${team1Score} points`;
        document.getElementById('team2-scores').textContent = `${team2Name} - ${team2Score} points`;
    } else if(team2Score === 14){
        showModal('victoryTeamModal',);

        confetti({
            particleCount: 150,
            spread : 100,
            origin: {y: 0.5},
            zIndex: 1000
        })

        document.getElementById('win-team').textContent = `${team2Name} Wins!`;
        document.getElementById('team1-scores').textContent = `${team1Name} - ${team1Score} points`;
        document.getElementById('team2-scores').textContent = `${team2Name} - ${team2Score} points`;
    }
}

window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
    
    let teamName = document.getElementById('edit-team');

    teamName.classList = '';

    document.getElementById('team-name').value = "";

    stopError();
};

window.endGame = function(id){
    closeModal(id);
    resetGame(); 
}

window.showModal = function(id, team, teamID) {
    document.getElementById(id).style.display = 'block';

    document.getElementById('edit-team').textContent = `Edit ${team} Name`;
    document.getElementById('edit-team').classList.add(teamID);
};

function displayError(){
    document.getElementById('error').style.display = 'block';
}

function stopError(){
    document.getElementById('error').style.display = 'none';
}

window.editName = function(){
    const id = document.getElementById('edit-team').className;

    if(id.includes("team1")){
        team1Name = document.getElementById('team-name').value;
    }
    else if(id.includes("team2")){
        team2Name = document.getElementById('team-name').value;
    }

    console.log(team1Name, team2Name);

    if (document.getElementById('team-name').value === ''){
        displayError();
    } else{
        document.getElementById(id).textContent = document.getElementById('team-name').value;
        closeModal('editTeamModal');
    }
}

let btn = document.getElementById('btn')

const rootElement = document.documentElement;
const computedStyle = getComputedStyle(rootElement);

function leftClick() {
	btn.style.left = '0';

    const bgColor = computedStyle.getPropertyValue('--background-color').trim();
    console.log(bgColor);

    document.getElementById('right-btn').style.color = "black";
    document.getElementById('left-btn').style.color = `hsl(from ${bgColor} h s calc(l + 30))`;
    game = 1;
}

function rightClick() {
	btn.style.left = '162.5px'; 

    const bgColor = computedStyle.getPropertyValue('--background-color').trim();
    console.log(bgColor);
    
    document.getElementById('left-btn').style.color = "black"
    document.getElementById('right-btn').style.color = `hsl(from ${bgColor} h s calc(l + 30))`;
    game = 2;
}

function toggle(){  
    const showTotal = document.getElementById('check').checked;

   if (showTotal){
        return true;
   } else{
        return false;
    }
}

function closeMenu(){
    const toggleMenu = document.querySelector('.toggle-menu');
    const menuContent = document.querySelector('.menu-content');
    const menu = document.querySelector('.menu');
    const confirmBtn = document.querySelector('#confirm-btn');

    if (toggleMenu) toggleMenu.classList.remove('menu-open');
    if (menuContent) menuContent.classList.remove('menu-content-open');
    if (menu) menu.classList.remove('menu-open');
    if (confirmBtn) confirmBtn.classList.remove('showBtn');
    document.querySelector('#small-confirm-btn').classList.remove('showBtn');
}

document.querySelector('.nav-toggle').addEventListener('click', () => {
    backToSettings();
    document.querySelector('.toggle-menu').classList.toggle('menu-open');
    document.querySelector('.menu-content').classList.toggle('menu-content-open');
    document.querySelector('.menu').classList.toggle('menu-open');
    document.querySelector('#confirm-btn').classList.toggle('showBtn');
    document.querySelector('#small-confirm-btn').classList.toggle('showBtn');
});

window.openThemes = function(){
    document.querySelector('#settings').classList.add('themes-open');

    document.querySelector('.themes-menu').classList.add('openThemes');

    document.querySelector('#back').style.display = 'flex';
}

window.backToSettings = function(){
    document.querySelector('#settings').classList.remove('themes-open');

    document.querySelector('.themes-menu').classList.remove('openThemes');

    setTimeout(()=>{
        document.querySelector('#back').style.display = 'none';
    }, 300);
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}

function showErrorPopup(message) {
    const popup = document.getElementById('popup-error');
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}

//Themes Script

function checkColor(id){
    if(id == 'color1'){
        return '#0033cc';
    }

    if(id == 'color2'){
        return '#cc0000';
    }

    if(id == 'color3'){
        return '#cc66ff';
    }

    
    if(id == 'color4'){
        return '#ffccff';
    }

    
    if(id == 'color5'){
        return '#4ddbff';
    }
}

function checkBGColor(id){
    if(id == 'color1'){
        return '#4d4d4d';
    }

    if(id == 'color2'){
        return '#99d6ff';
    }

    if(id == 'color3'){
        return '#c44dff';
    }
    
    if(id == 'color4'){
        return '#336699';
    }

    if(id == 'color5'){
        return '#ffccff';
    }
}

function checkTheme(team, color){
    const rootElement = document.documentElement;
    const computedStyle = getComputedStyle(rootElement);

    console.log("Color from function: ", color);

    if (team == 1){
        const theme_color = computedStyle.getPropertyValue('--t1-baseColor').trim();

        // console.log("Var Color: ", theme_color, "Color: ", color);

        if (color == theme_color){
            showErrorPopup("Team 1 already has that Theme");
            toggleReset();
            return true;
        }else {
            return false;
        };
    }
    else 
    if (team == 2){
        const theme_color = computedStyle.getPropertyValue('--t2-baseColor').trim();

        // console.log("Var Color: ", theme_color, "Color: ", color);

        if (color == theme_color){
            showErrorPopup("Team 2 already has that Theme");
            toggleReset();
            return true;
        } else{
            return false;
        }
    }
}

function checkToggle(id, type){
    let team1Theme = (type == "team1");
    let team2Theme = (type == "team2");

    let color = checkColor(id);
    const rootElement = document.documentElement;

    console.log(document.querySelector(`.team-1-themes #${id}`));

    console.log("Color from function: ", color);
    if (team1Theme){
        if (checkTheme(1,color)){
            return;
        }

        document.querySelector(`.team-1-themes .current-theme`).classList.remove("current-theme");
        rootElement.style.setProperty('--t1-baseColor', `${color}`);
        showPopup("Theme Successfully Set!");

        document.querySelector(`.team-1-themes #${id}`).classList.add("current-theme");
    } else if (team2Theme){
        if(checkTheme(2, color)){
            return;
        }

        document.querySelector(`.team-2-themes .current-theme`).classList.remove("current-theme");
        rootElement.style.setProperty('--t2-baseColor', `${color}`);
        showPopup("Theme Successfully Set!");

        document.querySelector(`.team-2-themes #${id}`).classList.add("current-theme");
    }

    let playerCards = document.querySelectorAll('.player-card');

    playerCards.forEach(card => {
        card.style.color = getContrastColor(color);
    })
    closeModal('themeModal');
}

function toggleReset(){
    document.getElementById('theme-checkT1').checked = false;
    document.getElementById('theme-checkT2').checked = false;
}

function resetThemes(){
    const rootElement = document.documentElement;
    const setThemes = document.querySelectorAll(`#presets .current-theme`);


    document.querySelector(`.team-1-themes .current-theme`).classList.remove("current-theme");
    document.querySelector(`.team-2-themes .current-theme`).classList.remove("current-theme");
    document.querySelector(`#backgrounds .current-theme`).classList.remove('current-theme');
    if(setThemes.length > 0){
        document.querySelector(`#presets .current-theme`).classList.remove('current-theme');
    }

    document.querySelector(`#backgrounds #color1`).classList.add('current-theme');
    document.querySelector(`.team-1-themes #color1`).classList.add("current-theme");
    document.querySelector(`.team-2-themes #color2`).classList.add("current-theme");


    
    document.querySelector('.player-card').style.color = '#fff';
    rootElement.style.setProperty('--background-color', `${checkBGColor('color1')}`);
    rootElement.style.setProperty('--t1-baseColor', `${checkColor('color1')}`);
    rootElement.style.setProperty('--t2-baseColor', `${checkColor('color2')}`);

    setContrastColor(checkBGColor('color1'));
}

function changeTheme(id, type){

    if (type == 'backgrounds'){
        document.querySelector('body').style.backgroundImage = '';
        const color = checkBGColor(id);
        const rootElement = document.documentElement;
        const computedStyle = getComputedStyle(rootElement);
        const theme_color = computedStyle.getPropertyValue('--background-color').trim();

        if (color == theme_color){
            showErrorPopup("Background already has this theme");
            return;
        }
        else{
            document.querySelector(`#backgrounds .current-theme`).classList.remove('current-theme');
            rootElement.style.setProperty('--background-color', `${color}`);
            document.querySelector(`#backgrounds #${id}`).classList.add('current-theme');
            showPopup("Background theme successfully set!");
        }

        setContrastColor(color);
    }
    else if (type == "team1" || type == "team2"){
        checkToggle(id, type);
    }

    toggleReset();
}

// Convert hex color (#rrggbb) → readable text color (black/white)
function setContrastColor(hex) {
  // strip leading #
  hex = hex.replace('#', '');
  const rootElement = document.documentElement.style;

  // parse r, g, b
  let r = parseInt(hex.substr(0,2),16);
  let g = parseInt(hex.substr(2,2),16);
  let b = parseInt(hex.substr(4,2),16);

  // relative luminance (perceived brightness)
  let luminance = (0.299*r + 0.587*g + 0.114*b) / 255;

  // if bright → return black text, else white text
  luminance > 0.5 ? rootElement.setProperty('--font-colorMain','#000000') : rootElement.setProperty('--font-colorMain','#ffffff') ;
}

function getContrastColor(hex) {
  // strip leading #
  hex = hex.replace('#', '');
  const rootElement = document.documentElement.style;

  // parse r, g, b
  let r = parseInt(hex.substr(0,2),16);
  let g = parseInt(hex.substr(2,2),16);
  let b = parseInt(hex.substr(4,2),16);

  // relative luminance (perceived brightness)
  let luminance = (0.299*r + 0.587*g + 0.114*b) / 255;

  // if bright → return black text, else white text
  return luminance > 0.5 ? '#000' : '#fff' ;
}

function setPreset(id){
    let team1Color = '#0033cc';
    let team2Color = '#cc0000';
    let backgroundColor = '#4d4d4d';
    const rootElement = document.documentElement;
    const computedStyle = getComputedStyle(rootElement);
    const checkTeam = computedStyle.getPropertyValue('--t1-baseColor');
    const setThemes = document.querySelectorAll(`#presets .current-theme`);
    const root = document.documentElement.style;
    
    if(id == 'color1'){
        team1Color = '#99bbff';
        team2Color = '#ffcccc';
        backgroundColor = `repeating-radial-gradient(${team1Color}, ${team2Color})`;
        if(team1Color == checkTeam){
            showErrorPopup('Theme Already Set!');
            return;
        }
    }
    else if(id == 'color2'){
        team1Color = '#ccff99';
        team2Color = '#9494b8';
        backgroundColor = `repeating-radial-gradient(${team1Color}, ${team2Color})`;

        if(team1Color == checkTeam){
            showErrorPopup('Theme Already Set!');
            return;
        }
    }
    else if(id == 'color3'){
        team1Color = '#ff99cc';
        team2Color = '#b3ecff';
        backgroundColor = `repeating-radial-gradient(${team1Color}, ${team2Color})`;

        if(team1Color == checkTeam){
            showErrorPopup('Theme Already Set!');
            return;
        }
    }
    else if(id == 'color4'){
        team1Color = '#ffbf80';
        team2Color = '#d279d2';
        backgroundColor = `repeating-radial-gradient(${team1Color}, ${team2Color})`;

        if(team1Color == checkTeam){
            showErrorPopup('Theme Already Set!');
            return;
        }
    }
    else if (id == 'color5'){
        team1Color = '#336699';
        team2Color = '#7300e6';
        backgroundColor = `repeating-radial-gradient(${team1Color}, ${team2Color})`;

        if(team1Color == checkTeam){
            showErrorPopup('Theme Already Set!');
            return;
        }
    }

    if(setThemes.length > 0){
        document.querySelector(`#presets .current-theme`).classList.remove('current-theme');
    }

    let team1lumin = getContrastColor(team1Color);
    let team2lumin = getContrastColor(team2Color);


    document.querySelector(`#presets #${id}`).classList.add('current-theme');
    root.setProperty('--t1-baseColor', team1Color);
    root.setProperty('--t2-baseColor', team2Color);
    root.setProperty('--background-color', team1Color);
    team1lumin > team2lumin ? setContrastColor(team1Color): 
    team2lumin > team1lumin ? setContrastColor(team2Color): setContrastColor(team1Color);
    document.querySelector('body').style.backgroundImage = backgroundColor;
    showPopup("Theme Successfully set!");
}

