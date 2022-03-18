const BlogNetwork = artifacts.require("./BlogNetwork.sol");

module.exports = function(deployer) {
  deployer.deploy(BlogNetwork);
};