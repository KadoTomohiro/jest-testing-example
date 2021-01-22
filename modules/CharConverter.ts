import moji from 'moji'
export class KanaConverter {
  /**
   * カナ文字を全角カタカナに変換する
   * @param value 変換する文字列
   * @return 全角カタカナ文字列
   */
  static convertToKatakana(value: string): string {
    const converter = moji(value)
    converter.convert('HG', 'KK')
    converter.convert('HK', 'ZK')

    const result = converter.toString()
    return result
  }
}
