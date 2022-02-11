const app = {};

app.upcomingShows = [
    {
        date: "April 28, 2022",
        city: "Toronto, ON",
        venue: "Lee's Palace",
    },
];

app.displayShows = () => {
    const showsList = document.getElementById("showsList");

    showsList.innerHTML = `
        <li>
            <div class="flex justify-between items-center">
                <p>${app.upcomingShows[0].date}</p>
                <div>
                    <p>${app.upcomingShows[0].city}</p>
                    <p>${app.upcomingShows[0].venue}</p>
                </div>
            </div>
        </li>
    `;
};

app.init = () => {
    app.displayShows();
};

app.init();