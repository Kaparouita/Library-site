package handlers

import (
	"359/domain"
	"encoding/json"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func (handler *Handler) GetBooks(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	perPage, err := strconv.Atoi(c.Query("per_page", "10"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	maxYear, err := strconv.Atoi(c.Query("max_year", "2024"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	minYear, err := strconv.Atoi(c.Query("min_year", "0"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	sortBy := c.Query("sort_by", "id asc")
	searchBy := c.Query("search", "")
	searchBy = "%" + searchBy + "%"

	offset := 0
	if page > 0 {
		offset = (page - 1) * perPage
	}

	pagin := &domain.BookPagin{
		Pagin: &domain.Pagination{
			Offset: offset,
			Limit:  perPage,
			Search: searchBy,
			SortBy: sortBy},
		MaxYear: maxYear,
		MinYear: minYear,
	}

	books, err := handler.Srv.GetBooks(pagin)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.Status(200).JSON(books)
}

func (handler *Handler) SaveBook(c *fiber.Ctx) error {
	book := &domain.Book{}
	err := json.Unmarshal(c.Body(), &book)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	resp := handler.Srv.SaveBook(book)
	if err != nil {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.SendStatus(resp.StatusCode)
}

func (handler *Handler) UpdateBook(c *fiber.Ctx) error {
	book := &domain.Book{}

	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err = json.Unmarshal(c.Body(), &book)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	book.Id = uint(id)

	resp := handler.Srv.UpdateBook(book)
	if err != nil {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.SendStatus(resp.StatusCode)
}

func (handler *Handler) GetBook(c *fiber.Ctx) error {
	book := &domain.Book{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	book.Id = uint(id)

	book, resp := handler.Srv.GetBook(book)
	if resp.StatusCode == 400 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(book)
}

func (handler *Handler) DeleteBook(c *fiber.Ctx) error {
	book := &domain.Book{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	book.Id = uint(id)

	resp := handler.Srv.DeleteBook(book)
	if resp.StatusCode == 400 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp.Message)
}

func (handler *Handler) GetBooksPerUni(c *fiber.Ctx) error {
	group := c.Query("group", "library")

	books, resp := handler.Srv.GetBooksPerUni(group)
	if resp.StatusCode == 400 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(books)
}
