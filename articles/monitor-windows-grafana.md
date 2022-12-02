---
title: "🔬 Monitor Windows with Grafana and Prometheus"
slug: monitor-windows-grafana
date: "2021-08-03"
tags: Technical
description: Monitor Windows 10 using Grafana and Prometheus to store logs on system wide temperatures and performance.
socialImage: images/grafana.jpg
---

This article covers the installation and configuration process of OhmGraphite to work with Prometheus and send statistics to Grafana.

### Prerequisites

- Prometheus
- Grafana
- Windows 10 with Administrator Privileges

NOTE: Administrator Privileges is required for installation.

### Getting Started

Before we begin the installation of OhmGraphite, let's first create a directory for our files to live in.

For this example, we will be storing OhmGraphite in the following directory:

```
C:\OhmGraphite\
```

### Downloading and Installing OhmGraphite

We will be using OhmGraphite as our statistic exporter. Head on over to: https://github.com/nickbabcock/OhmGraphite/releases/latest to grab the latest version.

Once you have downloaded the Zip folder, extract it and place the contents in the folder we created earlier.

Now let's edit the `OhmGraphite.exe.config` file to set it up to work with Prometheus.

Replace the contents of the file with the following code:

```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <appSettings>
    <add key="type" value="prometheus" />
    <add key="prometheus_port" value="4445" />

    <!-- This is the host that OhmGraphite listens on.
         `*` means that it will listen on all interfaces.
         Consider restricting to a given IP address -->
    <add key="prometheus_host" value="*" />
  </appSettings>
</configuration>
```

Save and close the file.

NOTE: You can edit this file at any time, but you will need to restart the application for the changes to make effect.

Open a Powershell window in Administrator mode and enter the following command:

```
C:\OhmGraphite\OhmGraphite.exe run
```

Next, run the following command to install OhmGraphite as service that starts on boot:

```
C:\OhmGraphite\OhmGraphite.exe install
```

After installation, run the following command to start OhmGraphite:

```
C:\OhmGraphite\OhmGraphite.exe start
```

OhmGraphite has been successfully setup and is ready to go! Now let's configure Prometheus.

### Setup Prometheus to look for OhmGraphite

In your Prometheus configuration file, add an additional job to the stack:

```
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'ohmgraphite'
    static_configs:
    - targets: ['10.0.0.200:4445']
```

Once this has been added, restart Prometheus. OhmGraphite will now be picked up by Prometheus and be ready to serve to Grafana.

### Grafana Dashboard

In your Grafana installation, import a new dashboard with the following code `11587`.

This dashboard is pre-configured to look for OhmGraphite export by Prometheus.

The graphs should auto-populate with statistics as they roll in.

### Conclusion

If you have any questions or think I could have taken a better
approach, let me know! Feel free to reach out in the comments below or
reach out to me via [email](mailto:zacchary@puckeridge.me).
