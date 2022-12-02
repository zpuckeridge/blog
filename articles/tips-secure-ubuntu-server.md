---
title: "🔐 Ubuntu Server Security Tips"
slug: tips-secure-ubuntu-server
date: "2021-05-31"
tags: Technical
description: While Ubuntu is generally secure, there are additional steps that
  need to be taken to ensure you are putting up a decent fight against
  exploits.
socialImage: images/security.jpg
---

While Ubuntu is generally secure, there are additional steps that need
to be taken to ensure you are putting up a decent fight against
exploits.

### Prerequisites:

To follow along with this guide, you'll need:

- A Remote Development Server (to make your own, check out our
  [article](/setup-remote-development-server/))

### Setting up a Basic Firewall

Ubuntu includes a firewall service called UFW (Uncomplicated FireWall)
to make sure only specified connections to certain applications are
allowed. This helps prevent vulnerabilities and outside attacks.

Before we enable the firewall, we need to allow the SSH application
through the firewall:

```bash
sudo ufw allow OpenSSH
```

Now, we can enable the firewall:

```bash
sudo ufw enable
```

To check that the firewall is up and running, type:

```bash
sudo ufw status
```

The output should appear as the following:

```bash
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere
```

Close your current terminal and login to your server using the newly
created user:

```bash
ssh example@server_ip
```

### Change Default SSH Port

It’s recommended to change the SSH Port from the default port of 22 as
it is a common attack vector for brute force attacks. We'll use 2222
here but the more random, the more it will significantly reduce the
number of brute-force attacks on the server.

Firstly, allow the port you have selected through the firewall:

```bash
sudo ufw allow 2222/tcp
```

Run the following the command to open the SSH Configuration file:

```bash
sudo nano /etc/ssh/sshd_config
```

Uncomment the following line by removing the hash symbol and update
the port number:

```bash
#Port 22
```

Update it to look like the following:

```bash
Port 2222
```

Press CTRL + S to save the file, then press CTRL + X to exit the file.

Restart the SSH server:

```bash
systemctl restart sshd
```

### Install and Configure Fail2Ban

Fail2Ban is a intrusion prevention software that stops brute-force
attacks on your server. It's highly recommend that you install this on
your server especially if you are using a cloud based service.

Run the following command to install Fail2Ban

```bash
sudo apt install fail2ban
```

Start Fail2Ban and ensure that it starts on boot:

```bash
systemctl start fail2ban systemctl enable fail2ban
```

Confirm that Fail2Ban is running and check its active jails with the following command:

```bash
fail2ban-client status
```

The output should appear as the following:

```bash
Status
|- Number of jail: 1
`- Jail list: sshd
```

You have successfully installed and configured Fail2Ban on your
server.

### Conclusion

If you have any questions or think I could have taken a better
approach, let me know! Feel free to reach out in the comments below or
reach out to me via [email](mailto:zacchary@puckeridge.me).
