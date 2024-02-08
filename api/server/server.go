package server

import (
	"359/ports"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Server struct {
	handler ports.Handler
}

func NewService(handler ports.Handler) *Server {
	return &Server{handler: handler}
}

// Initialize initializes the server and sets up the endpoints.
func (server *Server) Initialize() {
	app := fiber.New()
	app.Use(cors.New())

	// Login endpoints
	login := app.Group("/login")
	login.Post("/", server.handler.Login) // Handle user login

	// User endpoints
	users := app.Group("/users")
	users.Get("/", server.handler.GetUsers)               // Get all users
	users.Get("/perType", server.handler.GetUsersPerType) // Get users per type
	users.Post("/", server.handler.Register)              // Register a new user
	users.Put("/:id", server.handler.UpdateUser)          // Update a user
	users.Get("/:id", server.handler.GetUser)             // Get a user by ID
	users.Delete("/:id", server.handler.DeleteUser)       // Delete a user by ID
	users.Post("/:id/review", server.handler.ReviewBook)  // Post a review for a book

	// Book endpoints
	books := app.Group("/books")
	books.Get("/", server.handler.GetBooks)             // Get all books
	books.Get("/perUni", server.handler.GetBooksPerUni) // Get books per university
	books.Get("/:id", server.handler.GetBook)           // Get a book by ID
	books.Post("/", server.handler.SaveBook)            // Save a new book
	books.Put("/:id", server.handler.UpdateBook)        // Update a book
	books.Delete("/:id", server.handler.DeleteBook)     // Delete a book

	log.Fatal(app.Listen(":3000"))
}
