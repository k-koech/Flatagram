const url = 'http://localhost:3000/images/';
const comments_url = 'http://localhost:3000/comments/'
const likeBtn = document.getElementById('like-button')
const form = document.querySelector('form')
let data = ''

document.addEventListener('DOMContentLoaded', () => {
    getImages()
    getComments()
})

function getImages(){
    fetch(url).then(res => res.json())
    .then(images => images.forEach(image => {
        viewImage(image)
    }))
}

function getComments(){
    fetch(comments_url).then(res => res.json())
    .then(data => data.forEach(comment => {
        viewComments(comment)
    }))
}

function viewImage(image){    
    document.getElementById('card-title').innerHTML = image.title
    document.getElementById('card-image').src = image.image
    document.getElementById('like-count').innerHTML = `${image.likes} likes`
    likeBtn.addEventListener('click', () => {
        likeDog(image)
    })
    submitComment(image)
}

function viewComments(comment){
    data += `
    <li>${comment.content}</li>
    `
    document.getElementById('comments-list').innerHTML = data
}

function likeDog(image){
    image.likes++;
    postLike(image)
}

function postLike(image){
    fetch(url + `${image.id}`, {method:'PATCH', headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify(image)
}).then(res => res.json())
.then(data => viewImage(data))
}


function submitComment(comment){
    form.addEventListener('submit', event => {
        event.preventDefault()
        let newComment = form.comment.value
        let newObj = {
            imageid: comment.id,
            content: newComment
        }
        postComment(newObj)
        form.reset()
    })
}


function postComment(comment){
    fetch(comments_url, {method: 'POST', headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Credentials' : true,
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET',
      'Access-Control-Allow-Headers':'application/json',
      },
      body: JSON.stringify(comment)
      })
      . then(res => res.json())
    .then(data => {
      success: viewComments(data)
    })
  }

