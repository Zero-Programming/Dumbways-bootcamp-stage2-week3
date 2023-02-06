// package models

// import "time"

// // User model struct
// type User struct {
// 	ID         int       `json:"id"`
// 	Fullname   string    `json:"fullname" gorm:"type: varchar(255)"`
// 	Username   string    `json:"username" gorm:"type: varchar(255)"`
// 	Email      string    `json:"email" gorm:"type: varchar(255)"`
// 	Password   string    `json:"password" gorm:"type: varchar(255)"`
// 	ListAsRole string    `json:"listAsRole" gorm:"type: varchar(225)"`
// 	Gender     string    `json:"gender" gorm:"type: varchar(255)"`
// 	Phone      string    `json:"phone" gorm:"type: varchar(255)"`
// 	Address    string    `json:"address" gorm:"type: varchar(225)"`
// 	Image      string    `json:"image" gorm:"type: varchar(255)"`
// 	CreatedAt  time.Time `json:"-"`
// 	UpdatedAt  time.Time `json:"-"`
// }

// type UserProfileResponse struct {
// 	ID         int    `json:"id"`
// 	Fullname   string `json:"fullname"`
// 	Username   string `json:"username"`
// 	Email      string `json:"email"`
// 	Password   string `json:"password"`
// 	ListAsRole string `json:"listAsRole"`
// 	Gender     string `json:"gender"`
// 	Phone      string `json:"phone"`
// 	Address    string `json:"address"`
// 	Image      string `json:"image"`
// }

// func (UserProfileResponse) TableName() string {
// 	return "users"
// }

package models

import "time"

type User struct {
	ID         int       `json:"id"`
	Fullname   string    `json:"fullname" gorm:"type: varchar(255)"`
	Email      string    `json:"email" gorm:"type: varchar(255)"`
	Password   string    `json:"-" gorm:"type: varchar(255)"`
	Username   string    `json:"username" gorm:"type: varchar(255)"`
	ListAsRole string    `json:"listAsRole" gorm:"type: varchar(225)"`
	Address    string    `json:"addres" gorm:"type: varchar(225)"`
	Gender     string    `json:"gender" gorm:"type: varchar(225)"`
	Phone      string    `json:"phone" gorm:"type: varchar(225)"`
	CreatedAt  time.Time `json:"-"`
	UpdatedAt  time.Time `json:"-"`
}

type UsersProfileResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
