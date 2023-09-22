
export async function getRentals(req, res) {
    
      
    const body = req.body;
    try {
      res.status(200).send(body);
    } catch (err) {
      res.status(500).send(err.message);
    }

}