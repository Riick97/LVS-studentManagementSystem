function AddVideoModal(state) {
    this.html =
    `
    <section id="add-video-modal" tabindex="0" onfocus="toggleAddVideoModal()" class="${state.showAddVideoModal ? '' : 'hide'}">
        <div class="container">
            <div tabindex="0" class="add-video-modal">
                <div class="modal-down-part">
                    <div class="modal-left-part">
                        <form action="javascript:void(0);" method="POST" onsubmit="addVideo(this)">
                            <div class="item-info">
                                <label for="">Name:</label>
                                <input minlenth="3" type="text" name="" id="video-name">
                            </div>
                            <div class="item-info">
                                <label for="">Description:</label>
                                <input minlenth="3" type="text" name="" id="video-description">
                            </div>
                            <div class="item-info">
                                <label for="">Url:</label>
                                <input minlenth="3" type="text" name="" id="video-path">
                            </div>
                            <input class="submit-button" type="submit" value="Add">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `

    return this.html
}

function addVideo(form) {
    event.preventDefault();
    let name = form.querySelector("#video-name").value;
    let description = form.querySelector("#video-description").value;
    let path = form.querySelector("#video-path").value;

    let newVideo = {
        name: name,
        description: description,
        path: path
    }


    axios.post('http://localhost:5000/videos/add', newVideo)
        .then(res => {
            let data = res.data
            console.log(data)
            let videoId = data.slice(data.length - 24, data.length)

            newVideo._id = videoId;
            videos.push(newVideo);

            app.currentSubject.videos.push(videoId)
            axios.post(`http://localhost:5000/subjects/update/${app.currentSubject._id}`,
                app.currentSubject)
                .then(res => console.log(res.data))
        })
        .catch(err => console.log(err))

    app.update();
}

