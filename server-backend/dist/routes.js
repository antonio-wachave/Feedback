"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const submit_feedback_use_case_1 = require("./use-cases/submit-feedback-use-case");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const nodemailer_adapter_1 = require("./adapters/nodemailer/nodemailer-adapter");
exports.routes = (0, express_1.default)();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrimaFeedbacksRepository();
    const nodemailerMailAdapter = new nodemailer_adapter_1.NodemailerMailAdapter();
    const submitFeedbackUseCases = new submit_feedback_use_case_1.SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackUseCases.execute({
        type,
        comment,
        screenshot
    });
    return res.status(201).send();
});
