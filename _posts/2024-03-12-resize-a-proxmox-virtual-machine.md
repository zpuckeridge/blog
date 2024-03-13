---
title: 💾 Resize a Proxmox Virtual Machine
date: 2023-03-19
tag: Technical
description: Short guide on resizing a virtual machine.
---

To increase the size of a hard disk, first power off the virtual machine, go to the `Hardware` tab, select the desired hard disk. Then, select `Resize` from the `Disk Action` drop-down menu, input the desired size increment, and select `Resize disk`.

After resize has completed, start up your virtual machine and login.

Confirm the relevant disk has increased in size.

```bash
$ lsblk
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                         8:0    0    1T  0 disk
├─sda1                      8:1    0    1M  0 part
├─sda2                      8:2    0    1G  0 part /boot
└─sda3                      8:3    0    1T  0 part
  └─ubuntu--vg-ubuntu--lv 253:0    0   31G  0 lvm  /
```

Resize the partition with `parted`.

```bash
$ sudo parted
GNU Parted 3.3
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) resizepart 3 100%
(parted) quit
Information: You may need to update /etc/fstab.
```

Extend the logical volume.

```bash
$ sudo lvextend -r -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
Size of logical volume ubuntu-vg/ubuntu-lv changed from <31.00 GiB (7935 extents) to 1.03 TiB (270079 extents).
Logical volume ubuntu-vg/ubuntu-lv successfully resized.
resize2fs 1.45.5 (07-Jan-2020)
Filesystem at /dev/mapper/ubuntu--vg-ubuntu--lv is mounted on /; on-line resizing required
old_desc_blocks = 4, new_desc_blocks = 132
The filesystem on /dev/mapper/ubuntu--vg-ubuntu--lv is now 276560896 (4k) blocks long.
```

Confirm resize is complete.

```bash
$ lsblk
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                         8:0    0    1T  0 disk
├─sda1                      8:1    0    1M  0 part
├─sda2                      8:2    0    1G  0 part /boot
└─sda3                      8:3    0    1T  0 part
  └─ubuntu--vg-ubuntu--lv 253:0    0    1T  0 lvm  /
```

🎉
