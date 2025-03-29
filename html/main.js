
/* ==================== gloabal vars=====================*/
 


   
/* ==================== end of gloabal vars=====================*/
    


/* ==================== Primary functions=====================*/




        //fucntion to check the log in
            let isLogedIn=()=>{
                return (localStorage.getItem('token'))?true : false ;
            }


        //fonction to go to the home page
            let goToHome=()=>{window.location.href = '/html/home.html'}

        //fonction to go to the home page
            let goLogin=()=>{window.location.href = '/html/login.html'}

        //function to add an alert : 
            
            let alerts = document.getElementById('alerts')
           

            const alert = (message, type) => {
                alerts.style.zIndex = 1000 ;
                alerts.style.opacity = 1 ; 
                const wrapper = document.createElement('div')
                wrapper.className='alertt'
                wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert" style="width: fit-content; min-width: 300px ; font-size: 20px ; text-align: center">`,
                `   <div>${message}</div>`,
                '</div>'
                ].join('')
            
                alerts.append(wrapper)
                let alertbox = document.querySelector('.alert');
                let bsAlert = new bootstrap.Alert(alertbox);
                setTimeout(()=>{
                    bsAlert.close(); 
                    alerts.innerHTML = ''; 
                    alerts.style.opacity = 0 ;
                    alerts.style.zIndex = -99;
                    
                       },2000)
            }
            
        //fucntions for get and set token : 
            
            let setToken = (token)=>{localStorage.setItem("token", token)}
            let getToken = ()=>{return localStorage.getItem('token')}


        // fucntion to get and set user data 

            let setUserData = (data)=>{localStorage.setItem('userData' , JSON.stringify(data))}
            let getUserData = ()=>{return JSON.parse(localStorage.getItem('userData'))}

        //home btn :
            let  home = document.querySelector('.navbar .home-btn')    ;
            if(home){
                home.addEventListener('click' , ()=>{
                    goToHome() ; 
                })
            }           


        //here making global auth :
            axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        

        //log out : 
               let logOutBtn = document.querySelector('.log-out') ;
                if(logOutBtn){
                    logOutBtn.addEventListener('click' , ()=>{
                        localStorage.removeItem('token') ;
                        alert('<i class="fa-regular fa-hand-peace"></i> good bye bro!' , 'success') ; 
                        setTimeout(()=>{
                            goLogin() ;
                        } , 2100)
                    })
                }






/* ====================End Primary functions=====================*/
        if(window.location.href.includes('/login.html')){   
/* ====================Handling the login page =====================*/








            //first checks if the user already loged in :
                if(isLogedIn()){
                        loggedInNow = true ; 
                        goToHome();
                       
                }

        
            // loging function :
                let login = async ()=>{
                    let url = 'https://tarmeezacademy.com/api/v1/login';
                     //and now lets get form data and submit btn: 
                     let userName = document.getElementById('userName').value;
                     let Password = document.getElementById('password').value;
                     let body = {
                         username : userName , 
                         password : Password 
                     }
                    try{
                        let response = await axios.post(url , body);
                        return response.data ; 
                    }catch(e){
                        console.log(e)
                    }
                }

            //using the login function :
                let submitBtn = document.getElementById('login-btn');
                submitBtn.addEventListener('click' , async(e)=>{
                        e.preventDefault(); 
                        try {

                            let data = await login() ;

                            setTimeout(()=>{
                                setToken(data.token);
                                setUserData(data.user);
                                if(isLogedIn()){
                                    localStorage.setItem('logeinnow' , true)
                                    goToHome()
                                }
                               
                            },2300)

                            alert('<i class="fa-solid fa-dove"></i> done!' , 'success');

                        } catch (error) {
                            alert('something wrong' , 'warning');
                        }
                })
            
        

            






/* ===================End of the login page =====================*/
        }else if(window.location.href.includes('/signup.html')){
/* ==================== Handlingthe signup page =====================*/









        //first lets check login 
            if(isLogedIn()){
                loggedInNow = true ;
                goToHome();
            }

        
        //the singup function 
            
             let signUp= async ()=>{
                let url = "https://tarmeezacademy.com/api/v1/register";
                 //and now lets get form data and submit btn: 
                 let userName = document.getElementById('userName').value;
                 let fullName = document.getElementById('fullName').value;
                 let Password = document.getElementById('password').value;
                 let    Email = document.getElementById('email').value;
                 let userImage = document.getElementById('image').files[0];

                 let formData = new FormData() ;
                 formData.append('username' , userName  )
                 formData.append('password' , Password )
                 formData.append('name' , fullName )
                 formData.append('email' , Email)
                 formData.append('image' , userImage)
                try{
                    let response = await axios.post(url , formData, {
                        Headers:{
                           'Content-Type': 'multipart/form-data' ,
                        }
                    });
                    return response.data ; 
                }catch(e){
                    
                   alert(`${e.response.data.message}` , 'danger')
                  

              

                }
            }


         

         
         

        let submitBtn = document.getElementById('signup-btn');
     //using the login function :
        submitBtn.addEventListener('click' , async(e)=>{
                e.preventDefault(); 
                try {
                    let data = await signUp() ;
                    setTimeout(()=>{
                        setToken(data.token);
                        setUserData(data.user);

                        if(isLogedIn()){
                            localStorage.setItem('logeinnow' , true)
                            goToHome()  
                        }
                    },2300)

                    alert('done! you joined the community <br><i class="fa-regular fa-address-card"></i>' , 'success');
                } catch (error) {
                    alert('contact ismail nouari for help' , 'warning')
                }


        })
    




/* ==================== End of the signup page =====================*/
        }else if(window.location.href.includes('/home.html')){
/* ==================== Handling the home  page =====================*/


         


            // infinite scroling variable 

            localStorage.setItem('page' , 1); 












            
            //removing the set of routing attributes : 
            localStorage.removeItem('openedPost');// this attribute removed the id of the previews post that opened 
          
            //fill user info function 
                let fillInfo = ()=>{
                    let info = getUserData() ; 
                    

                    // let navbar = document.querySelector('.navbar ');
                    // navbar.innerHTML += `<img src=${info.progile_image} alt="Profile" class="profile-pic">`
                    
                 
                                    

                    let profileCard = document.querySelector('.sidebar .user-info');
                    profileCard.innerHTML = `
                        <img src=${info.profile_image} alt="Profile Picture">
                        <h3 class="logged-user-name">${info.name}</h3>
                        <p>Posts: <span>${info.posts_count}</span></p>
                        <button class="edit-profile"><i class="fa-solid fa-user-pen"></i></button>
                    `

                    let tags = document.querySelector('.right-sidebar ul') ;
                    let url = 'https://tarmeezacademy.com/api/v1/tags';
                    axios.get(url).then((e)=>{
                        e.data.data.forEach(tag=> {
                            tags.innerHTML+= `<li><i class="fa-solid fa-hashtag"></i> ${tag.name}</li>`
                        });
                    })
                }

            //getposts function : 
                let getPosts = async (page)=>{
                    let url= `https://tarmeezacademy.com/api/v1/posts?limit=10&page=${page}`;
                    let response= await axios.get(url); 
                    
                    return response.data.data
                }

            //fillingposts :
                let fillPosts =async (page)=>{
                    let posts = await getPosts(page);
                    let postContainer =document.querySelector('.main-content .posts') ; 
                   
                    posts.forEach((post)=>{
                        if((typeof post.image )!= "object" ){
                            let tags = [];
                            post.tags.forEach((tag)=>{
                                tags.push(`<li>4${tag.name}</li>`)
                            }) 
                    
                            postContainer.innerHTML += `
                            <div class="post id=""p${post.id}" >
                                    <div class="post-header">
                                        <img src=${post.author.profile_image} alt="User" class="post-user-pic">
                                        <div class="post-user-info">
                                            <h4>${post.author.name}</h4>
                                            <p class="post-time"><i class="fa-solid fa-user-clock"></i> ${post.created_at}</p>
                                        </div>
                                    </div>
    
                                    <img src="${post.image}" alt="Post Image" class="post-image">
    
                                    <div class="post-content">
                                        <h3>${post.title}</h3>
                                        <p>${post.body}</p>
                                    </div>
                                    <ul class="post-tags">
                                        ${tags}
                                    </ul>
                                    <div class="post-actions" >
                                        <button class="comment-btn" data='${post.id}' > <i class="fa-solid fa-comment-nodes"></i>  ${post.comments_count}</button>
                                        <button class="share-btn"><i class="fa-solid fa-share"></i></button>
                                    </div>
                                
                               </div>
                            `

                          
                        }

                        
                    })

                

                    //comment btn for each post : 
                    let cmntbtn = document.querySelectorAll(".post .comment-btn") ; 
                    cmntbtn.forEach((cm)=>{
                        cm.addEventListener('click' , (e)=>{
                            // localStorage.setItem('openedPost' , e.target.getAttribute('data') )
                            window.location.href = `/html/post.html?id=${e.target.getAttribute('data') }`
                        })
                    })
                    

                    //increment the page : 
                    localStorage.setItem('page' , localStorage.getItem('page')+ 1 ) ; 
                       
                }

            //fetching tags 

                let getTags = ()=>{
                    axios.get('https://tarmeezacademy.com/api/v1/tags').then((res)=>{
                       let tags = res.data.data;
                       console.log(tags) ; 
                       let dropdown =  document.querySelector('.dropdown-content') ;
                       tags.forEach((tag)=>{
                            console.log(tag.name)
                           dropdown.innerHTML += `
                            <label><input type="checkbox" value="#${tag.name}">#${tag.name}</label>
                           `
                       })
                        //fo now  i will put the add post drp down input 
                        
                            function toggleDropdown() {
                                document.getElementById("options").classList.toggle("show");
                            }
                    
                            window.onclick = function(event) {
                                if (!event.target.matches('.dropdown button')) {
                                    let dropdowns = document.getElementsByClassName("dropdown-content");
                                    for (let i = 0; i < dropdowns.length; i++) {
                                        let openDropdown = dropdowns[i];
                                        if (openDropdown.classList.contains('show')) {
                                            openDropdown.classList.remove('show');
                                        }
                                    }
                                }
                            }
                    
                            document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(checkbox => {
                            checkbox.addEventListener('change', function() {
                                const text = this.value;
                                const selectedItems = document.querySelector('.selected-items');
                                const existingItem = selectedItems.querySelector(`[data-value="${text}"]`);
                
                                if (this.checked) {
                                    if (!existingItem) {
                                        const selectedItem = document.createElement('div');
                                        selectedItem.className = 'selected-item'
                                        selectedItem.setAttribute('data-value', text);
                                        selectedItem.innerText = text;
                                        selectedItems.appendChild(selectedItem);
                                    }
                                } else {
                                    if (existingItem) {
                                        existingItem.remove();
                                    }
                                }
                        });
                    }
                            );

            
                    })
                }
            
            //add post function : 
                let sendPost = async()=>{
                
                        let postTitle= document.querySelector('.post-modal .modal-body .i1 input').value;
                        let postBody = document.querySelector('.post-modal .modal-body .i2 textarea').value;
                        let postImage = document.querySelector('.post-modal .modal-body .i3 input').files[0];
                        let formData = new FormData( ); 

                        formData.append("title", postTitle) ;
                        formData.append("body", postBody) ;
                        formData.append("image", postImage)    
                    
                        let url = 'https://tarmeezacademy.com/api/v1/posts' ; 
                        try{
                            let res = await axios.post(url , formData);
                        
                            if(res.status >= 200 || res.status <= 299){
                                alert('post added' , 'success')
                                setTimeout(()=>{
                                    window.location.reload() ;
                                }, 2000)
                          
                            }else{
                                alert('somthing went wrong' , 'warning');   
                            }
                           
                        }catch(e){
                            alert('somthing went wrong' , 'warning');  
                        }
                        
                }

        

            // <=========================call functions =======================================>
            //cheking the log in :
                if(!isLogedIn()){
                    alert('<i class="fa-solid fa-hand-point-up"></i> try to login bro ! ' , 'danger');
                    setTimeout(()=>{
                        goLogin();
                    } , 2100)
                }else{
                    if(localStorage.getItem('logeinnow')){
                        alert('<i class="fa-regular fa-face-smile-wink"></i> welcome home!' , 'success') ; 
                        localStorage.removeItem('logeinnow')
                    }

                    //filling user info 
                    fillInfo()


                    //for now we will impelent the infinite scroling : 
                            let lazyLoad = new 
                            IntersectionObserver(final=>{
                                if(final[0].isIntersecting){
                                        //filling the posts 
                                        fillPosts(localStorage.getItem('page'))  ; 
                                }
                            })
                            
                      // now defining the element that indicates the end;: 
                    //filling the posts 
                    lazyLoad.observe(document.querySelector('.infinite-scroll') )
                    
                    // add post tags  
                     getTags() ; 
                 

                     //for now we will use the add post funcion
                        let submitbtn = document.querySelector('.modal .submit-post');
                        submitbtn.addEventListener('click' ,()=>{          
                                 sendPost()
                          
                        }) ;

                  
                   
                }
            


   
















        
/* ==================== end of the home  page =====================*/
}else if(window.location.href.includes('/post.html')){
/* ==================== start of post page =====================*/


         //add comment function : 
            let addComment = (id )=>{
                let url = `https://tarmeezacademy.com/api/v1/posts/${id}/comments`;
                let bd =     document.getElementById("commentInput").value;
                axios.post(url , {body: bd}).then((res)=>{
                    let cm = res.data.data ; 
                    alert('comment added <i class="fa-regular fa-face-smile-beam"></i>' , 'success');
                    setTimeout(() => {
                        window.location.reload(); 
                    }, 2100);
                })
                
            }


        //get post info function : 
            let getPost = async(id)=>{
                let url = `https://tarmeezacademy.com/api/v1/posts/${id}`;
                let  res = await axios.get(url) ; 
                res = res.data.data  ;
                fillInfo(res ,id) ; 
            }

        //filling comments fucntion :
            let fillComments = (post)=>{
                let commentsCard = document.querySelector('.post-body .comments-section');
                if(post.comments){
                    post.comments.forEach((cm)=>{
                        commentsCard.innerHTML += `
                            <!-- comment -->
                            <div class="comment">
                                <img src="${cm.author.profile_image}" alt="">
                                <div class="info">
                                    <h4>${cm.author.name}</h4>
                                    <p>${cm.body}</p>
                                </div>
                            </div>
                        `
                    })
                }
            }
        //fill the informaions of the post :
            let fillInfo = (post , id)=>{
                let postCard = document.querySelector('.post-body .post-container') ;
                postCard.innerHTML = `
                    <div class="author ">
                        <img src='${post.author.profile_image}' alt="User" class="post-user-pic">
                        <div class="post-user-info">
                            <h4>${post.author.name}</h4>
                            <p class="post-time"><i class="fa-solid fa-user-clock"></i> ${post.created_at}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <h5>${post.title}</h5>
                        <img src="${post.image}" alt="Random Post Image" class="img-fluid rounded">

                    </div>
                    <p class="text-light">${post.body}</p>
                    <!-- Add Comment Section (Standalone) -->
                    <div class=" mt-4">
                        <div class="add-comment-card card p-3">
                            <h5 class="text-info">Add a Comment</h5>
                            <input type="text" class="form-control mb-2" placeholder="Write a comment..." autofocus id="commentInput">
                            <button class="btn btn-primary" id="commentButton" ><i class="fa-regular fa-face-smile-beam"></i> Post Comment</button>
                        </div>
                    </div>
                `

            //adding commnent : 
                document.getElementById('commentButton').addEventListener('click' , ()=>{
                    addComment(id) ; 
                })

            //fill comments :
                fillComments(post)
              
            }
        //first checks if the user already loged in :
        if(!isLogedIn()){
            alert('try to login bro' , 'danger');
            setTimeout(()=>{
                goLogin();
            } , 2100)
        }else{
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id"); // Get the value of "id"
            console.log(id);


            //get post info 
            getPost(id) ;

        
        }






















        /* ==================== end of post page =====================*/
}

