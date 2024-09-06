import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import path from 'path'

const databaseJSON_Path = path.resolve(import.meta.dirname, 'database.json') 
class Database {
    #database = {tickets: []}
    
    constructor() {
        this.readDatabaseJSON()
    }

    updateDatabaseJSON() {
        fs.writeFile(databaseJSON_Path, JSON.stringify(this.#database))
        .catch(() => console.log('Não foi possível escrever o arquivo database.json'))
    }

    readDatabaseJSON() {
        fs.readFile(databaseJSON_Path).then(data => this.#database = JSON.parse(data))
        .catch(() => console.log('Não foi possível ler o arquivo database.json'))
    }
    
    create(table, item) {
        item = { ...item, id: randomUUID() }
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(item)
        } else this.#database[table] = [item]

        this.updateDatabaseJSON()
    }

    read(table) {
        return this.#database[table]
    }

    update(table, id, item) { 
        const index = this.#database[table].findIndex(item => item.id === id)
        this.#database[table][index] = {...this.#database[table][index], ...item}

        this.updateDatabaseJSON()

        return this.#database[table][index]
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(item => item.id === id) 
        if(index < 0) return false
        this.#database[table].splice(index, 1)

        this.updateDatabaseJSON()
    }
}

const database = new Database()

export {database}