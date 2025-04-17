package main

import (
	"log"
	"os"
	"slices"
	"strings"
)

var app_directory = "/usr/share/applications"

// These extensions on a file will be removed to make it more readable
var extensions_to_remove = []string{"com", "org"}

// Any file with any of these strings in it will be ignored and not shown
// Purpose being is these are apps are more system apps and should be covered
// by directory backup
var apps_to_ignore = []string{"freedesktop", "gnome"}

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
		app := strings.Split(e.Name(), "/")[0]
		app_parts := strings.Split(app, ".")

		for _, j := range apps_to_ignore {
			if strings.Contains(app, j) {
				goto Next
			}
		}

		for _, j := range extensions_to_remove {
			ext := slices.Index(app_parts, j)
			if ext != -1 {
				app_parts = slices.Delete(app_parts, ext, ext+1)
			}
		}
		app_list = append(app_list, strings.Join(app_parts[:len(app_parts)-1], "."))

	Next:
	}

	return app_list
}
