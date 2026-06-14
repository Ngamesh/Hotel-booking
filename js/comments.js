document.addEventListener('DOMContentLoaded', function () {
    const commentInput = document.getElementById('comment-input');
    const postBtn = document.getElementById('post-comment-btn');
    const commentList = document.getElementById('comment-list');

    if (!commentInput || !postBtn || !commentList) return;

    // Load comments from localStorage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
        comments.forEach(comment => {
            addCommentToDOM(comment.text, comment.timestamp);
        });
    }

    // Save comment to localStorage
    function saveComment(text, timestamp) {
        const comments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
        comments.unshift({ text, timestamp }); // add to beginning
        localStorage.setItem('blog_comments', JSON.stringify(comments));
    }

    // Create and prepend comment to the DOM
    function addCommentToDOM(text, timestamp) {
        const li = document.createElement('li');
        li.className = 'media';
        
        li.innerHTML = `
            <a href="#" class="pull-left">
                <img src="images/person.avif" alt="" class="img-circle">
            </a>
            <div class="media-body">
                <span class="text-muted pull-right">
                    <small class="text-muted">${timestamp}</small>
                </span>
                <strong class="text-danger">@Guest</strong>
                <p>
                    ${escapeHTML(text)}
                </p>
            </div>
        `;
        
        // Add to the top of the list
        commentList.insertBefore(li, commentList.firstChild);
    }

    // Basic HTML escaping to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Handle post button click
    postBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const text = commentInput.value.trim();
        if (text) {
            const timestamp = 'Just now';
            addCommentToDOM(text, timestamp);
            saveComment(text, timestamp);
            commentInput.value = ''; // clear input
        }
    });

    loadComments();
});
