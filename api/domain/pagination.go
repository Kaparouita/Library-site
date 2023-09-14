package domain

type Pagination struct {
	Offset int    `json:"offset"`
	Limit  int    `json:"limit"`
	ID     int    `json:"id"`
	SortBy string `json:"sort_by"`
	Search string `json:"search"`
}
