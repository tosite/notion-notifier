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

  for (const span of spans) {
    if (span === '1週間前') {
      const d = `${dayjs().add(7, 'd').format('YYYY-MM-DD')}T${tz}`
      if (d === tf && l > d) {
        return d
      }
    }
    if (span === '3日前') {
      const d = `${dayjs().add(3, 'd').format('YYYY-MM-DD')}T${tz}`
      if (d === tf && l > d) {
        return d
      }
    }
    if (span === '2日前') {
      const d = `${dayjs().add(2, 'd').format('YYYY-MM-DD')}T${tz}`
      if (d === tf && l > d) {
        return d
      }
    }
    if (span === '1日前') {
      const d = `${dayjs().add(1, 'd').format('YYYY-MM-DD')}T${tz}`
      if (d === tf && l > d) {
        return d
      }
    }
    if (span === '当日') {
      const d = `${dayjs().format('YYYY-MM-DD')}T${tz}`
      if (d === tf && l > d) {
        return d
      }
    }
  }
  return null
}
