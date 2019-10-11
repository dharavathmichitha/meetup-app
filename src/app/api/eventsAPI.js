import { updateStateWithResponseData } from '../utils/api-utils';
import { constructErrorMessage } from '../utils/error-utils';
import axios from './axios.instance';

const getAPIResponseWithQuery = query => axios.get(`events${query}`);

export const getAllEvents = async stateHandler => {
  try {
    const eventsResponse = await getAPIResponseWithQuery('');
    const { data } = eventsResponse;
    stateHandler(data);
  } catch (error) {
    throw new Error(constructErrorMessage(error, 'getAllUnRegisteredEvents'));
  }
};

export const getEventsByName = async (stateHandler, eventName) => {
  try {
    const eventsResponse = await getAPIResponseWithQuery(
      `?name_like=${eventName}&_sort=startDate&_order=asc`,
    );

    updateStateWithResponseData(eventsResponse, stateHandler);
  } catch (error) {
    throw new Error(constructErrorMessage(error));
  }
};

export const getEventsByIdSortedByDate = async (stateHandler, eventIdList) => {
  try {
    const bindedQueryParameters = eventIdList
      .map(eventId => {
        return `id=${eventId}`;
      })
      .join('&');

    const eventsResponse = await getAPIResponseWithQuery(
      `?${bindedQueryParameters}&_sort=startDate&_order=asc`,
    );

    updateStateWithResponseData(eventsResponse, stateHandler);
  } catch (error) {
    throw new Error(constructErrorMessage(error));
  }
};

export const getFreeEvents = async stateHandler => {
  try {
    const eventsResponse = await getAPIResponseWithQuery(`?isFree=true&_sort=startDate&_order=asc`);

    updateStateWithResponseData(eventsResponse, stateHandler);
  } catch (error) {
    throw new Error(constructErrorMessage(error));
  }
};

export const getEventsByDate = async stateHandler => {
  try {
    // const bindedExcludeQueryParameters = eventIdsListToExclude
    //   .map(eventId => {
    //     return `id_ne=${eventId}`;
    //   })
    //   .join('&');
    const eventsResponse = await getAPIResponseWithQuery(`?_sort=startDate&_order=asc`);
    console.log(eventsResponse);

    updateStateWithResponseData(eventsResponse, stateHandler);
  } catch (error) {
    throw new Error(constructErrorMessage(error));
  }
};