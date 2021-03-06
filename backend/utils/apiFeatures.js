class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword  = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}    
        this.query = this.query.find({...keyword})
        return this;
    }
    filter() {
        const queryCopy = {...this.queryStr}
        //removing fields from the query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);
        this.query.find({...queryCopy});
        return this;
    }
    paginaiton(resPerpage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerpage * (currentPage - 1);
        this.query = this.query.limit(resPerpage).skip(skip);
        return this;
    }
}   

module.exports = APIFeatures;