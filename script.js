const app = {};
app.sheetID = '1joDvSsXHNv70XpwPRGjgNn9pDMEfnbvIB_ogXiag8tA';
app.base = `https://docs.google.com/spreadsheets/d/${app.sheetID}/gviz/tq?`;
app.sheetName = 'shows';
app.query = encodeURIComponent('Select *');
app.url = `${app.base}&sheet=${app.sheetName}&tq=${app.query}`;

app.fetchShows = async () => {
    try {
        const response = (await fetch(app.url)).text();
        const data = JSON.parse((await response).slice(47, -2)).table;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

app.renderShows = async () => {
    const showsList = document.getElementById("showsList");
    const data = await app.fetchShows();
    const rows = data.rows;
    rows.forEach(row => {
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
}

app.init = () => {
    app.renderShows();
};

app.init();