document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postform');
    const submitButton = document.getElementById('form-submit-btn');
    const submitEditButton = document.getElementById('form-submit-edit-btn');
    const cancelEditButton = document.getElementById('form-cancel-edit-btn');
    const usernameInput = postForm.elements.username;
    const editUsernameInput = postForm.elements.editUsername;

    function resetEditMode() {
        postForm.reset();
        postForm.elements.postId.value = '';
        editUsernameInput.value = '';
        usernameInput.disabled = false;
        submitButton.style.display = '';
        submitEditButton.style.display = 'none';
        cancelEditButton.style.display = 'none';
    }

    resetEditMode();

    postForm.addEventListener('submit', () => {
        const postId = postForm.elements.postId;

        if (!postId.value) {
            postId.value = generateBlogId();
        }

        if (usernameInput.disabled) {
            editUsernameInput.value = usernameInput.value;
        }
    });

    cancelEditButton.addEventListener('click', resetEditMode);

    document.querySelectorAll('.edit-post').forEach((editButton) => {
        editButton.addEventListener('click', function (event) {
            event.preventDefault();
            const card = this.closest('.card');
            postForm.elements.postId.value = card.dataset.id;
            document.querySelector('[name="title"]').value = card.dataset.title;
            document.querySelector('[name="tags"]').value = card.dataset.tag;
            document.querySelector('[name="username"]').value = card.dataset.author;
            document.querySelector('[name="body"]').value = card.dataset.body;
            usernameInput.disabled = true;
            submitButton.style.display = 'none';
            submitEditButton.style.display = '';
            cancelEditButton.style.display = '';
        });
    });

    document.querySelectorAll('.delete-post').forEach((deleteButton) => {
        deleteButton.addEventListener('click', function (event) {
            event.preventDefault();
            const card = this.closest('.card');
            fetch('/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ postId: card.dataset.id }),
            }).then(() => {
                window.location.reload();
            });
        });
    });
});

function generateBlogId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}