"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbackRepository, mailAdapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(req) {
        const { type, comment, screenshot } = req;
        if (!type) {
            throw new Error('Type is required');
        }
        if (!comment) {
            throw new Error('comment is required');
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        }
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family":Helvetica; font-size:12px; color: #111;">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `</div>`
            ].join('\n')
        });
    }
}
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
