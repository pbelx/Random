# ~/.bashrc: executed by bash(1) for non-login shells.

# Note: PS1 and umask are already set in /etc/profile. You should not
# need this unless you want different defaults for root.
# PS1='${debian_chroot:+($debian_chroot)}\h:\w\$ '
# umask 022

# You may uncomment the following lines if you want `ls' to be colorized:
# export LS_OPTIONS='--color=auto'
# eval "`dircolors`"
# alias ls='ls $LS_OPTIONS'
# alias ll='ls $LS_OPTIONS -l'
# alias l='ls $LS_OPTIONS -lA'
#
# Some more alias to avoid making mistakes:
# alias rm='rm -i'
# alias cp='cp -i'
# alias mv='mv -i'
alias cl='clear'
alias na='nano'
alias ll='ls -l'
alias nn='netstat -antp'
alias ns='netstat -antp | grep TEN'
alias py='python'
alias gl='ping goo.gl'
alias ww='python -m SimpleHTTPServer'
alias ifc='/sbin/ifconfig'
alias px='proxychains'
#export GOPATH="$HOME/golang/"
export GOROOT=/usr/local/go
export GOPATH=$HOME/
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64/
export JAVA_JDK=/usr/lib/jvm/java-1.8.0-openjdk-amd64/
export ANDROID_HOME=/home/coder/Android/tools/
