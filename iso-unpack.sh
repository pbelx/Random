apt-get install p7zip-full
7z x Fedora-Workstation-Live-x86_64-27-1.6.iso
#search for squash fs
sudo mount -t squashfs squashfs.img /mnt/contents/
sudo mount -o loop rootfs.img /mnt/contents/
