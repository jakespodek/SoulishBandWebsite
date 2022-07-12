const app = {};

app.upcomingShows = [
    {
        date: "April 28, 2022",
        city: "Toronto, ON",
        venue: "Lee's Palace",
    },
    // {
    //     date: "May 11, 2022",
    //     city: "Example, ON",
    //     venue: "Cool Place",
    // },
];

app.displayShows = () => {
    const showsList = document.getElementById("showsList");

    app.upcomingShows.forEach(show =>
        showsList.innerHTML += `
            <li class="mb-12">
                <div class="flex justify-between items-center">
                    <p>${show.date}</p>
                    <div>
                        <p>${show.city}</p>
                        <p>${show.venue}</p>
                    </div>
                </div>
            </li>
        `
    );
};

app.init = () => {
    app.displayShows();
};

app.init();