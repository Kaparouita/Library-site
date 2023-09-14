package domain

import (
	"time"
)

type User struct {
	Id          uint      `json:"id" gorm:"primaryKey"`
	CreatedAt   time.Time `json:"created_at"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	Username    string    `json:"username" gorm:"uniqueIndex"`              // Username (un)
	Password    string    `json:"password"`                                 // Password (confirm)
	Email       string    `json:"email" gorm:"uniqueIndex"`                 // Email (un)
	Paso        Paso      `json:"paso" gorm:"constraint:OnDelete:CASCADE;"` // Paso (un)
	Gender      string    `json:"gender"`
	UserType    string    `json:"user_type"` // Type (admin/user/bookAdmin)
	StudentType string    `json:"student_type"`
	University  string    `json:"university"`
	Appartment  string    `json:"appartment"`
	Address     Address   `json:"address" gorm:"constraint:OnDelete:CASCADE;"`
	Phone       string    `json:"phone"`
	URL         string    `json:"url"` // URL (fb / insta)
	Response
}

type Paso struct {
	Id        uint      `json:"id" gorm:"primaryKey"`
	UserId    string    `json:"user_id"`
	UnNumber  uint      `json:"un_number" gorm:"uniqueIndex"`
	CreatedAt time.Time `json:"created_at"`
	EndAt     time.Time `json:"end_at"`
}

type Address struct {
	Id      uint   `json:"id" gorm:"primaryKey"`
	UserId  string `json:"user_id"`
	Town    string `json:"town"`
	Country string `json:"country"`
	Road    string `json:"road"`
	Number  uint   `json:"number"`
}

type UserPerType struct {
	Group      string `json:"group"`
	TotalUsers uint   `json:"total_users"`
}

type LoginResp struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
