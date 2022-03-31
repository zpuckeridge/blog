---
title: '🎮 Fix Squad and Easy Anti Cheat on Linux'
slug: fix-squad-easy-anti-cheat-linux
date: 2021-07-03
tags: Gaming
description:
  Having issues with Easy Anti Cheat preventing you from playing
  online in Squad? Look no further! Here is the solution...
---

If you're anything like me, you really enjoy team based games that
rely on skill and teamwork to be successful. There are lots of games
that promise that style, but Squad has been one of those games I have
found an immense amount of enjoyment in.

Recently, I stopped dual booting Windows 10 and moved solely over to
Pop_OS! What an awesome experience it has been. 95% of everything I
used to do on Windows works perfectly seamlessly on PopOS.

Unfortunately, it's not all roses and fairies. Upon installing Squad,
I kept getting greeted by an Easy Anti Cheat error that effectively
prevented me from playing online. Of course, single player is no fun,
so I started looking online for a quick fix.

Here is the solution:

### Use `chmod 500` to lock your Temp Folder

Using the following command, lock your Temp folder with chmod 500.

```
chmod 500 ~/.steam/steam/steamapps/compatdata/393380/pfx/drive_c/users/steamuser/Temp
```

<blockquote id="blockquote-info">
Note: This directory might vary depending on where your game has been installed.
</blockquote>

That's it!

You might need to restart Steam, otherwise, you should be good to go!
