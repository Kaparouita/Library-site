package ports

import (
	"359/domain"

	"github.com/gofiber/fiber/v2"
)

type Service interface {
	InitFunction() error
	GetBooks(pagin *domain.BookPagin) (*domain.BookResponse, error)
	SaveBook(book *domain.Book) *domain.Response
	UpdateBook(book *domain.Book) *domain.Response
	GetBook(book *domain.Book) (*domain.Book, *domain.Response)
	DeleteBook(book *domain.Book) *domain.Response
	GetBooksPerUni(group string) ([]domain.BooksPerUni, *domain.Response)

	Register(user *domain.User) *domain.User
	GetUsers() ([]domain.User, error)
	UpdateUser(user *domain.User) *domain.User
	GetUser(user *domain.User) *domain.User
	DeleteUser(user *domain.User) *domain.Response
	ReviewBook(review *domain.Review) *domain.Response
	GetUserPerType(group string) ([]domain.UserPerType, *domain.Response)

	Login(login *domain.LoginResp) *domain.User
}

type Db interface {
	SaveBook(book *domain.Book) error
	GetBooks(pagin *domain.BookPagin) (*domain.BookResponse, error)
	UpdateBook(book *domain.Book) error
	GetBook(book *domain.Book) error
	DeleteBook(book *domain.Book) error
	GetBooksPerUni(groupField string) ([]domain.BooksPerUni, error)

	SaveUser(user *domain.User) error
	GetUsers() ([]domain.User, error)
	UpdateUser(user *domain.User) error
	GetUser(user *domain.User) error
	DeleteUser(user *domain.User) error
	GetUserPerUserType(groupField string) ([]domain.UserPerType, error)

	Login(login *domain.LoginResp) (*domain.User, error)
}

type Handler interface {
	SaveBook(c *fiber.Ctx) error
	UpdateBook(c *fiber.Ctx) error
	GetBook(c *fiber.Ctx) error
	GetBooks(c *fiber.Ctx) error
	DeleteBook(c *fiber.Ctx) error
	GetBooksPerUni(c *fiber.Ctx) error

	Register(c *fiber.Ctx) error
	UpdateUser(c *fiber.Ctx) error
	GetUser(c *fiber.Ctx) error
	GetUsers(c *fiber.Ctx) error
	DeleteUser(c *fiber.Ctx) error
	ReviewBook(c *fiber.Ctx) error
	GetUsersPerType(c *fiber.Ctx) error

	Login(c *fiber.Ctx) error
}
