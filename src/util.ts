import dayjs from 'dayjs'

export const okMessage = (text: string) => ({text: `✅ ${text}`})
export const ngMessage = (text: string, title: string) => ({
  text: [`⛔ ${text}`, `[ *title:${title}* ]`].join('\n'),
})

export const targetDate = (targetDate: string, lastNotifiedAt: string | null, spans: string[]): string|null => {
  const l = (!lastNotifiedAt ? dayjs().add(30, 'd') : dayjs(lastNotifiedAt)).format('YYYY-MM-DDTHH:mm:ssZZ')
  const t = dayjs(targetDate)
  const tf = t.format('YYYY-MM-DDTHH:mm:ssZZ')
  const tz = t.format('HH:mm:ssZZ')
  const n = `${dayjs().format('YYYY-MM-DD')}T${tz}`

  for (const span of spans) {
    let s = 0
    if (span === '1週間前') {
      s = 7
    }
    if (span === '3日前') {
      s = 3
    }
    if (span === '2日前') {
      s = 2
    }
    if (span === '1日前') {
      s = 1
    }
    if (span === '当日') {
      s = 0
    }

    const d = `${dayjs().add(s, 'd').format('YYYY-MM-DD')}T${tz}`
    if (d === tf && l < d) {
      return n
    }
  }
  return null
}
