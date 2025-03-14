import db from './Connection.js';

class QueryBuilder {
    constructor(){
        this.query = '';
        this.values = [];
    }
    selectAll(table, columns = '*') {
        const selectedColumns = Array.isArray(columns) ? columns.join(', ') : columns;
        this.query = `SELECT ${selectedColumns} FROM ${table}`;
        this.values = [];
        return this;
    }
    selectByField(table, field, value, columns = '*') {
        const selectedColumns = Array.isArray(columns) ? columns.join(', ') : columns;
        this.query = `SELECT ${selectedColumns} FROM ${table} WHERE ${field} = ?`;
        this.values = [value];
        return this;
    }
    insert(table, data) {
        const columns = Object.keys(data).join(', ');
        const placeholder = Object.keys(data).map(() => '?').join(', ');
        this.query = `INSERT INTO ${table} (${columns}) VALUES (${placeholder})`;
        this.values = Object.values(data);
        return this;
    }
    updateByField(table, updateData, field, value) {
        const setClause = Object.entries(updateData)
            .map(([key, value]) => `${key} = ?`)
            .join(', ');
        this.query = `UPDATE ${table} SET ${setClause} WHERE ${field} = ?`;
        this.values = [...Object.values(updateData), value];
        return this;
    }
    
    deleteByField(table, field, value){
        this.query = `DELETE FROM ${table} WHERE ${field} = ?`;
        this.values = [value];
        return this; 
    }
    selectByFieldExcludingId(table, field, value, id, columns = '*'){
        const selectedColumns = Array.isArray(columns) ? columns.join(', ') : columns;
        this.query = `SELECT ${selectedColumns} FROM  ${table} WHERE ${field} = ? AND id != ?`;
        this.values = [value, id];
        return this;
    }
    async execute(){
        try {
            await db.connect();
            const pool = db.getPool();
            const [result] = await pool.query(this.query, this.values);
            this.values = [];
            return result;
        } catch (error) {
            throw error;
        }
    }
}// End class

export default QueryBuilder;