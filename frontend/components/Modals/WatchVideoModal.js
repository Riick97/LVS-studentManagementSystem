function WatchVideoModal(state) {
    this.html = 
    `<section id="add-student-modal" tabindex="0" onfocus="toggleWatchVideoModal()"
    class="modal ${state.showWatchVideoModal ? '' : 'hide'}">
    <div class="container">
        <div tabindex="0" style="padding: 0;" class="add-student-modal">
            ${getFrame(state.currentVideoId)}
            ${getDeleteButton(state)}
            
        </div>
    </div>
</section>`

    return this.html
}

function getFrame(video_id) {
    let frame = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${video_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    return frame;
}

function getDeleteButton(state) {
    if (state.userPermission != 'A' && state.userPermission != 'T') return ' '
    let element =
    `
    <div onclick="deleteVideo('${state.currentVideo._id}')" class="delete-bar">Delete</div>
    `

    return element
}

function deleteVideo(videoId) {
    videos = videos.filter(video => video._id != videoId);
    app.currentSubject.videos = app.currentSubject.videos.filter(id => id != videoId)

    axios.delete(` /videos/${videoId}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))


    axios.post(` /subjects/update/${app.currentSubject._id}`,
        app.currentSubject)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))

    toggleWatchVideoModal();
}
