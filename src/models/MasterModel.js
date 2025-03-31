import QueryBuilder from "../config/QueryBuilder.js";

class MasterModel {
    constructor() {
        this.queryBuilder = new QueryBuilder();
    }
    async selectAll(table, columns = '*'){
        try {
            return await this.queryBuilder
                .selectAll(table, columns)
                .execute();
        } catch (error) {
            throw error;
        }
    }
    async selectByField(table, field, value, columns = '*'){
        try {
            return await this.queryBuilder
                .selectByField(table, field, value, columns)
                .execute();
        } catch (error) {
            throw error;
        }
    }
    async insert(table, data){
        try {
            return await this.queryBuilder
            .insert(table, data)
            .execute();
        } catch (error) {
            throw error;
        }
    }
    async updateByField(table, updateData, field, value){
        try {
            return await this.queryBuilder
                .updateByField(table, updateData, field, value)
                .execute()
        } catch (error) {
            throw error;
        }
    }
    async deleteByField(table, field, value){
        try {
            return await this.queryBuilder
            .deleteByField(table, field, value)
            .execute();
        } catch (error) {
            throw error;
        }
    }
    async selectByFieldExcludingId(table, field, value, id, columns = '*'){
        try {
            return await this.queryBuilder
            .selectByFieldExcludingId(table, field, value, id, columns)
            .execute();
        } catch (error) {
            throw error;
        }
    }
}// End Class

export default MasterModel;