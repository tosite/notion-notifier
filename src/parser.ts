export const parseSelect = <T>(property: any): T | null => {
  if (!property || !property['select'] || typeof property['select']['name'] === 'undefined') {
    return null
  }
  return property['select']['name']
}

export const parseMultiSelect = <T>(property: any): string[] | null => {
  if (!property || !property['multi_select']) {
    return null
  }
  let res = []
  for (const row of property['multi_select']) {
    res.push(row['name'])
  }
  return res
}

export const parseNumber = (property: any, defaultValue = 0): number => {
  if (!property || typeof property['number'] === 'undefined') {
    return defaultValue
  }
  return property['number']
}

export const parseTitle = (property: any, defaultValue = ''): string => {
  if (
    !property ||
    !property['title'] ||
    !property['title'][0] ||
    typeof property['title'][0]['plain_text'] === 'undefined'
  ) {
    return defaultValue
  }
  const text: string = property['title'][0]['plain_text']
  return text || defaultValue
}

export const parseText = (property: any, defaultValue = ''): string => {
  if (
    !property ||
    !property['rich_text'] ||
    !property['rich_text'][0] ||
    !property['rich_text'][0]['text'] ||
    typeof property['rich_text'][0]['text']['content'] === 'undefined'
  ) {
    return defaultValue
  }
  const text: string = property['rich_text'][0]['text']['content']
  return text || defaultValue
}

export const parseBool = (property: any, defaultValue = false): boolean => {
  if (!property || typeof property['checkbox'] === 'undefined') {
    return defaultValue
  }
  return property['checkbox']
}

export const parseMeetingPageEntity = (id: string, properties: any): any => {
  let spans = null
  if (properties['リマインダー']) {
    spans = parseMultiSelect(properties['リマインダー'])
  }
  let last = null
  if (properties['最終通知日'] && properties['最終通知日']['date'] && properties['最終通知日']['date']['start']) {
    last = properties['最終通知日']['date']['start']
  }
  let target = ''
  if (properties['開催日'] && properties['開催日']['date'] && properties['開催日']['date']['start']) {
    target = properties['開催日']['date']['start']
  }

  return {
    id: id,
    spans: spans,
    lastNotifiedAt: last,
    targetDate: target,
  }
}
