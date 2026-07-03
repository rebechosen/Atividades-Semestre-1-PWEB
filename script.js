async function buscarTime() {
    const nomeTimeDigitado = document.getElementById("nomeTimeInput").value.trim();

    if (nomeTimeDigitado === "") {
        alert("Por favor, digite o nome de um time!");
        return;
    }
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${nomeTimeDigitado}`;

    try {
        const resposta = await fetch(url);
        const data = await resposta.json();
      
        if (data.teams === null) {
            alert("Time não encontrado! Tente digitar em inglês ou confira a ortografia.");
            document.getElementById("resultado").style.display = "none";
            return;
        }
        const time = data.teams[0];

        document.getElementById("escudo").src = time.strTeamBadge;
        document.getElementById("nomeTime").innerText = time.strTeam;
        document.getElementById("estadio").innerText = time.strStadium ? time.strStadium : "Não informado";
        document.getElementById("capacidade").innerText = time.intStadiumCapacity ? Number(time.intStadiumCapacity).toLocaleString('pt-BR') : "Não informada";
        document.getElementById("cidade").innerText = time.strLocation ? time.strLocation : "Não informada";
        document.getElementById("resultado").style.display = "inline-block";

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.");
    }
}
