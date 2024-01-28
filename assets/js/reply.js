/*document.addEventListener("DOMContentLoaded", function () {
    var replyButtons = document.querySelectorAll('.reply-btn');
  
    replyButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var closestDflex = closestParent(this, 'mb-4');
  
        if (closestDflex) {
          var replyForm = closestDflex.querySelector('.reply-form');
  
          if (replyForm) {
            toggleElement(replyForm);
          }
        }
      });
    });
  
    // Helper function to find the closest parent with a given class
    function closestParent(element, className) {
      var parent = element.parentElement;
      while (parent && !parent.classList.contains(className)) {
        parent = parent.parentElement;
      }
      return parent;
    }
  
    // Helper function to toggle element visibility
    function toggleElement(element) {
      if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    }
  }); */
  