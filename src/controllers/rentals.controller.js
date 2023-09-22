import db from "../database/database.connection.js"

export async function getRentals(req, res) {
   const body = req.body;

    try {
        const rental = await db.query(`SELECT rentals.*,  FROM `);
        console.log(rental.rows)
        
        
        
        
        
        /*const attRentals = [];
        rentals.rows.map((rental, index) => {
        const rent = 
                {
                  id: rentals.rows[index].id,
                  customerId: rentals.rows[index].customerId,
                  gameId: rentals.rows[index].gameId,
                  rentDate: rentals.rows[index].rentDate,
                  daysRented: rentals.rows[index].daysRented,
                  returnDate: rentals.rows[index].returnDate, 
                  originalPrice: rentals.rows[index].originalPrice,
                  delayFee: rentals.rows[index].delayFee,
                  customer: {
                   id: 1,
                   name: 'João Alfredo'
                  },
                  game: {
                    id: 1,
                    name: 'Banco Imobiliário'
                  }
                }
        attRentals.push(rent)
    })*/

        
        res.send(rentals.rows).status(201)
   } catch (err) {
        res.status(500).send(err.message)
   }
}

export async function postRentals(req, res) {
    const body = req.body
    const dataObject = { data: new Date().toISOString().split('T')[0] };

    try {
        const verifyCustumer = await db.query(`SELECT * 
        FROM customers WHERE id = $1;`, 
        [body.customerId])

        const verifyGame = await db.query(`SELECT * 
        FROM games WHERE id = $1;`, 
        [body.gameId])

        if (verifyCustumer.rowCount == 0) return res.status(400).send();
        if (verifyGame.rowCount == 0) return res.status(400).send();
        

        const gamePrice = await db.query(`SELECT "pricePerDay" 
        FROM games WHERE id = $1;`,
        [body.gameId])

        const aux = {
            rentDate: dataObject.data,
            returnDate: null,
            delayFee: null,
            originalPrice: body.daysRented * gamePrice.rows[0].pricePerDay
        }
        
        await db.query(`INSERT INTO 
        rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [body.customerId, body.gameId, aux.rentDate, body.daysRented, aux.returnDate, aux.originalPrice, aux.delayFee])

        res.send().status(201)
   } catch (err) {
        res.status(500).send(err.message)
   }
}

export async function postFinishRental(req, res) {
    res.send().status(201)
}

export async function deleteRental(req, res) {
    res.send().status(201)
}

