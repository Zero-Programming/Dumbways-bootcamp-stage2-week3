package transactiondto

type RequestTransaction struct {
	CheckIn       string `json:"check_in" gorm:"type: varchar(255)" validate:"required"`
	CheckOut      string `json:"check_out" gorm:"type: varchar(255)" validate:"required"`
	HouseId       int    `json:"house_id" gorm:"type: int" validate:"required"`
	UserId        int    `json:"user_id" gorm:"type: int" validate:"required"`
	Total         int    `json:"total" gorm:"type: int" validate:"required"`
	StatusPayment string `json:"status_payment" gorm:"type: varchar(255)" validate:"required"`
	Attachment    string `json:"attachment" gorm:"type: varchar(255)" validate:"required"`
}
