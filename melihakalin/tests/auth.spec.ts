import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Freelance Platform/);
});

test('register with freelance type', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'İş ilanı ver' }).click();
  await page.getByTestId('signuppage').click();
  await page.getByLabel('Ad').click();
  await page.getByLabel('Ad').fill('deneme ad');
  await page.getByTestId('signup-email').click();
  await page.getByTestId('signup-email').fill('derya01@gmail.com');
  await page.getByTestId('signup-password').click();
  await page.getByTestId('signup-password').fill('123456789s');
  await page.getByTestId('signup-button').click();
  await page.getByText('FreelancerHizmet vererek para').click();
  await page.getByRole('button', { name: 'Hadi Başlayalım' }).click();
});

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'İş ilanı ver' }).click();
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('derya01@gmail.com');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('123456789s');
  await page.getByTestId('login').click();
});
