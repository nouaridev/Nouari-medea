//check login fucntion :
let checkLogIn = ()=>{
   if(localStorage.getItem("token")){return true}return false ;
}



//SHOW OR HIDE LOG IN SIGN UP BTNS : 
let logInBtn = document.querySelector('.header .nav .login')
let registerBtn = document.querySelector('.header .nav .register')
let logOutBtn= document.querySelector('.header .nav .logout')


if(checkLogIn()){
    logInBtn.style.display = "none"; 
    registerBtn.style.display = "none";
    logOutBtn.style.display = "block";     
}else{
    logInBtn.style.display = "block"; 
    registerBtn.style.display = "block";
    logOutBtn.style.display = "none";  

}

  
//setting btns routs 
logInBtn.addEventListener('click', ()=>{
    window.location = '/index.html'
})
registerBtn.addEventListener('click', ()=>{
    window.location = '/source/html/signup.html'
})


//fetching data from api

let getPosts = async()=>{
    let url= 'https://tarmeezacademy.com/api/v1/posts?limit=20';
    let response = await axios.get(url) ; 
     renderPosts(response.data.data); 
     let posts = document.querySelectorAll(".posts .post");
     posts.forEach(p=>{
        p.querySelector('.add-comment').addEventListener('click' , (e)=>{
            if(!checkLogIn()){
                alert("log in to see comments") ;
                console.log(window.location.href = "/index.html")
            }
        })
     })

}

//rendering posts
let renderPosts =(posts)=>{
   
    posts.forEach(post => {
        renderPost(post); 
    });
}

//geting user pfp

//render singel post 
let renderPost = (post)=>{

    document.querySelector(".posts").innerHTML += `
      <div class="post shadow">
                    <div class="content">
                        <div class="publisher">
                        <img src="${post.author.profile_image}" alt="">
                            <div class="txt">
                                <p> <b> ${post.author.username}</b></p>
                              <p class="timing">${post.created_at}</p>
                            </div>
                        </div>
                        
                        <div class="image"><img src="${post.image}" alt=""></div>
                        <div class="info">
                            <h2 class="title">${post.title}</h2>
                            <p class="details">${post.body}</p>
                        </div>

                    </div>
                  <div class="bottom d-flex ">
                    <button type="button" class="btn-primary btn add-comment">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-heart " viewBox="0 0 16 16" style="margin-right: 10px;">
                        <path fill-rule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2m-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125M8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                      </svg>comment
                    </button>
                    <p class="cmntnbr">${post.comments_count} comment</p>
                  </div>
                </div>
    `
}





//geting posts 
    getPosts();



//when click on addpost : 
let addPostbtn = document.querySelector('.add-post') ; 
addPostbtn.addEventListener('click', (e)=>{
    if(!checkLogIn()){
        alert("you have to login or register")
        window.location.href = '/index.html'
    }
})

let profileBtn = document.querySelector('.profile')
profileBtn.addEventListener('click', ()=>{
      alert("you have to login or register")
        window.location.href = '/index.html'
})