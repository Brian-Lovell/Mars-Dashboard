let store = {
    user: { name: "Student" },
    apod: '',
    mission: '',
    gallery: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    rover: 'Curiosity',
}

// Add elementals to page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    console.log("Update Store Function",store,newState)
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
        </header>
        <nav>
            <ul>
                <li><button id="one" type="button" onclick="getRover('${rovers[0]}')">${rovers[0]}</button></li>
                <li><button id="two" type="button" onclick="getRover('${rovers[1]}')">${rovers[1]}</button></li>
                <li><button id="three" type="button" onclick="getRover('${rovers[2]}')">${rovers[2]}</button></li>
            </ul>
        </nav>
        <main>
            <article>
                <section class="mission-data">
                    <h2>Mars Rover: ${state.rover}</h2>
                    <h2>Mission Manifiest</h2>
                    ${MissionManifest(mission, rover)}
                </section>
                <section class="gallery">
                    ${ImageGallery(gallery, rover)}
                </section>
            </article>
            <aside>
                <section class="apod">
                    ${ImageOfTheDay(apod)}
                </section>
            </aside>
        </main>
        <footer>
        <p>Powered by NASA Open APIs <a href="https://api.nasa.gov/">https://api.nasa.gov</a></p>
        </footer>    
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//     if (name) {
//         return `
//             <h1>Welcome, ${name}!</h1>
//         `
//     }

//     return `
//         <h1>Hello!</h1>
//     `
// }

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
            <h3>Astronomy Picture of the Day</h3>
            <figure>
                <img src="${apod.image.url}" alt="Astronomy Picture of the Day APOD" />
                <figcaption>${apod.image.explanation}</figcaption>
            </figure>
        `)
    }
}

// Mission Manifest
const MissionManifest = (mission, rover) => {
    if (store.mission === '') {
        getMissionManifest(store, rover)
    }
    return `
        <ul> 
            <li>Launch Date: ${mission.mission.photo_manifest.launch_date}</li>
            <li>Landing Date: ${mission.mission.photo_manifest.landing_date}</li>
            <li>Rover Status: ${mission.mission.photo_manifest.status}</li>
        </ul>
        `
}

// Image Gallery
const ImageGallery = (gallery, rover) => {
    if (store.gallery === '') {
        getImageGallery(store, rover)
    }
    return `
        <h3>${gallery.photos.photos[0].camera.full_name}</h3>
        <figure>
            <img src="${gallery.photos.photos[0].img_src}" alt="Astronomy Picture of the Day"/>
            <figcaption>Photo Date: ${gallery.photos.photos[0].earth_date}<figcaption>
        </figure>
    `
}

//API CALLS
// Rover Select
const getRover = (state) => {
    let { rover } = state

    if (store.rover != state) {
        console.log("Get Rover function",state, { rover })
        updateStore(store, { rover })
    }
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
    const selectedRover = rover

    fetch(`http://localhost:3000/photos-${selectedRover}`)
        .then(res => res.json())
        .then(gallery => updateStore(store, { gallery }))

    return
}