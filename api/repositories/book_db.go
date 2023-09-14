package repositories

import (
	"359/domain"
)

func (db *Db) SaveBook(book *domain.Book) error {
	err := db.Model(book).Create(book).Error
	if err != nil {
		return err
	}
	return nil
}

func (db *Db) GetBooks(pagin *domain.BookPagin) (*domain.BookResponse, error) {
	books := &domain.BookResponse{}
	err := db.
		Model(&domain.Book{}).
		Preload("Reviews").
		Order(pagin.Pagin.SortBy).
		Offset(pagin.Pagin.Offset).
		Limit(pagin.Pagin.Limit).
		Where("type ilike ?", pagin.Pagin.Search).
		Where("extract(year from publish_date) <= ?", pagin.MaxYear).
		Where("extract(year from publish_date) >= ?", pagin.MinYear).
		Find(&books.Books).Error
	if err != nil {
		return nil, err
	}

	err = db.
		Model(&domain.Book{}).
		Where("type ilike ?", pagin.Pagin.Search).
		Where("extract(year from publish_date) <= ?", pagin.MaxYear).
		Where("extract(year from publish_date) >= ?", pagin.MinYear).
		Count(&books.Total).Error
	if err != nil {
		return nil, err
	}

	return books, nil
}

func (db *Db) UpdateBook(book *domain.Book) error {
	return db.Model(book).Updates(book).Error
}

func (db *Db) GetBook(book *domain.Book) error {
	return db.Model(book).Preload("Reviews").Find(&book).Error
}

func (db *Db) DeleteBook(book *domain.Book) error {
	return db.Where("id = ?", book.Id).Delete(&domain.Book{}).Error
}

func (db *Db) GetBooksPerUni(groupField string) ([]domain.BooksPerUni, error) {
	var results []domain.BooksPerUni

	err := db.
		Model(&domain.Book{}).
		Select(groupField+" as group", "COUNT(*) as total_books").
		Group(groupField).
		Scan(&results).
		Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
