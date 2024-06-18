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
    shows.forEach(row => {
        showsList.innerHTML += `
            <li class="mb-12">
                <div class="flex justify-between">
                    <p>${row.c[0].f}</p>
                    <p>${row.c[1].v}</p>
                    <p>${row.c[2].v}</p>
                    <p><a href="${row.c[3].v}" target="_blank">Tickets</a></p>
                </div>
            </li>
        `
    })
};

app.getLinks = async () => {
    const data = await app.fetchData('links');
    const links = data.rows.filter(row => row.c[1].v);
    links.forEach(link => {
        document.getElementById(link.c[0].v).href = link.c[2].v;
    })
}

app.init = () => {
    app.getShows();
    app.getLinks();
};

app.init();