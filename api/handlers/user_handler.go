package handlers

import (
	"359/domain"
	"359/ports"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

type Handler struct {
	Srv ports.Service
}

func NewHandler(srv ports.Service) *Handler {
	return &Handler{
		Srv: srv,
	}
}

func (handler *Handler) Register(c *fiber.Ctx) error {
	user := &domain.User{}
	err := json.Unmarshal(c.Body(), &user)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	resp := handler.Srv.Register(user)
	if err != nil {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.SendStatus(resp.StatusCode)
}

func (handler *Handler) UpdateUser(c *fiber.Ctx) error {
	user := &domain.User{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err = json.Unmarshal(c.Body(), &user)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.UpdateUser(user)
	if err != nil {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.SendStatus(resp.StatusCode)
}

func (handler *Handler) GetUser(c *fiber.Ctx) error {
	user := &domain.User{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.GetUser(user)
	if err != nil {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}

func (handler *Handler) GetUsers(c *fiber.Ctx) error {
	users, err := handler.Srv.GetUsers()
	if err != nil {
		return c.Status(404).JSON("Unable to retrieve Users")
	}

	return c.Status(200).JSON(users)
}

func (handler *Handler) DeleteUser(c *fiber.Ctx) error {
	user := &domain.User{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user.Id = uint(id)

	resp := handler.Srv.DeleteUser(user)
	if err != nil {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp.Message)
}

func (handler *Handler) Login(c *fiber.Ctx) error {
	login := &domain.LoginResp{}

	err := json.Unmarshal(c.Body(), &login)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	resp := handler.Srv.Login(login)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}

func (handler *Handler) ReviewBook(c *fiber.Ctx) error {
	review := &domain.Review{}
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	user := &domain.User{Id: uint(id)}
	user = handler.Srv.GetUser(user)
	if user.StatusCode == 400 {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err = json.Unmarshal(c.Body(), &review)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	review.UserName = user.Username

	resp := handler.Srv.ReviewBook(review)
	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(resp)
}

func (handler *Handler) GetUsersPerType(c *fiber.Ctx) error {
	group := c.Query("group", "user_type")

	users, resp := handler.Srv.GetUserPerType(group)
	if resp.StatusCode == 400 {
		return c.Status(resp.StatusCode).JSON(resp.Message)
	}

	return c.Status(resp.StatusCode).JSON(users)
}
