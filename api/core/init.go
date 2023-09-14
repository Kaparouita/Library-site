package core

import (
	"359/domain"
	"359/ports"
	"time"
)

type Service struct {
	db ports.Db
}

func NewService(db ports.Db) *Service {
	return &Service{db: db}
}

func (srv *Service) InitBooks() error {

	books, err := Get5Books()
	for _, book := range books {
		srv.db.SaveBook(&book)
		if err != nil {
			return err
		}
	}
	return nil
}

func (srv *Service) InitFunction() error {
	if err := srv.InitBooks(); err != nil {
		return err
	}
	if err := srv.InitUsers(); err != nil {
		return err
	}
	return nil
}

func (srv *Service) InitUsers() error {
	users := GetStartingUsers()
	for _, user := range users {
		err := srv.db.SaveUser(&user)
		if err != nil {
			continue
		}
	}
	return nil
}

func GetStartingUsers() []domain.User {
	return []domain.User{
		{
			CreatedAt: time.Now(),
			FirstName: "John",
			LastName:  "Doe",
			Username:  "johndoe",
			Password:  "password123",
			Email:     "johndoe@example.com",
			Paso: domain.Paso{
				UnNumber:  456,
				CreatedAt: time.Now(),
				EndAt:     time.Now().AddDate(1, 0, 0), // One year from now
			},
			Gender:      "Male",
			UserType:    "user",
			StudentType: "Barchelor",
			University:  "University A",
			Appartment:  "A101",
			Address: domain.Address{
				Town:    "Townsville",
				Country: "Countryland",
				Road:    "Second Street",
				Number:  456,
			},
			Phone: "123456789",
			URL:   "http://example.com",
		},
		{
			CreatedAt: time.Now(),
			FirstName: "John",
			LastName:  "Doe",
			Username:  "johndoe",
			Password:  "password123",
			Email:     "johndoe1@example.com",
			Paso: domain.Paso{
				UnNumber:  456,
				CreatedAt: time.Now(),
				EndAt:     time.Now().AddDate(1, 0, 0), // One year from now
			},
			Gender:      "Male",
			UserType:    "user",
			StudentType: "Barchelor",
			University:  "University A",
			Appartment:  "A101",
			Address: domain.Address{
				Town:    "Townsville",
				Country: "Countryland",
				Road:    "Second Street",
				Number:  456,
			},
			Phone: "123456789",
			URL:   "http://example.com",
		},
		{
			CreatedAt: time.Now(),
			FirstName: "John2",
			LastName:  "Doe2",
			Username:  "johndoe2",
			Password:  "password123",
			Email:     "johndoe2@example.com",
			Paso: domain.Paso{
				UnNumber:  4562,
				CreatedAt: time.Now(),
				EndAt:     time.Now().AddDate(1, 0, 0), // One year from now
			},
			Gender:      "Male",
			UserType:    "user",
			StudentType: "Master",
			University:  "University B",
			Appartment:  "A101",
			Address: domain.Address{
				Town:    "Townsville",
				Country: "Countryland",
				Road:    "Second Street",
				Number:  456,
			},
			Phone: "123456789",
			URL:   "http://example.com",
		},
		{
			CreatedAt: time.Now(),
			FirstName: "John3",
			LastName:  "Doe3",
			Username:  "johndoe3",
			Password:  "password123",
			Email:     "johndoe3@example.com",
			Paso: domain.Paso{
				UnNumber:  4563,
				CreatedAt: time.Now(),
				EndAt:     time.Now().AddDate(1, 0, 0), // One year from now
			},
			Gender:      "Male",
			UserType:    "user",
			StudentType: "PhD",
			University:  "University C",
			Appartment:  "A101",
			Address: domain.Address{
				Town:    "Townsville",
				Country: "Countryland",
				Road:    "Second Street",
				Number:  456,
			},
			Phone: "123456789",
			URL:   "http://example.com",
		},
		{
			CreatedAt: time.Now(),
			FirstName: "Jane",
			LastName:  "Smith",
			Username:  "janesmith",
			Password:  "pass987",
			Email:     "jane@example.com",
			Paso: domain.Paso{
				UnNumber:  123,
				CreatedAt: time.Now(),
				EndAt:     time.Now().AddDate(1, 0, 0), // One year from now
			},
			Gender:      "Female",
			UserType:    "librarian",
			StudentType: "",
			University:  "University B",
			Appartment:  "B202",
			Address: domain.Address{
				Town:    "Cityville",
				Country: "Countryland",
				Road:    "Main Street",
				Number:  123,
			},
			Phone: "987654321",
			URL:   "http://jane.example.com",
		},
		{
			CreatedAt: time.Now(),
			FirstName: "Admin",
			LastName:  "Adminson",
			Username:  "admin",
			Password:  "admin12",
			Email:     "admin@example.com",
			Paso: domain.Paso{
				UnNumber:  789,
				CreatedAt: time.Now(),
				EndAt:     time.Now().AddDate(1, 0, 0), // One year from now
			},
			Gender:      "Non-binary",
			UserType:    "admin",
			StudentType: "",
			University:  "",
			Appartment:  "",
			Address: domain.Address{
				Town:    "Villagetown",
				Country: "Countryland",
				Road:    "Third Street",
				Number:  789,
			},
			Phone: "555555555",
			URL:   "http://admin.example.com",
		},
	}
}

func Get5Books() ([]domain.Book, error) {
	books := []domain.Book{
		{
			ISBN:        "123456789",
			Title:       "The Hobbit",
			Writer:      "J.R.R. Tolkien",
			Library:     "UOC",
			Type:        "Fantasy",
			PublishDate: time.Date(1937, 9, 21, 0, 0, 0, 0, time.UTC),
			PagesNumber: 310,
			Photo:       "the_hobbit.jpg",
			BookURL:     "the_hobbit.pdf",
			Reviews: []domain.Review{
				{
					UserName: "Reader1",
					Rating:   5,
					Comment:  "Classic fantasy adventure!",
				},
			},
		},
		{
			ISBN:        "987654321",
			Title:       "Good Omens",
			Writer:      "Neil Gaiman, Terry Pratchett",
			Type:        "Comedy",
			Library:     "UOC",
			PublishDate: time.Date(1990, 5, 1, 0, 0, 0, 0, time.UTC),
			PagesNumber: 383,
			Photo:       "good_omens.jpg",
			BookURL:     "good_omens.pdf",
			Reviews: []domain.Review{
				{
					UserName: "Reader2",
					Rating:   4,
					Comment:  "Hilarious and thought-provoking!",
				},
			},
		},
		{
			ISBN:        "555555555",
			Title:       "The Great Gatsby",
			Writer:      "F. Scott Fitzgerald",
			Library:     "UOC",
			Type:        "Classic",
			PublishDate: time.Date(1925, 4, 10, 0, 0, 0, 0, time.UTC),
			PagesNumber: 180,
			Photo:       "the_great_gatsby.jpg",
			BookURL:     "the_great_gatsby.pdf",
			Reviews: []domain.Review{
				{
					UserName: "Reader3",
					Rating:   5,
					Comment:  "A masterpiece of American literature.",
				},
			},
		},
		{
			ISBN:        "999999999",
			Title:       "To Kill a Mockingbird",
			Writer:      "Harper Lee",
			Type:        "Drama",
			Library:     "National Library of Greece",
			PublishDate: time.Date(1960, 7, 11, 0, 0, 0, 0, time.UTC),
			PagesNumber: 281,
			Photo:       "to_kill_a_mockingbird.jpg",
			BookURL:     "to_kill_a_mockingbird.pdf",
			Reviews: []domain.Review{
				{
					UserName: "Reader4",
					Rating:   5,
					Comment:  "A must-read that addresses important issues.",
				},
			},
		},
		{
			ISBN:        "888888888",
			Title:       "Pride and Prejudice",
			Writer:      "Jane Austen",
			Type:        "Romance",
			Library:     "National Library of Greece",
			PublishDate: time.Date(1813, 1, 28, 0, 0, 0, 0, time.UTC),
			PagesNumber: 279,
			Photo:       "pride_and_prejudice.jpg",
			BookURL:     "pride_and_prejudice.pdf",
			Reviews: []domain.Review{
				{
					UserName: "Reader5",
					Rating:   4,
					Comment:  "A timeless classic with engaging characters.",
				},
			},
		},
	}
	return books, nil
}
