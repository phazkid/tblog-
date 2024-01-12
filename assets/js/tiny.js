

  /* tinymce.init({
    selector: 'textarea#message'
  }); */


  

  tinymce.init({
    selector: 'textarea',
    plugins: '  anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount      ',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    /*images_upload_url: '/upload', // Server endpoint for handling image uploads
    automatic_uploads: true,
    images_upload_handler: async function (blobInfo, success, failure) {
     
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
       
      const response = await axios.post(`http://localhost:2000/api/v1/post/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
      //console.log(response.data);
      success(response.data.location)

        // Server-side logic for handling image uploads
    },*/

    images_upload_url: '/api/v1/post/upload',
    images_upload_handler: function (blobInfo) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
  
        axios.post('/api/v1/post/upload', formData)
          .then(response => {
           // console.log(response.data);
            const {location} = response.data;
            resolve(location);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
            reject('Error uploading image');
          });
      });
    },
    tinycomments_mode: 'embedded',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
});


