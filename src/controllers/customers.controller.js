import db from "../database/database.connection.js"

export async function getCustomers(req,res){

    try {
        const customers = await db.query(`SELECT * FROM customers;`);
        res.status(200).send(customers.rows);
  
      } catch (err) {
        res.status(500).send(err.message);
      }
}

export async function getCustomersById(req,res){
    const {id} = req.params

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        if(customer.rowCount == 0) return res.status(404).send("Not found");

        res.status(200).send(customer.rows);
  
      } catch (err) {
        res.status(500).send(err.message);
      }
}

export async function postCustomers(req,res){
    const customer = req.body
    
    try {
        const customers = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[customer.cpf]);
        if (customers.rowCount > 0) return res.status(409).send()
        
        await db.query(`INSERT INTO customers 
        (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);`, 
        [customer.name, customer.phone, customer.cpf, customer.birthday]);
        
        res.status(201).send();
  
      } catch (err) {
        res.status(500).send(err.message);
      }
}

export async function putCustomerById(req, res){
    const body = req.body;
    const {id} = req.params;

    try {
        const custUpdate = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [body.cpf]);    
        console.log(custUpdate.rowCount)
        if (custUpdate.rowCount > 1) return res.status(409).send();
        
        await db.query(`UPDATE customers SET 
        name = $1, phone = $2, cpf = $3, birthday = $4
        WHERE id = $5`, 
        [body.name, body.phone, body.cpf, body.birthday, id])

        res.status(200).send();
  
      } catch (err) {
        res.status(500).send(err.message);
      }
}