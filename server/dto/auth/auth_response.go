package authdto

type SignUpResponse struct {
	ID         int    `json:"id" gorm:"type: int"`
	Fullname   string `json:"fullname" gorm:"type: varchar(255)"`
	Email      string `json:"email" gorm:"type: varchar(255)"`
	Password   string `json:"password" gorm:"type: varchar(255)"`
	Username   string `json:"username" gorm:"type: varchar(255)"`
	ListAsRole string `json:"listAsRole" gorm:"type: varchar(225)"`
	Gender     string `json:"gender" gorm:"type: varchar(225)"`
	Phone      string `json:"phone" gorm:"type: varchar(225)"`
	Address    string `json:"address" gorm:"type: varchar(225)"`
	Message    string `json:"message" gorm:"type: varchar(255"`
}

type SignInResponse struct {
	ID         int    `json:"id" gorm:"type: int"`
	Fullname   string `json:"fullname" gorm:"type: varchar(255)"`
	Email      string `json:"email" gorm:"type: varchar(255)"`
	Password   string `json:"password" gorm:"type: varchar(255)"`
	Username   string `json:"username" gorm:"type: varchar(255)"`
	ListAsRole string `json:"listAsRole" gorm:"type: varchar(225)"`
	Gender     string `json:"gender" gorm:"type: varchar(225)"`
	Phone      string `json:"phone" gorm:"type: varchar(225)"`
	Address    string `json:"address" gorm:"type: varchar(225)"`
	Token      string `json:"token" gorm:"type: varchar(225)"`
}

type CheckAuthResponse struct {
	ID         int    `json:"id" gorm:"type: int"`
	Fullname   string `json:"fullname" gorm:"type: varchar(255)"`
	Email      string `json:"email" gorm:"type: varchar(255)"`
	Password   string `json:"password" gorm:"type: varchar(255)"`
	Username   string `json:"username" gorm:"type: varchar(255)"`
	ListAsRole string `json:"listAsRole" gorm:"type: varchar(225)"`
	Gender     string `json:"gender" gorm:"type: varchar(225)"`
	Phone      string `json:"phone" gorm:"type: varchar(225)"`
	Address    string `json:"address" gorm:"type: varchar(225)"`
	Token      string `json:"token" gorm:"type: varchar(225)"`
}
