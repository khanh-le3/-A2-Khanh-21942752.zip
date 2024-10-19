const db = require("../models");
const Companies = db.companies;
const Op = db.Sequelize.Op;

//create company
exports.create = (req, res) => {
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contactId: parseInt(req.params.contactId)
    };

    Companies.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error occurred"
            });
        });
};

// Retrieve all Companies
exports.findAll = (req, res) => {
    Companies.findAll({
        where: {
            contactId: parseInt(req.params.contactId)
        }
    })
        .then(data => {
            res.send(data);
        }) 
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred" 
            });
        });
};

// Find a single Company by ID
exports.findOne = (req, res) => {
    Companies.findOne({
        where: {
            contactId: req.params.contactId,
            company_id: req.params.companyId 
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};


// Update a Company
exports.update = (req, res) => {
    Companies.update(req.body, {
        where: { 
            contactId: req.params.contactId,
            company_id: req.params.companyId           
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" 
            });
        });
};

// Delete a Company
exports.delete = (req, res) => {
    Companies.destroy({
        where: { 
            contactId: req.params.contactId,
            company_id: req.params.companyId 
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ 
                message: "Could not delete Company with id=" 
            });
        });
};
