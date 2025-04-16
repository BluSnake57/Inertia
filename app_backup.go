package main

import (
	"log"
	"os"
	"strings"
)

var app_directory = "/usr/share/applications"

// Don't need this at the moment but may be neccesary if I want to return a list of what was backed up and to where
// It will also be neccesary when it comes to saving the metadata for the backup
type App_Element struct {
	Name         string `json:"name"`
	Restore_Path string `json:"restore_path"`
	Backup_Path  string `json:"backup_path"`
}

func (a *App) Get_App_List() []string {
	apps, err := os.ReadDir(app_directory)
	if err != nil {
		log.Println(err.Error())
		return nil
	}

	var app_list []string

	for _, e := range apps {
		app_list = append(app_list, strings.Split(e.Name(), "/")[0])
	}

	return app_list
}
