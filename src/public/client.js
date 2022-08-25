let store = Immutable.Map({
    user: { name: "Student" },
    apod: '',
    mission: '',
    gallery: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    rover: 'Curiosity',
    menubuilt: false,
})

// Add elementals to page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    store = store.merge(newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

//Create page layout
const App = (state) => {
    // let { rovers, apod, mission, gallery, rover,} = state
    const mission = state.get("mission")
    const rover = state.get("rover")
    const apod = state.get("apod")
    const gallery = state.get("gallery")
    const rovers = state.get("rovers")
    const menubuilt = state.get('menubuilt')

    return `
        <header>
            <h1>Mars Rovers</h1>
        </header>
        <nav>
            <ul>
                ${createMenu(rovers,menubuilt)}
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
// Higher Order Functions :)

const createMenu = (array, dataCheck) => {
    if (dataCheck == false) {
        return loopArray(array)
    }
}
const createButton = (value) => {
    return `
    <li><button type="button" onclick="getRover('${value}')">${value}</button></li>
    `
}

const loopArray = (array) => {
    results = ''
    for (value of array) {
        result = createButton(value)
        results = result + results
    }
    return results
}


// Image of the Day
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)

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
            <h4>${apod && apod.image.title}</h4>
            <figure>
                <img src="${apod && apod.image.url}" alt="Astronomy Picture of the Day APOD" />
                <figcaption>${apod && apod.image.explanation}</figcaption>
            </figure>
        `)
    }
}

// Mission Manifest
const MissionManifest = (mission, rover) => {   
    if (!mission || mission.mission.photo_manifest.name != rover) {
        getMissionManifest(mission, rover)      
    }
    return `
        <ul> 
            <li>Launch Date: ${mission && mission.mission.photo_manifest.launch_date}</li>
            <li>Landing Date: ${mission && mission.mission.photo_manifest.landing_date}</li>
            <li>Rover Status: ${mission && mission.mission.photo_manifest.status}</li>
        </ul>
        `
}

// Image Gallery
const ImageGallery = (galleryData, rover) => {
    console.log(galleryData)

    if (galleryData == '' ||galleryData.photos.latest_photos[0].rover.name != rover)  {
        getImageGallery(galleryData, rover)
        return `<p>Working...<p>`
    } else {
    return galleryData.photos.latest_photos.map((e, index) => {
        console.log(e,index); 
        return    `
            <h3>${e && e.camera.full_name}</h3>
            <figure>
                <img src="${e && e.img_src}" alt="Latest ${rover} photo"/>
                <figcaption>Photo Date: ${e && e.earth_date}<figcaption>
            </figure>
            `
        })
    }
}

    // if (!gallery || gallery.photos.latest_photos[0].rover.name != rover) {
    //     getImageGallery(gallery, rover)   
    // }

    // return `
        // <h3>${gallery && gallery.photos.latest_photos[0].camera.full_name}</h3>
        // <figure>
        //     <img src="${gallery && gallery.photos.latest_photos[0].img_src}" alt="Astronomy Picture of the Day"/>
        //     <figcaption>Photo Date: ${gallery && gallery.photos.latest_photos[0].earth_date}<figcaption>
        // </figure>
    // `


//API CALLS
// Rover Select
const getRover = (state) => {
    const rover = state
    updateStore(state, { rover })

    return
}

// Astronomy Picture of the Day
const getImageOfTheDay = (state) => {
    const { apod } = state
    
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(state, { apod }))

    return
}

// Mission Manifest
const getMissionManifest = (state, rover) => {
    const { mission } = state
    const selectedRover = rover

    fetch(`http://localhost:3000/mission-${selectedRover}`)
        .then(res => res.json())
        .then(mission => updateStore(state, { mission }))

    return
}

// Image Gallery

const getImageGallery = (state, rover) => {
    const { gallery } = state
    const selectedRover = rover

    fetch(`http://localhost:3000/photos-${selectedRover}`)
        .then(res => res.json())
        .then(gallery => updateStore(state, { gallery }))

    return
}