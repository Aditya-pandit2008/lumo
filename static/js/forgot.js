const forgotForm = document.getElementById('forgotForm');
const resetBtn = document.getElementById('resetBtn');
const messageDiv = document.getElementById('message');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

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

forgotForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    clearMessage();

    if (!email || !password || !confirmPassword) {
        showMessage('Please fill in all fields.', 'error');
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

    resetBtn.disabled = true;
    resetBtn.textContent = 'Resetting...';

    try {
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, confirmPassword })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message || 'Password reset successful. You may now login.', 'success');
            resetBtn.textContent = 'Reset complete';
            setTimeout(() => {
                window.location.href = '/login';
            }, 1400);
        } else {
            showMessage(data.error || 'Reset failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        showMessage('Network/server error. Please try again.', 'error');
    } finally {
        resetBtn.disabled = false;
        resetBtn.textContent = 'Reset password';
    }
});

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
