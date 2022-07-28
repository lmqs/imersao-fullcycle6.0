import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { Producer } from 'kafkajs';
import { MailListService } from './mail-list.service';

@Processor('emails')
export class SendMailTweetsJob {
  constructor(
    private mailListService: MailListService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
    private configService: ConfigService,
  ) { }
  @Process()
  async handle(job: Job) {
    //consumidor da fila do redis
    const mailList = await this.mailListService.findOne();
    const link = this.configService.get('NEXT_HOST');

    await this.kafkaProducer.send({
      topic: 'emails',
      messages: [
        {
          key: 'emails',
          value: JSON.stringify({
            subject: 'Novos tweets encontrados',
            body: `Acesse o link <a href="${link}/tweets">Clique aqui</a>`,
            emails: mailList.emails,
          }),
        },
      ],
    });
    console.log(mailList.emails);
    console.log('Lendo mensagem do REDIS e preparando envio para o kafka');
    console.log('Enviou para o microserviço do Weslei');
  }
}

//nest   -> kafka   <- goLang
