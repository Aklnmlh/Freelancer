export const fetcher = async (
  target: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: any
) => {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_SITE_URL + target, {
      method,
      body: JSON.stringify(body),
    });
    return await data.json();
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
