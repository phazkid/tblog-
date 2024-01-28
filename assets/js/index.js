

let blogPost = document.querySelector('.submitPost')
let editPost = document.querySelector('.editPost')
let deletePost = document.querySelector('.delete')
let registerbtn = document.querySelector('.registerbtn')
let loginbtn = document.querySelector('.loginbtn')
let forgotbtn = document.querySelector('.forgotbtn')
let resetbtn = document.querySelector('.resetbtn')
let logout = document.querySelector('.logout')
let spinner = document.querySelector('.spinner')
let commentbtn = document.querySelector('.commentbtn')
//const replyBtns = document.querySelectorAll('.ereply');

let resetPassword = async(password, passwordConfirm, token) => {
   
     try{
    let responseApi = await axios.patch(`/api/v1/users/resetPassword/${token}`, {password, passwordConfirm})
     
    if(responseApi.data.status === 'success'){
      
      renderErrorSuccessNotification('password changed succefully, you will be redirected to login page', 'success')
      
     
     
        ///close notification after 3 seconds and assigh to overview page
        window.setTimeout(()=> {

         document.querySelector('.notification').innerHTML = ''
                location.assign('/login')
        
        }, 3000)
     


    }
     

     }catch(err){
      renderErrorSuccessNotification(err.response.data.message, "danger")


     }


}


let forgotPassword = async(email) =>  {
     
     try{

      let responseApi = await axios.post('/api/v1/users/forgotPassword', {email})
      
      if(responseApi.data.status === 'success'){
      
         renderErrorSuccessNotification('token sent successfully, check your email address!!!', 'success')
         
       }

     }catch(err){
  renderErrorSuccessNotification(err.response.data.message, "danger")
     }
  

}




let loginUser = async(email, password) => {

   try{
      renderloadingSpiner()
      
   let responseApi = await axios.post('/api/v1/users/login', { email, password })
    
   if(responseApi.data.status === 'success'){
         
         removeLoadingSpiner()
      renderErrorSuccessNotification('log in successfully!!!', 'success')
      
        ///close notification after 3 seconds and assigh to overview page
        window.setTimeout(()=> {

         document.querySelector('.notification').innerHTML = ''
                location.assign('/')
        
        }, 3000)

   }



   }catch(err){
       removeLoadingSpiner()

      renderErrorSuccessNotification(err.response.data.message, "danger")
   // console.log(err.response.data);
   }




}




let registerUser = async (name, email, password, passwordConfirm) => {
   try{
     
      renderloadingSpiner()

   let responseApi = await axios.post('/api/v1/users/signup', {name, email, password, passwordConfirm})
     
    if(responseApi.data.status === 'success'){
      removeLoadingSpiner()

      renderErrorSuccessNotification('sign in successfully, You will be directed to ligin page in 3s', 'success')
    
       ///close notification after 3 seconds
      window.setTimeout(()=> {

       document.querySelector('.notification').innerHTML = ''
              location.assign('/login')
      
      }, 3000)

    }
 
   }catch(err){
      removeLoadingSpiner()
     renderErrorSuccessNotification(err.response.data.message, "danger")
   }


  
}


let uploadContent = async (form) => {
   try{

      renderloadingSpiner()
      let responseApi = await axios.post('/api/v1/post', form)
         
         if(responseApi.data.status === 'success'){
            removeLoadingSpiner()
            renderErrorSuccessNotification('post created successfully', 'success')
             
              ///close notification after 3 seconds and direct to home page
          window.setTimeout(()=> {

         document.querySelector('.notification').innerHTML = ''
                location.assign('/')
        
        }, 3000)

          }
        
       }catch(err){
         removeLoadingSpiner()
         renderErrorSuccessNotification(err.response.data.message, "danger")
       } 
}


let editPosts = async (form, postSlug) => {
     
   try{
      
      renderloadingSpiner()

      let response = await axios.patch(`/api/v1/post/${postSlug}`, form)
      console.log(response);

      if(response.data.status === 'success'){
         removeLoadingSpiner()

         renderErrorSuccessNotification('post edited successfully', 'success')
      }
     //console.log(response.data);
   }catch(err){
      removeLoadingSpiner()
      renderErrorSuccessNotification(err.response.data.message, "danger")
   }



}



if(blogPost){
   blogPost.addEventListener('click',  function (e) {

      e.preventDefault()
       
     
      const form = new FormData()

      form.append('title', document.querySelector('.title').value)
      form.append('category', document.querySelector('.category').value)
      form.append('content', tinymce.get("message").getContent())
      form.append('file', document.querySelector('.blogImage').files[0])
    
     
      

       uploadContent(form)
   })
}

if(editPost){

    editPost.addEventListener('submit', function (e) {
        e.preventDefault()
       
        const form = new FormData()
      
      const postSlug = editPost.getAttribute('data-post-id');
      form.append('title', document.querySelector('.title').value)
      form.append('category', document.querySelector('.category').value)
      form.append('content', tinymce.get("message").getContent())
      form.append('file', document.querySelector('.blogImage').files[0])
    
      editPosts(form, postSlug)
       
    })

}

if(registerbtn){
    registerbtn.addEventListener('click', function (e) {
      e.preventDefault()
      const name = document.querySelector('.name').value
      const email = document.querySelector('.email').value
      const password = document.querySelector('.password').value
      const passwordConfirm = document.querySelector('.confirmPassword').value
  
     registerUser(name, email, password, passwordConfirm)
       
    })

}

if(loginbtn){

  loginbtn.addEventListener('click', function (e) {
      e.preventDefault()
  
      const email = document.querySelector('.email').value
      const password = document.querySelector('.password').value

     loginUser(email, password)

  })


}

if(forgotbtn){

    forgotbtn.addEventListener('click', function (e) {
       e.preventDefault()

       const email = document.querySelector('.email').value
     
      forgotPassword(email)


    })
}

if(resetbtn) {
 
   resetbtn.addEventListener('click', function () {
      
      const password = document.querySelector('.password').value
      const passwordConfirm = document.querySelector('.passwordConfirm').value
      const token = document.querySelector('#reset').dataset.token
    
      resetPassword(password, passwordConfirm, token)

   })



}

if(logout){
   logout.addEventListener('click', function () {
      
      logouts()

        async function  logouts () {

         let responseApi = await axios.post('/api/v1/users/logout')
        
      if(responseApi.data.status === 'success'){
         //redirect to home page
       document.querySelector('.notification').innerHTML = ''
              location.assign('/')
          }
         }

   })



}


if(commentbtn){

    commentbtn.addEventListener('click', function (e) {
       let name = document.querySelector('.name').value
       let text = document.querySelector('.text').value
       let postId = document.querySelector('#commentForm').dataset.postid
       let postSlug = document.querySelector('#commentForm').dataset.slug
       
    comment(name, text, postId, postSlug)
      
     async function comment(name, text, postId, postSlug) {
         try{
          renderloadingSpiner()
        let responseApi = await axios.post(`/api/v1/post/${postId}/comment`, {name, text})
       console.log(responseApi);

        if(responseApi.data.status === 'success'){
         removeLoadingSpiner()
  
         window.setTimeout(()=> {

            document.querySelector('.notification').innerHTML = ''
                   location.assign(`/post/${postSlug}`)
           }, 1000)
        }

         }catch(err){

            removeLoadingSpiner()
            renderErrorSuccessNotification(err.response.data.message, "danger")

         }
       }  





    })



}




function renderErrorSuccessNotification(message,tag) {
   ////clear any formal alerts
document.querySelector('.notification').innerHTML = ''
///// add notification
let html = ` <div class="alert alert-${tag} text-center" role="alert"> ${message} </div>>`

document.querySelector('.notification').insertAdjacentHTML('afterbegin', html)

}

function renderloadingSpiner() {
      ////clear any formal alerts
      
     spinner.innerHTML = ''
      ///add spiner
    let html = `<button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
     </button>`

     spinner.insertAdjacentHTML('afterbegin', html)
}

function removeLoadingSpiner() {
   spinner.innerHTML = ''
}