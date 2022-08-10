let store = Immutable.Map({
    user: { name: "Student" },
    apod: '',
    mission: '',
    gallery: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    rover: 'Curiosity',
})

// Add elementals to page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    console.log("updateStore function store and newState",state,newState)
    store = store.merge(newState)
    render(root, store)
}

const render = async (root, state) => {
    console.log("render function: root, state", root,state)
    root.innerHTML = App(state)
}

//Create page layout
const App = (state) => {
    // let { rovers, apod, mission, gallery, rover,} = state
    let mission = state.get("mission")
    let rover = state.get("rover")
    let apod = state.get("apod")
    let gallery = state.get("gallery")
    let rovers = state.get("rovers")
    console.log("State Get Mission:", mission)
    console.log("App function: state",state)
    console.log("rovers: ", rovers)
 

    return `
        <header>
            <h1>Mars Rovers</h1>
        </header>
        <nav>
            <ul>
                <li><button id="one" type="button" onclick="getRover('${rovers.get(0)}')">${rovers.get(0)}</button></li>
                <li><button id="two" type="button" onclick="getRover('${rovers.get(1)}')">${rovers.get(1)}</button></li>
                <li><button id="three" type="button" onclick="getRover('${rovers.get(2)}')">${rovers.get(2)}</button></li>
            </ul>
        </nav>
        <main>
            <article>
                <section class="mission-data">
                    <h2>Mars Rover: ${rover}</h2>
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

// Image of the Day
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(apod)
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
    console.log("MissionManifest function: mission, rover", mission, rover)
    
    if (!mission || mission.mission.photo_manifest.name != rover) {
        getMissionManifest(mission, rover)
        
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
    console.log("ImageGallery function: gallery, rover ", gallery, rover)
    if (!gallery || gallery.photos.latest_photos[0].rover.name != rover) {
        getImageGallery(gallery, rover)
        
    }
    return `
        <h3>${gallery.photos.latest_photos[0].camera.full_name}</h3>
        <figure>
            <img src="${gallery.photos.latest_photos[0].img_src}" alt="Astronomy Picture of the Day"/>
            <figcaption>Photo Date: ${gallery.photos.latest_photos[0].earth_date}<figcaption>
        </figure>
    `
}

//API CALLS
// Rover Select
const getRover = (state) => {
    let rover = state
    console.log("getRover function: state", state)
    updateStore(state, { rover })

    return
}

// Astronomy Picture of the Day
const getImageOfTheDay = (state) => {
    let { apod } = state
    console.log("getImageOfTheDay function: state", state)

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(state, { apod }))

    return
}

// Mission Manifest
const getMissionManifest = (state, rover) => {
    let { mission } = state
    const selectedRover = rover
    console.log("getMissionManifest function: state, rover", state, rover)

    fetch(`http://localhost:3000/mission-${selectedRover}`)
        .then(res => res.json())
        .then(mission => updateStore(state, { mission }))

    return
}

// Image Gallery

const getImageGallery = (state, rover) => {
    let { gallery } = state
    const selectedRover = rover
    console.log("getImageGallery function: state, rover", state, rover)

    fetch(`http://localhost:3000/photos-${selectedRover}`)
        .then(res => res.json())
        .then(gallery => updateStore(state, { gallery }))

    return
}