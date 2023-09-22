import db from "../database/database.connection.js"

export async function getGames(req, res) {
    const games ={
        id: 1,
        name: 'Banco Imobiliário',
        image: 'http://',
        stockTotal: 3,
        pricePerDay: 1500,
      };
      
    const body = req.body;
    try {
      res.status(200).send(body);
    } catch (err) {
      res.status(500).send(err.message);
    }

}