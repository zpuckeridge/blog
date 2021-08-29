---
title: '🔮 How to add comments to Gatsby with Utteranc.es'
slug: add-comments-gatsby
date: 2021-05-07
tags: Gatsby
description:
  Gatsby doesn’t provide any commenting tools by default, so let's add
  our own! This article details the steps required to get utteranc.es
  setup with your Gatsby blog.
---

```toc

```

Gatsby doesn't provide any commenting tools by default, so we will be
adding our own open-source alternative! This article details the steps
required to get utteranc.es setup with your Gatsby blog.

### Prerequisites

The following article assumes that you some general knowledge in the
following areas:

- Git

### What is utteranc.es?

Well, simply put, it's a commenting system built using GitHub's issue
tracking. After users have authenticated with their GitHub account,
they can leave comments on your site. Each post will appear as its own
issue and the comments will appear as GitHub comments on that issue.

This solution is fantastic if your blog is read by other developers,
as they are more likely to have GitHub accounts. However, if your blog
is more general purpose, you may want to consider the use of Disqus or
GraphComment.

### Setting up utteranc.es

First of all, we need to create a new public GitHub repository for our
comments. Since my comments are primarily for my blog, I named my
repository `blog-comments`.

Now, head on over to the
[utteranc.es GitHub app](https://github.com/apps/utterances) and
install that onto your newly created repository.

### Add the utteranc.es component to your Gatsby blog

The default script provided by utteranc.es in their documentation
simply won't cut it since we are using React. Instead, we need to
create a new component.

Simply add `comments.js` as a new file to your `../components/` folder
and paste the following code:

[Shoutout to Emma Goto's blog here!](https://www.emgoto.com/gatsby-comments/)

```js {9}
import React, { useEffect } from 'react'

const COMMENTS_ID = 'comments-container'

const Comments = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute(
      'repo',
      'YOUR-GITHUB-USERNAME/YOUR-REPOSITORY'
    )
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'dark-blue')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    // This function will get called when the component unmounts
    // To make sure we don't end up with multiple instances of the comments component
    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [])

  return <div id={COMMENTS_ID} />
}

export default Comments
```

<blockquoteInfo>
Be sure to change the `repo` line to reflect your own comments repository!
</blockquoteInfo>

Now that we've successfully created our new component, let's add it to
our blog post template!

Be sure to add the following line to your import list:

```js
import Comments from '../components/comments'
```

and place the following line of code wherever you want your comments
to show up!

```js
<Comments />
```

Save that file and head on over to your site to try out your comment
section!

### Conclusion

Using utteranc.es as a comments provider is a quick and simple
solution that doesn't rely on the infrastructure of a company out to
make money, for example, Disqus.

If you have any questions or think I could have taken a better
approach, let me know! Feel free to reach out in the comments below or
reach out to me via [email](mailto:zacchary@puckeridge.me).
