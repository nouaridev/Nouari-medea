
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


        //logout 
        
            let lgbtn = document.querySelector('.nav-links .log-out') ; 
            console.log(lgbtn)
            lgbtn.addEventListener('click', (e)=>{
                alert('hi' , 'warning')
            })
        








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

                            alert('done!' , 'success');

                        } catch (error) {
                            alert('something wrong' , 'warning');
                        }
                })
            
        








/* ===================End of the login page =====================*/
        }else if(window.location.href.includes('/signup.html')){
/* ==================== Handlingthe dignup page =====================*/









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

                    alert('done! you joined the community' , 'success');
                } catch (error) {
                    alert('contact ismail nouari for help' , 'warning')
                }


        })
    




/* ==================== End of the signup page =====================*/
        }else if(window.location.href.includes('/home.html')){
/* ==================== Handling the home  page =====================*/
            //removing the set of routing attributes : 
            localStorage.removeItem('openedPost');
          
            //fill user info function 
                let fillInfo = ()=>{
                    let info = getUserData() ; 
                    

                    let navbar = document.querySelector('.navbar ');
                    navbar.innerHTML += `<img src=${info.progile_image} alt="Profile" class="profile-pic">`


                    let profileCard = document.querySelector('.sidebar .user-info');
                    profileCard.innerHTML = `
                        <img src=${info.progile_image} alt="Profile Picture">
                        <h3 class="logged-user-name">${info.name}</h3>
                        <p>Posts: <span>${info.posts_count}</span></p>
                        <button class="edit-profile">Edit Profile</button>
                    `

                    let tags = document.querySelector('.right-sidebar ul') ;
                    let url = 'https://tarmeezacademy.com/api/v1/tags';
                    axios.get(url).then((e)=>{
                        e.data.data.forEach(tag=> {
                            tags.innerHTML+= `<li>#${tag.name}</li>`
                        });
                    })
                }

            //getposts function : 
                let getPosts = async ()=>{
                    let url= 'https://tarmeezacademy.com/api/v1/posts?limit=20';
                    let response= await axios.get(url); 
                    
                    return response.data.data
                }

            //fillingposts :
                let fillPosts =async ()=>{
                    let posts = await getPosts();
                    let postContainer =document.querySelector('.main-content .posts') ; 
                    console.log(posts)
                    posts.forEach((post)=>{
                        if((typeof post.image )!= "object" ){
                            let tags = '';
                            post.tags.forEach((tag)=>{
                                tags += `<li>4${tag.name}</li>`
                            }) 
                            postContainer.innerHTML += `
                            <div class="post id=""p${post.id}" >
                                    <div class="post-header">
                                        <img src=${post.author.profile_image} alt="User" class="post-user-pic">
                                        <div class="post-user-info">
                                            <h4>${post.author.name}</h4>
                                            <p class="post-time">${post.created_at}</p>
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
                                        <button class="comment-btn" data='${post.id}'>💬 ${post.comments_count} Comment</button>
                                        <button class="share-btn">🔗 Share</button>
                                    </div>
                                
                               </div>
                            `
                        }

                        
                    })

                    //comment btn for each post : 
                    let cmntbtn = document.querySelectorAll(".post .comment-btn") ; 
                    cmntbtn.forEach((cm)=>{
                        cm.addEventListener('click' , (e)=>{
                            localStorage.setItem('openedPost' , e.target.getAttribute('data') )
                        })
                    })
                    
                       
                }

            //cheking the log in :
                if(!isLogedIn()){
                    alert('try to login bro' , 'danger');
                    setTimeout(()=>{
                        goLogin();
                    } , 2100)
                }else{
                    if(localStorage.getItem('logeinnow')){
                        alert('welcome home!' , 'success') ; 
                        localStorage.removeItem('logeinnow')
                    }

                    //filling user info 
                    fillInfo()

                    //filling the posts 
                    fillPosts() 
                }
            
            


        }
        
/* ==================== end of the home  page =====================*/
            
           