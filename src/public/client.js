let store = {
    user: { name: "Student" },
    apod: '',
    mission: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    selectedrover: '',
}

// Add elementals to page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


//Create page layout
const App = (state) => {
    let { rovers, apod, mission } = state

    return `
        <header>
        <h1>Mars Rovers</h1>
            <nav>
                <ul>
                    <li><a href="">${rovers[0]}</a></li>
                    <li><a href="">${rovers[1]}</a></li>
                    <li><a href="">${rovers[2]}</a></li>
                </ul>
            </nav>
        </header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h2>Rover-Name Mission Data</h2>
                ${MissionManifest(mission)}
            </section>
            <section>
                <h2>Rover: Insert Rover Name here Brian</h2>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer>I am a footer</footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

const MissionManifest = (mission) => {
    if (store.mission === '') {
        getMissionManifest(store)
    }
    return `
        <p>
        <ul> 
            <li>Launch Date: ${mission.mission.photo_manifest.launch_date}</li>
            <li>Landing Date: ${mission.mission.photo_manifest.landing_date}</li>
            <li>Rover Status: ${mission.mission.photo_manifest.status}</li>
        </ul>
        </p>
        `
}

//API CALLS

// Astronomy Picture of the Day
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return
}

// Mission Manifest
const getMissionManifest = (state) => {
    let { mission } = state

    fetch(`http://localhost:3000/mission`)
        .then(res => res.json())
        .then(mission => updateStore(store, { mission }))

    return
}