const authenticateToken = require("../middlewares/authenticationToken");
const knex = require("knex")(require("../knexfile").development);

exports.postFavorites = async (req, res) => {
  const { dish_id, user_id } = req.body;

  try {
    const favorite = await knex("favorites").insert({
      user_id,
      dish_id,
    });

    res.status(201).json({ id: favorite[0] });
  } catch (error) {
    res.status(500).json({ message: "Could not add to favorites" });
  }
};

exports.getFavorites = async (req, res) => {
  const userId = req.user.userId;

  try {
    const favorites = await knex("favorites").where({ user_id: userId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve favorites" });
  }
};

exports.deleteFavoritesById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await knex("favorites").where({ id, user_id: userId }).del();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Could not remove favorite" });
  }
};
