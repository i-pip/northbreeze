module.exports = srv => {
  if (srv.name === "Breezy") {
    srv.on("hello", x => `hello there ${x.data.to} !`);
    srv.before("READ", "Products", x => {
      console.log(x);
    });
  }
};
