const gh = new GitHub();
const ui = new UI();
const clrBtn = document.getElementById('clr');
const usrName = document.getElementById('usrNameUI');
const theme = document.getElementById('theme');
const themeChanger = document.getElementById('themeChanger');
const lightCSS = 'css/litera.bootstrap.min.css';
const darkCSS = 'css/darkly.bootstrap.min.css';
const toTop = document.getElementById('toTop');

if (window.localStorage.getItem('theme') && window.localStorage.getItem('theme') === 'dark') {
    theme.setAttribute('href', darkCSS);
    themeChanger.innerHTML = 'Light Theme';
}
else {
    theme.setAttribute('href', lightCSS);
    localStorage.setItem('theme', 'light');
    themeChanger.innerHTML = 'Dark Theme';
}

themeChanger.addEventListener('click', (e) => {
    e.preventDefault();
    if (themeChanger.innerHTML === 'Dark Theme') {
        theme.setAttribute('href', darkCSS);
        localStorage.setItem('theme', 'dark');
        themeChanger.innerHTML = 'Light Theme';
    }
    else {
        theme.setAttribute('href', lightCSS);
        localStorage.setItem('theme', 'light');
        themeChanger.innerHTML = 'Dark Theme';
    }
});

document.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        toTop.style.display = '';
    }
    else {
        toTop.style.display = 'none';
    }
});

toTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scroll(0, 0);
});

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
                            window.scrollTo(0, 0);
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
                if (confirm('Error!!! Weak Internet Connection!! Reloading page might help!')) {
                    window.location.reload();
                    window.scrollTo(0, 0);
                }
                else {
                    ui.showAlert('Weak Network, please reload', 'info');
                }
            });
    }
    else {
        ui.hideBtn();
    }
});