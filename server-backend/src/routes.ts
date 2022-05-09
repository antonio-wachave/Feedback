import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrimaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-adapter';
export const routes = express();

routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screenshot } = req.body;
 

  const prismaFeedbacksRepository = new PrimaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCases = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

  await submitFeedbackUseCases.execute({
    type,
    comment,
    screenshot
  });

  return res.status(201).send();
});

