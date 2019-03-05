const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");


router.get("/wikis/:wikiId/collaborators", collaboratorController.show);
router.post("/wikis/:wikiId/collaborators/create", collaboratorController.create);
router.get("/wikis/:wikiId/collaborators/edit", collaboratorController.edit);
router.post("/wikis/:wikiId/collaborators/remove", collaboratorController.remove);

module.exports = router;
