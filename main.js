
/* ==================== Primary Functions ==================== */


   
    // Function to check if the user is logged in
    let isLogedIn = () => {
        return localStorage.getItem('token') ? true : false;
    };
 
    // Function to go to the home page
    let goToHome = () => {
        window.location.href = 'home.html';
    };

    //loader (for the entire page) 
    let showLoader=()=>{
        let opirationLoader = document.querySelector('.load-cont'); 
        opirationLoader.style.opacity = '1'; 
        opirationLoader.style.zIndex = '100' ;
    }
    let hideLoader=()=>{
        let opirationLoader = document.querySelector('.load-cont'); 
        opirationLoader.style.opacity = '0'; 
        opirationLoader.style.zIndex = '-100' ;
    }


    // Function to go to the login page
    let goLogin = () => {
        window.location.href = 'login.html';
    };

    // Function to go to the user profile page
    let goProfile = (id) => {
        window.location.href = `userprofile.html?id=${id}`;
    };

    // Function to display an alert message
    let alerts = document.getElementById('alerts');

    const alert = (message, type, time) => {
        alerts.style.zIndex = 1000;
        alerts.style.opacity = 1;
        const wrapper = document.createElement('div');
        wrapper.className = 'alertt';
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert" style="width: fit-content; min-width: 300px; font-size: 20px; text-align: center">`,
            `   <div>${message}</div>`,
            '</div>'
        ].join('');
        let timee = time || 2000;
        alerts.append(wrapper);
        let alertbox = document.querySelector('.alert');
        let bsAlert = new bootstrap.Alert(alertbox);
        setTimeout(() => {
            bsAlert.close();
            alerts.innerHTML = '';
            alerts.style.opacity = 0;
            alerts.style.zIndex = -99;
        }, timee);
    };

    // Functions for getting and setting token
    let setToken = (token) => { localStorage.setItem("token", token); };
    let getToken = () => { return localStorage.getItem('token'); };

    // Functions for getting and setting user data
    let setUserData = (data) => { localStorage.setItem('userData', JSON.stringify(data)); };
    let getUserData = () => { return JSON.parse(localStorage.getItem('userData')); };

    // Home button event listener
    let home = document.querySelector('.navbar .home-btn');
    if (home) {
        home.addEventListener('click', () => {
            goToHome();
        });
    }

    // Set global authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

    // Logout functionality
    let logOutBtn = document.querySelector('.log-out');
    if (logOutBtn) {
        logOutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            alert('<i class="fa-regular fa-hand-peace"></i> good bye bro!', 'success');
            setTimeout(() => {
                goLogin();
            }, 2100);
        });
    }

    
/* ==================== End of Primary Functions ==================== */
if (window.location.href.includes('/login.html')) {   
/* ==================== Handling the Login Page ==================== */




    // Check if the user is already logged in
    if (isLogedIn()) {
        goToHome();
    }

    // Login function
    let login = async () => {
        let url = 'https://tarmeezacademy.com/api/v1/login';
        let userName = document.getElementById('userName').value;
        let password = document.getElementById('password').value;

        let body = { username: userName, password: password };

        try {
            showLoader();
            let response = await axios.post(url, body);
            if (response.status >= 200 && response.status <= 299) {
                hideLoader();
                alert('<i class="fa-solid fa-square-check"></i> Done!', 'success');
            }
            return response.data;
        } catch (e) {
            hideLoader
            console.log(e);
        }
    };

    // Login event listener
    let submitBtn = document.getElementById('login-btn');
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            let data = await login();
            setToken(data.token);
            setUserData(data.user);

            setTimeout(() => {
                if (isLogedIn()) {
                    localStorage.setItem('logeinnow', true);
                    goToHome();
                }
            }, 2300);
        } catch (error) {
            alert(`<i class="fa-solid fa-triangle-exclamation" style="color: #ffc107; font-size: 30px;"></i>
Enter valid data or register`, 'warning');
        }
    });



    /* ==================== End of the Login Page ==================== */
} else if (window.location.href.includes('/signup')) {
    /* ==================== Handling the Signup Page ==================== */


    // Check login status
    if (isLogedIn()) {
        loggedInNow = true;
        goToHome();
    }

    // Signup function
    let signUp = async () => {
        console.log('Running signup function');

        let url = "https://tarmeezacademy.com/api/v1/register";

        // Get form data
        let userName = document.getElementById('userName').value;
        let fullName = document.getElementById('fullName').value;
        let password = document.getElementById('password').value;
        let email = document.getElementById('email').value;
        let userImage = document.getElementById('image').files[0];

        let formData = new FormData();
        formData.append('username', userName);
        formData.append('password', password);
        formData.append('name', fullName);
        formData.append('email', email);
        formData.append('image', userImage);

        try {
            showLoader();
            let response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            hideLoader();
            if (response.status >= 200 && response.status <= 299) {
                return response.data;
            } else {
                return false;
            }

        } catch (e) {
            hideLoader();
            alert(`<i class="fa-solid fa-triangle-exclamation" style="color: #ffc107; font-size: 30px;"></i>${e.response.data.message}`, 'danger');
        }
    };

    // Handle signup button click
    let submitBtn = document.getElementById('signup-btn');
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            let data = await signUp();
            if (data) {
                setToken(data.token);
                setUserData(data.user);
                alert(`<i class="fa-solid fa-circle-check"></i> Done! You joined the community`, 'success');

                setTimeout(() => {
                    if (isLogedIn()) {
                        localStorage.setItem('logedinnow', true);
                        goToHome();
                    }
                }, 2300);
            }
        } catch (error) {
            alert(`<i class="fa-solid fa-triangle-exclamation" style="color: #ffc107; font-size: 30px;"></i>Contact Ismail Nouari for help`, 'warning');
        }
    });




/* ==================== End of the signup page =====================*/
}else if(window.location.href.includes('/home.html')){
/* ==================== Handling the home  page =====================*/



    // Infinite scrolling variable
    localStorage.setItem('page', 1);

    // Visit profile button
    let pfpbtn = document.querySelector('.sidebar .visit-profile');
    pfpbtn.addEventListener('click', () => {
        goProfile(getUserData().id);
    });

    // Remove stored routing attributes
    localStorage.removeItem('openedPost');

    // Fill user info function
    let fillInfo = async () => {

        let userInfo = getUserData();
        let profileCard = document.querySelector('.sidebar .user-info');
        showLoader();
        let response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${userInfo.id}`);
        hideLoader();
        setUserData(response.data.data);

        let updatedUser = getUserData();
        let user = document.createElement('div');
        user.innerHTML = `
            <img src=${updatedUser.profile_image} alt="Profile Picture">
            <h3 class="logged-user-name">${updatedUser.name}</h3>
            <p>Posts: <span>${updatedUser.posts_count}</span></p>
        `;
        profileCard.prepend(user);

        // Fill post stats
        let totalPosts = document.querySelector('.sidebar .stats-section .stat-item-posts .stat-number');
        totalPosts.innerHTML = `${localStorage.getItem('totalPosts')}`;

        // Fill user stats
        axios.get('https://tarmeezacademy.com/api/v1/users?limit=1').then((res) => {
            let totalUsers = document.querySelector('.sidebar .stats-section .stat-item-users .stat-number');
            totalUsers.innerHTML = `${res.data.meta.total}`;
        });
    };

    // Prevent multiple fetch requests at the same time
    localStorage.setItem('isfetching', false);

    // Get posts asynchronously
    const getPosts = async (page) => {
        let url = `https://tarmeezacademy.com/api/v1/posts?limit=6&page=${page}`;

        if (localStorage.getItem('isfetching') === 'false') {
            localStorage.setItem('isfetching', true);

            try {
                let res = await axios.get(url);
                localStorage.setItem('isfetching', false);

                if (!localStorage.getItem('totalPosts')) {
                    localStorage.setItem('totalPosts', res.data.meta.total);
                }

                return res.data.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                localStorage.setItem('isfetching', false);
                return [];
            }
        }
    };

    // IntersectionObserver for Infinite Scroll
    let lazyLoad = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            fillPosts(localStorage.getItem('page'));
        }
    }, { threshold: 0.7 });

    // Fill posts
    const fillPosts = async (page) => {
        
        let posts = await getPosts(page);
     
        let postContainer = document.querySelector('.main-content .posts');

        if (!posts || posts.length === 0) return;

        posts.forEach((post, index) => {
            if (typeof post.image !== "object") {
                const postElement = document.createElement("div");
                postElement.classList.add("post");
                postElement.id = `p${post.id}`;
                postElement.innerHTML = `
                    <div class="post-header" onclick=goProfile(${post.author.id})>
                        <img src="${post.author.profile_image}" alt="User" class="post-user-pic">
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
                    <div class="post-actions">
                        <button class="comment-btn" data-id="${post.id}"> 
                            <i class="fa-solid fa-comment-nodes"></i> ${post.comments_count}
                        </button>
                        <button class="share-btn"><i class="fa-solid fa-share"></i></button>
                    </div>
                `;

                postElement.querySelector(".comment-btn").addEventListener('click', (e) => {
                    let postId = e.target.closest(".comment-btn").getAttribute('data-id');
                    if (postId) {
                        window.location.href = `post.html?id=${postId}`;
                    }
                });

                postElement.querySelector('.share-btn').addEventListener('click', () => {
                    navigator.clipboard.writeText(`${window.location.origin}/html/post.html?id=${post.id}`);
                    alert(`<i class="fa-solid fa-clipboard-check"></i> Post link copied successfully!`, 'success');
                });

                postElement.style.opacity = "0";
                postElement.style.transform = "translateY(10px)";
                postElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

                setTimeout(() => {
                    postContainer.appendChild(postElement);
                    setTimeout(() => {
                        postElement.style.opacity = "1";
                        postElement.style.transform = "translateY(0)";
                    }, 100);
                }, index * 500);
            }
        });

        localStorage.setItem('page', parseInt(localStorage.getItem('page')) + 1);

        setTimeout(() => {
            let infiniteScrollTrigger = document.querySelector('.infinite-scroll');
            lazyLoad.unobserve(infiniteScrollTrigger);
            lazyLoad.observe(infiniteScrollTrigger);
        }, 1000);
    };

    // Add post function
    let sendPost = async () => {
        let postTitle = document.querySelector('.post-modal .modal-body .i1 input').value;
        let postBody = document.querySelector('.post-modal .modal-body .i2 textarea').value;
        let postImage = document.querySelector('.post-modal .modal-body .i3 input').files[0];

        let formData = new FormData();
        formData.append("title", postTitle);
        formData.append("body", postBody);
        formData.append("image", postImage);

        let url = 'https://tarmeezacademy.com/api/v1/posts';

        try {
            showLoader();
            let res = await axios.post(url, formData);
            hideLoader();
            if (res.status >= 200 && res.status <= 299) {
                alert(`<i class="fa-solid fa-calendar-check"></i> Post added`, 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                alert('Something went wrong', 'warning');
            }
        } catch (e) {
            hideLoader();
            alert('Something went wrong', 'warning');
        }
    };

    // Check login status
    if (!isLogedIn()) {
        alert('Try to login!', 'danger');
        setTimeout(() => {
            goLogin();
        }, 2100);
    } else {
        if (localStorage.getItem('logeinnow')) {
            alert('Welcome home!', 'success');
            localStorage.removeItem('logeinnow');
        }

        fillPosts(localStorage.getItem('page'));
        fillInfo();

        let submitBtn = document.querySelector('.modal .submit-post');
        submitBtn.addEventListener('click', () => {
            sendPost();
        });


         //for profile page : 
         localStorage.setItem('profileFirstTime' , 'true') ;

    }


        
/* ==================== end of the home  page =====================*/
}else if(window.location.href.includes('/post.html')){
/* ==================== start of post page =====================*/



    // Add comment function
    let addComment = (id) => {
        let url = `https://tarmeezacademy.com/api/v1/posts/${id}/comments`;
        let bd = document.getElementById("commentInput").value;
        showLoader();
        axios.post(url, { body: bd }).then((res) => {
            hideLoader();
            let cm = res.data.data;
            alert('comment added <i class="fa-regular fa-face-smile-beam"></i>', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 2100);
        });
     
    }

    // Get post info function
    let getPost = async (id) => {
        let url = `https://tarmeezacademy.com/api/v1/posts/${id}`;
        showLoader();
        let res = await axios.get(url);
        hideLoader();
        res = res.data.data;
        fillInfo(res, id);
    }

    // Filling comments function
    let fillComments = (post) => {
        let commentsCard = document.querySelector('.post-body .comments-section');
        if (post.comments) {
            post.comments.forEach((cm) => {
                commentsCard.innerHTML += `
                    <div class="comment">
                        <img src="${cm.author.profile_image}" alt="" onclick=goProfile(${cm.author.id})>
                        <div class="info">
                            <h4 onclick=goProfile(${cm.author.id})>${cm.author.name}</h4>
                            <p>${cm.body}</p>
                        </div>
                    </div>
                `;
            });
        }
    }

    // Fill post information function
    let fillInfo = (post, id) => {
        let postCard = document.querySelector('.post-body .post-container');
        postCard.innerHTML = `
            <div class="author" onclick=goProfile(${post.author.id})>
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
            <div class="mt-4">
                <div class="add-comment-card card p-3">
                    <h5 class="text-info">Add a Comment</h5>
                    <input type="text" class="form-control mb-2" placeholder="Write a comment..." autofocus id="commentInput">
                    <button class="btn btn-primary" id="commentButton"><i class="fa-regular fa-face-smile-beam"></i> Post Comment</button>
                </div>
            </div>
        `;

        // Add comment event
        document.getElementById('commentButton').addEventListener('click', () => {
            addComment(id);
        });

        // Fill comments
        fillComments(post);
    }

    // Check if user is logged in
    if (!isLogedIn()) {
        alert('try to login bro', 'danger');
        setTimeout(() => {
            goLogin();
        }, 2100);
    } else {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        // Get post info
        getPost(id);

         //for profile page : 
         localStorage.setItem('profileFirstTime' , 'true') ;

    }



    /* ==================== end of post page =====================*/
}else if (window.location.href.includes('html/userprofile')){
/* ==================== start of  user page =====================*/



        // Increase the height of the infinite loop 
        let inf = document.querySelector('.infinite-scroll');
        inf.style.minHeight = '60vh';
        inf.style.alignItems = 'center';

        // Delete post function
        let deletePost = async (id) => {
            let url = `https://tarmeezacademy.com/api/v1/posts/${id}`;
            try {
                showLoader()
                let del = await axios.delete(url);
                hideLoader()
                return del.status >= 200 && del.status <= 299;
            } catch (e) {
                hideLoader();
                return false;
            }
        }

        // Get user info function
        let getUser = async (id) => {
            let url = `https://tarmeezacademy.com/api/v1/users/${id}`;
            try {
                showLoader();
                let user = await axios.get(url);
                hideLoader();
                if(localStorage.getItem('profileFirstTime') == 'true'){
                  alert(`Welcome to ${user.data.data.name} profile.. <i class="fa-solid fa-id-card-clip"></i>`, 'success');
                  localStorage.setItem('profileFirstTime' , 'false')
                }
                return user.data.data;
            } catch (e) {
                hideLoader();
                console.log("Maybe the user doesn't exist", e);
                alert('<i class="fa-solid fa-circle-exclamation"></i> Maybe the user doesn\'t exist (contact me and tell about the problem). We will redirect you to the home page.', 'warning', 10000);
                setTimeout(() => { goToHome() }, 11000);
            }
        }

        // Get user posts
        let getPosts = async (id) => {
            let url = `https://tarmeezacademy.com/api/v1/users/${id}/posts`;
            let posts = await axios.get(url);
            return posts.data.data;
        }

        // Fill posts
        let fillPosts = async (id) => {
            let posts = await getPosts(id);
            let postbox = document.querySelector('.main-content .posts');

            let postTemplate = (post) => {
                let encodedPost = encodeURIComponent(JSON.stringify(post));
                return `
                    <div class="post-header">
                        <img src="${post.author.profile_image}" alt="User" class="post-user-pic">
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
                    <div class="post-actions local-user-post-actions">
                        <div>
                            <button class="comment-btn" data-id="${post.id}">
                                <i class="fa-solid fa-comment-nodes"></i> ${post.comments_count}
                            </button>
                            <button class="share-btn">
                                <i class="fa-solid fa-share"></i>
                            </button>
                        </div>
                        ${id == getUserData().id ? `
                        <div class="private-post-edit">
                            <button class="edit-btn" data-bs-toggle="modal" data-bs-target="#editPostModal" onclick="editPost('${encodedPost}')">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                            <button class="del-btn" data-bs-toggle="modal" data-bs-target="#delete-post-modal">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        ` : ''}
                    </div>
                `;
            }

            if (posts) {
                posts.forEach((post, index) => {
                    let postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = postTemplate(post);

                    postElement.style.opacity = 0;
                    postElement.style.transform = 'translateY(10px)';
                    postElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

                    // Comment button
                    postElement.querySelector('.comment-btn').addEventListener('click', (e) => {
                        let postId = e.target.closest(".comment-btn").getAttribute('data-id');
                        if (postId) {
                            window.location.href = `post.html?id=${post.id}`;
                        }
                    });

                    // Delete and Edit buttons for local user
                    if (postElement.querySelector('.del-btn') && postElement.querySelector('.edit-btn')) {
                        postElement.querySelector('.del-btn').addEventListener('click', () => {
                            localStorage.setItem('post-delete', post.id);
                        });
                        postElement.querySelector('.edit-btn').addEventListener('click', () => {
                            localStorage.setItem('post-edit', post.id);
                        });
                    }

                    // Share button
                    postElement.querySelector('.share-btn').addEventListener('click', () => {
                        navigator.clipboard.writeText(`${window.location.origin}/html/post.html?id=${post.id}`);
                        alert(`<i class="fa-solid fa-clipboard-check"></i> Post link copied successfully!`, 'success');
                    });

                    setTimeout(() => {
                        postbox.append(postElement);
                        setTimeout(() => {
                            postElement.style.opacity = 1;
                            postElement.style.transform = 'translateY(0px)';
                        }, 500);
                    }, 1000 * index);
                });

                // Hide loader
                inf.style.display = 'none';
            }
        }

        // Fill user info
        let fillUserInfo = async (id) => {
            let user = await getUser(id);
            if (!user) return;

            let userInfo = document.querySelector('.user-info');
            let statsSection = document.querySelector('.stats-section');
            let rightSide = document.querySelector('.right-sidebar');

            document.querySelector('.main-content .user-post-h').innerHTML = `${user.username}'s posts`;

            userInfo.innerHTML = `
                <img src="${user.profile_image}" alt="Profile Picture">
                <h3 class="logged-user-name">${user.name}</h3>
                <p>User name: <span>${user.username}</span></p>
            `;

            statsSection.innerHTML = `
                <div class="stats-header">
                    <i class="fas fa-chart-bar"></i> Statistics
                </div>
                <div class="stats-grid">
                    <div class="stat-item-comments">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-number">${user.comments_count}</div>
                        <div class="stat-label">comments</div>
                    </div>
                    <div class="stat-item-posts">
                        <div class="stat-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-number">${user.posts_count}</div>
                        <div class="stat-label">POSTS</div>
                    </div>
                </div>
            `;

            rightSide.innerHTML = `
                <h3><i class="fas fa-handshake"></i></h3>
                <ul>
                    <li class="email" data=${user.email}><i class="fas fa-envelope"></i>${user.email}</li>
                    <li class="link" data=${user.id}><i class="fas fa-link"></i> Click to get link</li>
                </ul>
            `;

            // Handle click on email and link
            let email = document.querySelector('.right-sidebar .email');
            let link = document.querySelector('.right-sidebar .link');
            email.addEventListener('click', (e) => {
                navigator.clipboard.writeText(`${e.target.getAttribute('data')}`);
                alert('Email copied <i class="fas fa-heart"></i>', 'success');
            });
            link.addEventListener('click', (e) => {
                navigator.clipboard.writeText(`${window.location.href}`);
                alert('Profile link copied <i class="fas fa-heart"></i>', 'success');
            });
        }

        // Check if user is logged in
        if (!isLogedIn()) {
            alert('Try to login bro', 'danger');
            setTimeout(() => {
                goLogin();
            }, 2100);
        } else {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            
            // Get user info and posts
            fillUserInfo(id);
            fillPosts(id);

            // Modals functions
            // Delete modal
            var delModal = new bootstrap.Modal(document.querySelector('#delete-post-modal'));
            let cancelDel = document.querySelector('#delete-post-modal .modal-content .modal-footer .cancel');
            if (cancelDel) {
                cancelDel.addEventListener('click', () => {
                    localStorage.removeItem('post-delete');
                    delModal.hide();
                });
            }

            let deleteDel = document.querySelector('#delete-post-modal .modal-content .modal-footer .delete');
            if (deleteDel) {
                deleteDel.addEventListener('click', async () => {
                    delModal.hide();
                    showLoader();
                    let res = await deletePost(parseInt(localStorage.getItem('post-delete')));
                    hideLoader();
                    if (res) {
                        alert("RIP POST 💀⚰️", 'success');
                    } else {
                        alert('Error, contact developer to solve', 'danger');
                    }
                    
                    setTimeout(() => {
                        localStorage.removeItem('post-delete');
                        window.location.reload();
                    }, 2100);
                });
            }

            // Edit modal
            let editModal = new bootstrap.Modal(document.querySelector('#editPostModal'));
            let postTitle = document.querySelector('#editPostModal #postTitle');
            let postBody = document.querySelector('#editPostModal #postBody');
            let postImage = document.querySelector("#editPostModal #postImage");
            let prevImage = document.querySelector("#previewImage");

            postTitle.addEventListener('change', () => {
                console.log(this.value);
            });

            let cancelBtn = document.querySelector('#editPostModal #cancel');
            let editBtn = document.querySelector('#editPostModal #saveChanges');

            cancelBtn.addEventListener('click', () => {
                editModal.hide();
            });

            editBtn.addEventListener('click', () => {
                let data = new FormData();
                data.append('title', postTitle.value);
                data.append('body', postBody.value);
                data.append('image', postImage.files[0]);
                data.append('_method', 'put');

                let url = `https://tarmeezacademy.com/api/v1/posts/${editBtn.getAttribute('data')}`;
                showLoader();
                axios.post(url, data).then((e) => {
                    hideLoader();
                    if (e.status >= 200 && e.status <= 299) {
                        alert("Post updated successfully!", 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2100);
                    }
                }).catch((e) => {
                    hideLoader();
                    alert(`<i class="fa-solid fa-triangle-exclamation" style="color: #ffc107; font-size: 30px;"></i> Error: Something went wrong! Please contact developer`, 'warning');
                });
                editModal.hide();
            });

            var editPost = (postString) => {
                let post = JSON.parse(decodeURIComponent(postString));
                postTitle.value = post.title;
                postBody.value = post.body;

                postImage.addEventListener('change', (e) => {
                    let img = postImage.files[0];
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        prevImage.src = e.target.result;
                        prevImage.style.display = 'block';
                    };
                    reader.readAsDataURL(img);
                });

                editBtn.setAttribute('data', post.id);
            }
        }

        }

