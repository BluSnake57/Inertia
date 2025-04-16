package main

import (
	"encoding/json"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	cp "github.com/otiai10/copy"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

var backup_path = "Backup/"
var backup_config_file = "backup_config.json"
var backup_storage_directory = strings.Fields(time.Now().Format("2006-01-02"))[0] + "/"
var directory_wg sync.WaitGroup

type Backup_Result struct {
	id      int
	success bool
}

type Backup_Config struct {
	Backup_Path  string `json:"backup_path"`
	Restore_Path string `json:"restore_path"`
}

func (a *App) Pick_Directory() string {
	var dialogOptions runtime.OpenDialogOptions
	dialogOptions.DefaultDirectory = os.Getenv("HOME")
	dialogOptions.ShowHiddenFiles = true
	path, err := runtime.OpenDirectoryDialog(a.ctx, dialogOptions)
	if err != nil {
		return ""
	}
	return path
}

func (a *App) Backup_Directories(backup_directories []string) []bool {
	var directory_backups = make(chan Backup_Result, len(backup_directories))

	for i, e := range backup_directories {
		directory_wg.Add(1)
		go backup_directory(i, e, directory_backups)
	}

	directory_wg.Wait()
	close(directory_backups)
	directory_results := make([]bool, len(directory_backups))

	for i := 0; i < len(directory_backups); i++ {
		backup := <-directory_backups
		directory_results[backup.id] = backup.success
	}

	save_backup_config(backup_directories)

	return directory_results
}

func backup_directory(id int, path string, directory_backups chan<- Backup_Result) {
	defer directory_wg.Done()
	var backup_result Backup_Result
	backup_result.id = id
	log.Println(strings.Split(path, "/")[len(strings.Split(path, "/"))-1])
	err := cp.Copy(path, backup_path+backup_storage_directory+strings.Split(path, "/")[len(strings.Split(path, "/"))-1])
	if err != nil {
		log.Println(err.Error())
		backup_result.success = false
	} else {
		backup_result.success = true
	}

	directory_backups <- backup_result
}

func save_backup_config(backup_directories []string) bool {
	var backup_configs []Backup_Config

	os.Create(backup_path + backup_storage_directory + backup_config_file)

	for _, e := range backup_directories {
		var backup_config Backup_Config
		backup_config.Backup_Path = backup_path + backup_storage_directory + strings.Split(e, "/")[len(strings.Split(e, "/"))-1]
		backup_config.Restore_Path = e
		backup_configs = append(backup_configs, backup_config)
	}

	log.Println(backup_configs)

	json_config, err := json.Marshal(backup_configs)
	if err != nil {
		log.Println(err.Error())
		return false
	}

	log.Println(string(json_config))

	config_file, err := os.Create(backup_path + backup_storage_directory + backup_config_file)
	if err != nil {
		log.Println(err.Error())
		return false
	}
	defer config_file.Close()

	config_file.Write(json_config)

	return true
}
