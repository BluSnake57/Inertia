package main

import (
	"fmt"
	"log"
	"os"
	"slices"
	"strings"
)

var app_directory = "/usr/share/applications"
var home_directory = os.Getenv("HOME")
var local_app_directories = []string{home_directory + "/.", home_directory + "/.local/share/"}
var desktop_file_path_element = []byte("Exec=")

// These extensions on a file will be removed to make it more readable
var extensions_to_remove = []string{"com", "org"}

// Any file with any of these strings in it will be ignored and not shown. Purpose being is these are
// apps are more system apps and should be covered by directory backup
var apps_to_ignore = []string{"freedesktop", "gnome-software", "ibus", "gtk3"}

type AppElement struct {
	Name         string `json:"name"`
	Backup_Path  string `json:"backup_path"`
	Restore_Path string `json:"restore_path"`
}

func (a *App) Get_App_List() []string {
	apps, err := os.ReadDir(app_directory)
	if err != nil {
		log.Println(err.Error())
		return nil
	}

	var app_list []AppElement
	var app_element AppElement
	var app_name_list []string

	for _, e := range apps {

		for _, j := range apps_to_ignore {
			if strings.Contains(e.Name(), j) {
				log.Println("skipping")
				goto Next
			}
		}

		app_element = Get_App_Element(e.Name())

		if app_element.Name != "" && !slices.Contains(app_list, app_element) {
			app_list = append(app_list, app_element)
			app_name_list = append(app_name_list, app_element.Name)
		}

	Next:
	}

	log.Println(app_list)
	return app_name_list
}

func Get_App_Element(file string) AppElement {
	file_bytes, err := os.ReadFile(app_directory + "/" + file)
	var appElement AppElement
	if err != nil {
		log.Println(err.Error())
		return AppElement{}
	}

	bytes_matched := 0
	compare_start_index := 0

	for i, e := range file_bytes {
		if e == desktop_file_path_element[bytes_matched] {
			compare_start_index = i - bytes_matched
			bytes_matched++
		} else {
			compare_start_index = 0
			bytes_matched = 0
		}

		if bytes_matched == len(desktop_file_path_element) {
			log.Println("matched bytes at index: " + fmt.Sprint(compare_start_index))
			line := string(Get_Line(file_bytes[compare_start_index:]))
			directory := strings.Split(line, "=")[1]
			directory = strings.Split(directory, " ")[0]
			log.Println(directory)
			if strings.Contains(directory, "/") {
				directory_parts := strings.Split(directory, "/")
				directory = directory_parts[len(directory_parts)-1]
			}
			log.Println(directory)

			for _, j := range local_app_directories {
				_, err := os.Stat(j + directory)
				if err != nil {
					log.Println("can't find: " + j + directory)
					continue
				}

				appElement.Restore_Path = j + directory
			}

			if appElement.Restore_Path == "" {
				return AppElement{}
			}
			appElement.Name = directory
			appElement.Backup_Path = backup_path + directory
			log.Println(appElement)

			break
		}
	}

	return appElement
}

func Get_Line(data []byte) []byte {
	var line []byte
	for _, e := range data {
		if e == byte(10) {
			return line
		}
		line = append(line, e)
	}

	return []byte("")
}
