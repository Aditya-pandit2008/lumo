const signupForm = document.getElementById('signupForm');
const signupBtn = document.getElementById('signupBtn');
const messageDiv = document.getElementById('message');

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

/* Toggle password visibility */
togglePassword.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.textContent = isPassword ? '🙈' : '👁';
});

toggleConfirmPassword.addEventListener('click', function () {
    const isPassword = confirmPasswordInput.type === 'password';
    confirmPasswordInput.type = isPassword ? 'text' : 'password';
    toggleConfirmPassword.textContent = isPassword ? '🙈' : '👁';
});

/* Form submit */
signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    clearMessage();

    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    if (name.length < 3) {
        showMessage('Name must be at least 3 characters.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
    }

    signupBtn.disabled = true;
    signupBtn.textContent = 'Creating account...';

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        let data = {};
        try {
            data = await response.json();
        } catch (jsonError) {
            data = {};
        }

        if (response.ok) {
            showMessage('Account created successfully! Redirecting...', 'success');

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1200);
        } else {
            showMessage(data.error || 'Signup failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showMessage('Network/server error. Please try again.', 'error');
    } finally {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Sign Up';
    }
});

/* Helpers */
function showMessage(message, type) {
    messageDiv.className = type;
    messageDiv.textContent = message;
}

function clearMessage() {
    messageDiv.innerHTML = '';
    messageDiv.className = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}