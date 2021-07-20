



const API_URL = "https://api.github.com/users/";

const main = document.querySelector(".main");
const form = document.querySelector(".form");
const search = document.querySelector(".search");

getUser("varshac11");

async function getUser(username) {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(API_URL + username + "/repos");
  const respData = await resp.json();
  addReposToCard(respData);
}


function addReposToCard(repos) {
   const reposEl = document.querySelector("#repos");  
  repos.forEach((repo) => {
          const repoEl = document.createElement("a");
          const repoFork = document.createElement("h4");
          const repoStar=document.createElement("h4");
          const repo2= document.createElement("br");
          repoEl.classList.add("repo");
          repoEl.href = repo.html_url;
          repoEl.target = "_blank";
          repoEl.innerText = repo.name;
          repoStar.innerText = repo.stargazers_count;        
          repoFork.innerText= "Forks :" + repo.forks;
          repoStar.innerText= "Stars :" + repo.stargazers_count;
          reposEl.append(repoEl,repoFork,repoStar,repo2);
 
          
      });
}


function createUserCard(user) {
  const cardHTML = `
      <div class="card">
          <div>
              <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div class="user-info">
              <h2>${user.login}</h2>
              <h3>${user.name}</h2>
              
              <ul class="info">
                  <li><b>Followers :</b>${user.followers}</li>
                  <li><b>Following :</b>${user.following}</li>
                  <li><b>Repos :</b>${user.public_repos}</li>
                  
                  <li><b>Location :</b>${user.location}</li>
                 
              </ul>
           
              <div id="repos"></div>
          </div>
      </div>
  `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
      getUser(user);
      search="";
  }

 
  
});


