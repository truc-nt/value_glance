const FINANCIAL_MODELING_PREP_BASE_URL = import.meta.env
  .VITE_FINANCIAL_MODELING_PREP_BASE_URL;
const FINANCIAL_MODELING_PREP_API_KEY = import.meta.env
  .VITE_FINANCIAL_MODELING_PREP_API_KEY;
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const baseFetch = async <T>(
  endpoint: string,
  options = {},
  isFrontendMode = true
): Promise<T> => {
  const uri = isFrontendMode
    ? `${FINANCIAL_MODELING_PREP_BASE_URL}${endpoint}&apikey=${FINANCIAL_MODELING_PREP_API_KEY}`
    : `${SERVER_BASE_URL}${endpoint}`;

  const res = await fetch(uri, options);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  const data: T = await res.json();
  return data;
};

export default baseFetch;
