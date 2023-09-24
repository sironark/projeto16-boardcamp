import db from "../database/database.connection.js"

export async function getRentals(req, res) {
   const body = req.body;

    try {
        const games = await db.query(`SELECT games.id, games.name 
        FROM games;`);
        const rentals = await db.query(`
        SELECT * FROM rentals;`);
        const customers = await db.query(`SELECT customers.id, customers.name 
        FROM customers;`);

        const response = [...rentals.rows];
        const gamesCustomer = [...games.rows];
        const infoCustomer = [...customers.rows];

        response.map((res, i) => {
            infoCustomer.map((cus, index) => {
                if(res.customerId == cus.id){
                    res.customer = infoCustomer[index];
                }
            })
            gamesCustomer.map((game, index) =>{
                if (res.gameId == game.id){
                    res.game = gamesCustomer[index];
                }
            })
        })        
        res.send(response).status(201)
   } catch (err) {
        res.status(500).send(err.message)
   }
}

export async function postRentals(req, res) {
    const body = req.body
    const dataObject = { data: new Date().toISOString().split('T')[0] };

    try {
        if(body.daysRented < 0) return res.status(400).send();
        
        const verifyRentGames= await db.query(`SELECT rentals.id, rentals."gameId", rentals."returnDate"
        FROM rentals 
        WHERE rentals."gameId" = $1 AND rentals."returnDate" IS NULL;`,[body.gameId])

        const verifyAllIdGame = await db.query(`SELECT games."stockTotal" 
        FROM games 
        WHERE games.id = $1;`, [body.gameId])

        if(verifyRentGames.rowCount == verifyAllIdGame.rows[0].stockTotal ) return res.status(400).send();

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

        res.status(201).send()
   } catch (err) {
        res.status(500).send(err.message)
   }
}

export async function postFinishRental(req, res) {
    const {id} = req.params;
    const date1 = new Date().toISOString().split('T')[0];
    const finalDate = new Date(date1)
    
    try {
        const dateRent = await db.query(`SELECT 
        rentals."rentDate", rentals."daysRented", rentals."originalPrice", rentals."returnDate"  
        FROM rentals 
        WHERE id = $1;`,[id]);

        if (dateRent.rowCount == 0) return res.status(404).send();
        if (dateRent.rows[0].returnDate != null) return res.status(400).send()
        
        const date2 = (dateRent.rows[0].rentDate.toISOString().split('T')[0]);
        const initialDate = new Date(date2)
        const variationMilis = finalDate - initialDate;
        const variationDate = Math.floor(variationMilis/(1000*60*60*24));
        const delay = (variationDate - dateRent.rows[0].daysRented) * (dateRent.rows[0].originalPrice / dateRent.rows[0].daysRented)
        const delayFee = delay <= 0 ? 0 : delay;
        
        await db.query(`UPDATE rentals 
        SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`, 
        [finalDate,delayFee,id]);

        res.send().status(200)
    } catch (error) {
        res.status(500).send(error.message)
    }

    
}

export async function deleteRental(req, res) {
    const {id} = req.params;

    try {
        const verifyId = await db.query(`SELECT * 
        FROM rentals 
        WHERE id = $1;`, [id])

        if (verifyId.rowCount == 0 ) return res.status(404).send();
        if (verifyId.rows[0].returnDate == null) return res.status(400).send();
        
        await db.query(`DELETE 
        FROM rentals 
        WHERE id = $1;`, [id]); 

        res.send().status(200) 
    } catch (error) {
        res.status(500).send(error.message)
    }
    
}

