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
    closeModal('settingsModal');
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


function leftClick() {
	btn.style.left = '0';
    document.getElementById('right-btn').style.color = 'black';
    document.getElementById('left-btn').style.color = 'white';
    game = 1;
}

function rightClick() {
	btn.style.left = '162.5px';
    document.getElementById('left-btn').style.color = 'black';
    document.getElementById('right-btn').style.color = 'white';
    game = 2;
}

function toggle(){
    const isChecked = document.getElementById('check').checked;

   if (isChecked){
        return true;
        console.log("Button Checked");
   } else{
        return false;
        console.log("Button Not Checked");
    }
}



