import dayjs from 'dayjs'

export const okMessage = (text: string) => ({text: `✅ ${text}`})
export const ngMessage = (text: string, title: string) => ({
  text: [`⛔ ${text}`, `[ *title:${title}* ]`].join('\n'),
})

export const targetDate = (targetDate: string, lastNotifiedAt: string | null, spans: string[], nowInjection: string | null = null): string | null => {
  const now = nowInjection ? dayjs(nowInjection) : dayjs()
  const formattedLastNotifiedAt = (!lastNotifiedAt ? now.subtract(30, 'd') : dayjs(lastNotifiedAt)).format('YYYY-MM-DDTHH:mm:ssZZ')
  const t = dayjs(targetDate)
  const formattedTargetDate = t.format('YYYY-MM-DDTHH:mm:ssZZ')
  const tz = t.format('HH:mm:ssZZ')
  const n = `${now.format('YYYY-MM-DD')}T${tz}`

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

    const formattedAdditionalDate = `${now.add(s, 'd').format('YYYY-MM-DD')}T${tz}`
    const formattedNow = `${now.format('YYYY-MM-DD')}T${tz}`
    console.log(
      [
        `  now: '${formattedNow}'`,
        `target_date: '${formattedTargetDate}'`,
        `additional_date: ${formattedAdditionalDate}`,
        `last_notified_at: '${formattedLastNotifiedAt}'`,
      ].join(', ')
    )
    if (formattedLastNotifiedAt !== formattedNow && formattedLastNotifiedAt < formattedNow && formattedAdditionalDate === formattedTargetDate) {
      return n
    }
  }
  return null
}
