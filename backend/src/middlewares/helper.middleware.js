export const middlewareGetAll = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};
