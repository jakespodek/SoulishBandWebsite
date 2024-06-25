const app = {};
app.sheetID = '1joDvSsXHNv70XpwPRGjgNn9pDMEfnbvIB_ogXiag8tA';
app.base = `https://docs.google.com/spreadsheets/d/${app.sheetID}/gviz/tq?`;
app.query = encodeURIComponent('Select *');

app.fetchData = async (sheet) => {
    const url = `${app.base}&sheet=${sheet}&tq=${app.query}`;
    try {
        const response = (await fetch(url)).text();
        const data = JSON.parse((await response).slice(47, -2)).table;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

app.getShows = async () => {
    const showsList = document.getElementById("showsList");
    const data = await app.fetchData('shows');
    const shows = data.rows;
    shows[0].c[0].v !== "Date" ?
        shows.forEach(row => {
            showsList.innerHTML += `
                <li class="mb-20 sm:mb-12">
                    <div class="sm:flex relative text-center">
                        <p class="text-soulblue min-h-11 p-2 basis-1/4">${row.c[0].f}</p>
                        <p class="min-h-11 p-2 basis-1/4">${row.c[1].v}</p>
                        <p class="min-h-11 p-2 basis-1/4 mb-4 sm:mb-0">${row.c[2].v}</p>
                        <a 
                            class="
                                bg-white 
                                text-black
                                hover:bg-soulblue 
                                focus:bg-soulblue
                                rounded 
                                uppercase
                                font-bold
                                p-2
                                sm:absolute 
                                sm:right-0
                            " 
                            href="${row.c[3].v}" 
                            target="_blank">
                            Tickets
                        </a>
                    </div>
                </li>
            `
        })
    : showsList.innerHTML = "<p class='text-center'>Stay tuned for show announcements!</p>"
};

app.getLinks = async () => {
    const data = await app.fetchData('links');
    const links = data.rows.filter(row => row.c[1].v);
    links.forEach(link => {
        let linkGroup = document.getElementsByClassName(`${link.c[0].v}`);
        [...linkGroup].forEach(a => a.href = link.c[2].v)
    })

}

app.getBio = async () => {
    const about = document.getElementById("about");
    const data = await app.fetchData('bio');
    const bio = data.rows;
    bio.forEach(p => {about.innerHTML += `<p class="mt-4">${p.c[1].v}</p>`})
}

app.init = () => {
    app.getShows();
    app.getLinks();
    app.getBio();
};

app.init();