// 2_deploy_contracts.js
var Transaction = artifacts.require("Transaction");

module.exports = function(deployer) {
  deployer.deploy(Transaction);
};
