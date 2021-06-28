
function Videos(state) {
    this.html =
        `
    <section id="carousel">
        <div class="container">
            <div class="carouselContainer">
                ${getVideos(state)}
                <span class="prev" id="prev">
                    < </span>
                <span class="next" id="next">
                    > </span>
        </div>
        </div>
        ${state.currentPage != 'Subjects' ?
                ' ' : '<button class="btn" style="align-self: center" onclick="toggleAddVideoModal()"><i class="fas fa-plus"></i></button>'}
    </section>
    ${AddVideoModal(state)}
    ${WatchVideoModal(state)}
    `

    return this.html

}


function getVideos(state) {
    let subjectVideos = []
    if (state.currentSubject && state.currentPage == 'Subjects') {
        subjectVideos = state.currentSubject.videos;
    }

    let elements = [];
    videos.forEach(video => {
        let isIncluded = subjectVideos.includes(`${video._id}`)
        let notSubjectPage = state.currentPage != 'Subjects'
        if (isIncluded || notSubjectPage) {
            let video_id = getVideoId(video.path)
            if (!video_id) {return}
            elements.push(
                `<div class="video carouselImgs" style="display: none;">
                <div onclick="toggleWatchVideoModal('${video._id}')" class="thumbnail">
                    <img src="http://img.youtube.com/vi/${video_id}/0.jpg
                    " alt="Video thumbnail" width="100%">
                </div>
                <div class="video-info">
                    <div class="video-name">
                        <h3>${video.name}</h3>
                    </div>
                    <div class="video-description">
                        <p>${video.description}</p>
                    </div>
                </div>
            </div>`)
        }
    })
    if (elements.length == 0) {
        elements.push(
            `
            <div class="video carouselImgs">
                        <div class="thumbnail">
                            <img src="./img/thumbnail.jpeg" alt="Video thumbnail" width="100%" >
                        </div>
                        <div class="video-info">
                            <div class="video-name"><h3>No Videos</h3></div>
                            <div class="video-description"><p>Upload a new Video</p></div>
                        </div>
            </div>
            `
        )
    }

    return elements.join('')
}

let currentSlide = 1

function showSlide(slideIndex) {
    const slides = document.getElementsByClassName('carouselImgs');

    if (slideIndex > slides.length) { currentSlide = 1 }
    if (slideIndex < 1) { currentSlide = slides.length }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }
    if (slides) {
        slides[currentSlide - 1].style.display = 'block'
    }
}


function nextSlide() {
    if (app.currentPage != 'Subjects' && app.currentPage != 'Home' && app.currentPage != 'Login') return
    showSlide(currentSlide += 1);
}

function previousSlide() {
    showSlide(currentSlide -= 1);
}

function startSlides(app) {
    if (app.currentPage != 'Subjects' && app.currentPage != 'Home' && app.currentPage != 'Login') return
    showSlide(currentSlide);
    document.getElementById('prev').addEventListener('click', function () {
        previousSlide();
    })
    document.getElementById('next').addEventListener('click', function () {
        nextSlide();
    })
}

//Toggle modals

function toggleAddVideoModal() {
    app.showAddVideoModal = !app.showAddVideoModal
    app.update();
}

function toggleWatchVideoModal(videoId) {
    if (videoId) {
        let video = videos.find(video => video._id == videoId);
        app.currentVideoId = `${getVideoId(video.path)}`
        app.currentVideo = video
    }
    
    app.showWatchVideoModal = !app.showWatchVideoModal
    app.update();
}


function getVideoId(path) {
    if (!path) {//NoPathDefined
        //console.log('no path definded'); 
        return
    }
    let VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    id = path.match(VID_REGEX);
    if (!id) {return}
    return id[1];
}