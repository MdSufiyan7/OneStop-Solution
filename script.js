document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    // Create the success message element
    const successMessage = document.createElement('div');
    successMessage.style.display = 'none'; // Initially hide the message
    successMessage.style.padding = '10px';
    successMessage.style.marginTop = '20px';
    successMessage.style.backgroundColor = '#28a745';
    successMessage.style.color = '#fff';
    successMessage.style.textAlign = 'center';
    successMessage.style.borderRadius = '5px';
    successMessage.textContent = 'Message Sent Successfully!';

    // Insert the success message after the form
    form.insertAdjacentElement('afterend', successMessage);

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Display the success message
        successMessage.style.display = 'block';

        // Optionally, clear the form fields after submission
        form.reset();

        // Hide the success message after 3 seconds
        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 3000);
    });
});
//select all navigation links
const navLinks=document.querySelectorAll('nav, div, div, ul, li, a');

// add click event listener to each link
/*
navLinks.forEach(link=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();//prevent default link behavior

        //get the target section id from the data attributes
        const targetId=link.getAttribute('nav-link');
        const targetSection=document.getElementById(targetId);

        //scroll to target section
        targetSection.scrollIntoView({
            behavior:'smooth',
            block: 'start'
        });
    });
});*/
// JavaScript to handle form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send form data to the backend
    try {
        const response = await fetch(' https://message-backend-bs7y5w11z-md-sufiyans-projects.vercel.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            alert('Message sent successfully!');
            // Optionally, clear the form fields
            document.getElementById('contactForm').reset();
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
