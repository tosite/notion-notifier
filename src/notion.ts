import {Client} from 'notion_sdk'
import {parseMeetingPageEntity} from './parser.ts'
import dayjs from 'dayjs'

export const fetchMeetingPages = async (notion: Client, databaseId: string, datetimeColumn: string): Promise<any> => {
  const target = []
  let nextCursor = undefined
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const pages: any = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {property: datetimeColumn, date: {"before": `${dayjs().add(7, 'd').format('YYYY-MM-DD')}T23:59:59+0900`}},
          {property: datetimeColumn, date: {"after": `${dayjs().format('YYYY-MM-DD')}T00:00:00+0900`}},
        ]
      },
      start_cursor: nextCursor,
      page_size: 100,
    })
    if (!pages || Object.keys(pages).length === 0 || !pages['results']) {
      continue
    }
    let domain = ''
    for (const p of pages.results) {
      if (domain === '') {
        domain = new URL(p['url']).host
      }
      target.push(parseMeetingPageEntity(p['id'], p.properties))
    }
    nextCursor = pages['next_cursor']
    if (!nextCursor) {
      return {
        domain,
        entries: target,
      }
    }
  }
}

export const updatelastNotifiedAt = async (notion: Client, id: string, lastNotifiedAt: string) => {
  try {
    // @ts-ignore
    const page: {
      properties: {
        "最終通知日": {
          date: { start: string }
        }
      }
    } = await notion.pages.update({
      page_id: id,
      properties: {
        "最終通知日": {
          date: {
            start: lastNotifiedAt,
          },
        },
      },
    })
    return page && page.properties['最終通知日']['date']['start'] === lastNotifiedAt
  } catch {
    return
  }
}
