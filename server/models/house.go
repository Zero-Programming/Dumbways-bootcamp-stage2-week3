package models

import (
	"time"

	"gorm.io/datatypes"
)

type House struct {
	ID        int            `json:"id"`
	Name      string         `json:"name" gorm:"type: varchar(255)"`
	CityName  string         `json:"city_name" gorm:"type: varchar(255)"`
	Address   string         `json:"address" gorm:"type: text"`
	Price     int            `json:"price" gorm:"type: int"`
	TypeRent  string         `json:"type_rent" gorm:"type: varchar(255)"`
	Amenities datatypes.JSON `json:"amenities" gorm:"type: json"`
	Bedroom   int            `json:"bedroom" gorm:"type: int"`
	Bathroom  int            `json:"bathroom" gorm:"type: int"`
	Image     string		 `json:"image"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

func (House) TableName() string {
	return "houses"
}
