package repositories

import (
	"359/domain"
)

func (db *Db) SaveUser(user *domain.User) error {
	err := db.Model(user).Create(user).Error
	if err != nil {
		return err
	}
	return nil
}

func (db *Db) UpdateUser(user *domain.User) error {
	return db.Model(user).Updates(user).Error
}

func (db *Db) GetUsers() ([]domain.User, error) {
	var users []domain.User
	err := db.Find(&users).Error
	return users, err
}

func (db *Db) GetUser(user *domain.User) error {
	return db.Model(user).Preload("Address").Preload("Paso").Find(user).Error
}

func (db *Db) DeleteUser(user *domain.User) error {
	return db.Delete(&domain.User{Id: user.Id}).Error
}

func (db *Db) Login(login *domain.LoginResp) (*domain.User, error) {
	user := &domain.User{}
	err := db.
		Model(&domain.User{}).
		Preload("Address").
		Preload("Paso").
		Where("username = ?", login.Username).
		Where("password = ?", login.Password).
		Find(&user).Error
	return user, err
}

func (db *Db) GetUserPerUserType(groupField string) ([]domain.UserPerType, error) {
	var results []domain.UserPerType

	err := db.
		Model(&domain.User{}).
		Select(groupField+" as group", "COUNT(*) as total_users").
		Group(groupField).
		Scan(&results).
		Error

	if err != nil {
		return nil, err
	}

	return results, nil
}
