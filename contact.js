import { supabase } from './supabase-client.js';

const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
    }

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const { error } = await supabase
            .from('contact_messages')
            .insert({ name, email, message });

        if (error) throw error;

        showStatus('Thank you! Your message has been sent.', 'success');
        form.reset();
    } catch (err) {
        showStatus('Something went wrong. Please try again or email me directly.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'form-status ' + type;
    statusDiv.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}
