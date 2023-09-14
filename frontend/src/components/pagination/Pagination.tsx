export class Pagination {
	offset: number;
	limit: number;
	sort_by: string;
	search: string;

	constructor() {
		this.offset = 0;
		this.limit = 0;
		this.sort_by = '';
		this.search = '';
	}
}

export default Pagination;
