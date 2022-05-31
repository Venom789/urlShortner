const notFound = (req, res) => {
    res.status(404).send("<h1> oooooooops !!! Page Not found </h1>");
  };
  
  module.exports = notFound;
  