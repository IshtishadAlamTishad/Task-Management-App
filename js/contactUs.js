let x = document.getElementById('contactForm').innerHTML;

if( x === "") {
  alert("Please Write something!")
} else {
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your message has been submitted!');
  });
}

