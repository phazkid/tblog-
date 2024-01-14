

let blogPost = document.querySelector('.blogPost')
let editPost = document.querySelector('.editPost')
let deletePost = document.querySelector('.delete')
let registerbtn = document.querySelector('.registerbtn')
let loginbtn = document.querySelector('.loginbtn')
let forgotbtn = document.querySelector('.forgotbtn')
let resetbtn = document.querySelector('.resetbtn')


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
   let responseApi = await axios.post('/api/v1/users/login', { email, password })
    
   if(responseApi.data.status === 'success'){
      
      renderErrorSuccessNotification('log in successfully!!!', 'success')
      
        ///close notification after 3 seconds and assigh to overview page
        window.setTimeout(()=> {

         document.querySelector('.notification').innerHTML = ''
                location.assign('/')
        
        }, 3000)

   }



   }catch(err){
   // console.log(err.response.data);
   }




}




let registerUser = async (name, email, password, passwordConfirm) => {
   try{
   
   let responseApi = await axios.post('/api/v1/users/signup', {name, email, password, passwordConfirm})
     
    if(responseApi.data.status === 'success'){
          
      renderErrorSuccessNotification('sign in successfully, You will be directed to ligin page in 3s', 'success')
    
       ///close notification after 3 seconds
      window.setTimeout(()=> {

       document.querySelector('.notification').innerHTML = ''
              location.assign('/login')
      
      }, 3000)

    }
 
   }catch(err){
     renderErrorSuccessNotification(err.response.data.message, "danger")
   }


  
}


let uploadContent = async (form) => {
   try{

     
      let responseApi = await axios.post('/api/v1/post', form
        // withCredentials: true, // Include credentials in the request
        /* headers: {
           'Authorization': `Bearer ${token}`, // Include your access token
           'Custom-Header': 'custom-value', // Include any custom headers if needed
         }}*/)
        
         if(responseApi.data.status === 'success'){
          
            renderErrorSuccessNotification('post created successfully', 'success')
      
          }
        
       }catch(err){
         renderErrorSuccessNotification(err.response.data.message, "danger")
       } 
}


let editPosts = async (form, postSlug) => {
     
   try{
     
      let response = await axios.patch(`/api/v1/post/${postSlug}`, form)

     //console.log(response.data);
   }catch(err){


   }



}



if(blogPost){
   blogPost.addEventListener('submit',  function (e) {
      e.preventDefault()
       
      console.log(7);
      const form = new FormData()

      form.append('title', document.querySelector('.title').value)
      form.append('category', document.querySelector('.category').value)
      form.append('content', tinymce.get("message").getContent())
      form.append('file', document.querySelector('.blogImage').files[0])
    
      //console.log(form);
      

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













function renderErrorSuccessNotification(message,tag) {
   ////clear any formal alerts
document.querySelector('.notification').innerHTML = ''
///// add notification
let html = ` <div class="alert alert-${tag} text-center" role="alert"> ${message} </div>>`

document.querySelector('.notification').insertAdjacentHTML('afterbegin', html)

}
