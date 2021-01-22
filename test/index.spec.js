import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Index from '../pages/index'
import { KanaConverter } from '~/modules/CharConverter'

const converterSpy = jest.spyOn(KanaConverter, 'convertToKatakana')

describe('index page', () => {
  describe('unit tests', () => {
    it('初期状態では入力されていないこと', () => {
      const wrapper = mount(Index)
      const input = wrapper.find('input')
      expect(input.element.value).toBe('')
    })
    it('inputイベントで入力がカナ変換を受けること', async () => {
      const convertedValue = 'カタカナ'
      converterSpy.mockImplementation(() => convertedValue)

      const wrapper = mount(Index)
      const input = wrapper.find('input')

      input.element.value = 'かたかな'
      input.trigger('input')
      await Vue.nextTick()

      expect(input.element.value).toEqual(convertedValue)
      expect(converterSpy).toBeCalledTimes(1)
    })
  })

  describe('integration tests', () => {
    it('カタカナを入力するとそのまま表示されること', () => {
      const wrapper = mount(Index)
      const input = wrapper.find('input')

      const inputValue = 'カタカナ'
      input.element.value = inputValue
      input.trigger('input')
      expect(input.element.value).toEqual(inputValue)
    })

    it('ひらがなを入力した場合全角カタカナに変換されて表示されること', async () => {
      const wrapper = mount(Index)
      const input = wrapper.find('input')

      input.setValue('かたかな')
      await Vue.nextTick()
      expect(input.element.value).toEqual('カタカナ')
    })

    it('半角カタカナを入力した場合全角カタカナに変換されて表示されること', async () => {
      const wrapper = mount(Index)
      const input = wrapper.find('input')

      input.setValue('ｶﾀｶﾅ')
      await Vue.nextTick()
      expect(input.element.value).toEqual('カタカナ')
    })
    it('漢字カナまじりの場合、漢字は変換されないこと', async () => {
      const wrapper = mount(Index)
      const input = wrapper.find('input')

      input.setValue('ｶﾀｶﾅかたかな片仮名')
      await Vue.nextTick()
      expect(input.element.value).toEqual('カタカナカタカナ片仮名')
    })
  })
})
