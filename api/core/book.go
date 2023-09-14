package core

import (
	"359/domain"
	"fmt"
)

func (srv *Service) GetBooks(pagin *domain.BookPagin) (*domain.BookResponse, error) {
	return srv.db.GetBooks(pagin)
}

func (srv *Service) SaveBook(book *domain.Book) *domain.Response {
	resp := &domain.Response{}
	err := srv.db.SaveBook(book)
	if err != nil {
		resp.StatusCode = 400
		resp.Message = fmt.Sprintf("Couldnt create book : %v", err)
		return resp
	}
	resp.StatusCode = 200
	return resp
}

func (srv *Service) UpdateBook(book *domain.Book) *domain.Response {
	resp := &domain.Response{}
	err := srv.db.UpdateBook(book)
	if err != nil {
		resp.StatusCode = 400
		resp.Message = fmt.Sprintf("Couldnt update book : %v", err)
		return resp
	}
	resp.StatusCode = 201
	return resp
}

func (srv *Service) GetBook(book *domain.Book) (*domain.Book, *domain.Response) {
	resp := &domain.Response{}
	err := srv.db.GetBook(book)
	if err != nil {
		resp.StatusCode = 400
		resp.Message = fmt.Sprintf("Couldnt get book : %v", err)
		return book, resp
	}
	resp.StatusCode = 200
	return book, resp
}

func (srv *Service) DeleteBook(book *domain.Book) *domain.Response {
	resp := &domain.Response{}
	err := srv.db.DeleteBook(book)
	if err != nil {
		resp.StatusCode = 400
		resp.Message = fmt.Sprintf("Couldnt delete book : %v", err)
		return resp
	}
	resp.StatusCode = 200
	resp.Message = "Deleted book successfully"
	return resp
}

func (srv *Service) GetBooksPerUni(group string) ([]domain.BooksPerUni, *domain.Response) {
	resp := &domain.Response{}

	books, err := srv.db.GetBooksPerUni(group)
	if err != nil {
		resp.StatusCode = 400
		resp.Message = fmt.Sprintf("Couldn't get book: %v", err)
		return books, resp
	}

	resp.StatusCode = 200
	return books, resp
}
