"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaFeedbacksRepository = void 0;
const prisma_1 = require("../../prisma");
class PrimaFeedbacksRepository {
    async create({ type, comment, screenshot }) {
        await prisma_1.prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });
    }
}
exports.PrimaFeedbacksRepository = PrimaFeedbacksRepository;
