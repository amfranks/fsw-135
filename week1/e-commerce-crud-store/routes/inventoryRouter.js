const express = require('express');
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory.js');

// Get all
inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventoryItems) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventoryItems)
    })
})

// Post one
inventoryRouter.post('/', (req, res, next) => {
    const newInventoryItem = new Inventory(req.body)
    newInventoryItem.save((err, savedInventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})

// Update one
inventoryRouter.put('/:inventoryItemId', (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.inventoryItemId },
        req.body,
        { new: true },
        (err, updatedInventoryItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInventoryItem)
        }
    )
})

// Delete one
inventoryRouter.delete('/:inventoryItemId', (req, res, next) => {
    Inventory.findOneAndDelete({ _id: req.params.inventoryItemId }, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.item_name} from the database.`)
    })
})

module.exports = inventoryRouter;