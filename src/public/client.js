let store = {
    user: { name: "Student" },
    apod: '',
    mission: '',
    gallery: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    rover: 'curiosity',
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
    let { rovers, apod, mission, gallery, rover} = state

    return `
        <header>
        <h1>Mars Rovers</h1>
            <nav>
                <ul>
                    <li><button id="one" type="button" onclick="RoverSelect('curiosity')">${rovers[0]}</button></li>
                    <li><button id="two" type="button" onclick="RoverSelect('opportunity')">${rovers[1]}</button></li>
                    <li><button id="three" type="button" onclick="RoverSelect('spirit')">${rovers[2]}</button></li>
                </ul>
            </nav>
        </header>
        <main>
            ${Greeting(store.user.name)}
            <h1>${store.rover}</h1>
            <section>
            ${ImageGallery(gallery, rover)}
            <section>
            ${MissionManifest(mission, rover)}
            </section>
        </main>
        <aside>
        ${ImageOfTheDay(apod)}
        </aside>
        <footer>I am a footer</footer>      
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------COMPONENTS

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

// Image of the Day
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    // console.log(photodate.getDate(), today.getDate());

    // console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // Check if media type is video
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

// Mission Manifest
const MissionManifest = (mission, rover) => {
    if (store.mission === '') {
        getMissionManifest(store, rover)
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

// Image Gallery
const ImageGallery = (gallery, rover) => {
    if (store.gallery === '') {
        getImageGallery(store, rover)
    }
    return `
    <p>
        <h3>Gallery</h3>
        <ul>
            <li><img src="${gallery.photos.photos[0].img_src}" height="350px" width="100%" /></li>
            <li></li>
        </ul>
    </p>
    `
}

// Rover Select
const RoverSelect = (rover) => {   
    getRover(rover)
    return `
    <p>${rover}</p>`
}
//API CALLS
const getRover = (state) => {
    let { rover } = state
    updateStore(store, { rover})
    
    return
}

// Astronomy Picture of the Day
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return
}

// Mission Manifest
const getMissionManifest = (state, rover) => {
    let { mission } = state
    const selectedRover = rover

    fetch(`http://localhost:3000/mission-${selectedRover}`)
        .then(res => res.json())
        .then(mission => updateStore(store, { mission }))

    return
}

// Image Gallery

const getImageGallery = (state, rover) => {
    let { gallery } = state
    const selRover = rover

    fetch(`http://localhost:3000/photos-${selRover}`)
        .then(res => res.json())
        .then(gallery => updateStore(store, { gallery }))

    return
}