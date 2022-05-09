import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacks-respository";

export class PrimaFeedbacksRepository implements FeedbackRepository {
  async create ({type, comment, screenshot}: FeedbackCreateData){
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    });
  }
}