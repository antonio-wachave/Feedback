
import { FeedbackRepository } from '../repositories/feedbacks-respository';
import { MailAdapter } from '../adapters/mail-adapters';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter,
    ) {
  }

  async execute(req: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = req;

    if(!type){
      throw new Error('Type is required');
    }

    if(!comment){
      throw new Error('comment is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
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