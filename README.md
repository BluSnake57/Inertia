[!CAUTION]
This project is still in development and has extremely limited functionality, most of it does not work.

# Inertia: A Linux Backup App

## Summary

Unlike most other backup utilities this project is focused on backing up your settings be that installed packages,
application data, or other system config files. This apps focus is to get your system back to the way it was as quickly as possible.

## Backup Info

A bit more information about each of the specific backup types.

### Packages Backup

The app will create a list of all user installed packages on the system so that they can all be quickly reinstalled.

### Application Backup

Application backups are based on the systems /usr/share/applications directory and gets the app names from the .desktop files.
From there applications you wish to backup will be able to be individually selected, the applications themselves are likely going to
be reinstalled when you restore the packages so the application backup just backs up the apps user configs in .local/share/\<app name\>.
Be careful though because apps like steam store their games in these folders so it could result in a long backup and a lot of used space.
(It would likely be best to have the app tell you the size of each diretory when backing up but I'm not sure if that's possible yet)

### System Backup

This backup is much more freeform for the time being and is mostly just going to give you the ability to select directories you'd like 
to be added to your backup. You could select the Documents or Downloads folder but I'd recommend that at least until this tool is a bit
more fleshed out and I understand it's limits a bit better. This is mostly intended for files inside of the .config directory *inside* your 
home directory, please do not backup your whole .config directory I can almost promise you it'll cause something to break or be unstable.


## About Me & The Project

This is mostly just a passion project for me to get some experience with typescript and go but I wanted to make something that I'd actually
use and a backup tool to make it easier after I innevitably have to reinstall because I messed around with a directory or file I shouldn't have.
The project got its name because the goal was to get a system not just up and running but just the way I had it as quick as possible, and things
in motion want to stay in motion which is pretty much the goal of this project.