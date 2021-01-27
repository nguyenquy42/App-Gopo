
$(document).ready(function () {
    //get post
    $.ajax({
        url: "http://localhost:3000/post",
        type: 'GET',
        contentType: 'application/json'
    }).done(function (data) {
        if (data.status === 'error') {
            $('.alert').remove()
            $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
        } else {
            // console.log(data)
            data.data.forEach(post => {
                $(".content").prepend(`<div class="content-main bg-7c mb-3 " key="${post._id}">
                            <div class="author">
                                <div class="author-main pb-2">
                                    <a href="#"><img src="../../assets/images/default-user-avatar.png" alt=""></a>
                                    <a href="#">
                                        <span>${post.author}</span>
                                    </a>
                                </div>
                                <div class="author-status">
                                    <span>${post.content}</span>
                                </div>
                            </div>
                           
                            <div class="reaction-comment d-flex justify-content-between">
                                <div class="reaction">
                                    <img src="../../assets/images/reaction/like-reaction.png" alt="icon">
                                    <img src="../../assets/images/reaction/haha-reaction.png" alt="icon">
                                    <img src="../../assets/images/reaction/love-reaction.png" alt="icon">
                                    <img src="../../assets/images/reaction/angry-reaction.png" alt="icon">
                                    <img src="../../assets/images/reaction/wow-reaction.png" alt="icon">
                                    <a href="#">
                                        <span> 1,9k</span>
                                    </a>
                                </div>
                                <div class="comment d-flex">
                                    <a class=" mr-2" href="#">26 bình luận</a>
                                    <a class=" mr-2" href="#">86 lượt chia sẻ</a>
                                </div>
                            </div>
                            <div class="d-flex justify-content-around btn-top-ac">
                                <div class="btn-item"> <button class="btn btn-reaction"> <i class="flaticon-like"></i> thích</button></div>
                                <div class="btn-item"> <button class="btn btn-reaction postcomment" id=""> <i class="flaticon-comment-white-oval-bubble"></i> bình luận</button></div>
                                <div class="btn-item"> <button class="btn btn-reaction"> <i class="flaticon-share"></i> chia sẻ</button></div>
                            </div>
                            
                            <div class="post-comment-main">
                                <div class="comment-main mt-3 mb-3">
                                </div>
                                <div class=" row d-flex align-items-center post-comment-item">
                                    <div class="col-1">
                                        <img src="../../assets/images/default-user-avatar.png" alt="author-commet" class="rounded-circle" style="width:35px;">
                                    </div>
                                    <div class="col-9 post-main">
                                        <input type="text" class="form-control gPgfXu comment-post">
                                    </div>
                                    <div class="col-2 p-0">
                                        <button class="btn btn-success btn-comment">Đăng</button>
                                    </div>
                                </div>
                            </div>
                        </div>`)
            });
        }

        // console.log(data.data)
    })

    // get users
    $.ajax({
        url: "http://localhost:3000/users",
        type: "GET",
        contentType: 'application/json'
    }).done(function (data) {
        if (!data.isSuccess) {
            $('.alert').remove()
            $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
        } else {
            // console.log(data)
            data.data.forEach(user => {
                $('.list-user').prepend(`<li class="item-r">
                    <a href="#"><i class="fa fa-user-circle" aria-hidden="true"></i><span
                            class="ml-2 ">${user.lastName} ${user.firstName}</span></a>
                    </li>`)
            })
        }
    })


    // Create post
    $('.btn-post').click(function () {
        let author = $('#sel1').val();
        let content = $('#content-post').val()
        if (!author) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Name Invalid</div>')
            return
        }

        if (!content) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Content Invalid</div>')
            return
        }

        $.ajax({
            url: "http://localhost:3000/post",
            data: JSON.stringify({
                author,
                content
            }),
            type: 'POST',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                // data.posts.forEach(post => {
                console.log(data)
                $(".content").prepend(`<div class="content-main  bg-7c mb-3">
                            <div class="author">
                                <div class="author-main pb-2">
                                    <a href="#"><img src="../../assets/images/avatar-2.jpg" alt=""></a>
                                    <a href="#">
                                        <span>${data.data.name}</span>
                                    </a>
                                </div>
                                <div class="author-status">
                                    <span>${data.data.content}</span>
                                </div>
                            </div>
                           
                            <div class="reaction-comment d-flex justify-content-between">
                                <div class="reaction">
                                    <span>${data.data.reaction.like}<img src="../../assets/images/linke.png" alt="icon"></span>
                                    <span><img src="../../assets/images/happy.png" alt="icon"></span>
                                    <span><img src="../../assets/images/heart.png" alt="icon"></span>
                                </div>
                                
                            </div>
                        </div>`)
                // });
            }
        })
        $('#sel1').val('');
        $('#content-post').val('');
    })


    //post comment
    $(".content").on("click", ".content-main .post-comment-main .post-comment-item .btn-comment", function (event) {
        event.preventDefault();
        let idpost = $(this).parents('.content-main').attr("key");
        console.log('Comment - ', idpost);

        let comment = $('.comment-post').val()
        console.log(comment);

        if (!comment) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Content Invalid</div>')
            return
        }
        $.ajax({
            url: `http://localhost:3000/post/${idpost}`,
            data: JSON.stringify({
                type: "comments",
                data: { comment }
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                console.log(data)
                $(".comment-main").prepend(`
                        <div class="comment-item mb-2">
                            <h5 class="comment-author">Minh Quy</h5>
                            <p class="m-0"> ${data.data.comment}</p>
                        </div>
                        `)
            }
        })
    })

    $.ajax({
        url: "http://localhost:3000/post",
        type: 'GET',
        contentType: 'application/json'
    }).done(function (data) {
        if (data.status === 'error') {
            $('.alert').remove()
            $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
        } else {
            console.log(data.data)
            if (!data.data.comment) {
                console.log('không có comment!!!');
                return;
            }else{
                data.data.forEach(post => {
                    $(".comment-main").prepend(`
                            <div class="comment-item mb-2">
                                <h5 class="comment-author">Minh Quy</h5>
                                <p class="m-0"> ${data.data.comment}</p>
                            </div>
                            `)
                });
            } 
        }

        // console.log(data.data)
    })
})
