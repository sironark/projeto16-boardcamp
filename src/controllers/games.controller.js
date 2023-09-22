import db from "../database/database.connection.js"

export async function getGames(req, res) { 
    try {
      const games = await db.query(`SELECT * FROM games;`);
      res.status(200).send(games.rows);

    } catch (err) {
      res.status(500).send(err.message);
    }
}

export async function postGames(req, res) { 
  const games = req.body;
  
  try {
    if (games.name == null || games.stockTotal <=0 || games.pricePerDay <=0) res.status(400).send();
    
    const dbGames = await db.query (`SELECT name FROM games WHERE name = $1;`, [games.name]);
    if (dbGames.rowCount > 0) res.status(409).send("Already exists");

    await db.query(`INSERT INTO games 
    (name, image, "stockTotal", "pricePerDay") 
    VALUES ($1, $2, $3, $4);`, 
    [games.name, games.image, games.stockTotal, games.pricePerDay]);
    
    res.status(200).send("sent");

  } catch (err) {
    res.status(500).send(err.message);
  }
}