import {assertEquals} from 'testing/asserts.ts'
import {okMessage, ngMessage, targetDate} from './util.ts'

// Deno.test('okMessage', () => {
//   const res = okMessage('dummy')
//   assertEquals(res.text, '✅ dummy')
// })
//
// Deno.test('ngMessage', () => {
//   const res = ngMessage('dummyMsg', 'dummyTitle')
//   assertEquals(res.text, '⛔ dummyMsg\n[ *title:dummyTitle* ]')
// })
//
// Deno.test('通知がONの場合 まだ通知していない場合 日付が返ること', () => {
//   const target = targetDate(
//     '2022-04-08 12:00:00',
//     null,
//     ['1週間前'],
//     '2022-04-01 00:00:00'
//     )
//   assertEquals(target, '2022-04-01T12:00:00+0900')
// })
//
// Deno.test('1週間前 通知がONの場合 すでに通知済みの場合 nullが返ること', () => {
//   const target = targetDate(
//     '2022-04-08 12:00:00',
//     '2022-04-01 12:00:00',
//     ['1週間前'],
//     '2022-04-01 13:00:00'
//   )
//   assertEquals(target, null)
// })
//
// Deno.test('6日前 通知がONの場合 すでに通知済みの場合 nullが返ること', () => {
//   const target = targetDate(
//     '2022-04-08 12:00:00',
//     '2022-04-02 12:00:00',
//     ['1週間前'],
//     '2022-04-01 13:00:00'
//   )
//   assertEquals(target, null)
// })

Deno.test('3日前 通知がONの場合 まだ通知していない場合 日付が返ること', () => {
  const target = targetDate(
    '2022-04-08 12:00:00',
    '2022-04-01 12:00:00',
    ['3日前'],
    '2022-04-05 13:00:00'
  )
  assertEquals(target, '2022-04-05T12:00:00+0900')
})

Deno.test('3日前 通知がONの場合 すでに通知済みの場合 nullが返ること', () => {
  const target = targetDate(
    '2022-04-08 12:00:00',
    '2022-04-05 12:00:00',
    ['3日前'],
    '2022-04-05 13:00:00'
  )
  assertEquals(target, null)
})

Deno.test('当日 通知がONの場合 まだ通知していない場合 日付が返ること', () => {
  const target = targetDate(
    '2022-04-08 12:00:00',
    '2022-04-07 12:00:00',
    ['当日'],
    '2022-04-08 10:00:00'
  )
  assertEquals(target, '2022-04-08T12:00:00+0900')
})

Deno.test('当日 通知がONの場合 すでに通知済みの場合 nullが返ること', () => {
  const target = targetDate(
    '2022-04-08 12:00:00',
    '2022-04-08 12:00:00',
    ['当日'],
    '2022-04-08 13:00:00'
  )
  assertEquals(target, null)
})
