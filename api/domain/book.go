package domain

import (
	"time"
)

type Book struct {
	Id          uint `json:"id" gorm:"primaryKey"`
	CreatedAt   time.Time
	ISBN        string    `json:"isbn" gorm:"uniqueIndex"` // ISBN (un)
	Library     string    `json:"library"`
	Title       string    `json:"title"`
	Writer      string    `json:"writer"`
	Type        string    `json:"type"`
	PublishDate time.Time `json:"publish_date"` // Publish release
	PagesNumber uint      `json:"pages_number"`
	Photo       string    `json:"photo"`
	BookURL     string    `json:"book_url"`
	Reviews     []Review  `json:"reviews" gorm:"foreignKey:BookID;constraint:OnDelete:CASCADE;"`
}

type BookResponse struct {
	Books []Book `json:"books"`
	Total int64  `json:"total"`
}

type Review struct {
	Id       uint   `json:"id" gorm:"primaryKey"`
	BookID   uint   `json:"book_id"`
	UserName string `json:"user_name"`
	Rating   int    `json:"rating"`
	Comment  string `json:"comment"`
}

type BooksPerUni struct {
	Group      string `json:"group"`
	TotalBooks uint   `json:"total_books"`
}

type BookPagin struct {
	Pagin   *Pagination `json:"pagination"`
	MaxYear int         `json:"max_year"`
	MinYear int         `json:"min_year"`
}
