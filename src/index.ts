import {Client} from 'notion_sdk'
import dayjs from 'dayjs'
import {okMessage, ngMessage, targetDate} from './util.ts'
import {Slack} from './slack.ts'
import {fetchMeetingPages, updatelastNotifiedAt} from './notion.ts'

const slack = new Slack({ url: Deno.env.get('SLACK_WEBHOOK_URL') })
const notion = new Client({ auth: Deno.env.get('NOTION_TOKEN') })
const meetingDbId = Deno.env.get('MEETING_DB_ID')

if (!meetingDbId) {
  throw 'MEETING_DB_ID is empty'
}

const main = async () => {
  console.log('==== start process ======================')
  const meetingPages = await fetchMeetingPages(notion, meetingDbId, '開催日')
  const url = meetingPages.domain
  for (const page of meetingPages.entries) {
    console.log('  == start notification =================')
    console.log(`  id: '${page.id}'`)
    if (page.spans.length === 0 || !page.targetDate) {
      console.log('  == [skip] spans are null. =============')
      continue
    }
    const lastNotifiedAt = targetDate(page.targetDate, page.lastNotifiedAt, page.spans)
    console.log(`  target_date: '${page.targetDate}', last_nofificated_at: '${lastNotifiedAt}'`)
    if (!lastNotifiedAt) {
      console.log('  == [skip] it is not time. =============')
      continue
    }
    updatelastNotifiedAt(notion, page.id, lastNotifiedAt)
    const uri = `${url}/${page.id.replace(/-/g, '')}`
    const time = dayjs(lastNotifiedAt).format('YYYY-MM-DD')
    await slack.send(
      okMessage(
        [
          `${time}にMTGが開催されるよ！`,
          '当日までに忘れずに議事録を更新してね！🙏',
          `url 👉 https://${uri}`,
        ].join('\n'),
      ),
    ).catch(() => {
    })
    console.log('  == start notification =================')
  }
  console.log('==== finish process =====================')
}

main().catch((e) => {
  console.error(e)
})
