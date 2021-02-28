
$(document).ready(function () {
    
    // STATE
    let postData = null

    //checking
    function checking() {
        if (!localStorage.id) {
            console.log('không có tài khoản')
            window.location.replace('http://127.0.0.1:5500/client/src/components/404Page/index.html')
        } else {
            $(".user-name").prepend(localStorage.user)
        }
    }
    checking()

    // đăng suẩt
    
    $('.delteId').click(function () {
        localStorage.clear();
        window.location.replace('http://127.0.0.1:5500/client/src/components/LoginPage/index.html')
    })

    $('#CraGruop').click(function () {
        const groupname = $('#groupname').val()
        console.log(groupname)
        if (!groupname) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">bạn chưa nhập nội dung</div>')
            return
        }
        $.ajax({
            url: "http://localhost:3000/group",
            data: JSON.stringify({
                groupname
            }),
            type: 'POST',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                window.location.replace('http://127.0.0.1:5500/client/src/components/GroupPage/index.html')
            }
        })

    })


    function getpost() {
        $.ajax({
            url: "http://localhost:3000/group",
            type: 'GET',
            contentType: 'application/json'
        }).done(function (data) {
            postData = data.data
            if (data.status === 'error') {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
            } else {
                console.log(data.data)
                data.data.forEach(post => {
                    $(".group-item-name").prepend(
                        `
                            <li class="group-item" key="${post._id}">
                                <a href="user-group.html" class="item">${post.groupname}</a>
                            </li>
                        `
                    )
                });
            }
        })
    }
    getpost();

    
    //get id group
    $(".group-item-name").on("click", ".group-item .item", function (event) {
        event.preventDefault();
        let idgroup = $(this).parents('.group-item').attr("key");
        console.log('tên group là - ', idgroup);
        localStorage.setItem("idGroup", idgroup)
        window.location.replace(`http://127.0.0.1:5500/client/src/components/GroupPage/user-group.html`)
    })


})