package database

import (
	"fmt"
	"housy/models"
	"housy/pkg/mysql"
)

// Automatic Migration if Running App
func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.House{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
