import React, { useEffect } from 'react';

const COMMENTS_ID = 'comments-container';

const Comments = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'zpuckeridge/blog-comments');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', 'dark-blue');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        const comments = document.getElementById(COMMENTS_ID);
        if (comments) comments.appendChild(script);

        // This function will get called when the component unmounts
        // To make sure we don't end up with multiple instances of the comments component
        return () => {
            const comments = document.getElementById(COMMENTS_ID);
            if (comments) comments.innerHTML = '';
        };
    }, []);

    return (
        <div id={COMMENTS_ID} />
    );
};

export default Comments;