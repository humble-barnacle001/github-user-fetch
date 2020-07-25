class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    showLoader() {
        this.profile.innerHTML = `
            <div class="text-center">
                <img src="img/Spinner-1.1s-200px.svg" alt="Waiting">
            </div>
        `;
    }

    showProfile(data) {
        if (data === '') {
            this.profile.innerHTML = '';
        }
        else {
            if (document.getElementById('alert-nf')) {
                document.getElementById('alert-nf').remove();
            }
            this.profile.innerHTML = `
                <div class="card card-body mb-3">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${data.avatar_url}" alt="Avatar Image" class="img-fluid mb-2">
                            <h2 class="text-center h4">${data.name !== null ? `${data.name}` : `Name NOT AVAILABLE`}</h2>
                            <a target="_blank" href="${data.html_url}" class="btn btn-primary btn-block mb-5">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            ${data.bio !== null ? `<h3 class="h6 mb-3 text-danger">${data.bio}</h3>` : `Bio NOT AVAILABLE`}
                            <br>
                            <div class="grid-display grid-display-300">
                                <a target="_blank" href=${data.html_url}?tab=repositories class="badge badge-info"><span>Public Repos: ${data.public_repos}</span></a>
                                <span class="badge badge-danger">Public Gists: ${data.public_gists}</span>
                                <span class="badge badge-success">Followers: ${data.followers}</span>
                                <span class="badge badge-primary">Following: ${data.following}</span>
                            </div>
                            <br>
                            <ul class="list-group">
                                <li class="list-group-item">${data.company !== null ? `Company : ${data.company}` : `User's Company name NOT AVAILABLE`}</li>
                                <li class="list-group-item">${data.blog !== "" ? `Website/Blog : <a target="_blank" href="${data.blog}">${data.blog}</a>` : `User's Blog NOT AVAILABLE`}</li>
                                <li class="list-group-item">${data.location !== null ? `Location : ${data.location}` : `User's Location NOT AVAILABLE`}</li>
                                <li class="list-group-item">Member Since : ${new Date(data.created_at).toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "long" })}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <h3 class="page-heading mb-3">Latest Repos</h3>
                <div id="repos"></div>
            `;
        }
    }

    showRepos(repos) {
        let output = '';
        repos.forEach(repo => {
            output += `
                <div class="card card-body mb-2">
                    <div class="row mb-3">
                        <div class="col-md-6 mb-2">
                            <a href="${repo.html_url}" target="_blank" class="h4">${repo.name}</a>
                        </div>
                        <div class="col-md-6 text-center mb-2 grid-display-300">
                            <span class="badge badge-secondary align-middle">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-info">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                    <h6 class="text-muted">Last Updated: ${new Date(repo.updated_at).toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "medium", hour12: true })}</h6>
                </div>
            `;
        });
        document.getElementById('repos').innerHTML = output;
    }

    hideBtn() {
        usrName.style.borderRight = '#303030 1px solid';
        usrName.value = '';
        clrBtn.style.display = 'none';
        usrName.style.borderTopRightRadius = '10px';
        usrName.style.borderBottomRightRadius = '10px';

        this.showProfile('');
    }

    showBtn() {
        usrName.style.borderRight = 'none';
        clrBtn.style.display = 'initial';
        usrName.style.borderTopRightRadius = '0px';
        usrName.style.borderBottomRightRadius = '0px';
    }

    showAlert(message, type) {
        if (document.getElementById('alert-nf')) {
            document.getElementById('alert-nf').remove();
        }
        const alert = document.createElement('div');
        alert.id = 'alert-nf';
        alert.className = `alert alert-${type} alert-dismissable`;
        const dismiss = document.createElement('button');
        dismiss.className = 'close';
        dismiss.setAttribute('data-dismiss', 'alert');
        const close = document.createElement('span');
        close.innerHTML = '&times;';
        dismiss.appendChild(close);
        alert.appendChild(dismiss);
        alert.appendChild(document.createTextNode(message));
        document.querySelector('.searchContainer').insertBefore(alert, document.querySelector('.search'));
        window.scroll(0, 0);
    }
}