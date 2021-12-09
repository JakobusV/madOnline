const starName = document.getElementById('starName');
const proof = document.getElementById('proof');

const gatherProfile = async () => {
    const response = await fetch("http://localhost:8085/hello");
    const data = await response.json();
    console.log(data);
    // const response = await fetch("https://swapi.dev/api/people/" + Math.floor(Math.random() * 80));
    // const data = await response.json();
    // console.log(data);
    proof.innerHTML = data.madOnlineProof;
    starName.innerHTML = data.name;
}

gatherProfile();