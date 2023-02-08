import { Item } from '../models/item';

export function sortItems(items: Item[]): Item[] {
  return items.sort((a, b) => {
    return (
      +a.isCompleted - +b.isCompleted ||
      a.description.localeCompare(b.description)
    );
  });
}
