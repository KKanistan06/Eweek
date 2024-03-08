const typingElement = document.getElementById('typingAnimation');
const textToType = '2K24';
const typingSpeed = 300; // Adjust the speed (milliseconds per character)

let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingElement.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
    } else {
        charIndex = 0; // Reset charIndex to repeat the animation
    }
    setTimeout(typeText, typingSpeed);
}

// Start the typing animation
typeText();

// Show welcome and creator info on button click
const infoButton = document.getElementById('infoButton');
const detailsPopup = document.getElementById('detailsPopup');
const detailsContent = document.getElementById('detailsContent');

infoButton.addEventListener('click', () => {
    detailsContent.innerHTML = "<h4>வணக்கம்!</h4><p>உருவாக்கியவர்</p><p> கனிஸ்ரன் E21</p>";
    detailsPopup.style.display = 'block';

    // Hide details after 1 second
    setTimeout(() => {
        detailsPopup.style.display = 'none';
    }, 30000);

    // Add event listener to close popup when scrolling
    document.addEventListener('scroll', closePopup);
});

// Function to close the details popup
function closePopup() {
    detailsPopup.style.display = 'none';

    // Remove event listener after closing popup
    document.removeEventListener('scroll', closePopup);
}

// Zoom effect on scroll
document.addEventListener('scroll', () => {
    const gameBoxes = document.querySelectorAll('.gameBox');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    gameBoxes.forEach((gameBox) => {
        const boxPosition = gameBox.offsetTop;
        const boxHeight = gameBox.offsetHeight;

        if (scrollPosition >= boxPosition && scrollPosition <= boxPosition + boxHeight) {
            gameBox.classList.add('zoomed');
        } else {
            gameBox.classList.remove('zoomed');
        }
    });
});

// Function to open the details popup
function openPopup(teamName) {
    const team = teams.find(team => team.name === teamName);

    // You may need to customize the logic for counting games won, 1st runner-up, and 2nd runner-up
    const gamesWon = getGamesWon(teamName);
    const firstRunnerUp = getFirstRunnerUp(teamName);
    const secondRunnerUp = getSecondRunnerUp(teamName);

    const detailsHTML = `
        <p>Team: ${team.name}</p>
        <p>Total Points: ${team.points}</p>
        <p>Games Won: ${gamesWon}</p>
        <p>1st Runner Up: ${firstRunnerUp}</p>
        <p>2nd Runner Up: ${secondRunnerUp}</p>
    `;
    detailsContent.innerHTML = detailsHTML;
    detailsPopup.style.display = 'block';

    setTimeout(() => {
        detailsPopup.style.display = 'none';
    }, 40000);
}

// Function to open the game details popup
function openGameDetailsPopup(game) {
    const detailsPopup = document.getElementById('detailsPopup');
    const detailsContent = document.getElementById('detailsContent');

    if (game.pointsDistribution !== null) {
        const detailsHTML = `
            <p>Game: ${game.name}</p>
            <p>Winner: ${game.winner} - Captain: ${game.captains[0]}</p>
            <p>1st Runner Up: ${game.firstRunnerUp} - Captain: ${game.captains[1]}</p>
            <p>2nd Runner Up: ${game.secondRunnerUp} - Captain: ${game.captains[2]}</p>
        `;
        detailsContent.innerHTML = detailsHTML;

    } else {
        detailsContent.innerHTML = `<p>Game: ${game.name}</p><p>Stay tuned for results!</p>`;
    }

    detailsPopup.style.display = 'block';

    document.addEventListener('scroll', closePopup);

    setTimeout(() => {
        detailsPopup.style.display = 'none';
        document.removeEventListener('scroll', closePopup);
    }, 60000);
}

// Function to close the details popup
function closePopup() {
    detailsPopup.style.display = 'none';
}

// You need to customize these functions based on your data structure and logic
function getGamesWon(teamName) {
    // Implement logic to count games won by the team
    // Example: You might have a list of games where this team is the winner
    // You'll need to count the number of occurrences
    return games.filter(game => game.winner === teamName).length;
}

function getFirstRunnerUp(teamName) {
    // Implement logic to count 1st runner-up positions
    // Example: You might have a list of games where this team is the 1st runner-up
    // You'll need to count the number of occurrences
    return games.filter(game => game.firstRunnerUp === teamName).length;
}

function getSecondRunnerUp(teamName) {
    // Implement logic to count 2nd runner-up positions
    // Example: You might have a list of games where this team is the 2nd runner-up
    // You'll need to count the number of occurrences
    return games.filter(game => game.secondRunnerUp === teamName).length;
}

// Team data
const teams = [
    { name: 'E20', points: 0 },
    { name: 'E21', points: 0 },
    { name: 'E22', points: 0 },
    { name: 'E23', points: 0 },
    { name: 'STAFF', points: 0 },
];

// Game data (replace with actual data for 35 games)
const games = [
    { name: 'Football', winner: 'E20', firstRunnerUp: 'E21', secondRunnerUp: 'E22', pointsDistribution: [15, 8, 3], captains: ['pogitha', 'kanistan', 'kagee'] },
    { name: 'Cricket', winner: 'E22', firstRunnerUp: 'E20', secondRunnerUp: 'STAFF', pointsDistribution: [20, 10, 5], captains: ['kagee', 'pogitha', 'akshaya'] },
    { name: 'Chess', winner: 'E21', firstRunnerUp: 'E23', secondRunnerUp: 'E20', pointsDistribution: [8, 6, 4], captains: ['kanistan', 'gowsi', 'pogitha'] },
    { name: 'Vollyball', winner: 'E21', firstRunnerUp: 'E20', secondRunnerUp: 'E22', pointsDistribution: [15, 8, 3], captains: ['pogitha', 'kanistan', 'kagee'] },
    { name: 'Batminton', winner: 'E22', firstRunnerUp: 'E21', secondRunnerUp: 'STAFF', pointsDistribution: [20, 10, 5], captains: ['Akagee', 'pogitha', 'akshaya'] },
    { name: 'Netball', winner: 'E21', firstRunnerUp: 'E23', secondRunnerUp: 'E20', pointsDistribution: [8, 6, 4], captains: ['kanistan', 'gowsi', 'pogitha'] },
    { name: 'Gaming', winner: 'E21', firstRunnerUp: 'E23', secondRunnerUp: 'E22', pointsDistribution: [15, 8, 3], captains: ['pogitha', 'kanistan', 'kagee'] },
    { name: 'Dancing', winner: 'E22', firstRunnerUp: 'E21', secondRunnerUp: 'STAFF', pointsDistribution: [20, 10, 5], captains: ['kagee', 'pogitha', 'akshaya'] },
    { name: 'Singing', winner: 'E21', firstRunnerUp: 'E23', secondRunnerUp: 'E20', pointsDistribution: [8, 6, 4], captains: ['kanistan', 'gowsi', 'pogitha'] },
    { name: 'Drama', winner: 'E20', firstRunnerUp: 'E21', secondRunnerUp: 'E22', pointsDistribution: [15, 8, 3], captains: ['pogitha', 'kanistan', 'kagee'] },
    { name: 'E speaker', winner: 'E22', firstRunnerUp: 'E20', secondRunnerUp: 'STAFF', pointsDistribution: [20, 10, 5], captains: ['kagee', 'pogitha', 'akshaya'] },
    { name: 'Debat', winner: 'E21', firstRunnerUp: 'E23', secondRunnerUp: 'E20', pointsDistribution: [8, 6, 4], captains: ['kanistan', 'gowsi', 'pogitha'] },
    { name: 'Sort film', winner: 'E20', firstRunnerUp: 'E21', secondRunnerUp: 'E22', pointsDistribution: [15, 8, 3], captains: ['pogitha', 'Farhan', 'kagee'] },
    { name: 'Poem', winner: 'E21', firstRunnerUp: 'E20', secondRunnerUp: 'STAFF', pointsDistribution: [20, 10, 5], captains: ['kagee', 'pogitha', 'akshaya'] },
    { name: 'Art', winner: 'E21', firstRunnerUp: 'E23', secondRunnerUp: 'E20', pointsDistribution: [8, 6, 4], captains: ['kanistan', 'gowsi', 'pogitha'] },
    { name: 'PUBG', winner: null, firstRunnerUp: null, secondRunnerUp: null, pointsDistribution: null, captains: [] },
    { name: 'Freefire', winner: null, firstRunnerUp: null, secondRunnerUp: null, pointsDistribution: null, captains: [] },
    // Add more games with specific data as needed
];

// Simulate game results and update points
games.forEach(game => {
    const winner = teams.find(team => team.name === game.winner);
    const firstRunnerUp = teams.find(team => team.name === game.firstRunnerUp);
    const secondRunnerUp = teams.find(team => team.name === game.secondRunnerUp);

    if (winner) {
        const [winnerPoints, runnerUp1Points, runnerUp2Points] = game.pointsDistribution;

        winner.points += winnerPoints;
        firstRunnerUp.points += runnerUp1Points;
        secondRunnerUp.points += runnerUp2Points;
    }
});

// Sort teams based on total points
teams.sort((a, b) => b.points - a.points);

// Display team points on the web page
const teamPointsElement = document.getElementById('teamPoints');

teams.forEach((team, index) => {
    const circle = document.createElement('div');
    circle.className = 'circle';

    const front = document.createElement('div');
    front.className = 'front';
    front.textContent = team.name;

    const back = document.createElement('div');
    back.className = 'back';
    
    const points = document.createElement('div');
    points.textContent = team.points;
    
    const pointsLabel = document.createElement('div');
    pointsLabel.textContent = 'points';
    pointsLabel.style.fontSize = '0.8em';
    
    back.appendChild(points);
    back.appendChild(pointsLabel);

    circle.appendChild(front);
    circle.appendChild(back);

    // Add classes based on the place order
    circle.classList.add(getPlaceClass(index));

    // Add a click event listener to each circle
    circle.addEventListener('click', () => openPopup(team.name));

    teamPointsElement.appendChild(circle);
});



// Function to get the class based on the place order
function getPlaceClass(index) {
    switch (index) {
        case 0:
            return 'firstPlace';
        case 1:
            return 'secondPlace';
        case 2:
            return 'thirdPlace';
        case 3:
            return 'fourthPlace';
        case 4:
            return 'fifthPlace';
        default:
            return '';
    }
}

// Display game results on the web page
const gameResultsElement = document.getElementById('gameResults');

games.forEach((game) => {
    const gameBox = document.createElement('div');
    gameBox.className = 'gameBox';

    if (game.name === 'Football') {
        gameBox.style.backgroundImage = 'url("football.jpeg")';
    } else if (game.name === 'Cricket') {
        gameBox.style.backgroundImage = 'url("cricket.jpeg")';
    } else if (game.name === 'Chess') {
        gameBox.style.backgroundImage = 'url("chess.jpeg")';
    } else if (game.name === 'Dancing') {
        gameBox.style.backgroundImage = 'url("Dancing.jpeg")';
    } else if (game.name === 'Drama') {
        gameBox.style.backgroundImage = 'url("drama.jpeg")';
    } else if (game.name === 'Batminton') {
        gameBox.style.backgroundImage = 'url("batminton.jpeg")';
    } else if (game.name === 'Art') {
        gameBox.style.backgroundImage = 'url("art.jpeg")';
    } else if (game.name === 'Gaming') {
        gameBox.style.backgroundImage = 'url("image/gaming.jpeg")';
    } else if (game.name === 'Netball') {
        gameBox.style.backgroundImage = 'url("netball.jpeg")';
    } else if (game.name === 'Singing') {
        gameBox.style.backgroundImage = 'url("singing.jpeg")';
    } else if (game.name === 'Sort film') {
        gameBox.style.backgroundImage = 'url("sort film.jpeg")';
    } else if (game.name === 'Vollyball') {
        gameBox.style.backgroundImage = 'url("vollyball.jpeg")';
    } else if (game.name === 'E speaker') {
        gameBox.style.backgroundImage = 'url("E Speaker.jpeg")';
    } else if (game.name === 'Poem') {
        gameBox.style.backgroundImage = 'url("poem.jpeg")';
    } else if (game.name === 'Debat') {
        gameBox.style.backgroundImage = 'url("debat.jpeg")';
    }

    const gameName = document.createElement('div');
    gameName.className = 'gameName';
    gameName.textContent = `${game.name}`;

    gameBox.appendChild(gameName);

    // Add a click event listener to each game box
    gameBox.addEventListener('click', () => openGameDetailsPopup(game));

    const resultContainer = document.createElement('div');
    resultContainer.className = 'gameResult';

    if (game.pointsDistribution !== null) {
        const winner = createResultElement(game.winner, game.pointsDistribution[0]);
        const runnerUp1 = createResultElement(game.firstRunnerUp, game.pointsDistribution[1]);
        const runnerUp2 = createResultElement(game.secondRunnerUp, game.pointsDistribution[2]);

        resultContainer.appendChild(winner);
        resultContainer.appendChild(runnerUp1);
        resultContainer.appendChild(runnerUp2);
    } else {
        const stayTunedMessage = document.createElement('p');
        stayTunedMessage.textContent = 'Stay tuned for results!';
        resultContainer.appendChild(stayTunedMessage);
    }

    gameBox.appendChild(resultContainer);
    gameResultsElement.appendChild(gameBox);
});

function createResultElement(teamName, points) {
    const resultElement = document.createElement('div');
    resultElement.className = 'resultContainer';

    const combinedInfo = document.createElement('div');
    combinedInfo.className = 'combinedInfo';
    combinedInfo.textContent = `${teamName} - ${points} points`;

    resultElement.appendChild(combinedInfo);

    return resultElement;
}
