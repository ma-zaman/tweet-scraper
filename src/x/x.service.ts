import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer'
import { createReadStream } from 'fs';

@Injectable()
export class XService {
  constructor(private readonly configService: ConfigService) {}

  async getLastTweet(account: string) {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000)
      await page.goto(`https://x.com/${account}`);
      const selector = '[role="article"]';
      await page.waitForSelector(selector);

      await Promise.all([
        page.$eval(selector, (element: HTMLElement) =>
          element.click()
        ),
        await page.waitForNavigation(),
      ]);
      
      const newSelector = '[data-testid="tweetText"]';
      await page.waitForSelector(newSelector);
      const tweets = await page.$$eval(newSelector, tweets => {
        return tweets.map(tweet => {
          return tweet.textContent});
      });

      const question = tweets[0].split('\n')[4]

      const cardPollSelector = '[role="radio"]';
      await page.waitForSelector(cardPollSelector);
      const responses = await page.$$eval(cardPollSelector, responses => {
        return responses.map(response => response.textContent);
      });
      return {question, responses}

    } catch (error) {
      console.log('error: ', error)
      throw error
    } finally {
      await browser.close();
    }
  }
}
