
$(document).ready(function () {
    
    //checking
    function checking() {
        if (!localStorage.id) {
            console.log('không có tài khoản')
            window.location.replace('http://127.0.0.1:5500/client/src/components/404Page/index.html')
        } else {
            console.log('đã có tài khoãn')
            $(".user-name").prepend(localStorage.id)
        }
    }
    checking()

    // STATE
    let postData = null

    //get post
    function getpost() {
        $.ajax({
            url: "http://localhost:3000/post",
            type: 'GET',
            contentType: 'application/json'
        }).done(function (data) {
            postData = data.data
            if (data.status === 'error') {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
            } else {
                // console.log(data.data)
                data.data.forEach(post => {
                    let i = 0;
                    $(".content").prepend(
                        `<div class="content-main bg-7c mb-3 " key="${post._id}">` +
                        `<div class="author">` +
                        `<div class="author-main pb-2">` +
                        `<a href="#"><img src="../../assets/images/default-user-avatar.png" alt="" style="width:30px;"></a>` +
                        `<a class="ml-2"  href="#">` +
                        `<span>${post.author}</span>` +
                        `</a>` +
                        `</div>` +
                        `<div class="author-status">` +
                        `<span>${post.content}</span>` +
                        `</div>` +
                        `</div>` +

                        `<div class="reaction-comment d-flex justify-content-between">` +
                        `<div class="reaction"  key="${post._id}">` +
                        `<span>
                            <img class="like-reaction" src="../../assets/images/reaction/like-reaction.png" alt="icon">  ${post.reaction.like}
                        </span>`+
                        `<span>
                            <img class="smile-reaction" src="../../assets/images/reaction/haha-reaction.png" alt="icon">  ${post.reaction.smile}
                        </span>`+
                        `<span>
                            <img class="love-reaction" src="../../assets/images/reaction/love-reaction.png" alt="icon">  ${post.reaction.love}
                        </span>`+
                        `<span>
                            <img class="angry-reaction" src="../../assets/images/reaction/angry-reaction.png" alt="icon">  ${post.reaction.angry}
                        </span>`+
                        `<span>
                            <img class="surprise-reaction" src="../../assets/images/reaction/wow-reaction.png" alt="icon">  ${post.reaction.surprise}
                        </span>`+
                        `</div>` +
                        `<div class="comment d-flex">` +
                        `<a class=" mr-2" href="#">26 bình luận</a>` +
                        `<a class=" mr-2" href="#">86 lượt chia sẻ</a>` +
                        `</div>` +
                        `</div>` +
                        `<div class="d-flex justify-content-around btn-top-ac">` +
                        `<div class="btn-item"> <button class="btn btn-reaction"> <i class="flaticon-like"></i> thích</button></div>` +
                        `<div class="btn-item"> <button class="btn btn-reaction postcomment" id=""> <i class="flaticon-comment-white-oval-bubble"></i> bình luận</button></div>` +
                        `<div class="btn-item"> <button class="btn btn-reaction"> <i class="flaticon-share"></i> chia sẻ</button></div>` +
                        `</div>` +


                        `<div class="post-comment-main">` +

                        `<div class="comment-main mt-3 mb-3">
                                    ${post.comments.length > 0 ? post.comments.map(comment =>
                            `<div class="comment-item mb-3">
                                            <h5 class="comment-author">${comment.author}</h5>
                                            <p class="m-0">${comment.content}</p>
                                        </div>`
                        ).toString().replace(/,/g, '') : ''
                        }
                                    </div>`+
                        `<div class=" row d-flex align-items-center post-comment-item">` +
                        `<div class="col-1">` +
                        `<img src="../../assets/images/default-user-avatar.png" alt="author-commet" class="rounded-circle" style="width:35px;">` +
                        `</div>` +
                        `<div class="col-9 post-main">` +
                        `<input type="text" class="form-control gPgfXu comment-post${post._id}">` +
                        `</div>` +
                        `<div class="col-2 p-0">` +
                        `<button class="btn btn-success btn-comment">Đăng</button>` +
                        `</div>` +
                        `</div>` +
                        `</div>` +
                        `</div>`
                    )
                });
            }

            // console.log(data.data)
        })
    }
    getpost();

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
                location.reload();
            }
        })
        // $('#sel1').val('');
        // $('#content-post').val('');
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

    //post comment
    $(".content").on("click", ".content-main .post-comment-main .post-comment-item .btn-comment", function (event) {
        event.preventDefault();
        let idpost = $(this).parents('.content-main').attr("key");
        console.log('Comment - ', idpost);
        let idrea = '.comment-post' + idpost
        let comment = $(idrea).val()

        if (!comment) {
            console.log('reongos')
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Content Invalid</div>')
            return
        } else {
            console.log('có nhập văn bản');
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
                window.location.reload();
                console.log(data)
            }
        })
    })

    // put reaction Like
    $(".content").on("click", ".reaction .like-reaction", function (event) {
        event.preventDefault();
        let postId = $(this).parents('.reaction').attr("key");
        const postInfo = postData.find(post => post._id === postId)

        if (!postInfo) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.like += 1
        console.log(postInfo)
        $.ajax({
            url: `http://localhost:3000/put/reaction/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                location.reload()
            }
        })
    })

    // Put reaction smile
    $(".content").on("click", ".reaction .smile-reaction", function (event) {
        event.preventDefault();
        let postId = $(this).parents('.reaction').attr("key");
        const postInfo = postData.find(post => post._id === postId)

        if (!postInfo) {
            $('alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.smile += 1
        $.ajax({
            url: `http://localhost:3000/put/reaction/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $('.container-fluid').prepend('<div class="alert alert-danger" role="alert">Gặp lỗi logic, hệ thống sẻ chỉnh sửa, vui lòng tha thứ cho chúng tôi</div>')
            } else {
                location.reload();
            }
        })
    })

    // Put reaction love
    $(".content").on("click", ".reaction .love-reaction", function (event) {
        event.preventDefault();
        let postId = $(this).parents('.reaction').attr("key");
        const postInfo = postData.find(post => post._id === postId)

        if (!postInfo) {
            $('alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.love += 1
        console.log(postInfo)
        $.ajax({
            url: `http://localhost:3000/put/reaction/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $('.container-fluid').prepend('<div class="alert alert-danger" role="alert">Gặp lỗi logic, hệ thống sẻ chỉnh sửa, vui lòng tha thứ cho chúng tôi</div>')
            } else {
                location.reload();
            }
        })
    })

    // Put reaction angry
    $(".content").on("click", ".reaction .angry-reaction", function (event) {
        event.preventDefault();
        let postId = $(this).parents('.reaction').attr("key");
        const postInfo = postData.find(post => post._id === postId)

        if (!postInfo) {
            $('alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.angry += 1
        console.log(postInfo)
        $.ajax({
            url: `http://localhost:3000/put/reaction/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $('.container-fluid').prepend('<div class="alert alert-danger" role="alert">Gặp lỗi logic, hệ thống sẻ chỉnh sửa, vui lòng tha thứ cho chúng tôi</div>')
            } else {
                location.reload();
            }
        })
    })

    // Put reaction surprise
    $(".content").on("click", ".reaction .surprise-reaction", function (event) {
        event.preventDefault();
        let postId = $(this).parents('.reaction').attr("key");
        const postInfo = postData.find(post => post._id === postId)

        if (!postInfo) {
            $('alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.surprise += 1
        console.log(postInfo)
        $.ajax({
            url: `http://localhost:3000/put/reaction/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $('.container-fluid').prepend('<div class="alert alert-danger" role="alert">Gặp lỗi logic, hệ thống sẻ chỉnh sửa, vui lòng tha thứ cho chúng tôi</div>')
            } else {
                location.reload();
            }
        })
    })

})
