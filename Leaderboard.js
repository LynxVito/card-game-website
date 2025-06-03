const savedScores = JSON.parse(localStorage.getItem("gameStorage"));


if(savedScores !== null) {
    const table = document.getElementById("scores");
    for(const score of savedScores) {
        const newRow = document.createElement("tr");

        const nameCol = document.createElement("td");
        nameCol.innerText = score.player;
        newRow.appendChild(nameCol);

        const playerCol = document.createElement("td");
        playerCol.innerText = score.playerScore;
        newRow.appendChild(playerCol);

        const enemyCol = document.createElement("td");
        enemyCol.innerText = score.enemyScore;
        newRow.appendChild(enemyCol);

        table.appendChild(newRow);
    }
}