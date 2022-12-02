---
title: "👾 Use OBS with CS:GO in 4:3 Stretched"
slug: use-obs-with-csgo-stretched
date: "2022-11-12"
tags: Gaming
description: A whacky problem with a simple solution which doesn't lower your trust rating!
socialImage: images/csgo.jpg
---

A problem myself and many others have faced when trying to record or stream CS:GO with OBS is that it doesn't seem to hook into 4:3 resolutions quite well. I originally resorted to using "-allow_third_party_software" in my launch options to get around this issue, but after facing some very sketchy accounts in matchmaking, I decided it wasn't worth it and have sought out a different solution.

See this post from Steam as to why you might want to avoid using it:
https://help.steampowered.com/en/faqs/view/09A0-4879-4353-EF95

Please note that the solution below is a workaround. Depending on your hardware and your configuration, you may notice hitching or stuttering in your OBS stream or recording. I have not experienced this as yet, but it is a possibility. Other disadvantages will include that your Steam overlay will be visible and using ALT+TAB to switch windows without changing your scene, will show your entire screen.

If you're okay with all that, read on!

To get started, lets open OBS and select the plus button under the sources section.
![](/images/obs-0.png)

In the drop down menu, select "Display Capture". Leave all settings as default and save the new source by selecting "OK".
![](/images/obs-1.png)
![](/images/obs-2.png)
![](/images/obs-3.png)

Then, right click on the new source and select "Filters".
![](/images/obs-4.png)

Add a new filter from the drop down menu called "Scaling/Aspect Ratio".
![](/images/obs-5.png)

Set the Resolution of the new filter to your current monitor resolution, for me this would be 2560x1440. Once set, select the "Close" button.
![](/images/obs-6.png)

From here, you're good to go! This fix works without the use of "-allow_third_party_software".
