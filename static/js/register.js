document.addEventListener('DOMContentLoaded', () => {
    const roleSelect = document.getElementById('role-select');
    const modal = document.getElementById('register-modal');
    const closeButton = document.querySelector('.close-button');
    const registerForms = document.querySelectorAll('.register-form');
    
    roleSelect.addEventListener('change', (event) => {
        const selectedRole = event.target.value;
        
        registerForms.forEach(form => {
            form.style.display = 'none';
        });

        if (selectedRole) {
            const formToShow = document.getElementById(`${selectedRole}-form`);
            if (formToShow) {
                formToShow.style.display = 'block';
                modal.style.display = 'flex';
            }
        } else {
            modal.style.display = 'none';
        }
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        roleSelect.value = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            roleSelect.value = '';
        }
    });
});