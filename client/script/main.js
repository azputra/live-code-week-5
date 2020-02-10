const baseCase = "http://localhost:3000"

$(document).ready(function () {
    checkLogin()
    getComic()
    $("#login").on("submit", function (e) {
        e.preventDefault()
        const email = $("#email").val()
        const password = $("#password").val()
        loginForm(email, password)
    })

    $("#register").on("submit", function (e) {
        e.preventDefault()
        const email = $("#emailRegister").val()
        const password = $("#passwordRegister").val()
        const name = $("#name").val()
        registerForm(email, password, name)
    })

    $("#btn-logout").on("click", function (e) {
        e.preventDefault()
        localStorage.clear()
        checkLogin()
    })

    $("#goregister").on("click", function (e) {
        e.preventDefault()
        $("#login").hide()
        $("#register").show()
    })

    $("#gologin").on("click", function (e) {
        e.preventDefault()
        $("#login").show()
        $("#register").hide()
    })
})

function checkLogin() {
    if (localStorage.getItem('token') === null) {
        $("#login").show()
        $("#btn-logout").hide()
        $("#comicColections").hide()
    } else {
        $("#login").hide()
        $("#register").hide()
        $("#btn-logout").show()
        $("#comicColections").show()
    }
}

function loginForm(email, password) {
    $.ajax({
        url: `${baseCase}/login`,
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((res) => {
            localStorage.setItem('token', res.token)
            localStorage.setItem('id', res.user.id)
            localStorage.setItem('email', res.user.email)
            checkLogin()
        })
        .fail((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
            })
        })
}

function registerForm(email, password, name) {
    $.ajax({
        url: `${baseCase}/register`,
        method: "POST",
        data: {
            email,
            password,
            name
        }
    })
        .done((res) => {
            localStorage.setItem('token', res.token)
            localStorage.setItem('id', res.user.id)
            checkLogin()
        })
        .fail((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
            })
        })
}

function getComic() {
    $.ajax({
        url: `${baseCase}/comics`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((res) => {
            checkLogin()
            viewComic(res)
        })
        .fail((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
            })
        })
}

function findOneComic(id) {
    $.ajax({
        url: `${baseCase}/comics/${id}`,
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((res) => {
            checkLogin()
            viewEditComic(res)
        })
        .fail((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
            })
        })
}

function editYourComic(id) {
    const title = $("#titleEdit").val()
    const author = $("#authorEdit").val()
    const imageUrl = $("#imageUrlEdit").val()
    $.ajax({
        url: `${baseCase}/comics/${id}`,
        method: "PUT",
        data: {
            title,
            author,
            imageUrl
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(() => {
            checkLogin()
            preventDefault()
        })
        .fail((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.responseJSON,
            })
        })
}



function viewComic(response) {
    $("#myComic").empty()
    response.forEach(el => {
        $("#myComic").append(`
        <div class="col-4 mb-4">
              <div class="card text-center">
                <img
                  src=${el.imageUrl}
                  class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${el.title}</h5>
                  <p class="card-text">Author: ${el.author}</p>
                  <button onclick="findOneComic('${el.id}')" class="btn btn-primary">Edit</button>
                </div>
              </div>
            </div>
        `)
    });
}

function viewEditComic(response) {
    $("#updateMyComic").empty()
    $("#updateMyComic").append(`
        <h1>Update Comic</h1>
            <form class="my-4" id="formUpdate">
              <div class="form-group">
                <label for="title">Title</label>
                <input id="titleEdit" type="text" class="form-control" name="title" value="${response.title}" />
              </div>
              <div class="form-group">
                <label for="author">Author</label>
                <input id="authorEdit" type="text" class="form-control" name="author" value="${response.author}"/>
              </div>
              <div class="form-group">
                <label for="imageUrl">Comic Image URL</label>
                <input id="imageUrlEdit" type="text" class="form-control" name="imageUrl" value="${response.imageUrl}"/>
              </div>
              <button onclick="editYourComic('${response.id}')" id="btn-update" type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
        `)
}