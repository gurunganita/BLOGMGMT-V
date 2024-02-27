const router = require("express").Router();
// const userController = require("./user.controller");
const userController = require("./user.controller");
const { checkRole } = require("../../utils/sessionManager");

router.post("/register", async (req, res, next) => {
  try {
    const result = await userController.register(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.create(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.get("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const { name, phone, email, page, limit } = req.query;
    const search = { name, phone, email };

    const result = await userController.getAll(search, page, limit);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.get(":/id", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.getById(req.params.id);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.get("/get-profile", checkRole(["user"]), async (req, res, next) => {
  try {
    const result = await userController.getProfile(req.currentUser);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.put("/update-profile", checkRole(["user"]), async (req, res, next) => {
  try {
    const result = await userController.updateProfile(
      req.currentUser,
      req.body
    );
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/generate-fp-token", async (req, res, next) => {
  try {
    const result = await userController.generateFpToken(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-fp-token", async (req, res, next) => {
  try {
    const result = await userController.verifyFpToken(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});
router.post("/reset-password", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.resetPassword(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

// router.post(
//   "/change-password",
//   checkRole[("admin", "user")],
//   async (req, res, next) => {
//     try {
//       const result = await userController.changePass(req.body);
//       res.json({ msg: result });
//     } catch (e) {
//       next(e);
//     }
//   }
// );
router.post("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.create(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
