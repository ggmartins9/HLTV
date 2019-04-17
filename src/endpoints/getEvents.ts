import { EventLink } from '../models/EventLink'
import { HLTVConfig } from '../config'
import { fetchPage, toArray } from '../utils/mappers'

export const getEvents = (config: HLTVConfig) => async (): Promise<EventLink[]> => {
  const $ = await fetchPage(`${config.hltvUrl}/events#tab-ALL`, config.loadPage)
  
  const onGoingEvents: EventLink[] = toArray($('.a-reset.ongoing-event')).map(matchEl => {
    const id = Number(matchEl.attr('href').split('/')[2])
    const href = matchEl.attr('href');
    return {id: id, link: href};
  });

  const bigEvents: EventLink[] = toArray($('a-reset.big-event')).map(matchEl => {
    const id = Number(matchEl.attr('href').split('/')[2])
    const href = matchEl.attr('href');
    return {id: id, link: href};
  });

  const smallEvents: EventLink[] = toArray($('a-reset.small-event')).map(matchEl => {
    const id = Number(matchEl.attr('href').split('/')[2])
    const href = matchEl.attr('href');
    return {id: id, link: href};
  })

  return [...onGoingEvents, ...smallEvents, ...bigEvents];
}