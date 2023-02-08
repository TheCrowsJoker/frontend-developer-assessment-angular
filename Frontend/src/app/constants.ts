// API Endpoints
/**
 * Prefix used for the endpoints
 */
const prefix = '/api/';
/**
 * Endpoints used for all service calls
 * These are duplicated for now in case one of these
 * calls were to go to a sperate endpoint in future
 */
export const Endpoints = {
  // Actual url for BE
  // getItems: prefix + 'todoItems'
  // addItem: prefix + 'todoItems',
  // deleteItem: prefix + 'todoItems',
  // markComplete: prefix + 'todoItems',

  // Mocked db url with json-server
  getItems: 'http://localhost:3000/items',
  addItem: 'http://localhost:3000/items',
  deleteItem: 'http://localhost:3000/items',
  markComplete: 'http://localhost:3000/items',
};

/**
 * Forbidden names used by the item validator
 */
export const forbiddenItems: string[] = ['yes', 'no', 'cat', 'dog'];
