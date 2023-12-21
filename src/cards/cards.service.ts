import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepositories } from './cards.repositories';
import Cryptr from 'cryptr';

@Injectable()
export class CardsService {
  crypt = new Cryptr(process.env.SECRET);
  constructor(private readonly cardsRepositories: CardsRepositories) {}

  create(createCardDto: CreateCardDto, userId: number) {
    const cryptCvv = this.crypt.encrypt(createCardDto.cvv);
    const cryptPassword = this.crypt.encrypt(createCardDto.password);
    return this.cardsRepositories.create(
      { ...createCardDto, cvv: cryptCvv, password: cryptPassword },
      userId,
    );
  }

  async findAll(userId: number) {
    const cards = await this.cardsRepositories.findAll(userId);
    if (cards.length === 0) throw new NotFoundException('Cards not found');
    return cards;
  }

  async findOne(id: number, userId: number) {
    const card = await this.checkCards(id, userId);
    return {
      ...card,
      cvv: this.crypt.decrypt(card.cvv),
      password: this.crypt.decrypt(card.password),
      expirationDate: `${card.expirationDate.getMonth()}/${card.expirationDate.getFullYear()}`
    };
  }

  async update(id: number, updateCardDto: UpdateCardDto, userId: number) {
    await this.checkCards(id, userId);
    return this.cardsRepositories.update(id, updateCardDto);
  }

  async remove(id: number, userId: number) {
    await this.checkCards(id, userId);
    return this.cardsRepositories.deleteOne(id);
  }

  async checkCards(id: number, userId: number) {
    const card = await this.cardsRepositories.findOne(id);
    if (!card) throw new NotFoundException('Card not Found');
    if (card.userId !== userId) throw new ForbiddenException();
    return card;
  }
}
