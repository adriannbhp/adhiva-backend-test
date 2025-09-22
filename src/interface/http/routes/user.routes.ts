import { Router } from "express";
import { z } from "zod";
import { authGuard } from "../middlewares/auth.guard";
import { requireRole, requireSelfOrAdmin } from "../middlewares/roles";
import { validate } from "../middlewares/validate";
import {
    CreateUserSchema,
    UpdateUserSchema,
    ListUserSchema, ParamIdSchema,
} from "../../../core/dto";
import {
    createUser, updateUser, deleteUser, deletePermanent, getUser, listUsers
} from "../controllers/user.controller";

const router = Router();

router.post("/", validate(CreateUserSchema.strict(), "body"), createUser);

router.get("/", validate(ListUserSchema, "query"), listUsers);

router.get("/:id",
    validate(ParamIdSchema, "params"),
    getUser
);

router.use(authGuard);

router.put("/:id",
    validate(ParamIdSchema, "params"),
    validate(UpdateUserSchema.strict(), "body"),
    requireSelfOrAdmin,
    updateUser
);

router.patch("/:id",
    validate(ParamIdSchema, "params"),
    validate(UpdateUserSchema.strict(), "body"),
    requireSelfOrAdmin,
    updateUser
);

// DELETE — ADMIN & Owner
router.delete(
    "/:id",
    validate(ParamIdSchema, "params"),
    requireSelfOrAdmin,
    deleteUser
);

// DELETE PERMANENT — ADMIN only
router.delete("/:id/permanent",
    validate(ParamIdSchema, "params"),
    requireRole("ADMIN"),
    deletePermanent
);

export default router;
