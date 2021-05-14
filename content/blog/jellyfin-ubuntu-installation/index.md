---
title: "🎬 Install Jellyfin on Ubuntu"
slug: install-jellyfin-ubuntu
date: 2019-11-28
tags: Technical
readingTime: 10 minutes
description: This article details the steps requried to get Jellyfin, an Open Source Media Library up and running on Ubuntu Server.
---

### Table of Contents
```toc

```

Jellyfin is an open source media library management and streaming platform, similar to [Plex](https://www.plex.tv/). This document will guide you through the process of installing and configuring Jellyfin on your Server running Ubuntu.

---
## Install Jellyfin

1.  Run updates and upgrade packages:

        sudo apt-get update && sudo apt-get upgrade

2.  Install and enable HTTPS transport for APT:

        sudo apt install apt-transport-https

3.  Enable the Universe repository for all of the ffmpeg dependencies:

        sudo add-apt-repository universe

4.  Import the GPG signing keys for Jellyfin:

        wget -O - https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | sudo apt-key add -

5.  Run the following command to create the jellyfin.list file:

        sudo touch /etc/apt/sources.list.d/jellyfin.list

6.  Add the Jellyfin apt repository to the server:

        echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/ubuntu $( lsb_release -c -s ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list

7.  Run updates and upgrade packages:

        sudo apt update && sudo apt install jellyfin

---

## Configure Jellyfin

1. Open a Web Browser and navigate to `http://<your-ip>:8096/`
2. Proceed through the rest of the setup leaving everything on default.
3. Once configured, navigate to the **Network **Tab under **Settings.**

4. Update your Base URL to the URL you wish to access Jellyfin from. Change the Secure connection mode to **Handled by reverse proxy **and ensure that **Enable automatic port mapping** is ticked. Save the changes.

---

## Create a Reverse Proxy

This reverse proxy will be setup through Apache.

1.  Install Apache with the following command:

        sudo apt install apache2

2.  Enable proxy settings for Apache with the following commands:

        sudo a2enmod proxy
        sudo a2enmod proxy_http

3.  Open a new virtual host file for the reverse proxy. Replace 'example.com' with the domain name to be setup.

        sudo nano /etc/apache2/sites-available/jellyfin.example.com.conf

Past the following Apache virtual host configuration in the file. Replace jellyfin.example.com with the domain/sub-domain to be setup.

    <VirtualHost *:80>
        ServerName DOMAIN_NAME

        # Uncomment for HTTP to HTTPS redirect
        # Redirect permanent / https://DOMAIN_NAME

        ErrorLog /var/log/apache2/DOMAIN_NAME-error.log
        CustomLog /var/log/apache2/DOMAIN_NAME-access.log combined
    </VirtualHost>

    # Uncomment this section after you have acquired a SSL Certificate
    # If you are not using a SSL certificate, replace the 'redirect'
    # line above with all lines below starting with 'Proxy'
    #<IfModule mod_ssl.c>
    #<VirtualHost *:443>
    #    ServerName DOMAIN_NAME
    #
    #    ProxyPreserveHost On
    #
    #    ProxyPass "/socket" "ws://SERVER_IP_ADDRESS:8096/socket"
    #    ProxyPassReverse "/socket" "ws://SERVER_IP_ADDRESS:8096/socket"
    #
    #    ProxyPass "/" "http://SERVER_IP_ADDRESS:8096/"
    #    ProxyPassReverse "/" "http://SERVER_IP_ADDRESS:8096/"
    #
    #    SSLEngine on
    #    SSLCertificateFile /etc/letsencrypt/live/DOMAIN_NAME/fullchain.pem
    #    SSLCertificateKeyFile /etc/letsencrypt/live/DOMAIN_NAME/privkey.pem
    #    Protocols h2 http/1.1
    #
    #    ErrorLog /var/log/apache2/DOMAIN_NAME-error.log
    #    CustomLog /var/log/apache2/DOMAIN_NAME-access.log combined
    #</VirtualHost>
    #</IfModule>

4.  Enable the configuration file:

        sudo a2ensite jellyfin.example.com.conf

5.  Restart Apache to fully enable the new settings:

        sudo systemctl restart apache2

---

## Setup Let's Encrypt

1.  Ensure Ports 80 and 443 have been opened by your ISP. Ensure that you have not applications that are exposed to Ports 80 and 443 that have security vulnerabilities. Open Ports 80 and 443 on your router.

2.  Install Certbot for Apache using the following command:

        sudo apt install python3-certbot-apache

3.  Run the following command to obtain and install a Let's Encrypt Certificate. Make sure to replace your email and domain in place of the example below:

        sudo certbot --apache --agree-tos --redirect --hsts --staple-ocsp --email you@example.com -d jellyfin.example.com

4.  Once installed successfully, open up your Apache Config File for Jellyfin and uncomment the lines pertaining to the SSL Certificate. Save the file and run the following command:

        sudo systemctl restart apache2

5.  Navigate to your chosen domain. Your Jellyfin instance should be successfully secured.

You will now be able to access your Jellyfin instance using your domain with Let's Encrypt.

## Conclusion

Jellyfin is a great system for storing movies and performing playback for a large library of media. With it's exceptionally simply installation process, I can see myself using this application long into the future.

If you have any questions or think I could have taken a better approach, let me know! Feel free to reach out in the comments below or reach out to me via [email](mailto:zacchary@puckeridge.me).
