import {assertEquals} from 'testing/asserts.ts'
import {parseBool, parseNumber, parseSelect, parseTitle} from './parser.ts';
import {describe, it} from 'TestSuite'

describe("parseSelect", () => {
  describe("パースに失敗した場合", () => {
    it("nullが返ってくること", () => {
      const testCases = [
        undefined,
        null,
        {select: null},
        {select: {undefined: ''}},
      ]
      for (const testCase of testCases) {
        const res = parseSelect(testCase)
        assertEquals(res, null)
      }
    })
  })

  describe("パースに成功した場合", () => {
    it("値が返ってくること", () => {
      const res = parseSelect({select: {name: 'select'}})
      assertEquals(res, 'select')
    })
  })
})

describe("parseNumber", () => {
  describe("パースに失敗した場合", () => {
    it("デフォルト値を指定しない場合、デフォルト値が返ってくること", () => {
      const testCases = [
        undefined,
        null,
        {undefined: null},
      ]
      for (const testCase of testCases) {
        const res = parseNumber(testCase)
        assertEquals(res, 0)
      }
    })

    it("デフォルト値を指定した場合、デフォルト値が返ってくること", () => {
      const testCases = [
        undefined,
        null,
        {undefined: null},
      ]
      for (const testCase of testCases) {
        const res = parseNumber(testCase, 10)
        assertEquals(res, 10)
      }
    })
  })

  describe("パースに成功した場合", () => {
    it("値が返ってくること", () => {
      const res = parseNumber({number: 100})
      assertEquals(res, 100)
    })
  })
})

describe("parseTitle", () => {
  describe("パースに失敗した場合", () => {
    it("デフォルト値を指定しない場合、デフォルト値が返ってくること", () => {
      const testCases = [
        undefined,
        null,
        {title: null},
        {title: []},
        {title: [{undefined: ''}]},
      ]
      for (const testCase of testCases) {
        const res = parseTitle(testCase)
        assertEquals(res, '')
      }
    })

    it("デフォルト値を指定した場合、デフォルト値が返ってくること", () => {
      const testCases = [
        undefined,
        null,
        {title: null},
        {title: []},
        {title: [{undefined: ''}]},
      ]
      for (const testCase of testCases) {
        const res = parseTitle(testCase, 'default')
        assertEquals(res, 'default')
      }
    })
  })

  describe("パースに成功した場合", () => {
    it("値が返ってくること", () => {
      const res = parseTitle({title: [{plain_text: 'title text'}]})
      assertEquals(res, 'title text')

    })
  })
})

describe("parseBool", () => {
  describe("パースに失敗した場合", () => {
    it("デフォルト値を指定しない場合、デフォルト値が返ってくること", () => {
      const testCases = [
        undefined,
        null,
        {checkbox: undefined},
      ]
      for (const testCase of testCases) {
        const res = parseBool(testCase)
        assertEquals(res, false)
      }
    })

    it("デフォルト値を指定した場合、デフォルト値が返ってくること", () => {
      const testCases = [
        undefined,
        null,
        {checkbox: undefined},
      ]
      for (const testCase of testCases) {
        const res = parseBool(testCase, true)
        assertEquals(res, true)
      }
    })
  })

  describe("パースに成功した場合", () => {
    it("値が返ってくること", () => {
      const res = parseBool({checkbox: true})
      assertEquals(res, true)
    })
  })
})
