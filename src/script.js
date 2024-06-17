const app = {};

app.sheetID = '1joDvSsXHNv70XpwPRGjgNn9pDMEfnbvIB_ogXiag8tA';
app.base = `https://docs.google.com/spreadsheets/d/${app.sheetID}/gviz/tq?`;
app.sheetName = 'shows';
app.query = encodeURIComponent('Select *');
app.url = `${app.base}&sheet=${app.sheetName}&tq=${app.query}`;

app.links = [
    {name: 'spotify', url: 'https://open.spotify.com/artist/1urqcRSioOrL86IoxS1J5P', isActive: true},
    {name: 'applemusic', url: 'https://music.apple.com/ca/artist/soulish/1500136109', isActive: false},
    {name: 'soundcloud', url: 'https://soundcloud.com/soulish-band/', isActive: false},
    {name: 'bandcamp', url: 'https://soulishband.bandcamp.com/', isActive: false},
    {name: 'facebook', url: 'https://www.facebook.com/pages/category/Musician-band/Soulish-378186969413040/', isActive: true},
    {name: 'instagram', url: 'https://www.instagram.com/soulish_inc/', isActive: true},
    {name: 'tiktok', url: 'https://www.tiktok.com/@_soulish/', isActive: false},
    {name: 'youtube', url: 'https://www.youtube.com/channel/UCQElp0USJD3VEh56v6cXkpQ/videos', isActive: true},
    {name: 'etsy', url: 'https://www.etsy.com/ca/shop/SoulishStore/', isActive: false}
]

app.links.forEach(link => {if(link.isActive) document.getElementById(link.name).href = link.url;})

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