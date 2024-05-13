import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/user.entity';
import { Admin } from 'src/admins/admin.entity';
import { Vinyl } from 'src/vinyls/vinyl.entity';

export const seedData = async (manager: EntityManager): Promise<void> => {
  await seedVinyls();
  await seedUser();
  await seedUser();
  await seedUser();
  await seedUser();
  await seedUser();
  await seedUser();
  await seedUser();
  await seedUser();
  await seedUser();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();
  await seedVinylsToCurrentAdmin();

  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('12345', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.birthdate = faker.date.birthdate().toString();
    user.avatar = faker.image.avatar();

    await manager.getRepository(User).save(user);
  }

  async function seedVinyls() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('12345', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.birthdate = faker.date.birthdate().toString();
    user.avatar = faker.image.avatar();

    const admin = new Admin();
    admin.user = user;

    const vinyl = new Vinyl();

    vinyl.name = faker.music.songName();
    vinyl.authorName = faker.person.lastName();
    vinyl.description = faker.lorem.sentence({ min: 7, max: 15 });
    vinyl.price = Number(faker.commerce.price());
    vinyl.image = faker.image.avatar();
    vinyl.admin = admin;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Admin).save(admin);
    await manager.getRepository(Vinyl).save(vinyl);
  }

  async function seedVinylsToCurrentAdmin() {
    const admin = await manager.getRepository(Admin).findOneBy({ id: 1 });

    const vinyl = new Vinyl();

    vinyl.name = faker.music.songName();
    vinyl.authorName = faker.person.lastName();
    vinyl.description = faker.lorem.sentence({ min: 7, max: 15 });
    vinyl.price = Number(faker.commerce.price());
    vinyl.image = faker.image.avatar();
    vinyl.admin = admin;

    await manager.getRepository(Vinyl).save(vinyl);
  }
};
