package main

import (
	"log"
	"os"
	"os/exec"
	"slices"
	"strings"
)

var package_list_path = "package_list.txt"

func (a *App) Backup_Packages() bool {
	get_package_list := exec.Command("dnf", "repoquery", "--userinstalled")
	stdout, err := get_package_list.Output()
	if err != nil {
		log.Println(err.Error())
		return false
	}
	package_list := strings.Split(string(stdout), "\n")
	package_list = package_list[:len(package_list)-1]
	for i, e := range package_list {
		package_parts := strings.Split(e, ":")
		formatted_package := strings.Split(package_parts[0], "-")
		package_list[i] = strings.Join(formatted_package[:len(formatted_package)-1], "-")
	}
	package_list = slices.Compact(package_list)

	package_list_file, err := os.Create(backup_path + package_list_path)
	if err != nil {
		log.Println(err.Error())
		return false
	}

	package_list_file.WriteString(strings.Join(package_list, " "))
	log.Println(package_list)

	return true
}
