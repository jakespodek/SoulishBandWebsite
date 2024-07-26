const app = {};
app.sheetID = '1joDvSsXHNv70XpwPRGjgNn9pDMEfnbvIB_ogXiag8tA';
app.base = `https://docs.google.com/spreadsheets/d/${app.sheetID}/gviz/tq?`;
app.query = encodeURIComponent('Select *');

app.fetchData = async (sheet) => {
    const url = `${app.base}&sheet=${sheet}&tq=${app.query}`;
    try {
        const response = (await fetch(url)).text();
        // response is a string that needs to be cleaned up before parsing
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
    // check if shows table is empty
    // if shows table is empty, the response will contain only the column names
        // shows[0].c[0].v will be "Date" and the "stay tuned" message will render
    // if shows data is returned, it is heavily nested
        // each shows row is array (c) of objects ([0]-[4]) containing unformatted (v) and sometimes formatted (f) data
    shows[0].c[0].v !== "Date" ?
        shows.forEach(row => {
            showsList.innerHTML += `
                <li class="mb-20 sm:mb-12">
                    <div class="sm:flex relative text-center">
                        <p class="text-soulblue min-h-11 p-2 basis-1/4">${row.c[0].f}</p>
                        <p class="min-h-11 p-2 basis-1/4">${row.c[1].v}</p>
                        <p class="min-h-11 p-2 basis-1/4 mb-4 sm:mb-0">${row.c[2].v}</p>
                        <a class="button sm:absolute sm:right-0" href="${row.c[3].v}" target="_blank">Tickets</a>
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
        // the relevant html links each have a class name that matches a value in the data
        // getElementsByClassName returns HTMLCollections which are spread into arrays
        // the arrays are looped over and href values are added from the fetched data
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

app.mobileNav = () => {
    const navCheckbox = document.getElementById('check');
    const body = document.querySelector('body');
    let mql = window.matchMedia("(min-width: 1024px)");

    // on screen width change: if width >= 1024px and mobile nav is open, close the nav by unchecking the checkbox
    mql.addEventListener('change', (e) => {
        if (e.matches && navCheckbox.checked) {
            navCheckbox.checked = false;
            body.style.overflow = 'auto';
        }
    });

    // prevent scrolling when mobile nav is open
    navCheckbox.addEventListener('change', () => {
        body.style.overflow = navCheckbox.checked ? 'hidden' : 'auto';
    });
}

app.init = () => {
    app.getLinks();
    app.mobileNav();
    if (document.querySelector('title').text === 'Shows') app.getShows();
    if (document.querySelector('title').text === 'About') app.getBio();
};

app.init();