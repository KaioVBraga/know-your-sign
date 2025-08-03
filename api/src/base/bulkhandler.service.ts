import { bulkMergeObjects, mergeObjects } from '../utils/objects';
import { GenericIdentifiable } from './generic-identifiable.interface';

export abstract class BulkHandlerService<
  T extends GenericIdentifiable,
  S extends GenericIdentifiable,
> {
  async bulkCreate(creatableEntities: S[]) {
    return await Promise.all(
      creatableEntities.map((ce) => {
        return this.create(ce);
      }),
    );
  }

  async bulkUpdate(updatableEntities: S[]) {
    return await Promise.all(
      updatableEntities.map((ue) => {
        return this.update(ue.id, ue);
      }),
    );
  }

  async bulkDelete(deletableEntities: T[]) {
    return await Promise.all(
      deletableEntities.map((ue) => {
        return this.delete(ue.id);
      }),
    );
  }

  getCreatableEntities(entities: S[]): S[] {
    return entities.filter((e) => !e.id);
  }

  getUpdatableEntities(entities: S[]): S[] {
    return entities.filter((e) => !!e.id);
  }

  getDeletableEntities(newEntities: S[], previousEntities: T[]): T[] {
    return previousEntities.filter((pe) => {
      return !newEntities.find((ne) => ne.id === pe.id);
    });
  }

  async bulkOperate(
    newEntities: S[],
    previousEntities: T[],
    sourceToMergeIntoNewEntities?: Record<string, any>,
  ): Promise<T[]> {
    bulkMergeObjects(newEntities, sourceToMergeIntoNewEntities);

    const creatableEntities = this.getCreatableEntities(newEntities);
    const updatableEntities = this.getUpdatableEntities(newEntities);
    const deletableEntities = this.getDeletableEntities(
      newEntities,
      previousEntities,
    );

    await this.bulkDelete(deletableEntities);
    const updatedEntities = await this.bulkUpdate(updatableEntities);
    const createdEntities = await this.bulkCreate(creatableEntities);

    return [...updatedEntities, ...createdEntities];
  }

  async update(id: number, entityDto: S): Promise<T> {
    return null;
  }

  async create(entityDto: S): Promise<T> {
    return null;
  }

  async delete(id: number): Promise<any> {
    return null;
  }
}
