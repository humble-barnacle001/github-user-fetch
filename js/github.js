class GitHub {
    constructor() {
        this.repos_count = 5;
        this.repos_sort = 'asc';
    }

    async getUser(usr) {
        const profileResponse = await fetch(`https://api.github.com/users/${usr}`);
        // const profileResponse = await fetch(`jsonTests/${usr}.json`);
        if (profileResponse.status === 200) {
            const profileData = await profileResponse.json();
            const repoResponse = await fetch(`https://api.github.com/users/${usr}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`);
            // const repoResponse = await fetch(`jsonTests/repo.json`);
            const repoData = await repoResponse.json();
            return {
                "profile": profileData,
                "repos": repoData
            };
        }
        else {
            return {
                "profile": {
                    "message": "Not Found"
                },
                "code": profileResponse.status
            };
        }
    }
}