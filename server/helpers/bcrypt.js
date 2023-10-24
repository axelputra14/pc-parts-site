const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
const hash = (input) => bcrypt.hashSync(input, salt);

const compare = (input, hashed) => bcrypt.compareSync(input, hashed);

module.exports = { hash, compare };
