/**
 * Search Service
 * @module Search Controller
 * @description Config controller
 */

import elasticsearch from '@elastic/elasticsearch';

export class SearchService {
  private static instance: SearchService;
  private esClient: elasticsearch.Client;

  constructor() {
    if (SearchService.instance) {
      return SearchService.instance;
    }

    this.esClient = new elasticsearch.Client({
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme',
      },
    });
    SearchService.instance = this;
  }

  /**
   * @method create
   * @description Create new search
   */
  async createIndex() {
    return this.esClient.indices.create(
      {
        index: 'player-index', //tao index như các db khác
      }
      // (err, res, sta) => {
      //   console.log(`err, res, sta:::`, err, res, sta);
      // }
    );
  }

  /**
   * @method list
   * @description Get list
   */
  async insert() {
    return this.esClient.index({
      index: 'player-index',
      id: `${Date.now()}`,
      document: {
        name: 'ronaldo', // tôi yêu Chị Bảy
        age: 35,
        club: 'MU',
        time: new Date(),
      },
    });
  }
  /**
   * @method list
   * @description Get list
   */
  async search() {
    return this.esClient.search({
      index: 'player-index',
      from: 0,
      size: 100,
      body: {
        query: {
          match: {
            name: 'ronaldo',
          },
        },
      },
    });
  }

  /**
   * @method list
   * @description Get list
   */
  async count() {
    return this.esClient.count({
      index: 'player-index',
    });
  }

  /**
   * @method list
   * @description Get list
   */
  async list() {
    return;
  }

  /**
   * @async
   * @method getById
   * @description Get detail by id
   * @param params {id}
   */
  async getById() {
    return;
  }

  /**
   * @async
   * @method updateById
   * @description Update by id
   * @param params {id}
   */
  async updateById() {
    return;
  }

  /**
   * @async
   * @method deleteById
   * @description Delete by id
   * @param params {id}
   */
  async deleteById() {
    return;
  }
}
