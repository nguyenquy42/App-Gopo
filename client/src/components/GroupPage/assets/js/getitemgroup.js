    let idgroup = localStorage.idGroup;
    function getGroupById() {
    $.ajax({
        url: `http://localhost:3000/group/${idgroup}`,
        type: 'GET',
        contentType: 'application/json'
    }).done(function (data) {
        itemgroup = data.data;
        $(".groupName").prepend( 
        `<h3>${itemgroup.groupname}</h3>`
        )
        $(".createdGroup").prepend(
            `${itemgroup.createdGroup}`
        )
    })
    }
    getGroupById()

    function getPostGroup() {
    $.ajax({
        url: `http://localhost:3000/group/${idgroup}`,
        type: 'GET',
        contentType: 'application/json'
    }).done(function (data) {
        getcm = data.data;
        console.log(getcm);

        getcm.post.forEach(post => {
            $(".post-item-group").prepend(
                `
                <div class="content-main bg-7c mb-3 " key="${post._id}">
                                                <div class="author">
                                                    <div class="author-main pb-2">
                                                        <a href="#"><img src="../../assets/images/default-user-avatar.png"
                                                                alt="" style="width:30px;"></a>
                                                        <a class="ml-2" href="#">
                                                            <span>min quy</span>
                                                        </a>
                                                    </div>
                                                    <div class="author-status">
                                                        <span>${post.content}</span>
                                                    </div>
                                                </div>
    
                                                <div class="reaction-comment d-flex justify-content-between">
                                                    <div class="reaction" key="${post._id}">
                                                        <span>
                                                            <img class="like-reaction"
                                                                src="../../assets/images/reaction/like-reaction.png" alt="icon">
                                                            1
                                                        </span>
                                                        <span>
                                                            <img class="smile-reaction"
                                                                src="../../assets/images/reaction/haha-reaction.png" alt="icon">
                                                            1
                                                        </span>
                                                        <span>
                                                            <img class="love-reaction"
                                                                src="../../assets/images/reaction/love-reaction.png" alt="icon">
                                                            2
                                                        </span>
                                                        <span>
                                                            <img class="angry-reaction"
                                                                src="../../assets/images/reaction/angry-reaction.png"
                                                                alt="icon"> 2
                                                        </span>
                                                        <span>
                                                            <img class="surprise-reaction"
                                                                src="../../assets/images/reaction/wow-reaction.png" alt="icon">
                                                            2
                                                        </span>
                                                    </div>
                                                    <div class="comment d-flex">
                                                        <a class=" mr-2" href="#">2 bình luận</a>
                                                        <a class=" mr-2" href="#">0 lượt chia sẻ</a>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-around btn-top-ac">
                                                    <div class="btn-item"> <button class="btn btn-reaction"> <i
                                                                class="flaticon-like"></i> thích</button></div>
                                                    <div class="btn-item"> <button class="btn btn-reaction postcomment" id="">
                                                            <i class="flaticon-comment-white-oval-bubble"></i> bình
                                                            luận</button></div>
                                                    <div class="btn-item"> <button class="btn btn-reaction"> <i
                                                                class="flaticon-share"></i> chia sẻ</button></div>
                                                </div>
    
    
                                                <div class="post-comment-main">
    
                                                    <div class="comment-main mt-3 mb-3">
                                                        <div class="comment-item mb-3">
                                                            <h5 class="comment-author">quý</h5>
                                                            <p class="m-0">non</p>
                                                        </div>
                                                    </div>
                                                    <div class=" row d-flex align-items-center post-comment-item">
                                                        <div class="col-1">
                                                            <img src="../../assets/images/default-user-avatar.png"
                                                                alt="author-commet" class="rounded-circle" style="width:35px;">
                                                        </div>
                                                        <div class="col-9 post-main">
                                                            <input type="text"
                                                                class="form-control gPgfXu comment-post${post._id} comment__form">
                                                        </div>
                                                        <div class="col-2 p-0">
                                                            <button class="btn btn-success btn-comment">Đăng</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                `
            ) 
        });

    })
    }
    getPostGroup()


    // Create post status in group
    $('.btn-post').click(function () {
        let author = localStorage.user;
        let content = $('#content-post').val()
        if (!content) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Content Invalid</div>')
            return
        }

        $.ajax({
            url: `http://localhost:3000/putgroup/${idgroup}`,
            type: "post",

                data: { 
                    author,
                    content },
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                console.log(content);
                // location.reload();
            }
        })

    })
    