package housesdto

import "gorm.io/datatypes"

type HouseRequest struct {
	Name      string         `json:"name" form:"name" gorm:"type: varchar(225)" validate:"required"`
	CityName  string         `json:"city_name" form:"city_name" gorm:"type: varchar(255)" validate:"required"`
	Address   string         `json:"address" form:"address" gorm:"type: text" validate:"required"`
	Price     int            `json:"price" form:"price" gorm:"type: int" validate:"required"`
	TypeRent  string         `json:"type_rent" form:"type_rent" gorm:"type: varchar(225)" validate:"required"`
	Amenities datatypes.JSON `json:"amenities" form:"amenities" gorm:"type: JSON" validate:"required"`
	Bedroom   int            `json:"bedroom" form:"bedroom" gorm:"type: int" validate:"required"`
	Bathroom  int            `json:"bathroom" form:"bathroom" gorm:"type: int" validate:"required"`
	Image     string         `json:"image" form:"image" gorm:"type: varchar(255)"`
}
