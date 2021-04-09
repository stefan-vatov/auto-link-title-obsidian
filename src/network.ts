import { asyncWrap } from './util';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export const shouldFetchTitle = async (link: string): Promise<boolean> => {
  const headOpts = {
    method: 'head',
  };

  const { res, error } = await asyncWrap(fetch(link, headOpts));
  if (error) {
    console.error(error);
    return false;
  }

  const headHeaders = await res.headers.get('content-type');

  return headHeaders.contains('text/html');
};

export const fetchTitle = async (link: string): Promise<string> => {
  const { res, error } = await asyncWrap(fetch(link));

  if (error) {
    console.error(error);
    return link;
  }
  const pageBody = await res.text();
  const page = parse(pageBody);

  return page?.querySelector('title')?.text;
};
