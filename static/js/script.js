document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('impossible-button');
    const clickSound = document.getElementById('clickSound');
    const missSound = document.getElementById('missSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const popUpSound = document.getElementById('popUpSound');
    const errorSound = document.getElementById('errorSound');
    const randomSound = document.getElementById('randomSound');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const leaderboardList = document.getElementById('leaderboard-list');
    const confettiContainer = document.getElementById('confetti');

    let score = 0;
    let time = 0;
    let speed = 2000;  // Speed at which the button moves
    let obstacles = [];

    backgroundMusic.play();

    // Generate obstacles
    for (let i = 0; i < 5; i++) {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        document.body.appendChild(obstacle);
        obstacles.push(obstacle);
        moveObstacle(obstacle);
    }

    // Timer
    setInterval(() => {
        time++;
        timerDisplay.innerText = `Time: ${time}s`;
    }, 1000);

    // Change background color
    setInterval(() => {
        document.body.style.backgroundColor = getRandomColor();
    }, 3000);

    // Random pop-ups
    setInterval(() => {
        showRandomPopUp();
    }, 5000);

    // Random sound effects
    setInterval(() => {
        randomSound.play();
    }, 7000);

    // Screen shake
    setInterval(() => {
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }, 10000);

    // Move button randomly
    button.addEventListener('mouseover', (event) => {
        moveButton();
        missSound.play();
        incrementSpeed();
    });

    // Click button
    button.addEventListener('click', (event) => {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        clickSound.play();
        moveButton();
        incrementSpeed();
        showConfetti();
        updateLeaderboard();
        changeButtonText();
    });

    function moveButton() {
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const newLeft = Math.random() * (windowWidth - buttonWidth);
        const newTop = Math.random() * (windowHeight - buttonHeight);

        button.style.left = `${newLeft}px`;
        button.style.top = `${newTop}px`;
    }

    function moveObstacle(obstacle) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const newLeft = Math.random() * (windowWidth - obstacle.offsetWidth);
        const newTop = Math.random() * (windowHeight - obstacle.offsetHeight);

        obstacle.style.left = `${newLeft}px`;
        obstacle.style.top = `${newTop}px`;

        setTimeout(() => moveObstacle(obstacle), speed);
    }

    function incrementSpeed() {
        if (speed > 500) {
            speed -= 100;
        }
    }

    function updateLeaderboard() {
        const listItem = document.createElement('li');
        listItem.innerText = `Score: ${score}, Time: ${time}s`;
        leaderboardList.appendChild(listItem);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function showRandomPopUp() {
        const popUpMessages = [
            "You're almost there!",
            "Keep trying!",
            "You can do it!",
            "Just one more click!",
            "Don't give up!",
            "Error: Click failed!",
            "Try again!"
        ];
        const randomMessage = popUpMessages[Math.floor(Math.random() * popUpMessages.length)];
        const popUpImages = [
            "static/images/pop-up1.png",
            "static/images/pop-up2.png",
            "static/images/pop-up3.png"
        ];
        const randomImage = popUpImages[Math.floor(Math.random() * popUpImages.length)];
        alert(randomMessage);
        popUpSound.play();
        showPopUpImage(randomImage);
    }

    function showPopUpImage(imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.position = 'absolute';
        img.style.left = `${Math.random() * window.innerWidth}px`;
        img.style.top = `${Math.random() * window.innerHeight}px`;
        img.style.zIndex = 1000;
        document.body.appendChild(img);
        setTimeout(() => {
            document.body.removeChild(img);
        }, 3000);
    }

    function showConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * window.innerWidth}px`;
            confetti.style.top = `${Math.random() * window.innerHeight}px`;
            confetti.style.backgroundColor = getRandomColor();
            confettiContainer.appendChild(confetti);
        }
        setTimeout(() => {
            while (confettiContainer.firstChild) {
                confettiContainer.removeChild(confettiContainer.firstChild);
            }
        }, 3000);
    }

    function changeButtonText() {
        const buttonMessages = [
            "Click Me!",
            "Catch Me!",
            "Almost!",
            "Not Here!",
            "Missed!",
            "Try Again!",
            "Too Slow!"
        ];
        const randomMessage = buttonMessages[Math.floor(Math.random() * buttonMessages.length)];
        button.innerText = randomMessage;
    }
});