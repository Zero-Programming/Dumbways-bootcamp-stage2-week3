package models

type Transaction struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment"`
	CheckIn       string `json:"check_in"`
	CheckOut      string `json:"check_out"`
	HouseId       int    `json:"house_id"`
	House         House  `json:"house"`
	UserId        int    `json:"user_id"`
	User          User   `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Total         int    `json:"total"`
	StatusPayment string `json:"status_payment"`
	Attachment    string `json:"attachment"`
}
