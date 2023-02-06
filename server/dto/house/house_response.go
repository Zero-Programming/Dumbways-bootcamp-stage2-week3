package housesdto

import (
	"gorm.io/datatypes"
)

type HouseResponse struct {
	ID        int            `json:"id"`
	Name      string         `json:"name"`
	CityName  string         `json:"city_name"`
	Address   string         `json:"address" `
	Price     int            `json:"price"`
	TypeRent  string         `json:"type_rent"`
	Amenities datatypes.JSON `json:"amenities" `
	Bedroom   int            `json:"bedroom" `
	Bathroom  int            `json:"bathroom" `
	Image     string         `json:"image"`
}
