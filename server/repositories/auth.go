package repositories

import (
	"housy/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	SignUp(user models.User) (models.User, error)
	SignIn(username string) (models.User, error)
	Getuser(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) SignUp(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) SignIn(username string) (models.User, error) {
	var user models.User
	err := r.db.Where("username = ?", username).First(&user).Error
	return user, err
}

func (r *repository) Getuser(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}
