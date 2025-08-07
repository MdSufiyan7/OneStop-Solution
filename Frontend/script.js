const contactForm = document.getElementById('contact-form');
const formMessageDiv = document.getElementById('form-message');

function showMessage(message, type = 'info') {
  formMessageDiv.textContent = message;
  formMessageDiv.style.color =
    type === 'success' ? 'green' :
    type === 'error' ? 'red' : 'black';
  formMessageDiv.style.display = 'block'; // ✅ This makes sure it's visible
}


contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const subject = document.getElementById('subject')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !subject || !message) {
    showMessage('Please fill in all required fields.', 'error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  showMessage('Sending your message...');
  

  try {
    const response = await fetch('http://localhost:5000/api/contact', { // Change URL when deployed
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const data = await response.json();

    if (data.success) {
      showMessage('Thank you for your message! We will get back to you soon.', 'success');
      contactForm.reset();
    } else {
      showMessage(data.error || 'Failed to send message.', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Server error. Please try again later.', 'error');
  }
});
