const starName = document.getElementById('starName');

const gatherProfile = async () => {
    const response = await fetch("https://swapi.dev/api/people/" + Math.floor(Math.random() * 80));
    const data = await response.json();
    console.log(data);
    starName.innerHTML = data.name;
}

gatherProfile();