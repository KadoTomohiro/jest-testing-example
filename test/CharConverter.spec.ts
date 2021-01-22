import moji from 'moji'
import { KanaConverter } from '~/modules/CharConverter'

jest.mock('moji')

describe('CharConverter', () => {
  describe('KanaConverter', () => {
    it('should ', () => {
      const convertSpy = jest.fn()
      const toStringSpy = jest.fn()
      // @ts-ignore
      moji.mockReturnValueOnce({
        convert: convertSpy,
        toString: toStringSpy,
      })

      toStringSpy.mockReturnValueOnce('ヒラガナ')

      const result = KanaConverter.convertToKatakana('ひらがな')
      expect(result).toBe('ヒラガナ')
    })
  })
})
