import { generateHeight, generateTexture } from './functions'

test('generate height', () => {
  expect(typeof generateHeight(100, 100)).toBe('object')
})
