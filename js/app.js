const gh = new GitHub();
const ui = new UI();
const clrBtn = document.getElementById('clr');
const usrName = document.getElementById('usrNameUI');

clrBtn.addEventListener('click', e => {
    e.preventDefault();
    ui.hideBtn();
});

usrName.addEventListener('keyup', (e) => {
    const txt = e.target.value;
    if (txt != '') {
        ui.showBtn();
        ui.showLoader();
        gh.getUser(txt)
            .then(data => {
                if (data.profile.message === 'Not Found') {
                    if (data.code === 403) {
                        alert("YOU HAVE EXCEEDED THE MAXIMUM LIMIT OF VIEWING PROFILES!");
                        alert("Please visit in an hour");
                        if (confirm('You want to visit GitHub.com directly?')) {
                            window.location.href = 'https://github.com';
                        }
                        else {
                            window.location.reload();
                        }
                    }
                    else {
                        ui.showAlert(`User '${txt}' not Found`, 'danger');
                        ui.showProfile('');
                    }
                }
                else {
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            })
            .catch(err => {
                ui.showProfile('');
                confirm('Error!!! Reloading page might help!');
                window.location.reload();
            });
    }
    else {
        ui.hideBtn();
    }
});